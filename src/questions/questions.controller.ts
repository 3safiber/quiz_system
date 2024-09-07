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
import { QuestionsService } from './questions.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateQuestionsDto } from './dtos/create-questions.dto';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { QuestionsDto } from './dtos/questions.dto';
import { User } from 'src/users/user.entity';
import { AdminGuard } from 'src/guards/admin.guard';
import { ReturnQuestionDto } from './dtos/return-question.dto';
import { UpdateQuestionDto } from './dtos/update-question.dto';

@Controller('questions')
@UseGuards(AdminGuard)
export class QuestionsController {
  constructor(private questionsService: QuestionsService) {}

  @Post('/create')
  @Serialize(QuestionsDto)
  create(@Body() body: CreateQuestionsDto, @CurrentUser() user: User) {
    return this.questionsService.create(body, user);
  }

  @Patch('/:id')
  @Serialize(ReturnQuestionDto)
  update(
    @Param('id') id: string,
    @Body() body: UpdateQuestionDto,
    @CurrentUser() user: User,
  ) {
    return this.questionsService.update(id, body, user);
  }
  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.questionsService.delete(id);
  }
  @Get('/:id')
  fetchAll(@Param('id') id: string) {
    return this.questionsService.fetchQuizQuestions(id);
  }
}
