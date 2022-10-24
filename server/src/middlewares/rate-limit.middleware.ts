import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import { API_REQUEST_RATE_LIMIT } from '../configs/index.config';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.originalUrl.includes('/api')) {
      return rateLimit({ windowMs: API_REQUEST_RATE_LIMIT.windowMs, max: API_REQUEST_RATE_LIMIT.max })(req, res, next);
    }
    next();
  }
}
