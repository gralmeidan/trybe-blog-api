const generateToken = require('../auth/generateToken');

module.exports = async (req, res, next) => {
  try {
    const { dataValues } = req.user;

    const token = generateToken(dataValues);

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
