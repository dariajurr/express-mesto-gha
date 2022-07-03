const Cards = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const BadRequestError = require('../errors/BadRequestError');

module.exports.postCard = (req, res, next) => {
  const owner = req.user._id;
  const {name, link} = req.body;

  Cards.create({name, link, owner})
    .then((card) => res.status(201).send({ body: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданны некорректные данные'));
      } else {
        next(err);
      }
    });
}

module.exports.getCard = (req, res, next) => {
  Cards.find({})
    .then((cards) => res.status(200).send({ cards }))
    .catch(next);
}

module.exports.deleteCard = (req, res, next) => {
  Cards.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      res.status(200).send({ message: 'Карточка удалена' });
    })
    .catch(err => {
      next(new BadRequestError('Некорректный запрос'));
    });
}

module.exports.likeCard = (req, res, next) => {
  Cards.findByIdAndUpdate(req.params.id, { $addToSet: { likes: req.user._id } }, { new: true })
  .then((card) => {
    if (!card) {
      throw new NotFoundError('Карточка не найдена');
    }
    res.status(200).send(card);
  })
  .catch(err => {
    next(new BadRequestError('Некорректный запрос'));
  });
}



module.exports.dislikeCard = (req, res, next) => {
  Cards.findByIdAndUpdate(req.params.id, { $pull: { likes: req.user._id } }, { new: true })
  .then((card) => {
    if (!card) {
      throw new NotFoundError('Карточка не найдена');
    } else {
      res.status(200).send({card});
    }
  })
  .catch(next);
}