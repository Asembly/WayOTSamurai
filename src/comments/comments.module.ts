import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from 'src/posts/models/post.model';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { Comment } from './models/comment.model';

@Module({
  providers: [CommentsService],
  controllers: [CommentsController],
  imports: [
    SequelizeModule.forFeature([Post, Comment])
  ]
})
export class CommentsModule { }
