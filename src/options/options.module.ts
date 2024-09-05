import { Module } from '@nestjs/common';
import { OptionsController } from './options.controller';
import { OptionsService } from './options.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Option } from './option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Option])],
  controllers: [OptionsController],
  providers: [OptionsService],
})
export class OptionsModule {}
