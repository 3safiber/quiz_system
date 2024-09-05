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

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  @Column('uuid', { nullable: false })
  user_id: string;

  @ManyToOne(() => Quiz, { nullable: false })
  @JoinColumn({ name: 'quiz_id' })
  @Column('uuid', { nullable: false })
  quiz_id: string;

  @Column('int')
  score: number;

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
