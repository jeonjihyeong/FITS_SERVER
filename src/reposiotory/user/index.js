//회원정보 변경
const chagneUserData =async(userIdx, newData)=>{
    try{
        await models['user'].update({
            ...newData
        },{
            where:{userIdx:userIdx}
        })
    }catch(err){
        console.log(err)
    }
}

module.exports={
    chagneUserData
}