import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || '6379', 10)
  }
});

redisClient.on('error', (err) => {
  console.error('Redis client error', err);
});

redisClient.on('connect', () => {
  console.log('Redis client connected');
});

redisClient.connect().catch(console.error);

export default redisClient;
