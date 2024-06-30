import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { File } from './file.entity';
import { User } from "../users/user.entity";


@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private filesRepository: Repository<File>,
  ) {}
  getHello(): string {
    return "Hello World 2!";
  }

  /// Save in DB upload files
  async save(user,files: Array<Express.Multer.File>){
    files.map(async file => {
      const newFile = this.filesRepository.create({filename: file.filename, user: user})
      await this.filesRepository.save(newFile);

    })
    return {"message" : "Fichier(s) ajouté(s)", "success" : 1}
  }


/// Get all files by One User
  async findFilesByUser(userId: number): Promise<File[]> {
    const files = await this.filesRepository.find({
      where: { user: { id: userId } },
    });
    return files;
  }



  // findOne(email: string): Promise<User | null> {
  //   return this.usersRepository.findOneBy({ email });
  // }
  //

}
