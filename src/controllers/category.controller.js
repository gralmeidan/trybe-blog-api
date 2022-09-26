const { CategoryService } = require('../services');

const create = async (req, res, next) => {
  try {
    const { name } = req.body;
    const response = await CategoryService.create({ name });

    if (response.error) {
      return next(response.error);
    }
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const response = await CategoryService.getAll();

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
};
