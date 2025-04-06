import { Controller, Delete, Param, Post, Put, Get, Body } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { Submission } from './entities/submission.entity';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';

@Controller('submission')
export class SubmissionController {
    constructor(private readonly submissionService: SubmissionService) {}

  @Get()
  async getAllSubmissions(): Promise<Submission[]> {
    return await this.submissionService.findAll();
  }

  @Get(':id')
  async getSubmissionById(@Param('id') id: string): Promise<Submission> {
    return await this.submissionService.findOne(id);
  }

  @Post()
  async createSubmission(@Body() createDto: any): Promise<any> {
    return await this.submissionService.create(createDto);
  }

  @Put(':id')
  async updateSubmission(
    @Param('id') id: string,
    @Body() updateDto: UpdateSubmissionDto,
  ): Promise<Submission> {
    return await this.submissionService.update(id, updateDto);
  }

  @Delete(':id')
  async deleteSubmission(@Param('id') id: string): Promise<{ deleted: boolean }> {
    return await this.submissionService.remove(id);
  }
}
