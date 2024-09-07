import { Question } from 'src/questions/question.entity';
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

@Entity('options')
export class Option {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Question, (question) => question.options)
  question_id: Question;

  @Column('varchar')
  option_text: string;

  @Column('boolean')
  is_correct: boolean;

  @OneToMany(() => Response, (response) => response.selected_option_id)
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
