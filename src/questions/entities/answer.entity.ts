import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Question } from './question.entity';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  answerText: string;

  @Column()
  isCorrect: boolean;

  @ManyToMany(() => Question, (question) => question.answers)
  questions: Question[];
}