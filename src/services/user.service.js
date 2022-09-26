const { User } = require('../models');

const findByEmail = async (email) => {
  const response = await User.findOne({
    where: {
      email,
    },
  });
  return response;
};

module.exports = {
  findByEmail,
};
