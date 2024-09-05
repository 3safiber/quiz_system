import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Option } from './option.entity';
import { CreateOptionDto } from './dtos/create-option.dto';

@Injectable()
export class OptionsService {
  constructor(@InjectRepository(Option) private repo: Repository<Option>) {}
  create(data: CreateOptionDto, id: string) {
    const option = this.repo.create({
      question_id: data.question_id,
      option_text: data.option_text,
      is_correct: data.is_correct,
    });
    return this.repo.save(option);
  }
}
