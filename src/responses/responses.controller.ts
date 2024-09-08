import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ResponsesService } from './responses.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { ResponseDto } from './dtos/response.dto';
import { CreateResponseDto } from './dtos/create-response.dto';
import { UpdateResponseDto } from './dtos/update-response.dto';

@Controller('responses')
@Serialize(ResponseDto)
export class ResponsesController {
  constructor(private responsesService: ResponsesService) {}

  @Post('/create')
  create(@Body() body: CreateResponseDto, @CurrentUser() user: User) {
    return this.responsesService.create(body, user);
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateResponseDto,
    @CurrentUser() user: User,
  ) {
    return this.responsesService.update(id, body, user);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.responsesService.remove(id);
  }

  @Get()
  fetchAll() {
    return this.responsesService.fetchAll();
  }
}
