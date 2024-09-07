import { Body, Controller, Post, Session } from '@nestjs/common';
import { OptionsService } from './options.service';
import { CreateOptionDto } from './dtos/create-option.dto';

@Controller('options')
export class OptionsController {
  constructor(private optionsService: OptionsService) {}
  // @Post('/create')
  // create(@Body() body: CreateOptionDto, @Session() session: any) {
  //   return this.optionsService.create(body, session.userId);
  // }
}
