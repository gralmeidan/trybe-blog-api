const {
  sequelize,
  BlogPost,
  PostCategory,
  Category,
  User,
} = require('../models');
const { postSchema } = require('./validation/schemas');
const createError = require('./utils/createError');

// #region 'create' method
const insertRelationships = async (
  categoryIds,
  postId,
  transaction,
) => Promise.all(
    categoryIds.map(async (categoryId) => {
      await PostCategory.create(
        {
          postId,
          categoryId,
        },
        {
          transaction,
        },
      );
    }),
  );

const doCategoriesExist = async (categoryIds) => {
  const categories = await Promise.all(
    categoryIds.map(async (categoryId) =>
      Category.findByPk(categoryId)),
  );
  return categories.every(Boolean);
};

const insertNewPost = async (t, { title, content }, userId) => {
  const blogPost = await BlogPost.create(
    { title, content, userId },
    { transaction: t },
  );
  return blogPost;
};

const create = async (post, userId) => {
  const { error: JoiErr } = postSchema.validate(post);
  if (JoiErr) {
    // Por algum motivo o avaliador pede essa mensagem genérica
    return createError(400, 'Some required fields are missing');
  }

  try {
    if (!(await doCategoriesExist(post.categoryIds))) {
      return createError(400, '"categoryIds" not found');
    }

    const result = await sequelize.transaction(async (t) => {
      const blogPost = await insertNewPost(t, post, userId);
      await insertRelationships(post.categoryIds, blogPost.id, t);

      return blogPost;
    });

    return result;
  } catch (error) {
    return { error };
  }
};
// #endregion

const update = async (postId, post, userId) => {
  const { title, content } = post;
  if (!title || !content) {
    // Por algum motivo o avaliador pede essa mensagem genérica
    return createError(400, 'Some required fields are missing');
  }

  const oldPost = await BlogPost.findByPk(postId);
  if (!oldPost) {
    return createError(404, 'Post does not exist');
  }

  if (oldPost.userId !== userId) {
    return createError(401, 'Unauthorized user');
  }

  const response = await BlogPost.update(
    { title, content },
    { where: { id: postId } },
  );
  return response;
};

const defaultFindOptions = {
  include: [
    {
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    },
    {
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
  ],
};

const getAll = async () => {
  const response = await BlogPost.findAll(defaultFindOptions);
  return response;
};

const findById = async (id) => {
  const response = await BlogPost.findByPk(id, defaultFindOptions);
  return response;
};

module.exports = {
  create,
  getAll,
  findById,
  update,
};
