/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() body: { email: string; password: string }): Promise<User> {
    return this.usersService.createUser(body.email, body.password);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() body: Partial<{ email: string; password: string }>,
  ): Promise<User> {
    return this.usersService.updateUser(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.usersService.removeUser(id);
  }
}
