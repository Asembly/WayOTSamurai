import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comment } from 'src/comments/models/comment.model';
import { FilesModule } from 'src/files/files.module';
import { User } from 'src/users/models/user.model';
import { Post } from './models/post.model';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    SequelizeModule.forFeature([User, Post, Comment]),
    forwardRef(() => FilesModule)
  ]
})
export class PostsModule { }
