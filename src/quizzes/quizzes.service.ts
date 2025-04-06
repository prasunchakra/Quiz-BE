import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './entities/quiz.entity';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Question } from '../questions/entities/question.entity';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  async findAll(): Promise<Quiz[]> {
    return this.quizRepository.find({ relations: ['questions', 'createdBy'] });
  }

  async findOne(id: string): Promise<Quiz> {
    const quiz = await this.quizRepository.findOne({ where: { id }, relations: ['questions', 'createdBy'] });
    if (!quiz) {
      throw new NotFoundException(`Quiz with id ${id} not found`);
    }
    return quiz;
  }

  async create(createQuizDto: CreateQuizDto): Promise<Quiz> {
    const quiz = new Quiz();
    quiz.title = createQuizDto.title || '';
    quiz.description = createQuizDto.description || '';

    if (createQuizDto.questionIds && createQuizDto.questionIds.length > 0) {
      quiz.questions = await this.questionRepository.findByIds(createQuizDto.questionIds);
    }

    return this.quizRepository.save(quiz);
  }

  async update(id: string, updateQuizDto: UpdateQuizDto): Promise<Quiz> {
    const quiz = await this.findOne(id);
    quiz.title = updateQuizDto.title ?? quiz.title;
    quiz.description = updateQuizDto.description ?? quiz.description;

    if (updateQuizDto.questionIds) {
      quiz.questions = await this.questionRepository.findByIds(updateQuizDto.questionIds);
    }

    return this.quizRepository.save(quiz);
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    const quiz = await this.findOne(id);
    await this.quizRepository.remove(quiz);
    return { deleted: true };
  }
}
