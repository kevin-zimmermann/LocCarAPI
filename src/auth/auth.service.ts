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

    //Compare the hash password to the ones types by the user and check if email matches in DB
    if (!user || !await bcrypt.compare(pass, user.password) ) {
      throw new UnauthorizedException('Aucun utilisateur n\'a été trouvé');
    }
    // const { password, ...result } = user;
    const payload = { id: user.id, username: user.email };

    // Generate a JWT and return it here
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
