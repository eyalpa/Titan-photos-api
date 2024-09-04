import { Router } from 'express';
import photoRoutes from './photoRoutes';
import orderRoutes from './orderRoutes';
import reservationRoutes from './reservationRoutes';

const router = Router();

router.use('/photos', photoRoutes);
router.use('/orders', orderRoutes);
router.use('/reservation', reservationRoutes);

export default router;
