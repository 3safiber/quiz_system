import { IsString, IsOptional } from 'class-validator';

export class UpdateQuestionDto {
  @IsString()
  @IsOptional()
  question_text: string;

  @IsString()
  @IsOptional()
  question_type: string;
}
