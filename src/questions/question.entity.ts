import { Quiz } from 'src/quizzes/quiz.entity';
import { User } from 'src/users/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

export enum Type {
  multiple_choice = 'multiple_choice',
  true_false = 'true_false',
}

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Quiz, { nullable: false })
  @JoinColumn({ name: 'quiz_id' })
  @Column('uuid', { nullable: false })
  quiz_id: string;

  @Column('text')
  question_text: string;

  @Column({
    type: 'enum',
    enum: Type,
  })
  question_type: Type;

  /***
   *
   *  for all table we use created at ,
   *  created by, updated at ,updated by
   *  columns.
   *
   */
  @CreateDateColumn({
    type: 'timestamp',
  })
  created_at: Date;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'created_by' })
  @Column('uuid', { nullable: true })
  created_by: string;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updated_at: Date;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'updated_by' })
  @Column('uuid', { nullable: true })
  updated_by: string;
}
