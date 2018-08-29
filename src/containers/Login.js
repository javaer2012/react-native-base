import React, { Component } from 'react';
import { ScrollView, Text,TouchableOpacity } from 'react-native';
import {List,InputItem,Button,WingBlank,WhiteSpace,Flex} from 'antd-mobile-rn';


export default class Login extends Component{
    static navigationOptions = {
        title:"登录"
    }
    state={
        username:"",
        password:""
    }

    constructor(props){
        super(props)
    }


    render(){

        const {username,password} = this.state;
        const {navigation} = this.props;

        return(
            <ScrollView>
              <WingBlank size="md">
                  <List renderHeader={()=>""} >
                      <InputItem type="text" value={username}
                                 onChange={(username)=>this.setState({username})}
                                 placeholder={"请输入账号或用户名"}> 用户名 </InputItem>
                      <InputItem type="password" value={password}
                                 onChange={(password)=>this.setState({password})} extra={<Text>重置</Text>}> 密码 </InputItem>

                  </List>
                  <WhiteSpace size={"xl"}/>
                  <Button onClick={()=>{console.log(this.state)}}>登录</Button>
                  <WhiteSpace size={"xl"}/>
                  <Flex direction="row" justify="between">
                      <Flex.Item>
                          <TouchableOpacity onPress={()=>navigation.navigate("RegisterPage")}>
                              <Text style={{textAlign: "left"}}>快速注册</Text>
                          </TouchableOpacity>
                      </Flex.Item>
                      <Flex.Item>
                          <TouchableOpacity onPress={()=>navigation.navigate("ForgetPSWPage")}>
                            <Text style={{textAlign:"right"}}>忘记密码？</Text>
                          </TouchableOpacity>
                      </Flex.Item>
                  </Flex>
              </WingBlank>
            </ScrollView>
        )
    }
}