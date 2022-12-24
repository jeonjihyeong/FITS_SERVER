const { promisify } = require('util');
const redisClient = require('./redis.util');
const jwt = require("jsonwebtoken")

module.exports={
    //  토큰생성
    signToken : async(payload) => {
        try{
            return jwt.sign(payload, process.env.JWT_KEY,{
            algorithm: 'HS256',
            expiresIn: '5h',
            })
        }catch(err){
            console.log(err)
        }
    },

    // 토큰해석
    decodeToken : async(anyToken)=>{
        console.log(anyToken)
        try{
            return jwt.decode(anyToken, process.env.JWT_KEY)
        } catch(err){
            if (err.name==='TokenExpiredError')throw new Error("EXPIRED_TOKEN");
            throw new Error("INVALID_TOKEN")
        }
    },

    // 토큰 검증
    verifyToken : async(anyToken)=>{
        try {
            jwt.verify(anyToken, process.env.JWT_KEY);
            return true;
        }catch(err){
            if (err.name==='TokenExpiredError')throw new Error("EXPIRED_TOKEN");
            throw new Error("INVALID_TOKEN")
        }
    },

    // 리프레쉬 토큰
    signRefreshToken : async()=>{
        return jwt.sign({},process.env.JWT_KEY,{
            algorithm:'HS256',
            expiresIn: '14d',
        });
    },

    // 리프레쉬 토큰 검증
    refreshVerify: async(token, email) => {
        const getAsync = promisify(redisClient.get).bind(redisClient);

        try {
            const data = await getAsync(email); // refresh token 가져오기
            if (token === data) {
                try {
                    jwt.verify(token, secret);
                    return true;
                } catch (err) {
                    return false;
                }
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    },
}

