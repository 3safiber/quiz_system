import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
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
