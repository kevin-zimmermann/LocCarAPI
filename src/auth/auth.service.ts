import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  getHello(): string {
    return "Hello World 1!";
  }

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new UnauthorizedException('Aucun utilisateur n\'a été trouvé');
    }
    if (!await bcrypt.compare(pass, user.password)) {
      throw new UnauthorizedException('Aucun utilisateur n\'a été trouvé');
    }
    const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return result;
  }
}
