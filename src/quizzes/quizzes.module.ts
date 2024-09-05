import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';
import { Quiz } from './quiz.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz])],
  controllers: [QuizzesController],
  providers: [QuizzesService],
})
export class QuizzesModule {}
