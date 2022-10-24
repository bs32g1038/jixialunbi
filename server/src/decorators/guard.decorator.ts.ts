import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard, Option } from 'src/auth/guards/jwt-auth.guard';

export const a = UseGuards(JwtAuthGuard());

import { applyDecorators } from '@nestjs/common';

export function UseJwtAuthGuard(option?: Option) {
  return applyDecorators(UseGuards(JwtAuthGuard(option)));
}
