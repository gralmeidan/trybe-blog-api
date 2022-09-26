const { sign } = require('jsonwebtoken');

module.exports = (user) => {
  const payload = { ...user };
  delete payload.password;

  if (!payload.image) payload.image = 'null';

  const secret = process.env.JWT_SECRET || 'secret';

  const token = sign({ payload }, secret, {
    algorithm: 'HS256',
    expiresIn: '7d',
  });

  return token;
};
