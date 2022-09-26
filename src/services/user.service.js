const { User } = require('../models');

const findByEmail = async (email) => {
  const response = await User.findOne({
    where: {
      email,
    },
  });
  console.log(response);
  return response;
};

module.exports = {
  findByEmail,
};
