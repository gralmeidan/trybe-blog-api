const { Router } = require('express');
const validateToken = require('../auth/validateToken');
const { postController } = require('../controllers');

const postRouter = Router();

postRouter.use(validateToken);

postRouter.post('/', postController.create);
postRouter.get('/', postController.getAll);

postRouter.get('/search', postController.filterByText);

postRouter.get('/:id', postController.findById);
postRouter.put('/:id', postController.update);
postRouter.delete('/:id', postController.remove);

module.exports = postRouter;
