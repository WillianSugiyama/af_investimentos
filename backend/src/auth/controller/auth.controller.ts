import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../service/auth.service';
import { User } from '../user.entity';

@Controller('api/v1/auth/')
export class AuthController {
  constructor(private usersService: AuthService) {}

  @Post('signup')
  async signup(@Body() user: User): Promise<User> {
    return this.usersService.signup(user);
  }

  @Post('login')
  async login(@Body() login: any) {
    return this.usersService.login(login.username, login.password);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/me')
  async me(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/login-check')
  async loginCheck() {
    return 'logged';
  }
}
