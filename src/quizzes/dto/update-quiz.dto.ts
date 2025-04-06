import { PartialType } from '@nestjs/mapped-types';
import { CreateQuizDto } from './create-quiz.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateQuizDto extends PartialType(CreateQuizDto) {

    @ApiProperty({ 
        description: 'Version of the quiz for optimistic locking',
        type: 'number'
      })
      @IsOptional()
      version?: number;
}