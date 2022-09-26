const { PostService } = require('../services');

const create = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  const { id: userId } = req.user;
  try {
    const response = await PostService.create(
      { title, content, categoryIds },
      userId,
    );

    if (response.error) {
      return next(response.error);
    }

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
};
