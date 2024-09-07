import { Expose, Transform } from 'class-transformer';

export class ReturnQuizDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  created_by_id: string;

  @Expose()
  updated_by_id: string;

  @Expose()
  created_at: Date;

  @Expose()
  updated_at: Date;
}
