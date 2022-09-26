const { Category } = require('../models');
const createError = require('./utils/createError');
const { categorySchema } = require('./validation/schemas');

const create = async (category) => {
  const { error } = categorySchema.validate(category);

  if (error) {
    return createError(400, error.message);
  }

  const response = await Category.create(category);

  return response;
};

const getAll = async () => {
  const response = await Category.findAll();
  return response;
};

module.exports = {
  create,
  getAll,
};
