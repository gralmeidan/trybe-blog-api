const { User } = require('../models');
const createError = require('./utils/createError');
const { userSchema } = require('./validation/schemas');

const findByEmail = async (email) => {
  const response = await User.findOne({
    where: {
      email,
    },
  });
  return response;
};

const create = async (user) => {
  const { error } = userSchema.validate(user);

  if (error) {
    return createError(400, error.message);
  }

  const userFromDB = await findByEmail(user.email);
  if (userFromDB) {
    return createError(409, 'User already registered');
  }

  const response = await User.create(user);
  return response;
};

const getAll = async () => {
  const response = await User.findAll({
    attributes: { exclude: ['password'] },
  });
  return response;
};

const findById = async (id) => {
  const response = await User.findByPk(id, {
    attributes: { exclude: ['password'] },
  });
  return response;
};

module.exports = {
  findByEmail,
  create,
  getAll,
  findById,
};
