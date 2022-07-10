const express = require('express');
const mongoose = require('mongoose');
const bodyParse = require('body-parser');
const { errors } = require('celebrate');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const NotFoundError = require('./errors/NotFoundError');
const { postUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { singinValidation, singupValidation } = require('./middlewares/validation');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));

mongoose.connect(
  'mongodb://localhost:27017/mestodb',
  (err) => {
    if (err) throw err;
    console.log('connected to MongoDB');
  },
);

app.post('/signin', singinValidation, login);
app.post('/signup', singupValidation, postUser);

app.use('/users', auth, userRouter);
app.use('/cards', auth, cardRouter);

app.use((req, res, next) => {
  next(new NotFoundError('Страницы не существует'));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
  next();
});

app.use(errors());

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
