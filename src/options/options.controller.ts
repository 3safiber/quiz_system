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
import { OptionsService } from './options.service';
import { CreateOptionDto } from './dtos/create-option.dto';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { AdminGuard } from 'src/guards/admin.guard';
import { UpdateOptionDto } from './dtos/update-option.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { OptionDto } from './dtos/option.dto';

@Controller('options')
@UseGuards(AdminGuard)
@Serialize(OptionDto)
export class OptionsController {
  constructor(private optionsService: OptionsService) {}

  @Post('/create')
  create(@Body() body: CreateOptionDto, @CurrentUser() user: User) {
    return this.optionsService.create(body, user);
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateOptionDto,
    @CurrentUser() user: User,
  ) {
    return this.optionsService.update(id, body, user);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.optionsService.remove(id);
  }

  @Get()
  fetchAll() {
    return this.optionsService.fetchAll();
  }
}
