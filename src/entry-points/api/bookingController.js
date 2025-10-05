import bookingService from '../../domain/services/bookingService.js';
import { bookingSchema, userIdSchema } from '../../utils/validation.js';
import { ValidationError } from '../../utils/errors.js';

class BookingController {
  async createBooking(req, res, next) {
    try {
      // Validate input using Zod (fail fast principle)
      const validationResult = bookingSchema.safeParse(req.body);
      if (!validationResult.success) {
        throw new ValidationError(
            `Invalid input: ${validationResult.error.errors.map(e => e.message).join(', ')}`
        );
      }

      const { event_id, user_id } = validationResult.data;

      const booking = await bookingService.createBooking(event_id, user_id);

      // Success response
      res.status(201).json({
        success: true,
        data: {
          booking_id: booking.id,
          event_id: booking.event_id,
          user_id: booking.user_id,
          event_name: booking.event.name,
          created_at: booking.created_at
        },
        message: 'Booking created successfully'
      });

    } catch (error) {
      next(error);
    }
  }

  async getUserBookings(req, res, next) {
    try {
      const validationResult = userIdSchema.safeParse(req.params);
      if (!validationResult.success) {
        throw new ValidationError('Invalid user ID');
      }

      const { userId } = validationResult.data;
      const bookings = await bookingService.getUserBookings(userId);

      res.json({
        success: true,
        data: bookings
      });

    } catch (error) {
      next(error);
    }
  }
}

export default new BookingController();
