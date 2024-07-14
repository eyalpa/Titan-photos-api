import redisClient from '../dal/redisClient';

const TTL = parseInt(process.env.REDIS_TTL || '3600', 10);

export const getCachedPhotos = async (count: number): Promise<string[] | null> => {
  try {
    const cachedData = await redisClient.get(`photos:${count}`);
    console.log('Cached data retrieved:', cachedData);
    return cachedData ? JSON.parse(cachedData) : null;
  } catch (error) {
    console.error('Error getting cached photos:', error);
    return null;
  }
};

export const cachePhotos = async (count: number, photos: string[]): Promise<void> => {
  try {
    await redisClient.setEx(`photos:${count}`, TTL, JSON.stringify(photos));
    console.log('Cached data saved');
  } catch (error) {
    console.error('Error caching photos:', error);
  }
};
