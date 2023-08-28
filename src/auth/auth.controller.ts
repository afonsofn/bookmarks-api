import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    // "dto" stands for data transfer object in Nest, which handles request body. Without parameters in @Body(), it retrieves the entire body.
    return this.authService.signup(dto);
  }

  // Changing the default HttpStatus
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(
    // The @Body() decorator with a parameter fetches that specific parameter from the body.
    @Body('email') email: string,
    // The "ParseIntPipe" is a tool from Nest that validates data. If the provided password is a string with letters, an error will be shown to the user; if only numbers, it will be converted to a number.
    // @Body('password', ParseIntPipe) password: string,
    @Body('password') password: string,
  ) {
    return this.authService.signin({ email, password });
  }
}
