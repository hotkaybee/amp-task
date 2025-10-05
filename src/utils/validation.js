import { z } from 'zod';

// Request validation schemas
export const bookingSchema = z.object({
  event_id: z.number().int().positive('Event ID must be a positive integer'),
  user_id: z.string().min(1, 'User ID is required').max(255, 'User ID too long')
});

export const eventIdSchema = z.object({
  id: z.string().transform((val) => {
    const num = parseInt(val);
    if (isNaN(num) || num <= 0) {
      throw new Error('Invalid event ID');
    }
    return num;
  })
});

export const userIdSchema = z.object({
  userId: z.string().min(1, 'User ID is required').max(255, 'User ID too long')
});
