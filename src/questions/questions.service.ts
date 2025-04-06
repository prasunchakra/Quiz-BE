import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Quiz } from 'src/quizzes/entities/quiz.entity';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Like } from 'typeorm';
import { PaginationDto, SortOrder } from 'src/common/dto/pagination.dto';
@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,

    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
  ) {}

  async create(dto: CreateQuestionDto): Promise<Question> {
    let quizzes: Quiz[] = [];

    if (dto.quizIds?.length) {
      quizzes = await this.quizRepository.findByIds(dto.quizIds);
    }

    const question = this.questionRepository.create({
      type: dto.type,
      text: dto.text,
      options: dto.options,
      correctAnswer: dto.correctAnswer,
      section: dto.section,
      marks: dto.marks,
      metadata: dto.metadata,
      difficulty: dto.difficulty,
      status: dto.status,
      explanation: dto.explanation,
      tags: dto.tags,
      wrongAnswerFeedback: dto.wrongAnswerFeedback,
      quizzes,
    });

    return this.questionRepository.save(question);
  }

  async findAll(paginationDto: PaginationDto) {
    const { 
      page = 1, 
      limit = 10, 
      sortBy = 'createdAt', 
      sortOrder = SortOrder.DESC,
      search 
    } = paginationDto;

    const queryBuilder = this.questionRepository.createQueryBuilder('question');

    if (search) {
      queryBuilder.where([
        { text: Like(`%${search}%`) },
        { section: Like(`%${search}%`) },
        { tags: Like(`%${search}%`) }
      ]);
    }

    queryBuilder.orderBy(`question.${sortBy}`, sortOrder);

    queryBuilder
      .skip((page - 1) * limit)
      .take(limit);

    const [items, total] = await queryBuilder.getManyAndCount();

    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
      items,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage,
        hasPreviousPage
      }
    };
  }

  async findOne(id: string): Promise<Question> {
    const question = await this.questionRepository.findOne({
      where: { id },
      relations: ['quizzes'],
    });

    if (!question) throw new NotFoundException('Question not found');
    return question;
  }

  async findByQuiz(quizId: string): Promise<Question[]> {
    return this.questionRepository
      .createQueryBuilder('question')
      .innerJoinAndSelect('question.quizzes', 'quiz')
      .where('quiz.id = :quizId', { quizId })
      .getMany();
  }

  async update(id: string, dto: UpdateQuestionDto): Promise<Question> {
    const question = await this.findOne(id);

    question.type = dto.type ?? question.type;
    question.text = dto.text ?? question.text;
    question.options = dto.options ?? question.options;
    question.correctAnswer = dto.correctAnswer ?? question.correctAnswer;
    question.section = dto.section ?? question.section;
    question.marks = dto.marks ?? question.marks;
    question.metadata = dto.metadata ?? question.metadata;
    question.difficulty = dto.difficulty ?? question.difficulty;
    question.status = dto.status ?? question.status;
    question.explanation = dto.explanation ?? question.explanation;
    question.tags = dto.tags ?? question.tags;
    question.wrongAnswerFeedback = dto.wrongAnswerFeedback ?? question.wrongAnswerFeedback;

    if (dto.quizIds?.length) {
      const quizzes = await this.quizRepository.findByIds(dto.quizIds);
      question.quizzes = quizzes;
    }

    return this.questionRepository.save(question);
  }

  async remove(id: string): Promise<void> {
    const question = await this.findOne(id);
    await this.questionRepository.remove(question);
  }
}
