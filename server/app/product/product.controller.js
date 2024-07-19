const productsService = require('./product.service');

exports.getTopPicks = (req, res) => {
    console.log('ProductsController.getTopPicks')
    productsService.getTopPicks(req, res);
}
