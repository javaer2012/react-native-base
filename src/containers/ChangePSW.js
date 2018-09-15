import React, { Component } from 'react';
import {AsyncStorage, Image, ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {List,InputItem,Button,WingBlank,WhiteSpace,Toast} from 'antd-mobile-rn';
import api from "../service/api";
import RentApp from "../components/RentApp";


export default class ChangePSW extends RentApp{
    static navigationOptions = {
        title:"修改密码"
    }
    state={
        oPSW:"",
        nPSW:""
    }

    constructor(props){
        super(props)
    }

    async changePsw(){
        try{

            const params = {
                openId:this.openId,
                userId : this.userId,
                password:this.state.oPSW,
                newPassword:this.state.nPSW
            }

            const rsp = await api.appModifyPSW(params);
            console.log(rsp)
            const {data} = rsp
            if(data.errcode === 1){
                Toast.info("修改密码成功",2)
                setTimeout(()=>this.props.navigation.navigate("LoginPage"),2000)
            } else {
                Toast.info(data.errmsg)
            }
        } catch (e) {

        }
    }


    render(){

        const {oPSW,nPSW} = this.state;
        const {navigation} = this.props;

        return(
            <ScrollView>
                <WingBlank size="md">
                    <List renderHeader={()=>""} >
                        <InputItem type="password" value={oPSW}
                                   onChange={(oPSW)=>this.setState({oPSW})}
                                   placeholder={"请输入旧密码"}>
                            <Image
                                style={styles.icon}
                                source={oPSW?
                                    require('../assets/selectPsw.png'):
                                    require('../assets/defaultPsw.png')}/>
                        </InputItem>
                        <InputItem type="password" value={nPSW}
                                   onChange={(nPSW)=>this.setState({nPSW})}
                                   placeholder={"请输入新密码"}>
                            <Image
                                style={styles.icon}
                                source={nPSW?
                                    require('../assets/confirmSelect.png'):
                                    require('../assets/confirmDefault.png')}/>
                        </InputItem>

                    </List>
                    <WhiteSpace size={"xl"}/>
                    <Button style={styles.btn} onClick={this.changePsw.bind(this)}>完成</Button>

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

    btn:{
        backgroundColor: '#06C1AE',
        borderColor:'#06C1AE'
    }
})