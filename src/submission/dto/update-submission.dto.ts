import { OmitType, PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsNumber, Min, Max } from 'class-validator';
import { CreateSubmissionDto } from './create-submission.dto';
import { QuizStatus } from '../entities/submission.entity';

export class UpdateSubmissionDto extends PartialType(
    OmitType(CreateSubmissionDto, ['quizId'] as const)
) {
  @ApiPropertyOptional({ 
    enum: QuizStatus,
    description: 'Updated submission status'
  })
  @IsEnum(QuizStatus)
  @IsOptional()
  status?: QuizStatus;

  @ApiPropertyOptional({ 
    description: 'Score percentage',
    minimum: 0,
    maximum: 100
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(100)
  score?: number;
}
  