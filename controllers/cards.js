const mongoose = require('mongoose');
const Card = require('../models/card');
const {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
} = require('../errors/index');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  const card = req.params.cardId;
  Card.findById(card)
    .orFail()
    .then((findCard) => {
      // eslint-disable-next-line eqeqeq
      if (findCard.owner == req.user._id) {
        Card.findByIdAndRemove(findCard)
          .then((removeCard) => res.send({ data: removeCard }));
      } else {
        next(new ForbiddenError('Недостаточно прав для удаления карточки'));
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Передан некорректный _id карточки'));
      } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError('Карточка с указанным _id не найдена'));
      }
    });
};

module.exports.putLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    {
      new: true,
    },
  )
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Передан некорректный _id карточки для постановки лайка'));
      } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError('Передан несуществующий _id карточки'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    {
      new: true,
    },
  )
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Передан некорректный _id карточки для снятии лайка'));
      } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError('Передан несуществующий _id карточки'));
      } else {
        next(err);
      }
    });
};