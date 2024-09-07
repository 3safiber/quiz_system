import { Expose, Transform } from 'class-transformer';

export class QuizDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Transform(({ obj }) => obj.created_by.id)
  @Expose()
  created_by_id: string;

  @Transform(({ obj }) => obj.updated_by.id)
  @Expose()
  updated_by_id: string;

  @Expose()
  created_at: Date;

  @Expose()
  updated_at: Date;
}
