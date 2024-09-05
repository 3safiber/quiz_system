import {
  Body,
  Controller,
  Get,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { CreateQuizDto } from './dtos/create-quiz.dto';
import { QuizzesService } from './quizzes.service';

@Controller('quizzes')
@UseGuards(AdminGuard)
export class QuizzesController {
  constructor(private quizzesService: QuizzesService) {}
  @Post('/create')
  create(@Body() body: CreateQuizDto, @Session() session: any) {
    return this.quizzesService.create(body, session.userId);
  }
}
