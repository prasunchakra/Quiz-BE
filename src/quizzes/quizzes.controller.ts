import { Controller, Get, Param, Post, Body, ParseIntPipe, Delete } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './entities/create-quiz.dto';

@Controller('quizzes')
export class QuizzesController {
    constructor(private readonly quizzesService: QuizzesService) {}
    @Get()
    findAll() {
      return this.quizzesService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.quizzesService.findOne(id);
    }
  
    @Post()
    create(@Body() dto: CreateQuizDto) {
      return this.quizzesService.create(dto);
    }
  
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
      return this.quizzesService.remove(id);
    }
}
