import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Quiz } from '../../quizzes/entities/quiz.entity';
import { Answer } from './answer.entity';
import { QuestionType } from '../dto/question-type.enum';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  questionText: string;

  @Column({
    type: 'enum',
    enum: QuestionType,
  })
  questionType: QuestionType;

  @ManyToMany(() => Quiz, (quiz) => quiz.questions)
  quizzes: Quiz[];

  @ManyToMany(() => Answer, { cascade: true })
  @JoinTable()
  answers: Answer[];
}