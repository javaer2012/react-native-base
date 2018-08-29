import React, { Component } from 'react';
import { View,ScrollView, Text,TouchableOpacity,StyleSheet,Image,TextInput } from 'react-native';
import {List,InputItem,Button,WingBlank,WhiteSpace,Flex} from 'antd-mobile-rn';
import logo from '../assets/logo.png';


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
                  <WhiteSpace size={"xl"}/>

                  <View style={styles.imgContainer}>
                      <Image style={styles.img} source={logo}/>
                  </View>


                  <WhiteSpace size={"xl"}/>
                  <List style={{borderWidth:1,borderColor:'#D2D2D2'}}>
                      <InputItem type="text" value={username}
                                 style={{fontSize:40}}
                                 onChange={(username)=>this.setState({username})}
                                 placeholder={"请输入账号或用户名"}>
                          <Image
                              style={styles.icon}
                              source={username?
                                  require('../assets/copyUser.png'):
                                  require('../assets/defaultUser.png')}/>
                      </InputItem>
                      <InputItem type="password" value={password}
                                 style={{fontSize:20}}
                                 onChange={(password)=>this.setState({password})} >
                          <Image
                              style={styles.icon}
                              source={password?
                                  require('../assets/selectPsw.png'):
                                  require('../assets/defaultPsw.png')}/>
                      </InputItem>

                  </List>
                  <WhiteSpace size={"xl"}/>
                  <Button type="primary" style={styles.btn} onClick={()=>{console.log(this.state)}}>
                      <Text style={{color:'white',fontSize:20}}>登录</Text>
                  </Button>
                  <WhiteSpace size={"xl"}/>
                  <Flex direction="row" justify="between">
                      <Flex.Item>
                          <TouchableOpacity onPress={()=>navigation.navigate("RegisterPage")}>
                              <Text style={styles.textLeft}>快速注册</Text>
                          </TouchableOpacity>
                      </Flex.Item>
                      <Flex.Item>
                          <TouchableOpacity onPress={()=>navigation.navigate("ForgetPSWPage")}>
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
    imgContainer:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    img:{
        width:84,
        height:66
    },
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
    textLeft:{
        textAlign:'left',
        color:'#989898',
        fontSize:13,
        height:13
    },
    textRight:{
        textAlign:'right',
        color:'#989898',
        fontSize:13,
        height:13
    }
})