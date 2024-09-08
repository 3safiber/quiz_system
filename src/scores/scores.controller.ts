import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ScoresService } from './scores.service';
import { CreateScoreDto } from './dtos/create-score.dto';
import { UpdateScoreDto } from './dtos/update-score.dto';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ScoreDto } from './dtos/score.dto';

@Controller('scores')
@Serialize(ScoreDto)
export class ScoresController {
  constructor(private scoresService: ScoresService) {}
  @Post('/create')
  create(@Body() body: CreateScoreDto, @CurrentUser() user: User) {
    return this.scoresService.create(body, user);
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateScoreDto,
    @CurrentUser() user: User,
  ) {
    return this.scoresService.update(id, body, user);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.scoresService.remove(id);
  }

  @Get()
  fetchAll() {
    return this.scoresService.fetchAll();
  }
}
