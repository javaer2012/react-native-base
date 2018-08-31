import React,{Component} from 'react';
import {Image, ScrollView, StyleSheet, Text} from 'react-native';
import {List,InputItem,Button,WingBlank,WhiteSpace} from 'antd-mobile-rn';


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
                                   extra={<Text style={styles.sms}>获取验证码</Text>}>
                            <Image
                                style={styles.icon}
                                source={code?
                                    require('../assets/codeSelect.png'):
                                    require('../assets/codeDefault.png')}/>
                        </InputItem>

                    </List>
                    <WhiteSpace size={"xl"}/>
                    <Button onClick={()=>navigation.navigate("DrawerPage")}>注册</Button>
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