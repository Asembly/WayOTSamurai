import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CommentDto } from './dto/comment.dto';
import { Comment } from './models/comment.model';
const { UniqueString } = require('unique-string-generator');

@Injectable()
export class CommentsService {

  constructor(@InjectModel(Comment) private commentModel: typeof Comment) { }

  async findAll() {
    return this.commentModel.findAll();
  }

  async create(dto: CommentDto) {
    const comment = await this.commentModel.create({ ...dto, id: UniqueString() });
    return { message: 'Comment successful created', status: HttpStatus.OK, data: { comment } };
  }

  async delete(id: string) {
    try {
      const comment = await this.commentModel.findOne({ where: { id } });
      comment.destroy();
      return { message: 'Comment successful removed', status: HttpStatus.OK };
    }
    catch (error) {
      throw new HttpException({ status: HttpStatus.NOT_FOUND, error: 'Comment not found' }, HttpStatus.NOT_FOUND);
    }
  }

  findOne(id: string) {
    return this.commentModel.findOne({ where: { id } });
  }

}
