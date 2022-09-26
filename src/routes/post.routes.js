const { Router } = require('express');
const validateToken = require('../auth/validateToken');
const { postController } = require('../controllers');

const postRouter = Router();

postRouter.use(validateToken);

postRouter.post('/', postController.create);
postRouter.get('/', postController.getAll);

module.exports = postRouter;
