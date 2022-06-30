const router = require('express').Router(); // создали роутер
const { postCard, getCard, deleteCard, likeCard, dislikeCard } = require('../controllers/cards'); // данные нужны для роутинга, поэтому импортируем их

router.post('/cards', postCard);
router.get('/cards', getCard);
router.delete('/cards/:id', deleteCard);
router.put('/cards/:id/likes', likeCard);
router.delete('/cards/:id/likes', dislikeCard);


module.exports = router; // экспортировали роутер