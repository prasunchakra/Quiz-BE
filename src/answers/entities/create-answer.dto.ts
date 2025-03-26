import { IsNotEmpty, IsString } from "class-validator";

export class CreateAnswerDto {
    @IsString()
    @IsNotEmpty()
    answerText: string;
  
    @IsNotEmpty()
    isCorrect: boolean;
  }