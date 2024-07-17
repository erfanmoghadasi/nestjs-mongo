import { Body, Controller, Post } from '@nestjs/common';
import { CreatePostDto } from './dtos/CreatePost.dto';
import { PostsService } from './posts.service';

@Controller('/Posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.createPost(createPostDto);
  }
}
