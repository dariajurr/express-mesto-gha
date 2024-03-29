const mongoose = require('mongoose');
const Cards = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

function idIsValid(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new BadRequestError('Некорректный запрос');
  }
}

module.exports.postCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Cards.create({ name, link, owner })
    .then((card) => res.send({ body: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданны некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.getCard = (req, res, next) => {
  Cards.find({})
    .then((cards) => res.send({ cards }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  idIsValid(req.params.id);
  Cards.findById(req.params.id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      } else if (req.user._id.toString() === card.owner.toString()) {
        Cards.deleteOne(card)
          .then(() => res.send({ message: 'Карточка удалена' }))
          .catch(next);
      } else {
        throw new ForbiddenError('Нет прав на удаление карточки');
      }
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  idIsValid(req.params.id);
  Cards.findByIdAndUpdate(req.params.id, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      res.send(card);
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  idIsValid(req.params.id);
  Cards.findByIdAndUpdate(req.params.id, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      } else {
        res.send({ card });
      }
    })
    .catch(next);
};
