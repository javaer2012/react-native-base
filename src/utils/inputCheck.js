
export const idCardCheck = id =>{
    const idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
    return idcardReg.test(id)
}

export const phoneCheck = phone =>{
    const phoneReg = /^1[3|4|5|8|7][0-9]\d{4,8}$/
    return phoneReg.test(phone.split(' ').join(''))
}

export const passwordCheck = psw =>{
    const pswReg = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*._])[\da-zA-Z~!@#$%^&*._]{8,12}$/
    return pswReg.test(psw)

}