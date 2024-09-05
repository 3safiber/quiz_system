import { Module } from '@nestjs/common';
import { ResponsesController } from './responses.controller';
import { ResponsesService } from './responses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Response } from './response.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Response])],
  controllers: [ResponsesController],
  providers: [ResponsesService],
})
export class ResponsesModule {}
