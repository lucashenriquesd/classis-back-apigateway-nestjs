import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Query,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
@Controller('users')
@Serialize(UserDto)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.usersService.create(body.email, body.password, body.name);
  }

  @Get('/:uuid')
  async findUser(@Param('uuid') uuid: string) {
    const user = await this.usersService.findOne(uuid);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }

  @Get()
  findAll(@Query('limit') limit: string) {
    return this.usersService.findAllUsers(parseInt(limit));
  }

  @Get()
  findAllUsersByName(@Query('name') name: string) {
    return this.usersService.find(name);
  }

  @Patch('/:uuid')
  updateUser(@Param('uuid') uuid: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(uuid, body);
  }

  @Delete('/:uuid')
  removeUser(@Param('uuid') uuid: string) {
    return this.usersService.remove(uuid);
  }
}
