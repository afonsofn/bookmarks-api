import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '@/auth/decorator';
import { JwtGuard } from '@/auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

// Guards are used in Nest to protect routes with specific strategies; here, we're verifying requests using the JWT strategy to all requests inside '@Controller('users')', we could pass to a specific ropute as well, but in this case all requests should be authenticated
// The Guard above performs the same function as this '@UseGuards(AuthGuard(JWT_STRATEGY))'; the one below is a custom guard I created for learning purposes.
@UseGuards(JwtGuard)
// The 'users' controller property sets the base path to '/users'.
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  // If '@Get()' has no parameters, it defaults to the path '/users'; with the 'me' parameter, the route is '/users/me'.
  @Get('me')
  // '@GetUser()' is a custom decorator i created to fetch 'req.user'. It functions like '@Req() req: Request', where you'd access 'req.user'.
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch()
  // With '@GetUser()' you can also retrieve a specific field like above.
  editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }
}
