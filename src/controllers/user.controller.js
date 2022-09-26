const generateToken = require('../auth/generateToken');
const { UserService } = require('../services');

const create = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;

  try {
    const response = await UserService.create({
      displayName,
      email,
      password,
      image,
    });

    if (response.error) return next(response.error);

    const token = generateToken(response.dataValues);

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const response = await UserService.getAll();

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
};
