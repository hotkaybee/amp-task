export const errorHandler = (err, req, res, next) => {
  console.error(`Error: ${err.message}`, {
    stack: err.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  if (err.isOperational) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        message: err.message,
        type: err.name
      }
    });
  }

  res.status(500).json({
    success: false,
    error: {
      message: 'Internal server error',
      type: 'InternalError'
    }
  });
};
