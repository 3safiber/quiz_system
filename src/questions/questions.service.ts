import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Question, Type } from './question.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuestionsDto } from './dtos/create-questions.dto';
import { User } from 'src/users/user.entity';
import { QuizzesService } from 'src/quizzes/quizzes.service';
import { UpdateQuestionDto } from './dtos/update-question.dto';
@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question) private repo: Repository<Question>,
    private quizzesService: QuizzesService,
  ) {}

  async create(data: CreateQuestionsDto, user: User) {
    const { quiz_id, question_type, question_text } = data;
    if (!quiz_id) {
      throw new BadRequestException('Please enter a quiz_id.');
    }
    const quiz = await this.quizzesService.find(quiz_id);
    console.log(quiz);
    if (!quiz) {
      throw new NotFoundException(
        'Invalid quiz ID provided. Please enter a valid quiz ID that exists.',
      );
    }
    const type = Type[question_type as keyof typeof Type];
    if (!type) {
      throw new BadRequestException(
        "Invalid question type provided. Please select either 'true_false' or 'multiple_choice'.",
      );
    }
    const question = this.repo.create({
      question_text: question_text,
      quiz_id: quiz,
      question_type: type,
      created_by: user,
      updated_by: user,
    });
    return this.repo.save(question);
  }

  fetchQuizQuestions(id: string) {
    return this.repo.find({
      where: { quiz_id: { id: id } }, // Adjust this based on your entity relationship
    });
  }

  async update(id: string, data: UpdateQuestionDto, user: User) {
    const { question_text, question_type } = data;
    const question = await this.repo.findOneBy({ id: id });
    let type: Type;
    if (question_type) {
      type = Type[question_type as keyof typeof Type];
      if (!type) {
        throw new BadRequestException(
          "Invalid question type provided. Please select either 'true_false' or 'multiple_choice'.",
        );
      }
    }
    if (!question) {
      throw new NotFoundException('Question not found');
    }
    question.question_type = type ?? question.question_type;
    question.question_text = question_text ?? question.question_text;
    question.updated_by = user;
    await this.repo.save(question);
    return question;
  }
  async delete(id: string) {
    const question = await this.repo.findOneBy({ id: id });
    if (!question) {
      throw new NotFoundException('quiz not found');
    }
    return this.repo.remove(question);
  }
}
