import { IsBoolean, IsOptional, IsString } from 'class-validator';
export class UpdateResponseDto {
  @IsString()
  selected_option_id: string;
}
