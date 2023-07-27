import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { UserDto } from './dto/user.dto';
import { User } from './models/user.model';
const { UniqueString } = require('unique-string-generator');

@Injectable()
export class UsersService {

  constructor(@InjectModel(User) private userModel: typeof User) { }

  async findAll() {
    return await this.userModel.findAll();
  }

  async create(dto: UserDto, file: string) {
    const user = await this.userModel.create({ ...dto, avatar: file, id: UniqueString() });
    return user;
  }

  async delete(username: string) {
    const user = await this.userModel.findByPk(username)
    user.destroy();
    return { message: 'User successful removed', status: HttpStatus.OK };
  }

  findOne(id: string) {
    return this.userModel.findOne({ where: { id }, include: { all: true } });
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ where: { email } });
  }

}
