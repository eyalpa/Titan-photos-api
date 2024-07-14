import { Router } from 'express';
import { fetchRandomPhotos } from '../controllers/photoController';

const router = Router();

router.get('/:count', fetchRandomPhotos);

export default router;
