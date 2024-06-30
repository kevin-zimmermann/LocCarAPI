import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { FilesService } from "./files.service";
import { diskStorage } from "multer";
import { extname } from 'path';
import { AuthGuard } from "../auth/auth.guard";

@Controller('files')
export class FilesController {
  constructor(private filesService: FilesService ) {}

  @Get()
  getHello(): string {
    return this.filesService.getHello();
  }
  @UseGuards(AuthGuard)
  @Post('upload')
  @UseInterceptors(FilesInterceptor('files',2,{
    fileFilter: (req, file, cb) => {
      const formatAccepted = ['application/pdf','image/jpeg'];
      const maxSizeFile = 10485760;
      if (!formatAccepted.includes(file.mimetype)) {
        return cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
      }

      if (file.size > maxSizeFile) {
        return cb(new HttpException(`The size of the file ${extname(file.originalname)} is higher than expected (> 10 Mo)`, HttpStatus.BAD_REQUEST), false);
      }
      cb(null, true);
    },

    storage: diskStorage({
      destination:'./uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const nameTab = file.originalname.split(".")
        const subArray = nameTab.slice(0, -1);
        const originalName = subArray.join("")
        const ext = `.${nameTab[nameTab.length - 1]}`;
        const filename = `${originalName}-${uniqueSuffix}${ext}`
        cb(null, filename)
      }
    })
  }))
  // @UsePipes(FileValidatorPipe)
  uploadFile(@Request req, @UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files)
    console.log(req.user)
    return this.filesService.save(req.user,files)
  }

  // @UseGuards(AuthGuard)
  // @Get('getFiles')
  // getFiles()
}
