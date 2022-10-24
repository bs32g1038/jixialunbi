export const environment = process.env.NODE_ENV;
export const isDevMode = Object.is(environment, 'development');
export const isProdMode = Object.is(environment, 'production');
export const isTestMode = Object.is(environment, 'test');

/**
 * 间隔时间 1 个小时 (60 * 60 * 1000毫秒)
 * 每个 ip 最多 5000 次请求
 */
export const API_REQUEST_RATE_LIMIT = {
  windowMs: 60 * 60 * 1000,
  max: 5000,
};

// jwt密钥
export const JWT_SECRET = process.env.JWT_SECRET || 'jwt-jixialunbi';

// session 密钥
export const SESSION_SECRET = process.env.SESSION_SECRET || 'session-jixialunbi';
