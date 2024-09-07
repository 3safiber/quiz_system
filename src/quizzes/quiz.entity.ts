import { Question } from 'src/questions/question.entity';
import { Response } from 'src/responses/response.entity';
import { Score } from 'src/scores/score.entity';
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

@Entity('quizzes')
export class Quiz {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  title: string;

  @Column('text')
  description: string;

  @OneToMany(() => Question, (question) => question.quiz_id)
  questions: Question[];

  @OneToMany(() => Response, (response) => response.quiz_id)
  responses: Response[];

  @OneToMany(() => Score, (score) => score.quiz_id)
  scores: Score[];

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
