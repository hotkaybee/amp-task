import { Router } from 'express';
import eventController from '../eventController.js';

const router = Router();

// GET /api/events/:id - Get event details with available seats
router.get('/:id', eventController.getEventById.bind(eventController));

// GET /api/events - Get all events with availability
router.get('/', eventController.getAllEvents.bind(eventController));

export default router;
