import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService, FileType } from 'src/files/files.service';
import { PostDto } from './dto/post.dto';
import { Post } from './models/post.model';
const { UniqueString } = require('unique-string-generator');

@Injectable()
export class PostsService {

  constructor(@InjectModel(Post) private postModel: typeof Post,
    private filesService: FilesService
  ) { }

  async findAll() {
    return await this.postModel.findAll();
  }

  async create(dto: PostDto, image: Express.Multer.File) {
    const imageFile = this.filesService.create(FileType.IMAGE, image);
    const post = await this.postModel.create({ ...dto, id: UniqueString(), image: imageFile });
    return { message: 'Post successful created', status: HttpStatus.OK, data: { post } };
  }

  async delete(id: string) {
    try {
      const post = await this.postModel.findOne({ where: { id } });
      post.destroy();
      return { message: 'Post successful removed', status: HttpStatus.OK };
    }
    catch (error) {
      throw new HttpException({ status: HttpStatus.NOT_FOUND, error: 'Post not found' }, HttpStatus.NOT_FOUND);
    }
  }

  findOne(id: string) {
    return this.postModel.findOne({ where: { id }, include: { all: true } });
  }
}
