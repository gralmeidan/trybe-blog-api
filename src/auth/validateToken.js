const { verify } = require('jsonwebtoken');

module.exports = (req, _res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return next({
      statusCode: 401,
      message: 'Token not found',
    });
  }

  try {
    const secret = process.env.JWT_SECRET || 'secret';
    const decoded = verify(token, secret);

    req.user = decoded.payload;
    next();
  } catch (_error) {
    next({
      statusCode: 401,
      message: 'Expired or invalid token',
    });
  }
};
