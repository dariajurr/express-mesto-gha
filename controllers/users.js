const Users = require('../models/user');
const { options } = require('../routes/users');
const BadRequestError = require('../errors/BadRequestError');
const ValidationError = require('../errors/ValidationError');
const NoteFoundError = require('../errors/NoteFoundError');

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

module.exports.getUser = (req, res, next) => {
  Users.find({})
    .then(users => res.status(201).send(users))
    .catch(next);
}

module.exports.getUserById = (req, res, next) => {
  Users.findById(req.params.id)
    .orFail(() => {
      throw new NoteFoundError('Пользователь не найден');
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
}

module.exports.patchUserInfo = (req, res, next) => {
  const {name, about} = req.body;

  Users.findByIdAndUpdate(req.user._id, {name, about}, {new: true, runValidators: true})
  .then((user) => {
    if (!user) {
      throw new NoteFoundError('Пользователь не найден');
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
      throw new NoteFoundError('Пользователь не найден');
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