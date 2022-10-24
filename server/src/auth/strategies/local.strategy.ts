import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { checkCaptcha } from 'src/common/http.exception';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'account', passReqToCallback: true });
  }

  async validate(req, account: string, password: string): Promise<any> {
    checkCaptcha(req, req.body.captcha);
    return await this.authService.validate(account, password);
  }
}
