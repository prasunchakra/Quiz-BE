import { Type } from "class-transformer";
import { 
  IsArray, 
  IsEnum, 
  IsNotEmpty, 
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
export class CreateQuestionDto {
  @IsEnum(QuestionType)
  @IsNotEmpty()
  type: QuestionType;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(2)
  options?: string[];

  @IsNotEmpty()
  correctAnswer: string;

  @IsString()
  @IsNotEmpty()
  section: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  marks: number;

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