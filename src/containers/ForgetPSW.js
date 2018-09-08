import React,{Component} from 'react';
import {View, Text, ScrollView, StyleSheet, Image} from 'react-native';
import {Button, InputItem, List, WhiteSpace, WingBlank} from "antd-mobile-rn";
import {Flex} from "antd-mobile-rn/lib/flex/index.native";


export default class ForgetPSW extends Component{
    static navigationOptions = {
        title:"忘记密码"
    }
    state={
        username:"",
        code:""
    }

    constructor(props){
        super(props)
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
                                   extra={<Text style={styles.sms}>获取验证码</Text>}>
                            <Image
                                style={styles.icon}
                                source={username?
                                    require('../assets/copyUser.png'):
                                    require('../assets/defaultUser.png')}/>
                        </InputItem>
                        <InputItem type="password" value={code}
                                   onChange={(code)=>this.setState({code})}
                                   extra={<Text style={styles.timer}>倒计时60秒</Text>}>
                            <Image
                                style={styles.icon}
                                source={code?
                                    require('../assets/codeSelect.png'):
                                    require('../assets/codeDefault.png')}/>
                        </InputItem>

                    </List>
                    <WhiteSpace size={"xl"}/>
                    <Button onClick={()=>navigation.navigate("ChangePSWPage")}>下一步</Button>
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