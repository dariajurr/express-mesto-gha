const mongoose = require('mongoose');
const Users = require('../models/user');
const { options } = require('../routes/users');
const BadRequestError = require('../errors/BadRequestError');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getUser = (req, res, next) => {
  Users.find({})
    .then(users => res.status(200).send(users))
    .catch(next);
}

module.exports.getUserById = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new BadRequestError('Некорректный запрос');
  }

  Users.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.status(200).send({ data: user });
    })
    .catch(next);
}

module.exports.postUser = (req, res, next) => {
  const {name, about, avatar} = req.body;
  Users.create({name, about, avatar})
   .then(user => res.status(201).send({data: user}))
   .catch((err) => {
    if (err.name === 'ValidationError') {
      next(new ValidationError('Переданны некорректные данные'));
    } else {
      next(err);
    }
  });
}

module.exports.patchUserInfo = (req, res, next) => {
  const {name, about} = req.body;

  Users.findByIdAndUpdate(req.user._id, {name, about}, {new: true, runValidators: true})
  .then((user) => {
    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    } else {
      res.status(200).send({ user });
    }
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      next(new ValidationError('Переданны некорректные данные'));
    } else {
      next(err);
    }
  });
}

module.exports.patchUserAvatar = (req, res, next) => {
  const {avatar} = req.body;

  Users.findByIdAndUpdate(req.user._id, {avatar}, {new: true, runValidators: true})
  .then((user) => {
    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    } else {
      res.status(200).send(user);
    }
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      next(new ValidationError('Переданны некорректные данные'));
    } else {
      next(err);
    }
  });
}