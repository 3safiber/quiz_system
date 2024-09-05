import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from './response.entity';

@Injectable()
export class ResponsesService {
  constructor(@InjectRepository(Response) private repo: Repository<Response>) {}
}
