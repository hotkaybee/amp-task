# Seat Reservation System API

A Node.js Express API for booking event seats with PostgreSQL and Prisma, following Node.js best practices with a clean 3-tier architecture.

## Features

- **Seat Reservation**: Book seats for events with duplicate booking prevention
- **Seat Availability**: Check available seats for events
- **User Bookings**: View user's booking history
- **Input Validation**: Zod schema validation with fail-fast approach
- **Error Handling**: Centralized error handling with operational vs catastrophic error distinction
- **Database Transactions**: Atomic operations for data consistency
- **Security**: Helmet, CORS, and input sanitization
- **Graceful Shutdown**: Proper cleanup on process termination

## API Endpoints

### POST /api/bookings/reserve
Reserve a seat for an event.

**Request Body:**
```json
{
  "event_id": 1,
  "user_id": "user123"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "booking_id": 1,
    "event_id": 1,
    "user_id": "user123",
    "event_name": "Concert",
    "created_at": "2024-10-05T12:14:11.000Z"
  },
  "message": "Booking created successfully"
}
```

**Error Responses:**
- `400`: Invalid input data
- `404`: Event not found
- `409`: No available seats or user already booked

### GET /health
Health check endpoint.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Database Setup
```bash
# Copy environment variables
cp .env.example .env

# Edit .env with your PostgreSQL connection string
# DATABASE_URL="postgresql://username:password@localhost:5432/seat_reservation_db"

# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push
```

### 3. Seed the Database
Run the seed script to populate the database with sample users and events:

```bash
# Seed the database with sample data
npm run db:seed

# Or reset and seed (clears existing data first)
npm run db:reset
```

This will create:
- **5 sample users** (use email as user_id for bookings)
- **5 sample events** with different seat capacities
- **3 sample bookings** to demonstrate the system

### 4. Run the Server
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

The server will start on `http://localhost:3000`

## Project Structure

Following Node.js best practices, this project uses a **3-tier architecture** with clear separation of concerns:

```
src/
├── config/                 # Configuration layer
│   ├── database.js         # Database connection setup
│   └── environment.js      # Environment variables validation
├── entry-points/           # Entry point layer (controllers)
│   └── api/
│       ├── routes/         # Modular route definitions
│       │   ├── index.js    # Main routes combiner
│       │   ├── bookingRoutes.js  # Booking endpoints
│       │   └── healthRoutes.js   # Health check endpoint
│       ├── bookingController.js  # Booking HTTP handlers
├── domain/                 # Business logic layer (services)
│   ├── bookingService.js   # Booking business logic
├── data-access/           # Data access layer (repositories)
│   ├── bookingRepository.js # Booking database operations
├── middleware/            # Cross-cutting concerns
│   └── errorHandler.js    # Centralized error handling
└── utils/                 # Utilities
    ├── errors.js          # Custom error classes
    └── validation.js      # Input validation schemas
```

### Architecture Benefits

- **Separation of Concerns**: Each layer has a single responsibility
- **Testability**: Business logic is isolated from HTTP and database concerns
- **Maintainability**: Changes in one layer don't affect others
- **Scalability**: Easy to add new features following the same pattern
- **Modular Routing**: Domain-specific route files for better organization
- **Route Isolation**: Each business domain has its own route file
- **Easy Navigation**: Clear file structure makes finding endpoints simple

## Database Schema

### Events Table
- `id`: Serial primary key
- `name`: Event name
- `total_seats`: Total available seats
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

### Bookings Table
- `id`: Serial primary key
- `event_id`: Reference to events table
- `user_id`: User identifier (string)
- `created_at`: Booking timestamp
- **Unique constraint**: `(event_id, user_id)` - prevents duplicate bookings

### Users Table
- `id`: Serial primary key
- `email`: Unique user email
- `name`: Optional user name

## Business Rules

1. **No Duplicate Bookings**: A user cannot book the same event twice
2. **Seat Limits**: Cannot book when event is at capacity
3. **Atomic Operations**: All booking operations use database transactions
4. **Input Validation**: All inputs are validated using Zod schemas

## Error Handling

The API follows Node.js best practices for error handling:

- **Operational Errors**: Expected errors (validation, business logic) with appropriate HTTP status codes
- **Catastrophic Errors**: Unexpected errors that trigger graceful shutdown
- **Centralized Handling**: All errors processed through a single error handler
- **Structured Logging**: Errors logged with context and timestamps

## Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Input Validation**: Zod schema validation
- **Payload Limits**: Request size limits
- **SQL Injection Prevention**: Prisma ORM with parameterized queries

## Testing

After seeding the database, test the API with the sample data:

```bash
# Health check
curl http://localhost:3000/health

# Book a seat (using seeded data)
curl -X POST http://localhost:3000/api/bookings/reserve \
  -H "Content-Type: application/json" \
  -d '{"event_id": 5, "user_id": "charlie.davis@example.com"}'

# Test duplicate booking prevention (should fail)
curl -X POST http://localhost:3000/api/bookings/reserve \
  -H "Content-Type: application/json" \
  -d '{"event_id": 5, "user_id": "charlie.davis@example.com"}'
```

## Environment Variables

- `DATABASE_URL`: PostgreSQL connection string
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment (development/production)
