import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './entities/create-user.dto';
import { UpdateUserDto } from './entities/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
}
