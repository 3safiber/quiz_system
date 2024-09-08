import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Option } from './option.entity';
import { CreateOptionDto } from './dtos/create-option.dto';
import { User } from 'src/users/user.entity';
import { QuestionsService } from 'src/questions/questions.service';
import { UpdateOptionDto } from './dtos/update-option.dto';

@Injectable()
export class OptionsService {
  constructor(
    @InjectRepository(Option) private repo: Repository<Option>,
    private questionService: QuestionsService,
  ) {}
  async create(data: CreateOptionDto, user: User) {
    const { is_correct, option_text, question_id } = data;
    const question = await this.questionService.find(question_id);
    if (!question) {
      throw new BadRequestException('invalid question ID');
    }
    const option = this.repo.create({
      question_id: question,
      option_text: option_text,
      is_correct: is_correct,
      created_by: user,
      updated_by: user,
    });
    return this.repo.save(option);
  }
  async update(updatedId: string, data: UpdateOptionDto, user: User) {
    const { is_correct, option_text } = data;
    const option = await this.find(updatedId);
    if (!option) {
      throw new NotFoundException('Option not found');
    }
    if (typeof is_correct === 'boolean') {
      option.is_correct = is_correct;
    }
    option.option_text = option_text ?? option.option_text;
    option.updated_by = user;
    return this.repo.save(option);
  }
  find(value: string, field: string = 'id', options?: any) {
    return this.repo.findOne({
      where: { [field]: value },
      relations: ['question_id', 'created_by', 'updated_by'],
      ...options,
    });
  }
  fetchAll() {
    return this.repo.find({
      relations: ['question_id', 'created_by', 'updated_by'],
    });
  }
  async remove(id: string) {
    const option = await this.find(id);
    if (!option) {
      throw new NotFoundException('Option not found!!!');
    }
    return this.repo.remove(option);
  }
}
