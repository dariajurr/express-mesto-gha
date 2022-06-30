const express = require('express');
const mongoose = require('mongoose');
const bodyParse = require('body-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: true}));

app.use((req, res, next) => {
  req.user = {
    _id: '62bdd267b6115e3adb1d3b78'
  };

  next();
});

mongoose.connect('mongodb://localhost:27017/mestodb',
  err => {
      if(err) throw err;
      console.log('connected to MongoDB')
});

app.use('/', userRouter);
app.use('/', cardRouter);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`)
})

