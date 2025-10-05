import { Router } from 'express';
import bookingController from '../bookingController.js';

const router = Router();

// POST /api/bookings/reserve - Reserve a seat for an event
router.post('/reserve', bookingController.createBooking.bind(bookingController));

export default router;
