import { Controller, Post, Body } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('login')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  login(@Body() { login, password }: LoginDto) {
    return this.authService.loginUser(login, password);
  }
}
