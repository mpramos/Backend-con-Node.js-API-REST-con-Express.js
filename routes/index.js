const productsRouter= require('./products.router');
const userRouter= require('./user.router');
const express=require('express');

function routerApi(app) {
  const router= express.Router();
  app.use('/api/v1', router)
    router.use('/products',productsRouter);
    router.use('/users',userRouter);

    app.use('/api/users',userRouter);
    // app.use('/categories',categoryRouter);

}
module.exports= routerApi;
