
import { Equals, IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @MinLength(6)
  // @Equals('password', { message: 'Passwords do not match' })
  confPassword: string;


}
