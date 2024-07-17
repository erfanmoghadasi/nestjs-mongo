import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UserSettings } from 'src/schemas/UserSettings.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserSettings.name)
    private userSettingModel: Model<UserSettings>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const { settings, ...restCreateUserDto } = createUserDto;

    if (settings) {
      const userSettings = new this.userSettingModel(settings);
      const savedNewSettings = await userSettings.save();
      const newUser = new this.userModel({
        ...restCreateUserDto,
        settings: savedNewSettings._id,
      });
      return newUser.save();
    }

    const newUser = new this.userModel(restCreateUserDto);
    return newUser.save();
  }

  getUsers() {
    return this.userModel.find();
  }

  getUserById(id: string) {
    return this.userModel.findById(id).populate(['settings', 'posts']);
  }

  updateUser(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
