import { UnauthorizedException, mixin, HttpException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import ROLES from 'src/common/roles.enum';
import onlineCache from '../../caches/online.cache';
export interface Option {
  role?: ROLES;
  allowEmptyToken?: boolean;
}

const AUTHORIZATION_MAP = {
  [ROLES.user]: [ROLES.user, ROLES.superAdmin],
  [ROLES.superAdmin]: [ROLES.superAdmin],
};

export function JwtAuthGuard(option: Option = {}) {
  class ScopesAuth extends AuthGuard('jwt') {
    option: Option;
    constructor() {
      super();
      this.option = option;
    }
    handleRequest(err, user): any {
      if (this.option.allowEmptyToken) {
        return user;
      }
      if (err || !user) {
        throw err || new UnauthorizedException();
      }
      onlineCache.set(user.id, true);
      if (this.option.role && !AUTHORIZATION_MAP[this.option.role]?.includes(user.role)) {
        throw new HttpException('禁止访问！权限不足！', 40000);
      }
      return user;
    }
  }
  return mixin(ScopesAuth);
}
