import React, {Component} from 'react';
import {View, ScrollView, Text, TouchableOpacity, StyleSheet, Image, AsyncStorage} from 'react-native';
import {List, InputItem, WingBlank, WhiteSpace, Flex, Toast} from 'antd-mobile-rn';
import logo from '../assets/logo.png';
import api from '../service/api';
import Button from '../components/common/Button'
import Count from '../components/Count';
import RentApp from "../components/RentApp";
import {passwordCheck, phoneCheck} from "../utils/inputCheck";


const {appLogin} = api


export default class Login extends RentApp {
    static navigationOptions = {
        title: "登录"
    }
    state = {
        username: "",
        password: "",
        code: null,
        loading: false
    }

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        await this.getOpenIdAndUserId()
    }

    async login() {
        if (!this.state.username || !this.state.password) {
            Toast.info("用户名和密码不能为空", 1.5)
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
        try {
            const {username, password, code} = this.state;
            const params = {
                openId: this.openId,
                password,
                phoneNo: username,
                verifyCode: code
            }
            const login = await appLogin(params);
            console.log(login)
            const {data} = login;
            if (data.errcode === 1) {

                const {userInfo} = data

                const uInfoParams = {
                    userId: userInfo.userId,
                    openId: userInfo.openId,
                    cityCode: this.cityCode,
                    provinceCode: this.provinceCode,
                }

                const uInfo = await api.getUserInfo(uInfoParams)

                console.log(uInfo)

                if (uInfo.data.errcode === 1) {

                    uInfo.data.userInfo.isLoggedIn = '1'

                    const rsp = await AsyncStorage.multiSet([['userInfo', JSON.stringify(uInfo.data.userInfo)], ['userId', userInfo.userId], ['openId', userInfo.openId], ['isLoggedIn', '1']])

                    const fromPage = this.props.navigation.getParam('fromPageName', "MyPage")
                    const fromPageParams = this.props.navigation.getParam('fromPageParams', {})

                    this.props.navigation.navigate(fromPage, {
                        useNavParams: true,
                        userInfo: uInfo.data.userInfo,
                        ...fromPageParams
                    })
                }


            } else {
                Toast.info(data.errmsg, 1)
            }

        } catch (e) {

        }


    }


    render() {

        const {username, password, code} = this.state;
        const {navigation} = this.props;

        return (
            <ScrollView>
                <WingBlank size="md">
                    <WhiteSpace size={"xl"}/>

                    <View style={styles.imgContainer}>
                        <Image style={styles.img} source={logo}/>
                    </View>


                    <WhiteSpace size={"xl"}/>
                    <List style={{borderWidth: 1, borderColor: '#D2D2D2'}}>
                        <InputItem type="text" value={username}
                                   style={{fontSize: 40}}
                                   onChange={(username) => this.setState({username})}
                                   placeholder={"请输入账号或用户名"}>
                            <Image
                                style={styles.icon}
                                source={username ?
                                    require('../assets/copyUser.png') :
                                    require('../assets/defaultUser.png')}/>
                        </InputItem>
                        <InputItem type="password" value={password}
                                   style={{fontSize: 20}}
                                   onChange={(password) => this.setState({password})}
                                   placeholder={"请输入密码"}
                        >
                            <Image
                                style={styles.icon}
                                font source={password ?
                                require('../assets/selectPsw.png') :
                                require('../assets/defaultPsw.png')}/>
                        </InputItem>

                        <InputItem type="number" value={code}
                                   onChange={(code) => this.setState({code})} placeholder={"请输入验证码"}
                                   extra={<Count username={this.state.username}/>}>
                            <Image
                                style={styles.icon}
                                source={code ?
                                    require('../assets/codeSelect.png') :
                                    require('../assets/codeDefault.png')}/>
                        </InputItem>

                    </List>
                    <WhiteSpace size={"xl"}/>
                    <Flex direction={"row"} justify={"center"} align={"center"}>
                        <Button style={styles.btn} onClick={this.login.bind(this)}>
                            登录
                        </Button>
                    </Flex>
                    <WhiteSpace size={"xl"}/>
                    <Flex direction="row" justify="between">
                        <Flex.Item>
                            <TouchableOpacity onPress={() => navigation.navigate("RegisterPage")}>
                                <Text style={styles.textLeft}>快速注册</Text>
                            </TouchableOpacity>
                        </Flex.Item>
                        <Flex.Item>
                            <TouchableOpacity onPress={() => navigation.navigate("ForgetPSWPage")}>
                                <Text style={styles.textRight}>忘记密码？</Text>
                            </TouchableOpacity>
                        </Flex.Item>
                    </Flex>
                </WingBlank>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    imgContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    img: {
        width: 84,
        height: 66
    },
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
        backgroundColor: '#06C1AE',
        borderColor: '#06C1AE'
    },
    textLeft: {
        textAlign: 'left',
        color: '#989898',
        fontSize: 13,
        height: 15,
        lineHeight: 15
    },
    textRight: {
        textAlign: 'right',
        color: '#989898',
        fontSize: 13,
        height: 15,
        lineHeight: 15
    }
})