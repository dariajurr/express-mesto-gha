const router = require('express').Router();
const {
  getUser, getUserById, getUserMe, patchUserInfo, patchUserAvatar,
} = require('../controllers/users');
const { getUserByIdValidation, patchUserInfoValidation, patchUserAvatarValidation } = require('../middlewares/validation');

router.get('/', getUser);
router.get('/me', getUserMe);
router.get('/:id', getUserByIdValidation, getUserById);
router.patch('/me', patchUserInfoValidation, patchUserInfo);
router.patch('/me/avatar', patchUserAvatarValidation, patchUserAvatar);

module.exports = router;
