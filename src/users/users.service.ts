import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './entities/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './entities/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
      ) {}
    
      async create(createUserDto: CreateUserDto): Promise<User> {
        const user = this.userRepository.create(createUserDto);
        return this.userRepository.save(user);
      }
      
      async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
        const user = await this.findOne(id);
        if (!user) {
          throw new NotFoundException('User not found');
        }
        await this.userRepository.update(id, {
            ...updateUserDto as Partial<User>
          });
        return this.findOne(id);
      }

      async findAll(): Promise<User[]> {
        return this.userRepository.find();
      }
    
      async findOne(id: number): Promise<User | null> {
        return this.userRepository.findOne({ where: { id } });
      }

      async findByUsername(username: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { username } });
      } 
}
