const {models, Op}= require('../../lib/db')

const writeComment=async(userIdx,noteIdx,comment)=>{
    let timestamp = new Date().getTime();
    try{
        await models['comment'].create({
            userIdx: userIdx,
            comment: comment,
            noteIdx: noteIdx,
            created: timestamp
        })
    }catch(err){
        console.log(err);
    }
}

const getComment=async(noteIdx)=>{
    let result;
    try{
        result = await models['comment'].findAll({
            include:models['user'],
            where:{
                noteIdx:noteIdx
            }
        })
        return result;
    }catch(err){
        console.log(err);
    }
}

module.exports={
    writeComment, getComment
}