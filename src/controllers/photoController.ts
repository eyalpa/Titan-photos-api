import { Request, Response } from 'express';
import { getCachedPhotos, cachePhotos } from '../utils/cache';
import { getRandomPhotos } from '../services/unsplashService';

export const fetchRandomPhotos = async (req: Request, res: Response) => {
  const count = parseInt(req.params.count, 10);
  const cachedPhotos = await getCachedPhotos(count);

  if (cachedPhotos) {
    return res.json(cachedPhotos);
  }

  try {
    const photoUrls = await getRandomPhotos(count);
    await cachePhotos(count, photoUrls);
    res.json(photoUrls);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching photos', error });
  }
};
