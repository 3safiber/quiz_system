import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';
const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  async signup(data: CreateUserDto, created_user: User) {
    let user = await this.usersService.find(data.username, 'username');
    if (user) {
      throw new BadRequestException('The username already exist');
    }
    user = await this.usersService.find(data.email, 'email');
    if (user) {
      throw new BadRequestException('The email already exist');
    }

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(data.password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');
    data.password = result;
    const newUser = await this.usersService.create(data, created_user);
    return newUser;
  }

  async signin(email: string, password: string) {
    const user = await this.usersService.find(email, 'email');
    if (!user) {
      throw new BadRequestException('The email is not in our records.');
    }
    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('The password is not correct!');
    }

    return user;
  }
}
