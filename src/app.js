const express = require('express');
const login = require('./controllers/login');
const handleErrors = require('./middlewares/handleErrors');
const validateLogin = require('./middlewares/validateLogin');
const userRouter = require('./routes/user.routes');

// ...

const app = express();

app.use(express.json());
// ...
app.post('/login', validateLogin, login);
app.use('/user', userRouter);

app.use(handleErrors);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
