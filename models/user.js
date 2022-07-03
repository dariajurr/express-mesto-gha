const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Слишком короткое значение'],
    maxlength: [30, 'Слишком длинное значение'],
  },
  about: {
    type: String,
    required: true,
    minlength: [2, 'Слишком короткое значение'],
    maxlength: [30, 'Слишком длинное значение'],
  },
  avatar: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
