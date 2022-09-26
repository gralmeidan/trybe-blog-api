const { UserService } = require('../services');

module.exports = async (req, _res, next) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    return next({
      statusCode: 400,
      message: 'Some required fields are missing',
    });
  }

  const user = await UserService.findByEmail(email);

  if (!user || password !== user.password) {
    return next({
      statusCode: 400,
      message: 'Invalid fields',
    });
  }

  req.user = user;

  next();
};
