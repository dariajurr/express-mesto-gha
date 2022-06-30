const Cards = require('../models/card');

module.exports.postCard = (req, res) => {
  const owner = req.user._id;
  const {name, link} = req.body;

  Cards.create({name, link, owner})
    .then(card => res.send({data: card}))
    .catch(err => console.log('error', err));
}

module.exports.getCard = (req, res) => {
  Cards.find({})
    .then(cards => res.send(cards))
    .catch(err => console.log('error', err));
}

module.exports.deleteCard = (req, res) => {
  Cards.findByIdAndRemove(req.params.id)
    .then(card => res.send(card))
    .catch(err => console.log('error', err));
}

module.exports.likeCard = (req, res) => {
  Cards.findByIdAndUpdate(req.params.id, { $addToSet: { likes: req.user._id } }, { new: true })
  .then(card => res.send(card))
  .catch(err => console.log('error', err));
}


module.exports.dislikeCard = (req, res) => {
  Cards.findByIdAndUpdate(req.params.id, { $pull: { likes: req.user._id } }, { new: true })
  .then(card => res.send(card))
  .catch(err => console.log('error', err));
}