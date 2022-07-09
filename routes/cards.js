const router = require('express').Router(); // создали роутер
const {
  postCard, getCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards'); // данные нужны для роутинга, поэтому импортируем их

router.post('/', postCard);
router.get('/', getCard);
router.delete('/:id', deleteCard);
router.put('/:id/likes', likeCard);
router.delete('/:id/likes', dislikeCard);

module.exports = router; // экспортировали роутер
