import { Router } from 'express';
import bookingController from '../bookingController.js';

const router = Router();

// GET /api/users/:userId/bookings - Get user's booking history
router.get('/:userId/bookings', bookingController.getUserBookings.bind(bookingController));

export default router;
