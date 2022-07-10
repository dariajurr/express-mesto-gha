const { celebrate, Joi } = require('celebrate');

// AUTH Validation

module.exports.singinValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.singupValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/^https?:\/\/(w{3}\.)?\S+\.\w+(\/\S+)*#?/),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

// USERS Validation

module.exports.getUserByIdValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
});

module.exports.patchUserInfoValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

module.exports.patchUserAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(/^https?:\/\/(w{3}\.)?\S+\.\w+(\/\S+)*#?/),
  }),
});

// CARDS Validation

module.exports.postCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/^https?:\/\/(w{3}\.)?\S+\.\w+(\/\S+)*#?/),
  }),
});

module.exports.cardIdValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
});
