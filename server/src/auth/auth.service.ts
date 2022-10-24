import { Injectable } from '@nestjs/common';
import { UserService } from '../modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import HTTP_EXCEPTION from 'src/common/http.exception';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async validate(account: string, password: string): Promise<any> {
    const user = await this.userService.getAuthUser(account, password);
    if (!user) {
      throw HTTP_EXCEPTION.ACCOUNT_OR_PASSWORD;
    }
    return user;
  }

  async login(user: any) {
    return {
      token: this.jwtService.sign(user),
      user,
    };
  }
}
