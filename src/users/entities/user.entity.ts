import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';
import { IsEnum } from 'class-validator';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  SUPER_ADMIN = 'super-admin',
  VIEWER = 'viewer',
  ROLE_X = 'role-x',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  @IsEnum(UserRole)
  role: UserRole;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true, unique: true })
  email: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
