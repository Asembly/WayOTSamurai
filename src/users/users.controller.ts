import { Controller, Delete, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) { }

  @Get('/')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Delete('/delete/:id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }

}
