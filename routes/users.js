const router = require('express').Router(); // создали роутер
const { getUser, getUserById, postUser, patchUserInfo, patchUserAvatar } = require('../controllers/users'); // данные нужны для роутинга, поэтому импортируем их

router.get('/users', getUser);
router.get('/users/:id', getUserById);
router.post('/users', postUser);
router.patch('/users/me', patchUserInfo);
router.patch('/users/me/avatar', patchUserAvatar);

module.exports = router; // экспортировали роутер