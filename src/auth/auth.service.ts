import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FilesService, FileType } from 'src/files/files.service';
import { UserDto } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';
var bcrypt = require('bcryptjs');

@Injectable()
export class AuthService {

  constructor(private usersService: UsersService,
    private jwtService: JwtService,
    private filesService: FilesService
  ) { }

  async signIn(dto: UserDto) {
    try {
      const user = await this.usersService.findByEmail(dto.email);
      const isEqual = bcrypt.compareSync(dto.password, user.password);
      if (user && isEqual) {
        return await this.generateToken({ email: user.email, nickname: user.nickname });
      }
    } catch (error) {
      throw new HttpException({ status: HttpStatus.NOT_FOUND, error: 'User not found' }, HttpStatus.NOT_FOUND);
    }

  }

  async signUp(dto: UserDto, image: Express.Multer.File) {
    const candidate = await this.usersService.findByEmail(dto.email);

    if (!candidate) {

      const imageFile = this.filesService.create(FileType.IMAGE, image);
      const salt = await bcrypt.genSaltSync(10);
      const hash = await bcrypt.hashSync(dto.password, salt);
      const user = await this.usersService.create({ ...dto, password: hash }, imageFile)
      return this.generateToken({ email: user.email, nickname: user.nickname })
    } else {
      throw new HttpException({ status: HttpStatus.FOUND, error: 'User found' }, HttpStatus.FOUND);
    }
  }

  private async generateToken(payload: { email: string, nickname: string }) {
    return {
      access_token: await this.jwtService.signAsync(payload)
    };
  }

}
