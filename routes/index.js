const rootRoute = require('express').Router();

rootRoute.use('/cards', require('./cards'));
rootRoute.use('/users', require('./users'));
rootRoute.use('/', require('./notFound'));

module.exports = rootRoute;