import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Quiz } from '../../quizzes/entities/quiz.entity';

export enum QuizStatus {
  STARTED = 'started',      // initial state
  COMPLETED = 'completed',  // finished but not submitted
  SUBMITTED = 'submitted',  // submitted for review
  REVIEWED = 'reviewed',    // reviewed but not graded
  PASSED = 'passed',        // graded and passed
  FAILED = 'failed'         // graded and failed
}

@Entity('submissions')
export class Submission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Quiz, quiz => quiz.submissions, { nullable: false })
  quiz: Quiz;

  @Column({ nullable: true })
  userId: string;

  @Column('json', { nullable: false })
  answers: { questionId: string; answer: any }[];

  @Column({ type: 'integer', nullable: true })
  score: number;

  @Column({ 
    type: 'enum', 
    enum: QuizStatus, 
    default: QuizStatus.STARTED 
  })
  status: QuizStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
