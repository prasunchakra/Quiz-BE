import { Controller, Get, Param, Post, Body, ParseIntPipe, Delete, Put } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { Quiz } from './entities/quiz.entity';
import { UpdateQuizDto } from './dto/update-quiz.dto';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizService: QuizzesService) {}

  @Get()
  async getAllQuizzes(): Promise<Quiz[]> {
    return await this.quizService.findAll();
  }

  @Get(':id')
  async getQuizById(@Param('id') id: string): Promise<Quiz> {
    return await this.quizService.findOne(id);
  }

  @Post()
  async createQuiz(@Body() createQuizDto: CreateQuizDto): Promise<Quiz> {
    return await this.quizService.create(createQuizDto);
  }

  @Put(':id')
  async updateQuiz(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto): Promise<Quiz> {
    return await this.quizService.update(id, updateQuizDto);
  }

  @Delete(':id')
  async deleteQuiz(@Param('id') id: string): Promise<{ deleted: boolean }> {
    return await this.quizService.remove(id);
  }
}
