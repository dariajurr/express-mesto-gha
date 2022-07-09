const { celebrate, Joi } = require('celebrate');

module.exports.singupValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/~^https?:\/\/\S+(?:jpg|jpeg|png|gif)$~/),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});
