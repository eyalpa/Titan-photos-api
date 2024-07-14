import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const UNSPLASH_URL = 'https://api.unsplash.com/photos/random';

const ensureArray = <T>(input: T | T[]): T[] => {
  return Array.isArray(input) ? input : [input];
};

export const getRandomPhotos = async (count: number) => {
  try {
    const response = await axios.get(UNSPLASH_URL, {
      params: { count },
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
      }
    });

    const photos = ensureArray(response.data);
    return photos.map(photo => photo.urls.regular);
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw error;
  }
};
