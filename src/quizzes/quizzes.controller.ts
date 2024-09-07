import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { CreateQuizDto } from './dtos/create-quiz.dto';
import { QuizzesService } from './quizzes.service';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';

@Controller('quizzes')
@UseGuards(AdminGuard)
export class QuizzesController {
  constructor(private quizzesService: QuizzesService) {}
  @Post('/create')
  create(@Body() body: CreateQuizDto, @CurrentUser() user: User) {
    return this.quizzesService.create(body, user);
  }
}
