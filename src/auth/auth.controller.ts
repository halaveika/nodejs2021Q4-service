import { Controller,Post,Body } from '@nestjs/common';
import { UserEntity } from 'src/user/user.entity';
import { AuthService } from './auth.service';

@Controller('login')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  login(@Body() {login,password}:{login:string,password:string}) {
      return this.authService.loginUser(login,password)
  }

}
