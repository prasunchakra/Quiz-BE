import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';

@Controller('quizzes')
export class QuizzesController {
    constructor(private readonly quizzesService: QuizzesService) {}
    @Get()
    findAll() {
      return this.quizzesService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.quizzesService.findOne(+id);
    }
  
    @Post()
    create(@Body() createQuizDto: any) {
      return this.quizzesService.create(createQuizDto);
    }
}
