import { Expose, Transform } from 'class-transformer';
export class ScoreDto {
  @Expose()
  id: string;

  @Transform(({ obj }) => obj.user_id?.id)
  @Expose()
  user_id: string;

  @Transform(({ obj }) => obj.quiz_id?.id)
  @Expose()
  quiz_id: string;

  @Expose()
  score: number;
}
