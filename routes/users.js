const router = require('express').Router();
const {
  getUser, getUserById, getUserMe, patchUserInfo, patchUserAvatar,
} = require('../controllers/users');

router.get('/', getUser);
router.get('/me', getUserMe);
router.get('/:id', getUserById);
router.patch('/me', patchUserInfo);
router.patch('/me/avatar', patchUserAvatar);

module.exports = router;
