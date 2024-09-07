import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dtos/create-quiz.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './quiz.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class QuizzesService {
  constructor(@InjectRepository(Quiz) private repo: Repository<Quiz>) {}

  create(data: CreateQuizDto, user: User) {
    const quiz = this.repo.create({
      title: data.title,
      description: data.description,
      created_by: user,
      updated_by: user,
    });
    return this.repo.save(quiz);
  }
}
