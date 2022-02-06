import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async loginUser(login: string, password: string) {
    const user = <UserEntity | undefined>(
      await this.userService.getUserByLogin(login)
    );
    if (!user) {
      throw new NotFoundException('User with current login not found');
    }
    await this.comparePassword(password, user.password!);
    return this.generateToken(user);
  }

  private async generateToken(user: UserEntity) {
    const token = this.jwtService.sign({
      id: user.id,
      login: user.login,
    });
    return { token };
  }

  private async comparePassword(password: string, existsPassword: string) {
    const isPasswordCorrect = await bcrypt.compare(password, existsPassword);
    if (!isPasswordCorrect) {
      throw new UnauthorizedException('unauthrized password');
    }
    return true;
  }
}
