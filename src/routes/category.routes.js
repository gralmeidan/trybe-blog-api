const { Router } = require('express');
const validateToken = require('../auth/validateToken');
const { categoryController } = require('../controllers');

const categoryRouter = Router();

categoryRouter.use(validateToken);

categoryRouter.post('/', categoryController.create);
categoryRouter.get('/', categoryController.getAll);

module.exports = categoryRouter;
