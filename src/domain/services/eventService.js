import eventRepository from '../../data-access/eventRepository.js';
import { NotFoundError } from '../../utils/errors.js';

class EventService {
  async getEventById(eventId) {
    const event = await eventRepository.findById(eventId);
    
    if (!event) {
      throw new NotFoundError(`Event with ID ${eventId} not found`);
    }

    return {
      id: event.id,
      name: event.name,
      total_seats: event.total_seats,
      booked_seats: event._count.bookings,
      available_seats: event.total_seats - event._count.bookings,
      created_at: event.created_at
    };
  }

  async getAllEvents() {
    const events = await eventRepository.findAll();
    
    return events.map(event => ({
      id: event.id,
      name: event.name,
      total_seats: event.total_seats,
      booked_seats: event._count.bookings,
      available_seats: event.total_seats - event._count.bookings,
      created_at: event.created_at
    }));
  }

  async createEvent(eventData) {
    return await eventRepository.create(eventData);
  }
}

export default new EventService();
