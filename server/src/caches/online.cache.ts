import * as LRU from 'lru-cache';

const options = {
  max: 500,
  ttl: 1000 * 60 * 15,
};

/**
 * 在线用户缓存 15 分钟，每隔 15 分钟重新统计，不需要精确统计
 */
export default new LRU(options);
