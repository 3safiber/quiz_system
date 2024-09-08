import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Score } from './score.entity';
import { CreateScoreDto } from './dtos/create-score.dto';
import { User } from 'src/users/user.entity';
import { ResponsesService } from 'src/responses/responses.service';
import { plainToInstance } from 'class-transformer';
import { ResponseDto } from 'src/responses/dtos/response.dto';
import { QuestionsService } from 'src/questions/questions.service';
import { OptionsService } from 'src/options/options.service';
import { QuizzesService } from 'src/quizzes/quizzes.service';
import { UsersService } from 'src/users/users.service';
import { UpdateScoreDto } from './dtos/update-score.dto';

@Injectable()
export class ScoresService {
  constructor(
    @InjectRepository(Score) private repo: Repository<Score>,
    private responsesService: ResponsesService,
    private questionService: QuestionsService,
    private optionService: OptionsService,
    private quizzesService: QuizzesService,
    private userService: UsersService,
  ) {}
  async create(data: CreateScoreDto, createdBy: User) {
    const { quiz_id, user_id } = data;
    const existingScore = await this.repo.findOne({
      where: {
        user_id: { id: user_id },
        quiz_id: { id: quiz_id },
      },
    });
    if (existingScore) {
      throw new BadRequestException(
        "you can't duplicate user score for same quiz ",
      );
    }
    const quiz = await this.quizzesService.find(quiz_id, 'id', {
      relations: ['questions'],
    });
    const user = await this.userService.find(user_id);
    const responses = await this.responsesService.fetchAll({
      where: { user_id: { id: user_id }, quiz_id: { id: quiz_id } },
    });
    const responseObjects = plainToInstance(ResponseDto, responses);
    const totalQuestions = quiz.questions.length;
    let correctAnswers = 0;

    for (const response of responseObjects) {
      const question = await this.questionService.find(response.question_id);
      if (question.quiz_id.id !== quiz_id) {
        throw new BadRequestException(
          'Question does not belong to the provided quiz',
        );
      }
      const selectedOption = await this.optionService.find(
        response.selected_option_id,
      );
      if (selectedOption.is_correct) {
        correctAnswers++;
      }
    }
    const total = (correctAnswers / totalQuestions) * 100;
    const score = this.repo.create({
      user_id: user,
      quiz_id: quiz,
      score: total,
      created_by: createdBy,
      updated_by: createdBy,
    });
    return this.repo.save(score);
  }
  async update(id: string, data: UpdateScoreDto, user: User) {
    const { score } = data;
    const scoreDB = await this.find(id);
    if (!scoreDB) {
      throw new NotFoundException('score not found');
    }
    scoreDB.score = score;
    return this.repo.save(scoreDB);
  }
  async remove(id) {
    const score = await this.find(id);
    if (!score) {
      throw new NotFoundException('score not found!!!');
    }
    return this.repo.remove(score);
  }
  find(value: string, field: string = 'id', options?: any) {
    return this.repo.findOne({
      where: { [field]: value },
      relations: ['quiz_id', 'user_id'],
      ...options,
    });
  }
  fetchAll() {
    return this.repo.find({
      relations: ['quiz_id', 'user_id'],
    });
  }
}
