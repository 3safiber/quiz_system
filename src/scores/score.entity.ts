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
  Unique,
} from 'typeorm';

@Entity('scores')
@Unique(['user_id', 'quiz_id'])
export class Score {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.scores, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user_id: User;

  @ManyToOne(() => Quiz, (quiz) => quiz.scores, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'quiz_id' })
  quiz_id: Quiz;

  @Column('int')
  score: number;

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
