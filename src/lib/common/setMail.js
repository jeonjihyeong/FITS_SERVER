const {randomString} = require("./numberGenerator")
// 회원가입 메일
const signUpMail =()=> {
  const auth_key = randomString()
  const mailText={
    subject: "FITS 회원가입 인증번호", 
    html: `<p>${auth_key}</p>`
  }
  return {mailText,auth_key}
};
// 아이디 찾기 메일
const findIdMail=({name,id}) => {
  const mailText ={
    subject: `${name} 회원님 아이디 찾기 결과입니다.`,
    html: `<div>${name} 회원님 아이디 찾기 결과입니다.
          <p>${id}</p></div>`
  }
  return mailText;
}
// 비밀번호 찾기 메일
const findPwMail=(name) => {
  const auth_key = randomString()
  const mailText ={
    subject: `${name} 회원님 비밀번호 찾기 결과입니다.`,
    html: `<div>${name} 회원님 비밀번호 찾기 결과입니다.</div>
          <p>${auth_key}</p>`
  }
  return {mailText,auth_key};
}



module.exports = {
    signUpMail,findIdMail,findPwMail
}