/* eslint-disable */
const emailForm = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/ //이메일 형식
const passwordForm = /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/ //8자리이상 영문 대소문자 숫자 특수문자 한개씩 필요
const idForm = /^[a-zA-Z0-9]*$/ //공백제외 영어,숫자

export default {
    checkEmail:(email)=>{
        if (!email){
            throw new Error('INVALID_REQUEST')
        }
        if (!emailForm.test(email)){
            throw new Error('INVALID_REQUEST')
        }
        return;
    },
    checkId:(id)=>{
        if (!id){
            throw new Error('INVALID_REQUEST')
        }
        if(id.length <5){
            throw new Error('INVALID_REQUEST')
          }
        if(id.length > 15){
            throw new Error('INVALID_REQUEST')
        }
        if(!idForm.test(id)){
            throw new Error('INVALID_REQUEST')
        }
        return;
    },
    checkPw : (pw) => {
        if (!pw){
            throw new Error('INVALID_REQUEST')
        }
        if (!passwordForm.test(pw)){
            throw new Error('INVALID_REQUEST')
        }
        return
    },
    checkNickName : (nickName) => {
        if(!nickName){
            throw new Error('INVALID_REQUEST')
        }
        if(nickName.length <3){
            throw new Error('INVALID_REQUEST')
        }
        if(nickName.length > 12){
            throw new Error('INVALID_REQUEST')
        }
        return;
      }
}