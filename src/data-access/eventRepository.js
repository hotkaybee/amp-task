import databaseConfig from '../config/database.js';

class EventRepository {
  constructor() {
    this.prisma = databaseConfig.getClient();
  }

  async findById(id) {
    return await this.prisma.event.findUnique({
      where: { id },
      include: {
        _count: {
          select: { bookings: true }
        }
      }
    });
  }

  async findAll() {
    return await this.prisma.event.findMany({
      include: {
        _count: {
          select: { bookings: true }
        }
      },
      orderBy: { created_at: 'desc' }
    });
  }

  async create(eventData) {
    return await this.prisma.event.create({
      data: eventData
    });
  }

  async update(id, eventData) {
    return await this.prisma.event.update({
      where: { id },
      data: eventData
    });
  }

  async delete(id) {
    return await this.prisma.event.delete({
      where: { id }
    });
  }
}

export default new EventRepository();
