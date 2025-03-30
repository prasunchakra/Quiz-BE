import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { Answer } from './entities/answer.entity';
import { CreateQuestionDto } from './dto/create-question.dto';

@Injectable()
export class QuestionsService {

    constructor(
        @InjectRepository(Question)
        private questionRepository: Repository<Question>,
    
        @InjectRepository(Answer)
        private answerRepository: Repository<Answer>,
      ) {}
    
      async create(dto: CreateQuestionDto): Promise<Question> {
        const answers: Answer[] = [];
    
        if (dto.answerIds?.length) {
          const foundAnswers = await this.answerRepository.findByIds(dto.answerIds);
          answers.push(...foundAnswers);
        }
    
        if (dto.newAnswers?.length) {
          const newAnswerEntities = this.answerRepository.create(dto.newAnswers);
          const savedAnswers = await this.answerRepository.save(newAnswerEntities);
          answers.push(...savedAnswers);
        }
        const question = this.questionRepository.create({
          questionText: dto.questionText,
          questionType: dto.questionType,
          answers,
        });
        return this.questionRepository.save(question);
      }
    
      async findAll(): Promise<Question[]> {
        return this.questionRepository.find({ relations: ['answers'] });
      }
    
      async findOne(id: number): Promise<Question> {
        const question = await this.questionRepository.findOne({
          where: { id },
          relations: ['answers'],
        });
    
        if (!question) throw new NotFoundException('Question not found');
        return question;
      }
    
      async update(id: number, dto: CreateQuestionDto): Promise<Question> {
        const question = await this.findOne(id);
        question.questionText = dto.questionText;
        question.questionType = dto.questionType;
    
        const answers: Answer[] = [];
    
        if (dto.answerIds?.length) {
          const existingAnswers = await this.answerRepository.findByIds(dto.answerIds);
          answers.push(...existingAnswers);
        }
    
        if (dto.newAnswers?.length) {
          const newAnswerEntities = this.answerRepository.create(dto.newAnswers);
          const savedAnswers = await this.answerRepository.save(newAnswerEntities);
          answers.push(...savedAnswers);
        }
    
        question.answers = answers;
    
        return this.questionRepository.save(question);
      }
    
      async remove(id: number): Promise<void> {
        const question = await this.findOne(id);
        await this.questionRepository.remove(question);
      }
}
