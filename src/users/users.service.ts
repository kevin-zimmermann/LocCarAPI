import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {
  }


  getHello(): string {
    return "Hello World 1!";
  }

  async register(email: string, password: string, confPassword: string) {
    const user = await this.findOne(email);
    if (user) {
      throw new BadRequestException('L\'email est déjà pris');
    } else {
      if (password === confPassword) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.usersRepository.create({ email, password: hashedPassword });
          await this.usersRepository.save(user);
          return {"message" : "Utilisateur crée"}
      }else{
        throw new BadRequestException('Les MDP ne correspondent pas');
      }
    }

  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
