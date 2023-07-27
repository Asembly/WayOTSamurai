import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserDto } from 'src/users/dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {


  constructor(private authService: AuthService) { }

  @Post('/signin')
  signIn(@Body() dto: UserDto) {
    return this.authService.signIn(dto);
  }

  @Post('/signup')
  @UseInterceptors(FileInterceptor('image'))
  signUp(@UploadedFile() file: Express.Multer.File, @Body() dto: UserDto) {
    return this.authService.signUp(dto, file);
  }

}
