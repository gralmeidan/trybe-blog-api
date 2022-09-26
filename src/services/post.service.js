const { sequelize, BlogPost, PostCategory } = require('../models');
const { postSchema } = require('./validation/schemas');
const createError = require('./utils/createError');

const insertRelationships = async (categoryIds, postId, transaction) =>
  Promise.all(
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

const create = async (post, userId) => {
  const { error } = postSchema.validate(post);

  if (error) {
    return createError(400, error.message);
  }
  const { title, content, categoryIds } = post;

  try {
    const result = await sequelize.transaction(async (t) => {
      const blogPost = await BlogPost.create(
        { title, content, userId },
        { transaction: t },
      );

      await insertRelationships(categoryIds, blogPost.id, t);
      return blogPost;
    });

    return result;
  } catch (err) {
    return { error: err };
  }
};

module.exports = {
  create,
};
