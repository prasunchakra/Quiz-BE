import { Type } from "class-transformer";
import { 
  IsArray, 
  IsEnum, 
  IsNumber, 
  IsOptional, 
  IsString, 
  IsUUID,
  Min,
  ArrayMinSize,
} from "class-validator";
import { QuestionType } from "../enums/question-type.enum";
import { Status } from "../../common/enum/status.enum";
import { Difficulty } from "../../common/enum/difficulty.enum";
export class UpdateQuestionDto {
  @IsOptional()
  @IsEnum(QuestionType)
  type?: QuestionType;

  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(2)
  options?: string[];

  @IsOptional()
  correctAnswer?: string;

  @IsOptional()
  @IsString()
  section?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  marks?: number;

  @IsOptional()
  @Type(() => Object)
  metadata?: Record<string, any>;

  @IsOptional()
  @IsEnum(Difficulty)
  difficulty?: Difficulty;

  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @IsOptional()
  @IsString()
  explanation?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsString()
  wrongAnswerFeedback?: string;

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  quizIds?: string[];
}