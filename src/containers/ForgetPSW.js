import React,{Component} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
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
                                   extra={<Text>获取验证码</Text>}> 用户名 </InputItem>
                        <InputItem type="password" value={code}
                                   onChange={(code)=>this.setState({code})}
                                   extra={<Text>倒计时60秒</Text>}> 验证码 </InputItem>

                    </List>
                    <WhiteSpace size={"xl"}/>
                    <Button onClick={()=>navigation.navigate("ChangePSWPage")}>下一步</Button>
                </WingBlank>
            </ScrollView>
        )
    }
}