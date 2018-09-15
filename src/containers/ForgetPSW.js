import React,{Component} from 'react';
import {View, Text, ScrollView, StyleSheet, Image, AsyncStorage} from 'react-native';
import {Button, InputItem, List, Toast, WhiteSpace, WingBlank} from "antd-mobile-rn";
import {Flex} from "antd-mobile-rn/lib/flex/index.native";
import api from '../service/api';
import config from "../config";
import Count from "../components/Count";
import RentApp from "../components/RentApp";

const {appLogin,appCheckSMSCode} = api



export default class ForgetPSW extends RentApp{
    static navigationOptions = {
        title:"忘记密码"
    }
    state={
        username:"",
        code:"",
        loading:false
    }

    constructor(props){
        super(props)
    }


    async checkSmsCode(){
        try {

            const params = {
                openId:this.openId,
                userId:this.userId,
                verifyCode:this.state.code,
                phoneNo:this.state.username
            }

            const rsp = await appCheckSMSCode(params)
            console.log(rsp)
            const {data} = rsp;
            if(data.errcode === 1){
                this.props.navigation.navigate("ChangePSWPage",{
                    phoneNp:this.state.username
                })
            } else {
                Toast.info(data.errmsg,2)
            }

        } catch (e) {

        }
    }

    render(){

        const {username,code} = this.state;
        const {navigation} = this.props;

        return(
            <ScrollView>
                <WingBlank size="md">
                    <List renderHeader={()=>""} >
                        <InputItem type="text" value={username}
                                   onChange={(username)=>this.setState({username})}
                                   placeholder={"请输入手机号"}
                                   extra={<Count username={this.state.username}/>}>
                            <Image
                                style={styles.icon}
                                source={username?
                                    require('../assets/copyUser.png'):
                                    require('../assets/defaultUser.png')}/>
                        </InputItem>
                        <InputItem type="password" value={code}
                                   onChange={(code)=>this.setState({code})}>
                            <Image
                                style={styles.icon}
                                source={code?
                                    require('../assets/codeSelect.png'):
                                    require('../assets/codeDefault.png')}/>
                        </InputItem>

                    </List>
                    <WhiteSpace size={"xl"}/>
                    <Button onClick={this.checkSmsCode.bind(this)}>下一步</Button>
                </WingBlank>
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({

    icon:{
        width:18,
        height:18,
        resizeMode: 'stretch'
    },
    input:{
        height:53,
    },
    btn:{
        backgroundColor: '#06C1AE',
        borderColor:'#06C1AE'
    },
    sms:{
        color:'#F5475F',
        fontSize:15
    },
    timer:{
        color: '#989898',
        fontSize:13
    }
})