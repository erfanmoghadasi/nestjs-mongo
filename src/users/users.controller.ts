import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import mongoose, { isValidObjectId } from 'mongoose';
import { UpdateUserDto } from './dto/UpdateUser.dto';

@Controller('/users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.userService.createUser(createUserDto);
  }

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string) {
    const isIdValid = mongoose.Types.ObjectId.isValid(id);
    if (!isIdValid) throw new HttpException('user not found', 404);
    const user = await this.userService.getUserById(id);
    if (!user) throw new HttpException('user not found', 404);
    return user;
  }

  @Patch('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const isIdValid = mongoose.Types.ObjectId.isValid(id);
    if (!isIdValid) throw new HttpException('Invalid id', 400);
    const updatedUser = await this.userService.updateUser(id, updateUserDto);
    if (!updatedUser) throw new HttpException('User not found', 404);
    return updatedUser;
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const isIdValid = isValidObjectId(id);
    if (!isIdValid) throw new HttpException('Invalid id', 400);
    const deletedUser = await this.userService.deleteUser(id);
    if (!deletedUser) throw new HttpException('User not found', 404);
    return deletedUser;
  }
}
