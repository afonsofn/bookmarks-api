import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  // These nest's Pipes validate fields and return appropriate error messages when needed.
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
