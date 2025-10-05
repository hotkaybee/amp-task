// Custom error classes following Node.js best practices
export class OperationalError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.name = 'OperationalError';
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

export class ValidationError extends OperationalError {
  constructor(message) {
    super(message, 400);
    this.name = 'ValidationError';
  }
}

export class ConflictError extends OperationalError {
  constructor(message) {
    super(message, 409);
    this.name = 'ConflictError';
  }
}

export class NotFoundError extends OperationalError {
  constructor(message) {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}
