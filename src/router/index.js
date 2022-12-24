const express = require('express')
const middleware = require('../lib/common/middleware');
const basicRouter= express.Router();
const anonymousRouter = require(('./anonymous'));
const noteRouter = require(('./note'));
const commentRouter = require(('./comment'));
const userRouter = require(('./user'));

basicRouter.use('/',anonymousRouter)
basicRouter.get('/refresh',middleware.refreshToken)
basicRouter.use('/note',middleware.validateToken,noteRouter)
basicRouter.use('/comment',middleware.validateToken,commentRouter)
basicRouter.use('/user',middleware.validateToken,userRouter)

module.exports ={
    basicRouter
}