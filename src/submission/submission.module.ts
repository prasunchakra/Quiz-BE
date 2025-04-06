import { Module } from '@nestjs/common';
import { SubmissionController } from './submission.controller';
import { SubmissionService } from './submission.service';
import { Quiz } from 'src/quizzes/entities/quiz.entity';
import { Submission } from './entities/submission.entity';
import { Question } from 'src/questions/entities/question.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Submission, Quiz, Question])],
  controllers: [SubmissionController],
  providers: [SubmissionService]
})
export class SubmissionModule {}
