const createError = (statusCode, message) => ({
  error: {
    statusCode,
    message,
  },
});

module.exports = createError;
