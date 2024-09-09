import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../users.service';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { User as userType } from '../user.entity';

declare global {
  namespace Express {
    interface Request {
      currentUser?: userType;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];

      try {
        const decoded = jwt.verify(
          token,
          this.configService.get<string>('JWT_SECRET'),
        ) as {
          id: string;
        };

        if (decoded && decoded.id) {
          const user = await this.usersService.find(decoded.id);
          req.currentUser = user;
        }
      } catch (err) {
        throw new BadRequestException('Invalid Token!!!');
      }
    }
    next();
  }
}
