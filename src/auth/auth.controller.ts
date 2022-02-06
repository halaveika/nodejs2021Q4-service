import { Controller, Post, Body } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Login')
@Controller('login')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Post Login' })
  @ApiResponse({ status: 200, type: LoginDto })
  @Post()
  login(@Body() { login, password }: LoginDto) {
    return this.authService.loginUser(login, password);
  }
}
