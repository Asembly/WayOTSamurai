import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { resolve } from 'path';
var fs = require('fs')
const uuid = require('uuid')

export enum FileType {
  IMAGE = 'image'
}

@Injectable()
export class FilesService {

  create(type: FileType, file: Express.Multer.File) {
    try {
      console.log(file)
      const fileExtension = file.originalname.split('.').pop();
      const fileName = uuid.v4() + '.' + fileExtension;
      const filePath = resolve(__dirname, '..', 'static', type);
      console.log(filePath)
      console.log(fs.existsSync(filePath))
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(resolve(filePath, fileName), file.buffer);
      return type + '/' + fileName;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }

  }

  delete() {

  }

}
