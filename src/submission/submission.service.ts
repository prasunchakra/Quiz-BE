import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Submission, QuizStatus } from './entities/submission.entity';
import { Quiz } from 'src/quizzes/entities/quiz.entity';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';

interface Result {
  totalMarks: number;
  obtainedMarks: number;
  percentage: number;
  status: QuizStatus;
  individualScore: {
    questionText: string;
    marks: number;
    result: 'correct' | 'incorrect' | 'not attempted';
  }[];
}
@Injectable()
export class SubmissionService {
    constructor(
        @InjectRepository(Submission)
        private submissionRepository: Repository<Submission>,
        @InjectRepository(Quiz)
        private quizRepository: Repository<Quiz>,
      ) {}
    
      async findAll(): Promise<Submission[]> {
        return this.submissionRepository.find({ relations: ['quiz'] });
      }
    
      async findOne(id: string): Promise<Submission> {
        const submission = await this.submissionRepository.findOne({
          where: { id },
          relations: ['quiz'],
        });
        if (!submission) {
          throw new NotFoundException(`Quiz Submission with id ${id} not found`);
        }
        return submission;
      }
    
      async create(submittedObj: any): Promise<Result> {
        const result: Result = {
          totalMarks: 0,
          obtainedMarks: 0,
          percentage: 0,
          status: QuizStatus.SUBMITTED,
          individualScore: [],
        };
        const quiz = await this.quizRepository.findOne({
          where: { id: submittedObj.quizId },
          relations: ['questions'],
        });
        if (!quiz) {
          throw new NotFoundException(`Quiz with id ${submittedObj.quizId} not found`);
        }
    
        for (const question of quiz.questions) {
          const questionText = question.text;
          const questionId = question.id;
          const answer = submittedObj.answers[questionId];
          if(answer){
            if(this.compareAnswers(question.correctAnswer,answer.value)){
                result.obtainedMarks += question.marks;
                result.individualScore.push({
                questionText,
                marks: question.marks,
                result: 'correct',
                });
            }
            else{
                result.individualScore.push({
                questionText,
                marks: 0,
                result: 'incorrect',
                });
                }
          }else{
            result.individualScore.push({
              questionText,
              marks: 0,
              result: 'not attempted',
            });
          }
        }
        result.totalMarks = quiz.questions.reduce((sum, question) => sum + question.marks, 0);
        result.percentage = (result.obtainedMarks / result.totalMarks) * 100;
        return result;
      }
    
      async update(id: string, updateDto: UpdateSubmissionDto): Promise<Submission> {
        const submission = await this.findOne(id);
        Object.assign(submission, updateDto); // TODO: Update the submission with the new values
        return this.submissionRepository.save(submission);
      }
    
      async remove(id: string): Promise<{ deleted: boolean }> {
        const submission = await this.findOne(id);
        await this.submissionRepository.remove(submission);
        return { deleted: true };
      }
    
      private compareAnswers(correctAnswer: any, givenAnswer: any): boolean {
        if (typeof correctAnswer === 'boolean' || typeof givenAnswer === 'boolean') {
          return Boolean(correctAnswer) === Boolean(givenAnswer);
        }
        if (!isNaN(correctAnswer) && !isNaN(givenAnswer)) {
          return Number(correctAnswer) === Number(givenAnswer);
        }
        return JSON.stringify(correctAnswer) === JSON.stringify(givenAnswer);
      }
    }


