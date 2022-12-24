const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
const bodyParser = require('body-parser')
const {db}= require('./src/lib/index')
const router = require('./src/router')
const errorHandler =require('./src/lib/common/error')
const qs = require('qs')
require('express-async-errors');

require('dotenv').config();

app.use(bodyParser.json())
app.use(cors());

    
app.use(router.basicRouter);
    
app.use(async (err, req, res, next) => {
  console.log(err.message);
  console.log("에러처리기");
  if(err.message in errorHandler){
      res.status(errorHandler[err.message].status).send({message : errorHandler[err.message].message});
      // next();
      // return;
    }else {
      res.send({message : '시스템 오류가 발생했습니다. 잠시 후 시도해주세요.'});
      next();
      return;
  }
})
      

app.listen(port, async () => {
  console.log(`FITS_SERVER_LISTENING_ON_PORT ${port}`)
  await db.initialize()
})