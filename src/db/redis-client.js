import redis from 'redis';
import { promisify } from 'util';

const client = redis.createClient(process.env.REDIS_URL);

const redisClient = {
  ...client,
  getAsync: promisify(client.get).bind(client),
  setAsync: promisify(client.set).bind(client),
  keyAsync: promisify(client.keys).bind(client),
  lPush: promisify(client.lpush).bind(client),
  lRange: promisify(client.lrange).bind(client),
};

export {
  redisClient,
};
