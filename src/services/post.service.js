const {
  sequelize,
  BlogPost,
  PostCategory,
  Category,
} = require('../models');
const { postSchema } = require('./validation/schemas');
const createError = require('./utils/createError');

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

module.exports = {
  create,
};