import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  Query, 
  // UseGuards,
  ParseUUIDPipe,
  HttpStatus
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Question } from './entities/question.entity';
// import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PaginationDto } from '../common/dto/pagination.dto';

@ApiTags('questions')
@ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new question' })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'Question created successfully',
    type: Question 
  })
  create(@Body() createQuestionDto: CreateQuestionDto): Promise<Question> {
    return this.questionsService.create(createQuestionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all questions with pagination' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Returns paginated questions',
    type: [Question] 
  })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.questionsService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a question by id' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Returns a question',
    type: Question 
  })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.questionsService.findOne(id);
  }

  @Get('quiz/:quizId')
  @ApiOperation({ summary: 'Get all questions for a specific quiz' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Returns questions for a quiz',
    type: [Question] 
  })
  findByQuiz(@Param('quizId', ParseUUIDPipe) quizId: string) {
    return this.questionsService.findByQuiz(quizId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a question' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Question updated successfully',
    type: Question 
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionsService.update(id, updateQuestionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a question' })
  @ApiResponse({ 
    status: HttpStatus.NO_CONTENT, 
    description: 'Question deleted successfully' 
  })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.questionsService.remove(id);
  }

  // @Post('bulk')
  // @ApiOperation({ summary: 'Create multiple questions' })
  // @ApiResponse({ 
  //   status: HttpStatus.CREATED, 
  //   description: 'Questions created successfully',
  //   type: [Question] 
  // })
  // createBulk(@Body() createQuestionDtos: CreateQuestionDto[]) {
  //   return this.questionsService.createBulk(createQuestionDtos);
  // }

  @Get('section/:section')
  @ApiOperation({ summary: 'Get questions by section' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Returns questions for a section',
    type: [Question] 
  })
  findBySection(
    @Param('section') section: string,
    @Query() paginationDto: PaginationDto
  ) {
    // TODO: Implement section filtering
    // return this.questionsService.findBySection(section, paginationDto);
  }
}
