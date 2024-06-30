import { Injectable } from "@nestjs/common";
import { User } from "../users/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";


@Injectable()
export class FilesService {
  constructor(
    // @InjectRepository(User)
    // private usersRepository: Repository<User>,
    @InjectRepository(File)
    private filesRepository: Repository<File>,

  ) {}
  getHello(): string {
    return "Hello World 2!";
  }

  async save(user,files: Array<Express.Multer.File>){
    files.map(async file => {
      const fileSave = this.filesRepository.create({ filename : file.filename, userId: user.id });
      await this.filesRepository.save(fileSave);
    })

  }

  // findOne(email: string): Promise<User | null> {
  //   return this.usersRepository.findOneBy({ email });
  // }






}
