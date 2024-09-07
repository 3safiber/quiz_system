import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { CreateQuizDto } from './dtos/create-quiz.dto';
import { QuizzesService } from './quizzes.service';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { QuizDto } from './dtos/quiz.dto';
import { UpdateQuizDto } from './dtos/update-quiz.dto';
import { ReturnQuizDto } from './dtos/return-quiz.dto';

@Controller('quizzes')
@UseGuards(AdminGuard)
export class QuizzesController {
  constructor(private quizzesService: QuizzesService) {}
  @Get()
  @Serialize(ReturnQuizDto)
  fetchAll() {
    return this.quizzesService.fetchAll();
  }
  @Post('/create')
  @Serialize(QuizDto)
  create(@Body() body: CreateQuizDto, @CurrentUser() user: User) {
    return this.quizzesService.create(body, user);
  }
  @Patch('/:id')
  @Serialize(ReturnQuizDto)
  update(
    @Param('id') id: string,
    @Body() body: UpdateQuizDto,
    @CurrentUser() user: User,
  ) {
    return this.quizzesService.update(id, body, user);
  }
  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.quizzesService.delete(id);
  }
}
