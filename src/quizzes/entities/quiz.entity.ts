import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Question } from '../../questions/entities/question.entity';
import { User } from 'src/users/entities/user.entity';
import { Status } from 'src/common/enum/status.enum';
import { Submission } from 'src/submission/entities/submission.entity';

@Entity('quizzes')
export class Quiz {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ 
    type: 'enum', 
    enum: Status,
    default: Status.Draft
  })
  status: Status;

  @Column({ type: 'boolean', default: false })
  isPublic: boolean;

  @Column({ type: 'integer', nullable: true })
  timeLimit: number;

  @Column({ type: 'integer', nullable: true })
  passingScore: number;

  @ManyToMany(() => Question, question => question.quizzes, { cascade: true })
  questions: Question[];

  @OneToMany(() => Submission, submission => submission.quiz, { cascade: true })
  submissions: Submission[];

  @ManyToOne(() => User)
  createdBy: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
