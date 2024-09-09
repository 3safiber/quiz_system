import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthPayloadDto } from './dtos/auth.dto';
import { UsersService } from 'src/users/users.service';
import { scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  // async validateUser({ email, password }: AuthPayloadDto) {
  //   console.log('service');
  //   const findUser = await this.userService.find(email, 'email');
  //   if (!findUser) return new NotFoundException();
  //   const [salt, storedHash] = findUser.password.split('.');
  //   const hash = (await scrypt(password, salt, 32)) as Buffer;
  //   if (storedHash === hash.toString('hex')) {
  //     const {
  //       password,
  //       created_at,
  //       created_by,
  //       updated_at,
  //       updated_by,
  //       role,
  //       ...user
  //     } = findUser;
  //     return this.jwtService.sign(user);
  //   }
  // }

  async signIn({
    email,
    password,
  }: AuthPayloadDto): Promise<{ access_token: string }> {
    const user = await this.userService.find(email, 'email');
    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (storedHash !== hash.toString('hex')) {
      throw new UnauthorizedException();
    }
    const payload = { id: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
