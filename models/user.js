const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Неправильный формат email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: [2, 'Слишком короткое значение'],
    maxlength: [30, 'Слишком длинное значение'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, 'Слишком короткое значение'],
    maxlength: [30, 'Слишком длинное значение'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(v) {
        return /^https?:\/\/(w{3}\.)?\S+\.\w+(\/\S+)*#?/.test(v);
      },
      message: 'Неправильный формат URL',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
