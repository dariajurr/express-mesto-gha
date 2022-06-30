const router = require('express').Router(); // создали роутер
const { postUser, getUser, getUserById, patchUserInfo, patchUserAvatar } = require('../controllers/users'); // данные нужны для роутинга, поэтому импортируем их

router.post('/users', postUser);
router.get('/users', getUser);
router.get('/users/:id', getUserById);
router.patch('/users/me', patchUserInfo);
router.patch('/users/me/avatar', patchUserAvatar);



module.exports = router; // экспортировали роутер