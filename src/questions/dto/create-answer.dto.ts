import { IsString } from "class-validator";

export class CreateAnswerInput {
    @IsString()
    answerText: string;
  
    isCorrect: boolean;
  }