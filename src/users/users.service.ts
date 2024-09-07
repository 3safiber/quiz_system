import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Role, User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { UpdateUserDto } from './dtos/update-user.dto';
const scrypt = promisify(_scrypt);

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  async create(data: CreateUserDto, createdUser: User) {
    const { email, password, role, username } = data;
    if (Role[role as keyof typeof Role]) {
      throw new BadRequestException('Invalid role');
    }
    const user = this.repo.create({
      email: email,
      password: password,
      role: Role[role as keyof typeof Role],
      username: username,
      created_by: createdUser,
      updated_by: createdUser,
    });
    return this.repo.save(user);
  }
  async update(id_to_update: string, data: UpdateUserDto, updated_user: User) {
    const { email, password, role, username } = data;
    const user = await this.repo.findOneBy({ id: id_to_update });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (role) {
      const checkedRole = Role[role as keyof typeof Role];
      if (!checkedRole) {
        throw new BadRequestException('Invalid role');
      }
      user.role = checkedRole;
    }
    if (password) {
      const salt = randomBytes(8).toString('hex');
      const hash = (await scrypt(password, salt, 32)) as Buffer;
      const result = salt + '.' + hash.toString('hex');
      user.password = result;
    }
    if (username) {
      const existingUserByUsername = await this.find(username, 'username');
      if (existingUserByUsername) {
        throw new BadRequestException('username already used!');
      }
      user.username = username;
    }
    if (email) {
      const existingUserByEmail = await this.find(email, 'email');
      if (existingUserByEmail) {
        throw new BadRequestException('email already used!');
      }
      user.email = email;
    }
    user.updated_by = updated_user;
    await this.repo.save(user);

    return user;
  }
  async remove(id: string) {
    const user = await this.repo.findOneBy({ id: id });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.repo.remove(user);
  }
  find(value: string, field: string = 'id') {
    return this.repo.findOneBy({ [field]: value });
  }
  fetchAll() {
    return this.repo.find();
  }
  async initializeAdminUser() {
    const existingAdmin = await this.repo.findOne({
      where: { role: Role.admin },
    });
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt('admin', salt, 32)) as Buffer;
    const hashedPassword = salt + '.' + hash.toString('hex');

    if (!existingAdmin) {
      const adminUser = this.repo.create({
        username: 'admin',
        email: 'admin@example.com',
        password: hashedPassword,
        role: Role.admin,
      });

      await this.repo.save(adminUser);
    }
  }
}
