import { Expose, Transform } from 'class-transformer';
export class QuestionsDto {
  @Expose()
  id: string;

  @Transform(({ obj }) => obj.quiz_id.id)
  @Expose()
  quiz_id: string;

  @Expose()
  question_text: string;

  @Expose()
  question_type: string;

  @Transform(({ obj }) => obj.created_by?.id)
  @Expose()
  created_by: string;

  @Transform(({ obj }) => obj.updated_by?.id)
  @Expose()
  updated_by: string;

  @Expose()
  created_at: Date;

  @Expose()
  updated_at: Date;
}
