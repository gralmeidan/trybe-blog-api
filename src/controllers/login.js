const { sign } = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const { dataValues } = req.user;

    const payload = { ...dataValues };
    delete payload.password;
    const secret = process.env.JWT_SECRET || 'secret';

    const token = sign({ payload }, secret, {
      algorithm: 'HS256',
      expiresIn: '7d',
    });

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
