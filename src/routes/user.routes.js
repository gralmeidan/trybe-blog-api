const { Router } = require('express');
const validateToken = require('../auth/validateToken');
const { userController } = require('../controllers');

const userRouter = Router();

userRouter.post('/', userController.create);

userRouter.use(validateToken);

userRouter.get('/', userController.getAll);
userRouter.delete('/me', userController.removeSelf);
userRouter.get('/:id', userController.findById);

module.exports = userRouter;
