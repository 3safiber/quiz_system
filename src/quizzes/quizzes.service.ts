import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dtos/create-quiz.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './quiz.entity';

@Injectable()
export class QuizzesService {
  constructor(@InjectRepository(Quiz) private repo: Repository<Quiz>) {}

  create(data: CreateQuizDto, id: string) {
    const quiz = this.repo.create({
      title: data.title,
      description: data.description,
      created_by: id,
      updated_by: id,
    });
    return this.repo.save(quiz);
  }
}
