import eventService from '../../domain/services/eventService.js';
import { eventIdSchema } from '../../utils/validation.js';
import { ValidationError } from '../../utils/errors.js';

class EventController {
  async getEventById(req, res, next) {
    try {
      const validationResult = eventIdSchema.safeParse(req.params);
      if (!validationResult.success) {
        throw new ValidationError('Invalid event ID');
      }

      const { id } = validationResult.data;
      const event = await eventService.getEventById(id);

      res.json({
        success: true,
        data: event
      });

    } catch (error) {
      next(error);
    }
  }

  async getAllEvents(req, res, next) {
    try {
      const events = await eventService.getAllEvents();

      res.json({
        success: true,
        data: events
      });

    } catch (error) {
      next(error);
    }
  }
}

export default new EventController();
