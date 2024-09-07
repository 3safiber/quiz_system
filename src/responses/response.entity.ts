import { Option } from 'src/options/option.entity';
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

@Entity('responses')
export class Response {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.responses, { onDelete: 'CASCADE' })
  user_id: User;

  @ManyToOne(() => Quiz, (quiz) => quiz.responses, { onDelete: 'CASCADE' })
  quiz_id: Quiz;

  @ManyToOne(() => Question, (question) => question.responses, {
    onDelete: 'CASCADE',
  })
  question_id: Question;

  @ManyToOne(() => Option, (option) => option.responses, {
    onDelete: 'CASCADE',
  })
  selected_option_id: Option;

  @ManyToOne(() => User, (user) => user.createdUsers, { onDelete: 'CASCADE' })
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
