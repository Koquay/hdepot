const router = require('express').Router();
const productsController = require('./product.controller');

router.get('/tabs', productsController.getTopPicks)

module.exports = router;