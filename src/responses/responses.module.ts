import { Module } from '@nestjs/common';
import { ResponsesController } from './responses.controller';
import { ResponsesService } from './responses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Response } from './response.entity';
import { QuizzesModule } from 'src/quizzes/quizzes.module';
import { QuestionsModule } from 'src/questions/questions.module';
import { OptionsModule } from 'src/options/options.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Response]),
    QuizzesModule,
    QuestionsModule,
    OptionsModule,
  ],
  controllers: [ResponsesController],
  providers: [ResponsesService],
  exports: [ResponsesService],
})
export class ResponsesModule {}
