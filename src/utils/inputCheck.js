
export const idCardCheck = id =>{
    const idcardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return idcardReg.test(id)
}

export const phoneCheck = phone =>{
    const phoneReg = /^1[3|4|5|8|7][0-9]\d{8}$/
    return phoneReg.test(phone.split(' ').join(''))
}

export const passwordCheck = psw =>{
    const pswReg = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*._])[\da-zA-Z~!@#$%^&*._]{8,12}$/
    return pswReg.test(psw)

}