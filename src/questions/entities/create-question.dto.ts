import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";
    
import { CreateAnswerDto } from "src/answers/entities/create-answer.dto";

export class CreateQuestionDto {
    @IsString()
    @IsNotEmpty()
    questionText: string;
  
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateAnswerDto)
    answers: CreateAnswerDto[];
  }