const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Это обязательное поле!'],
    minlength: [2, 'Минимальная длина названия 2 символа'],
    maxlength: [30, 'Максимальная длина названия 30 символов'],
  },
  link: {
    type: String,
    required: [true, 'Это обязательное поле!'],
    validate: {
      validator(v) {
        return isURL(v);
      },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);