import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthService } from './auth.service';
import { AdminGuard } from 'src/guards/admin.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}
  @Get()
  findAll(@Session() session: any) {
    return this.usersService.fetchAll();
  }

  @Post('/create')
  @UseGuards(AdminGuard)
  async create(@Body() body: CreateUserDto, @CurrentUser() user: User) {
    const newUser = await this.usersService.create(body, user.id);
    return newUser;
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  updateUser(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
    @CurrentUser() user: User,
  ) {
    return this.usersService.update(id, body, user.id);
  }

  @Delete('/:id')
  @UseGuards(AdminGuard)
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    if (session.userId) {
      const user = this.usersService.find(session.userId);
      return user;
    }
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signout')
  signout(@Session() session: any) {
    session.userId = null;
  }

  @Get('/current')
  async current_user(@CurrentUser() user: User) {
    return user ?? 'There is no user currently logged in!';
  }

  @Get('/:username')
  async find(@Param('username') username: string) {
    const user = await this.usersService.find(username, 'username');
    if (!user) {
      throw new NotFoundException(`User '${username}' was not  found!`);
    }
    return user;
  }
}
