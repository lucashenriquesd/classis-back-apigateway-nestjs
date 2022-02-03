import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { get } from 'http';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.usersService.create(body.email, body.password, body.name);
  }

  @Get('/:uuid')
  findUser(@Param('uuid') uuid: string) {
    return this.usersService.findOne(uuid);
  }
}
