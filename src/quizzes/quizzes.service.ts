import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuizDto } from './dtos/create-quiz.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './quiz.entity';
import { User } from 'src/users/user.entity';
import { UpdateQuizDto } from './dtos/update-quiz.dto';

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
  find(value: string, field: string = 'id', options?: any) {
    return this.repo.findOne({
      where: { [field]: value },
      relations: ['created_by', 'updated_by'],
      ...options,
    });
  }
  fetchAll() {
    return this.repo.find({ relations: ['created_by', 'updated_by'] });
  }
  async update(id: string, data: UpdateQuizDto, user: User) {
    const { title, description } = data;
    const quiz = await this.find(id);
    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }
    quiz.title = title ?? quiz.title;
    quiz.description = description ?? quiz.description;
    quiz.updated_by = user;
    await this.repo.save(quiz);
    return quiz;
  }
  async delete(id: string) {
    const quiz = await this.find(id);
    if (!quiz) {
      throw new NotFoundException('quiz not found');
    }
    return this.repo.remove(quiz);
  }
}
