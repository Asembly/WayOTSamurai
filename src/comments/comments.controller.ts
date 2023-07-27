import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentDto } from './dto/comment.dto';

@Controller('comments')
export class CommentsController {

  constructor(private commentService: CommentsService) { }

  @Get('/')
  findAll() {
    return this.commentService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(id);
  }

  @Post('/create')
  create(@Body() dto: CommentDto) {
    return this.commentService.create(dto);
  }

  @Delete('/delete/:id')
  delete(@Param('id') id: string) {
    return this.commentService.delete(id);
  }
}
