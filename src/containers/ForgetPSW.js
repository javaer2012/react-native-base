import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet, Image, AsyncStorage} from 'react-native';
import {Button, InputItem, List, Toast, WhiteSpace, WingBlank} from "antd-mobile-rn";
import {Flex} from "antd-mobile-rn/lib/flex/index.native";
import api from '../service/api';
import config from "../config";
import Count from "../components/Count";
import RentApp from "../components/RentApp";

const {appLogin, appCheckSMSCode} = api


export default class ForgetPSW extends RentApp {
    static navigationOptions = {
        title: "忘记密码"
    }
    state = {
        username: "",
        code: "",
        password:'',
        loading: false
    }

    constructor(props) {
        super(props)
    }

    async changePsw(){
        try{

            const params = {
                openId:this.openId,
                userId : this.userId,
                password:this.state.password,
                verifyCode:this.state.code,
                phoneNo:this.state.username
            }

            const rsp = await api.appModifyPSW(params);
            console.log(rsp)
            const {data} = rsp
            if(data.errcode === 1){
                Toast.info("修改密码成功",1)
                setTimeout(()=>this.props.navigation.navigate("LoginPage"),2000)
            } else {
                Toast.info(data.errmsg)
            }
        } catch (e) {

        }
    }

    render() {

        const {username, code,password} = this.state;
        const {navigation} = this.props;

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
                                   onChange={(code) => this.setState({code})}>
                            <Image
                                style={styles.icon}
                                source={code ?
                                    require('../assets/codeSelect.png') :
                                    require('../assets/codeDefault.png')}/>
                        </InputItem>

                    </List>
                    <WhiteSpace size={"xl"}/>
                    <Button onClick={this.changePsw.bind(this)}>提交</Button>
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