const router = require('express').Router();
const {
  postCard, getCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { postCardValidation, cardIdValidation } = require('../middlewares/validation');

router.post('/', postCardValidation, postCard);
router.get('/', getCard);
router.delete('/:id', cardIdValidation, deleteCard);
router.put('/:id/likes', cardIdValidation, likeCard);
router.delete('/:id/likes', cardIdValidation, dislikeCard);

module.exports = router;
