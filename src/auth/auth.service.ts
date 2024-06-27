import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}
  getHello(): string {
    return "Hello World 1!";
  }

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(email);

    if (!await bcrypt.compare(pass, user.password) || !user) {
      throw new UnauthorizedException('Aucun utilisateur n\'a été trouvé');
    }
    const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    const payload = { sub: user.id, username: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
