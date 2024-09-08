import { Response } from 'src/responses/response.entity';
import { Score } from 'src/scores/score.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

export enum Role {
  student = 'student',
  admin = 'admin',
}

@Entity('users')
@Unique(['username'])
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  username: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
  })
  role: Role;

  @OneToMany(() => Response, (response) => response.user_id, { cascade: true })
  responses: Response[];

  @OneToMany(() => Score, (score) => score.quiz_id, { cascade: true })
  scores: Score[];

  @OneToMany(() => User, (user) => user.created_by, { cascade: true })
  createdUsers: User[];

  @OneToMany(() => User, (user) => user.updated_by)
  updatedUsers: User[];

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
