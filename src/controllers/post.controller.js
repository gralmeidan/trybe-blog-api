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

const getAll = async (_req, res, next) => {
  try {
    const response = await PostService.getAll();

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const findById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await PostService.findById(id);

    if (!response) {
      return next({
        statusCode: 404,
        message: 'Post does not exist',
      });
    }

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  const { id: postId } = req.params;
  const { title, content } = req.body;
  const { id: userId } = req.user;

  try {
    const affectedRows = await PostService.update(
      postId,
      { title, content },
      userId,
    );

    if (affectedRows.error) {
      return next(affectedRows.error);
    }

    const response = await PostService.findById(userId);

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  const { id: postId } = req.params;
  const { id: userId } = req.user;

  try {
    const affectedRows = await PostService.remove(postId, userId);

    if (affectedRows.error) {
      return next(affectedRows.error);
    }

    await PostService.findById(userId);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const filterByText = async (req, res, next) => {
  const { q } = req.query;
  try {
    const response = await PostService.filterByText(q);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
  findById,
  update,
  remove,
  filterByText,
};
