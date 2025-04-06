import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Quiz } from '../../quizzes/entities/quiz.entity';
import { QuestionType } from '../enums/question-type.enum';
import { Status } from '../../common/enum/status.enum';
import { Difficulty } from '../../common/enum/difficulty.enum'; 


@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: QuestionType,
    nullable: false,
  })
  type: QuestionType;

  @Column({ type: 'text', nullable: false })
  text: string;

  @Column('simple-array', { nullable: true })
  options: string[];

  @Column({ type: 'text', nullable: false })
  correctAnswer: string;

  @Column({ nullable: false })
  section: string;

  @Column({ type: 'int', nullable: false })
  marks: number;

  @Column('json', { nullable: true })
  metadata: Record<string, any>;

  @Column({
    type: 'enum',
    enum: Difficulty,
    default: Difficulty.Medium,
    nullable: false
  })
  difficulty: Difficulty;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.Draft,
    nullable: false
  })
  status: Status;

  @Column({ type: 'text', nullable: true })
  explanation: string;

  @Column('simple-array', { nullable: true })
  tags: string[];

  @Column('text', { nullable: true })
  wrongAnswerFeedback: string;

  @ManyToMany(() => Quiz, quiz => quiz.questions)
  @JoinTable({
    name: 'question_quiz',
    joinColumn: {
      name: 'question_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'quiz_id',
      referencedColumnName: 'id',
    },
  })
  quizzes: Quiz[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}