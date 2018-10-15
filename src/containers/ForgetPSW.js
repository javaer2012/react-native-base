import React, {Component} from 'react';
import {ScrollView, StyleSheet, Image} from 'react-native';
import {InputItem, List, Toast, WhiteSpace, WingBlank, Flex} from "antd-mobile-rn";
import api from '../service/api';
import Count from "../components/Count";
import RentApp from "../components/RentApp";
import Button from '../components/common/Button'
import {passwordCheck, phoneCheck} from "../utils/inputCheck";


export default class ForgetPSW extends RentApp {
    static navigationOptions = {
        title: "忘记密码"
    }
    state = {
        username: "",
        code: "",
        password: '',
        loading: false
    }

    constructor(props) {
        super(props)
    }

    async changePsw() {
        try {
            if (!this.state.password) {
                Toast.info("密码不能为空", 1.5)
                return
            }

            if (!phoneCheck(this.state.username)) {
                Toast.info("请输入大陆手机号", 1.5)
                return
            }

            if (!passwordCheck(this.state.password)) {
                Toast.info("密码8位以上，包含数字、大小写和特殊字符", 1.5)
                return
            }

            if (!this.state.code) {
                Toast.info("验证码", 1.5)
                return
            }

            const params = {
                openId: this.openId,
                userId: this.userId,
                password: this.state.password,
                verifyCode: this.state.code,
                phoneNo: this.state.username
            }

            const rsp = await api.appModifyPSW(params);
            console.log(rsp)
            const {data} = rsp
            if (data.errcode === 1) {
                Toast.info("修改密码成功", 1)
                setTimeout(() => this.props.navigation.navigate("LoginPage"), 2000)
            } else {
                Toast.info(data.errmsg)
            }
        } catch (e) {

        }
    }

    render() {

        const {username, code, password} = this.state;

        return (
            <ScrollView>
                <WingBlank size="md">
                    <List renderHeader={() => ""}>
                        <InputItem type="text" value={username}
                                   onChange={(username) => this.setState({username})}
                                   placeholder={"请输入手机号"}
                        >
                            <Image
                                style={styles.icon}
                                source={username ?
                                    require('../assets/copyUser.png') :
                                    require('../assets/defaultUser.png')}/>
                        </InputItem>

                        <InputItem type="password" value={password}
                                   style={{fontSize: 20}}
                                   placeholder={"请输入新密码"}
                                   onChange={(password) => this.setState({password})}>
                            <Image
                                style={styles.icon}
                                source={password ?
                                    require('../assets/selectPsw.png') :
                                    require('../assets/defaultPsw.png')}/>
                        </InputItem>

                        <InputItem type="password" value={code}
                                   extra={<Count username={this.state.username}/>}
                                   onChange={(code) => this.setState({code})}
                                   placeholder={"请输入验证码"}
                        >
                            <Image
                                style={styles.icon}
                                source={code ?
                                    require('../assets/codeSelect.png') :
                                    require('../assets/codeDefault.png')}/>
                        </InputItem>

                    </List>
                    <WhiteSpace size={"xl"}/>
                    <Flex direction={"row"} justify={"center"} align={"center"}>
                        <Button style={styles.btn} onClick={this.changePsw.bind(this)}>提交</Button>
                    </Flex>
                </WingBlank>
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({

    icon: {
        width: 18,
        height: 18,
        resizeMode: 'stretch'
    },
    input: {
        height: 53,
    },
    btn: {
        fontSize: 20,
        width: '100%',
        color: 'white',
        backgroundColor: '#06C1AE',
        borderColor: '#06C1AE'
    },
    sms: {
        color: '#F5475F',
        fontSize: 15
    },
    timer: {
        color: '#989898',
        fontSize: 13
    }
})