import React,{Component} from 'react';
import { ScrollView, Text,TouchableOpacity } from 'react-native';
import {List,InputItem,Button,WingBlank,WhiteSpace,Flex} from 'antd-mobile-rn';


export default class Register extends Component{
    static navigationOptions = {
        title:"注册"
    }
    state={
        username:"",
        password:"",
        code:""
    }
    constructor(props){
        super(props)
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
                            用户名
                        </InputItem>
                        <InputItem type="password" value={password}
                                   onChange={(password)=>this.setState({password})}>
                            密码
                        </InputItem>
                        <InputItem type="number" value={code}
                                   onChange={(code)=>this.setState({code})} placeholder={"请输入验证码"}
                                   extra={<Text>获取验证码</Text>}>
                            验证码
                        </InputItem>

                    </List>
                    <WhiteSpace size={"xl"}/>
                    <Button onClick={()=>navigation.navigate("LoginPage")}>注册</Button>
                    <WhiteSpace size={"xl"}/>

                </WingBlank>
            </ScrollView>
        )
    }
}