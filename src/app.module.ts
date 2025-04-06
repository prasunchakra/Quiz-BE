import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Quiz } from './quizzes/entities/quiz.entity';
import { Question } from './questions/entities/question.entity';
import { QuizzesModule } from './quizzes/quizzes.module';
import { QuestionsModule } from './questions/questions.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SubmissionModule } from './submission/submission.module';
import { Submission } from './submission/entities/submission.entity';
@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'quizC',
    entities: [ Quiz, Question, User, Submission],
    synchronize: true, 
  }), QuizzesModule, QuestionsModule, UsersModule, AuthModule, SubmissionModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
