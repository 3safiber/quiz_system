import { Option } from 'src/options/option.entity';
import { Quiz } from 'src/quizzes/quiz.entity';
import { Response } from 'src/responses/response.entity';
import { User } from 'src/users/user.entity';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

export enum Type {
  multiple_choice = 'multiple_choice',
  true_false = 'true_false',
}

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Quiz, (quiz) => quiz.questions)
  quiz_id: Quiz;

  @Column('text')
  question_text: string;

  @Column({
    type: 'enum',
    enum: Type,
  })
  question_type: Type;

  @OneToMany(() => Option, (option) => option.question_id)
  options: Option[];

  @OneToMany(() => Response, (response) => response.question_id)
  responses: Response[];

  @ManyToOne(() => User, (user) => user.createdUsers)
  @JoinColumn({ name: 'created_by' })
  created_by: User;

  @ManyToOne(() => User, (user) => user.updatedUsers)
  @JoinColumn({ name: 'updated_by' })
  updated_by: User;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
