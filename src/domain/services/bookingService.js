import bookingRepository from '../../data-access/bookingRepository.js';
import { NotFoundError, ConflictError } from '../../utils/errors.js';

class BookingService {
  async createBooking(eventId, userId) {
    // Use database transaction for consistency
    return await bookingRepository.executeTransaction(async (tx) => {
      // Check if event exists
      const event = await tx.event.findUnique({
        where: { id: eventId },
        include: { _count: { select: { bookings: true } } }
      });

      if (!event) {
        throw new NotFoundError(`Event with ID ${eventId} not found`);
      }

      // Check if event has available seats
      if (event._count.bookings >= event.total_seats) {
        throw new ConflictError('No available seats for this event');
      }

      // Check if user already has a booking for this event
      const existingBooking = await tx.booking.findUnique({
        where: {
          event_id_user_id: {
            event_id: eventId,
            user_id: userId
          }
        }
      });

      if (existingBooking) {
        throw new ConflictError('User already has a booking for this event');
      }

      // Create the booking
      const booking = await bookingRepository.createWithTransaction({
        event_id: eventId,
        user_id: userId,
      }, tx);

      return booking;
    });
  }

  async getUserBookings(userId) {
    const bookings = await bookingRepository.findByUserId(userId);
    
    return bookings.map(booking => ({
      booking_id: booking.id,
      event_id: booking.event_id,
      event_name: booking.event.name,
      created_at: booking.created_at
    }));
  }
}

export default new BookingService();
