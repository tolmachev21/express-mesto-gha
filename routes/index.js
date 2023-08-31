const rootRoute = require('express').Router();
const { errors } = require('celebrate');

rootRoute.use('/', require('./auth'));

rootRoute.use(require('../middlewares/auth'));

rootRoute.use('/cards', require('./cards'));
rootRoute.use('/users', require('./users'));
rootRoute.use('/', require('./notFound'));

rootRoute.use(errors());

rootRoute.use(require('../middlewares/error-handler'));

module.exports = rootRoute;