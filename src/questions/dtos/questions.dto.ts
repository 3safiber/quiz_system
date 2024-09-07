import { Expose, Transform } from 'class-transformer';
export class QuestionsDto {
  @Transform(({ obj }) => obj.quiz_id.id)
  @Expose()
  quiz_id: string;

  @Expose()
  question_text: string;

  @Expose()
  question_type: string;

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
