import React from 'react'
import {View, Text, StyleSheet, AsyncStorage, TouchableOpacity} from 'react-native';
import api from '../service/api';
import config from "../config";
import {Toast} from "antd-mobile-rn";

const {sendMsg} = api
let timer = null;

export default class Count extends React.Component {


    state = {
        time: 5,
        count: false
    }

    async sendMsg() {
        console.log("Send Message")
        if(!this.props.username){
            Toast.info("手机号不能为空")
            return
        }
        try {
           await this.setState({
                count: true
            })

            timer = setInterval(() => {
                this.setState({
                    time: this.state.time - 1
                },()=>{
                    if(this.state.time === 0){
                        clearInterval(timer);
                        this.setState({
                            count:false,
                            time:5
                        })
                    }
                })
            }, 1000)

            const address = await AsyncStorage.getItem('addressInfos')
            const addressData = JSON.parse(address),
                {district, citycode, provinceCode} = addressData
            const params = {
                sourceType: 3,
                cityCode: citycode,
                provinceCode,
                openId: config.authAppId,
                phoneNo: this.props.username
            }
            const msg = await sendMsg(params)

            const {data} = msg;
            console.log(msg)
            if (data.errcode === 1) {
               Toast.info(data.errmsg,2)
            }
            else if (data.errcode === 4000) {
                Toast.info('手机号不能为空', 2)
            } else {
                Toast.info(data.errmsg, 2)
            }
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        return (
            this.state.count ? <Text>{`倒计时 ${this.state.time}秒`}</Text> : <TouchableOpacity onPress={this.sendMsg.bind(this)}><Text
                style={styles.sms}>获取验证码</Text></TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    sms: {
        color: '#F5475F'
    }
})