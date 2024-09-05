import { Injectable } from '@nestjs/common';
import { Question } from './question.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class QuestionsService {
  constructor(@InjectRepository(Question) private repo: Repository<Question>) {}
}
