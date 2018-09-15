import React,{Component} from 'react';
import {Image, View, StyleSheet, Text} from 'react-native';
import {List,InputItem,Button,WingBlank,WhiteSpace,Toast,ActivityIndicator} from 'antd-mobile-rn';
import api from '../service/api';
import {AsyncStorage} from 'react-native';
import config from '../config';
import Count from "../components/Count";
import RentApp from "../components/RentApp";

const {sendMsg,registerAndBind} = api;


export default class Register extends RentApp{
    static navigationOptions = {
        title:"注册"
    }
    state={
        username:"",
        password:"",
        code:"",
        loading:false,
    }
    constructor(props){
        super(props);
    }


    componentDidUpdate(){
        if(this.state.time === 0){
            clearInterval(timer)
            this.setState({
                time:5,
                count:false
            });

        }
    }

    async register(){
        try{
            await this.setState({
                loading:true
            })

            const params = {
                sourceType:3,
                cityCode:this.cityCode,
                provinceCode:this.provinceCode,
                phoneNo:this.state.username,
                password:this.state.password,
                verifyCode:this.state.code,
                openId:this.openId || config.authAppId,
                userId:this.userId || config.authAppSecret
            }
            console.log(params)
            const userId = await registerAndBind(params)
            this.setState({loading:false})
            const {data} = userId;
            if(data.errcode === 1){
                await AsyncStorage.setItem('userId',data.userId);
                Toast.info("注册成功！",2);
                setTimeout(()=>{
                    this.props.navigation.navigate("LoginPage")
                },2000)
            } else {
                Toast.info(data.errmsg,2)
            }
            console.log(userId)
        } catch (e) {
            console.log(e)
        }

    }


    render(){

        const {username,password,code} = this.state;
        const {navigation} = this.props;

        return(
            <View>
                <ActivityIndicator style={{alignItems: 'center',justifyContent: 'center'}} size={"large"} animating={this.state.loading}/>
                <WingBlank size="md">
                    <List renderHeader={()=>""} >
                        <InputItem type="text" value={username}
                                   onChange={(username)=>this.setState({username})}
                                   placeholder={"请输入账号或用户名"}>
                            <Image
                                style={styles.icon}
                                source={username?
                                    require('../assets/copyUser.png'):
                                    require('../assets/defaultUser.png')}/>
                        </InputItem>
                        <InputItem type="password" value={password}
                                   onChange={(password)=>this.setState({password})}>
                            <Image
                                style={styles.icon}
                                source={password?
                                    require('../assets/selectPsw.png'):
                                    require('../assets/defaultPsw.png')}/>
                        </InputItem>
                        <InputItem type="number" value={code}
                                   onChange={(code)=>this.setState({code})} placeholder={"请输入验证码"}
                                   extra={<Count username={this.state.username}/>}>
                            <Image
                                style={styles.icon}
                                source={code?
                                    require('../assets/codeSelect.png'):
                                    require('../assets/codeDefault.png')}/>
                        </InputItem>

                    </List>
                    <WhiteSpace size={"xl"}/>
                    <Button onClick={()=>this.register()}>注册</Button>
                    <WhiteSpace size={"xl"}/>

                </WingBlank>
            </View>
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
        color:'#F5475F'
    }
})