import { Router } from 'express';

const router = Router();

// GET /health - Health check endpoint
router.get('/', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'seat-reservation-api',
    version: '1.0.0'
  });
});

export default router;
