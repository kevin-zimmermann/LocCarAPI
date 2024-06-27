import { Body, Controller, Post, HttpCode, HttpStatus, Get } from "@nestjs/common";
import { AuthService } from './auth.service';
import { LoginDto } from "./dto/LoginDto";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.authService.getHello();

  }
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto.email, loginDto.password);
  }
}
