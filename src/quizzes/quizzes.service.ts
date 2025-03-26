import { Injectable } from '@nestjs/common';
import { Quiz } from './entities/quiz.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuizDto } from './entities/create-quiz.dto';

@Injectable()
export class QuizzesService {
    constructor(
        @InjectRepository(Quiz)
        private readonly quizRepository: Repository<Quiz>,
      ) {}
    
      async findAll(): Promise<Quiz[]> {
        return this.quizRepository.find({ relations: ['questions', 'questions.answers'] });
      }
    
      async findOne(id: number): Promise<Quiz | null> {
        return this.quizRepository.findOne({
          where: { id },
          relations: ['questions', 'questions.answers'],
        });
      }
    
      async create(createQuizDto: CreateQuizDto): Promise<Quiz> {
        const quiz = this.quizRepository.create(createQuizDto);
        return this.quizRepository.save(quiz);
      }
}
