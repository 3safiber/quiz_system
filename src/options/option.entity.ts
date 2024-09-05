import { Question } from 'src/questions/question.entity';
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

@Entity('options')
export class Option {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Question, { nullable: false })
  @JoinColumn({ name: 'question_id' })
  @Column('uuid', { nullable: false })
  question_id: string;

  @Column('varchar')
  option_text: string;

  @Column('boolean')
  is_correct: boolean;

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
