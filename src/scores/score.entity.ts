import { Question } from 'src/questions/question.entity';
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

@Entity('scores')
export class Score {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.scores)
  user_id: User;

  @ManyToOne(() => Quiz, (quiz) => quiz.scores)
  quiz_id: Quiz;

  @Column('int')
  score: number;

  /***
   *
   *  for all table we use created at ,
   *  created by, updated at ,updated by
   *  columns.
   *
   */

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
