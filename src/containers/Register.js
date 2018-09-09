import React,{Component} from 'react';
import {Image, ScrollView, StyleSheet, Text} from 'react-native';
import {List,InputItem,Button,WingBlank,WhiteSpace,Toast} from 'antd-mobile-rn';
import api from '../service/api';
import {AsyncStorage} from 'react-native';
import qs from 'qs'
import config from '../config';

const {sendMsg,registerUser} = api;
let timer = null;


export default class Register extends Component{
    static navigationOptions = {
        title:"注册"
    }
    state={
        username:"",
        password:"",
        code:"",
        count:false,
        time:5
    }
    constructor(props){
        super(props);
        //this.sendMsg();
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
    
    async sendMsg(){
        try{
            const address = await AsyncStorage.getItem('addressInfos')
            const addressData = JSON.parse(address),
                {district,citycode,provinceCode} = addressData
            const params = {
                sourceType:3,
                cityCode:citycode,
                provinceCode,
                openId:config.authAppId,
                phoneNo:this.state.username
            }
            const msg =  await sendMsg(params)
            const {data} = msg;
            console.log(msg)
            if(data.errcode === 1){
                this.setState({count:true});
                timer = setInterval(()=>{
                    this.setState({
                        time:this.state.time -1
                    })
                },1000)
            }
            else if(data.errcode === 4000){
                Toast.info('手机号不能为空',3)
            } else {
                Toast.info(data.errmsg,3)
            }
        } catch (e) {
            
        }
    }

    async register(){
        try{
            const address = await AsyncStorage.getItem('addressInfos')
            const addressData = JSON.parse(address),
                {district,citycode,provinceCode} = addressData
            const params = {
                sourceType:3,
                cityCode:citycode,
                provinceCode,
                openId:config.authAppId
            }

            const userId = await registerUser(params)
            console.log(userId)
        } catch (e) {
            console.log(e)
        }

    }

    renderCount(){
        if(this.state.count) return (<Text>{`倒计时 ${this.state.time} 秒`}</Text>)
        return (<Text style={styles.sms} onPress={this.sendMsg.bind(this)}>获取验证码</Text>)
    }


    render(){

        const {username,password,code} = this.state;
        const {navigation} = this.props;

        return(
            <ScrollView>
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
                                   extra={this.renderCount()}>
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
        color:'#F5475F'
    }
})