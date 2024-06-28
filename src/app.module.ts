import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from "./users/user.entity";
import { UsersModule } from "./users/users.module";
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { File } from "./files/file.entity";
import { MulterModule } from "@nestjs/platform-express";
@Module({
  imports: [

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'loccar',
      entities: [User,File],
      synchronize: true,
    }),
    // MulterModule.register({
    //   dest: './upload',
    // }),
    UsersModule, AuthModule, FilesModule,


  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
