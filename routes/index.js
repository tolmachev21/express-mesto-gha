const rootRoute = require('express').Router();

rootRoute.use('/', require('./auth'));

rootRoute.use(require('../middlewares/auth'));

rootRoute.use('/cards', require('./cards'));
rootRoute.use('/users', require('./users'));
rootRoute.use('/', require('./notFound'));

rootRoute.use(require('../middlewares/error-handler'));

module.exports = rootRoute;