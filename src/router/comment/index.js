const express=require('express');
const {comment}=require('../../controller')
const commentRouter= express.Router();

commentRouter.post('/',comment.writeComment);

module.exports= commentRouter