import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { 
  IsString, 
  IsOptional, 
  IsArray, 
  IsInt, 
  IsBoolean, 
  IsEnum, 
  IsUUID, 
  Min, 
  MaxLength, 
  MinLength 
} from 'class-validator';
import { Status } from 'src/common/enum/status.enum';


export class CreateQuizDto {
  @ApiProperty({ description: 'Title of the quiz' })
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  title: string;

  @ApiPropertyOptional({ description: 'Description of the quiz' })
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  description?: string;

  @ApiPropertyOptional({ 
    enum: Status,
    default: Status.Draft
  })
  @IsEnum(Status)
  @IsOptional()
  status?: Status = Status.Draft;

  @ApiPropertyOptional({ 
    description: 'Whether the quiz is public',
    default: false
  })
  @IsBoolean()
  @IsOptional()
  isPublic?: boolean = false;

  @ApiPropertyOptional({ 
    description: 'Time limit in minutes',
    minimum: 1
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  timeLimit?: number;

  @ApiPropertyOptional({ 
    description: 'Passing score percentage',
    minimum: 0,
    maximum: 100
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  passingScore?: number;

  @ApiPropertyOptional({ 
    description: 'Array of question IDs',
    type: [String]
  })
  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
  questionIds?: string[];
}