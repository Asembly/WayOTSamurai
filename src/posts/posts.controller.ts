import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostDto } from './dto/post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {

  constructor(private postsService: PostsService) { }

  @Get('/')
  findAll() {
    return this.postsService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Post('/create')
  @UseInterceptors(FileInterceptor('image'))
  create(@UploadedFile() file: Express.Multer.File, @Body() dto: PostDto) {
    return this.postsService.create(dto, file);
  }

  @Delete('/delete/:id')
  delete(@Param('id') id: string) {
    return this.postsService.delete(id);
  }

}
