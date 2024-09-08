import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Score } from './score.entity';
import { ScoresController } from './scores.controller';
import { ScoresService } from './scores.service';
import { ResponsesModule } from 'src/responses/responses.module';
import { QuestionsModule } from 'src/questions/questions.module';
import { OptionsModule } from 'src/options/options.module';
import { QuizzesModule } from 'src/quizzes/quizzes.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Score]),
    ResponsesModule,
    QuestionsModule,
    OptionsModule,
    QuizzesModule,
    UsersModule,
  ],
  controllers: [ScoresController],
  providers: [ScoresService],
})
export class ScoresModule {}
