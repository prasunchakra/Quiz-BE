import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsArray, ValidateNested, IsEnum, IsNumber, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { QuizStatus } from '../entities/submission.entity';

class AnswerDto {
  @IsUUID()
  @IsNotEmpty()
  questionId: string;

  @IsNotEmpty()
  answer: any; // The actual answer content
}

export class CreateSubmissionDto {
  @ApiProperty({ description: 'Quiz ID' })
  @IsUUID()
  @IsNotEmpty()
  quizId: string;

  @ApiProperty({ description: 'Array of answers' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers: AnswerDto[];

  @ApiProperty({ 
    enum: QuizStatus,
    default: QuizStatus.STARTED,
    description: 'Submission status'
  })
  @IsEnum(QuizStatus)
  status: QuizStatus = QuizStatus.STARTED;

  @ApiProperty({ description: 'User ID' })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

}