const {anonymousReposiotory} =require('../../reposiotory')
const jwt=require('../../lib/common/token')
const mailSender = require('../../lib/common/mailer')
const {salt,encryptionPassWord,decryptionPassWord} =require('../../lib/common/hashing')
const {signUpMail,findIdMail,findPwMail} =require('../../lib/common/setMail')
const redisClient = require("../../lib/common/redis.util");

// 로그인
const login = async(req, res,next) => {
    let result;
    try{
      const data=req.body;
      const idData=await anonymousReposiotory.getUserId(data.id);
      if(idData===null){
        res.send ({message: 'idFailed'})
      }else {
          const decodePW = decryptionPassWord(data.pw,idData.salt);
          const pwData=idData.dataValues.pw
          if(decodePW!==pwData){
              res.send({message: 'pwFailed'})
          }else {
            delete idData.dataValues.pw;
            console.log(idData.dataValues.userIdx);
            delete idData.dataValues.salt;
            const SECRET_KEY = process.env.JWT_KEY; 
            console.log(SECRET_KEY)
            const accessToken = await jwt.signToken({...idData.dataValues});
            const refreshToken = await jwt.signRefreshToken();
            redisClient.set(idData.dataValues.email, refreshToken);
            res.send({
              token:{
                accessToken:accessToken,
                refreshToken:refreshToken,
            }});
          }
        }
      }catch(err){
        console.log(err);
        next(err)
      }
  }

const login2 = async(req,res)=>{
  if(req.body===null||req.body===undefined){
    return res.status(200).json({
      status: 400,
      message: "Error: Body(JSON)값이 비어있습니다."
    });
  } 
  if(req.body.hasOwnProperty('id')===false||req.body.hasOwnProperty('pw')===false){
    return res.status(200).json({
      message:"Error: 이메일 또는 비밀번호가 없습니다."
    });
  }
  try{
    await anonymousReposiotory.login()
  }catch(err){
    console.log(err);
  }
}

// 회원가입
const signup = async(req,res)=>{
    const data= req.body;
    try{
      if (await anonymousReposiotory.getUserId(data.id)!==null){
        console.log('id가 이미 존재합니다.');
        res.send({data: 0})
      }
      else{
          const hashPw = encryptionPassWord(data.pw);
          const payload={
            ...data,
            pw:hashPw,
            salt:salt,
          }
          await anonymousReposiotory.saveUser(payload);
          res.send({data: 1})
        }
      }catch(err){
          console.log(err);
          res.send({message:`ERROR: ${err}`});
          next(err)
      }
}

// 회원가입 메일
const sendSignUpMail = async(req,res)=>{
    const mail_data = req.body.email;
    const signUpText = signUpMail()
    try{
        await mailSender.sendGmail(signUpText.mailText, mail_data)
        res.send({data:signUpText.auth_key})
    }catch(err){
        console.log(err);
        next(err)
    }
}

// 아이디 찾기 메일
const sendFindIdMail = async(req,res)=>{
  try{
    console.log("controller")
    if(await anonymousReposiotory.getEmailData(req.body)===null){
      res.send({message:"No User Data"});
      console.log("No User Data")
    }else{
      console.log(req.body)
      const mail_data = req.body.email;
      const findIdMailText = findIdMail(req.body)
      mailSender.sendGmail(findIdMailText, mail_data)
      res.send({data:1})
    }
    }catch(err){
        console.log(err);
        next(err)
    }
}

// 비밀번호 찾기 메일
const sendFindPwMail = async(req,res)=>{
  try{
    console.log(req.body);
    const pwData =  await anonymousReposiotory.getPwData(req.body.id,req.body.email,req.body.name)
    if(pwData===null||pwData===undefined){
      res.send({message:"No User Data"})
      console.log("No User Data")
    }else{
      console.log(req.body)
      const mail_data =req.body.email;
      const findPwMailText = findPwMail(req.body.name)
      mailSender.sendGmail(findPwMailText.mailText,mail_data)
      res.send({data:findPwMailText.auth_key})
    }
  }catch(err){
    console.log(err);
    next(err)
  }
}

// 비밀번호 변경하기
const changePw = async(req,res)=>{
  try{
    console.log(req.body);
    let changePwUserData = await anonymousReposiotory.getPwData(req.body)
    if(changePwUserData===null||changePwUserData===undefined){
      res.send({message:"No User Data"})
      console.log("No user Data")
    }else{
      let inCodeNewPw ={
        hashPw: encryptionPassWord(req.body.new_Pw),
        salt: salt
      }
      await anonymousReposiotory.changePassword(changePwUserData.userIdx,inCodeNewPw);
      res.send({data: 1})
    }
  }catch(err){
    console.log(err)
    next(err)
  }
}

module.exports={
    login,
    signup,
    sendSignUpMail,
    sendFindIdMail,
    sendFindPwMail,
    changePw
}