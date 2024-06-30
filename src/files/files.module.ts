import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { UsersModule } from "../users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/user.entity";
import { File } from "./file.entity";
import { FileValidatorPipe } from "./dto/FileValidatorPipe";

@Module({
  imports: [TypeOrmModule.forFeature([File]),UsersModule],
  controllers: [FilesController],
  providers: [FilesService,FileValidatorPipe],
})
export class FilesModule {}
