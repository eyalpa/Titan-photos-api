import { Router } from 'express';
import { fetchReservations, webhook } from '../controllers/reservationController';

const router = Router();

router.get('/', fetchReservations);
router.get('/webhook', webhook);

export default router;
