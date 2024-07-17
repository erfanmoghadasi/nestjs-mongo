import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Post } from 'src/schemas/Post.schema';
import { CreatePostDto } from './dtos/CreatePost.dto';
import { User } from 'src/schemas/User.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async createPost(createPostDto: CreatePostDto) {
    const { userId, ...restCreatePostDto } = createPostDto;

    const isValidId = await isValidObjectId(userId);
    if (!isValidId) throw new HttpException('id is not valid', 400);

    const findUser = await this.userModel.findById(userId);
    if (!findUser) throw new HttpException('user not found', 404);

    const newPost = new this.postModel({ ...restCreatePostDto, user: userId });
    const savedPost = await newPost.save();

    await findUser.updateOne({
      $push: { posts: savedPost._id },
    });

    return savedPost;
  }

  findPostById() {}
}
