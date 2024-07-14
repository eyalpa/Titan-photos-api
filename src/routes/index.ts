import { Router } from 'express';
import photoRoutes from './photoRoutes';
import orderRoutes from './orderRoutes';

const router = Router();

router.use('/photos', photoRoutes);
router.use('/orders', orderRoutes);

export default router;
