const indexRoutes = require('../index/index.routes');
const productRoutes = require('../product/product.routes');


module.exports = (app) => {
    // app.use('/api/productTabs', productRoutes)
    // app.use('/api/cart', cartRoutes)
    app.use('/api/product', productRoutes)
    // app.use('/api/productTypes', productsRoutes)
    // app.use('/api/category', categoryRoutes)
    // app.use('/api/user', userRoutes)
    app.use('/*', indexRoutes);
}
