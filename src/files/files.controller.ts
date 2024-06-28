import { Controller, Get, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { FilesService } from "./files.service";
import { diskStorage } from "multer";
import { FileValidatorPipe } from "./dto/FileValidatorPipe";

@Controller('files')
export class FilesController {
  constructor(private filesService: FilesService ) {}

  @Get()
  getHello(): string {
    return this.filesService.getHello();
  }
  @Post('upload')
  @UseInterceptors(FilesInterceptor('files[]',2,{
    storage: diskStorage({
      destination:'./uploads',
    })
  }))
  // @UsePipes(FileValidatorPipe)
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
  }
}
