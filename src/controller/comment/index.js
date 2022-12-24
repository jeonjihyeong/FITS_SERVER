const { commentService }=require("../../reposiotory");

const writeComment=async(req,res)=>{
    try{
        const reqInfo =req.body;
        const userInfo = req.decode;
        await commentService.writeComment(userInfo.userIdx,reqInfo.noteIdx,reqInfo.comment)
        res.send({data:"success"})
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:"comment Error"
        })
    }
}


module.exports={
    writeComment
}