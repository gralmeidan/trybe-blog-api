const { Router } = require('express');
const validateToken = require('../auth/validateToken');
const { userController } = require('../controllers');

const userRouter = Router();

userRouter.post('/', userController.create);

userRouter.use(validateToken);

userRouter.get('/', userController.getAll);

module.exports = userRouter;
