import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './question.entity';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { QuizzesModule } from 'src/quizzes/quizzes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Question]), QuizzesModule],
  controllers: [QuestionsController],
  providers: [QuestionsService],
  exports: [QuestionsService],
})
export class QuestionsModule {}
