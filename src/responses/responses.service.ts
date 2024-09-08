import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from './response.entity';
import { UpdateResponseDto } from './dtos/update-response.dto';
import { User } from 'src/users/user.entity';
import { CreateResponseDto } from './dtos/create-response.dto';
import { QuizzesService } from 'src/quizzes/quizzes.service';
import { OptionsService } from 'src/options/options.service';
import { QuestionsService } from 'src/questions/questions.service';

@Injectable()
export class ResponsesService {
  constructor(
    @InjectRepository(Response) private repo: Repository<Response>,
    private quizService: QuizzesService,
    private questionService: QuestionsService,
    private optionService: OptionsService,
  ) {}

  async create(data: CreateResponseDto, user: User) {
    const { question_id, quiz_id, selected_option_id } = data;

    const existingResponse = await this.repo.findOne({
      where: {
        user_id: { id: user.id },
        quiz_id: { id: quiz_id },
        question_id: { id: question_id },
      },
    });

    if (existingResponse) {
      throw new BadRequestException(
        'Response already exists for this user, quiz, and question',
      );
    }
    const option = await this.optionService.find(selected_option_id);
    if (!option) {
      throw new NotFoundException('Option Not Found');
    }
    if (option.question_id.id !== question_id) {
      throw new NotFoundException('Bad ids for question');
    }
    const question = await this.questionService.find(question_id);
    if (question.quiz_id.id !== quiz_id) {
      throw new NotFoundException('Bad ids for quiz');
    }
    const quiz = await this.quizService.find(quiz_id);
    if (!quiz) {
      throw new BadRequestException('Invalid Quiz ID');
    }

    const response = this.repo.create({
      user_id: user,
      quiz_id: quiz,
      question_id: question,
      selected_option_id: option,
      created_by: user,
      updated_by: user,
    });
    return this.repo.save(response);
  }

  async update(updatedId: string, data: UpdateResponseDto, user: User) {
    const { selected_option_id } = data;
    const response = await this.find(updatedId);
    if (!response) {
      throw new NotFoundException('Response not found');
    }
    const option = await this.optionService.find(selected_option_id);
    console.log(response.question_id.id);
    console.log(option.question_id.id);
    if (option.question_id.id !== response.question_id.id) {
      throw new BadRequestException('this option is not in the question');
    }
    response.selected_option_id = option;
    return this.repo.save(response);
  }
  find(value: string, field: string = 'id') {
    return this.repo.findOne({
      where: { [field]: value },
      relations: ['user_id', 'quiz_id', 'question_id', 'selected_option_id'],
    });
  }
  fetchAll(options?: any) {
    return this.repo.find({
      ...options,
      relations: ['user_id', 'quiz_id', 'question_id', 'selected_option_id'],
    });
  }
  async remove(id: string) {
    const response = await this.find(id);
    if (!response) {
      throw new NotFoundException('Response not found!!!');
    }
    return this.repo.remove(response);
  }
}
