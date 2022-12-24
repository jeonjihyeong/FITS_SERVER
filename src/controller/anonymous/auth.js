//임시 참고용 복붙

const db = require("../models");
const Member = db.Member;

const crypto = require('crypto');

const jwt = require('../utils/jwt.util');
const redisClient = require("../utils/redis.util");

exports.login = async (req, res) => {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        return res.status(200).json({
            status: 400,
            message: "Error: Body(JSON)값이 비어있습니다."
        });
    }
    if (req.body.hasOwnProperty('email') === false || req.body.hasOwnProperty('password') === false) {
        return res.status(200).json({
            status: 400,
            message: "Error: 이메일 또는 비밀번호가 없습니다."
        });
    }

    const {email, password} = req.body

    let info = {type: false, message: ''};

    crypto.createHash('sha512').update(password).digest('base64');
    let hex_password = crypto.createHash('sha512').update(password).digest('hex');
    
    let org_password = '';

    await Member.findOne({
        where: {email: email}
    }).then(respond => {

        if (!respond) {

            info.message = '존재하지 않는 유저입니다.'
            return res.status(200).json({
                status: 403,
                info: info,
            });

        } else {

            org_password = respond.password;

            if (hex_password === org_password) {

                const accessToken = jwt.sign(respond.email);
                const refreshToken = jwt.refresh();

                redisClient.set(respond.email, refreshToken);

                info.message = 'success';
                res.setHeader('Content-Type','application/json; charset=utf-8');
                res.setHeader('Authorization', 'Bearer ' + accessToken);
                res.setHeader('Refresh', 'Bearer ' + refreshToken);
                return res.status(200).json({
                    status: 200,
                    info: info,
                    token: {
                        accessToken: accessToken,
                        refreshToken: refreshToken
                    }
                });

            } else {

                info.message = '비밀번호가 일치하지 않습니다.'
                return res.status(200).json({
                    status: 403,
                    info: info,
                });

            }

        }

    }).catch(err => {
        info.message = '로그인 실패 : ' + err;
        return res.status(200).json({
            status: 500,
            info: info,
        });
    });

}