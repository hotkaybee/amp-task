import { Router } from 'express';
import healthRoutes from './healthRoutes.js';
import bookingRoutes from './bookingRoutes.js';
import eventRoutes from './eventRoutes.js';
import userRoutes from './userRoutes.js';

const router = Router();

// Mount route modules
router.use('/health', healthRoutes);
router.use('/api/bookings', bookingRoutes);
router.use('/api/events', eventRoutes);
router.use('/api/users', userRoutes);

export default router;
