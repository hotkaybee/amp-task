import databaseConfig from '../config/database.js';

class BookingRepository {
  constructor() {
    this.prisma = databaseConfig.getClient();
  }

  async findByEventAndUser(eventId, userId) {
    return await this.prisma.booking.findUnique({
      where: {
        event_id_user_id: {
          event_id: eventId,
          user_id: userId
        }
      }
    });
  }

  async findByUserId(userId) {
    return await this.prisma.booking.findMany({
      where: { user_id: userId },
      include: {
        event: {
          select: {
            id: true,
            name: true,
            total_seats: true
          }
        }
      },
      orderBy: { created_at: 'desc' }
    });
  }

  async create(bookingData) {
    return await this.prisma.booking.create({
      data: bookingData,
      include: {
        event: {
          select: {
            id: true,
            name: true,
            total_seats: true
          }
        }
      }
    });
  }

  async createWithTransaction(bookingData, transactionClient) {
    return await transactionClient.booking.create({
      data: bookingData,
      include: {
        event: {
          select: {
            id: true,
            name: true,
            total_seats: true
          }
        }
      }
    });
  }

  async executeTransaction(callback) {
    return await this.prisma.$transaction(callback);
  }
}

export default new BookingRepository();
