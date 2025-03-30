import { Type } from "class-transformer";
import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateAnswerInput } from "./create-answer.dto";
import { QuestionType } from "./question-type.enum";


export class CreateQuestionDto {
  @IsEnum(QuestionType)
  questionType: QuestionType;

  @IsString()
  questionText: string;

  @IsArray()
  @IsOptional()
  answerIds?: number[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAnswerInput)
  @IsOptional()
  newAnswers?: CreateAnswerInput[]; 
  }