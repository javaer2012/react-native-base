import React, {Component} from 'react';
import {View, Image, ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {List, InputItem, Button, WingBlank, WhiteSpace, Toast} from 'antd-mobile-rn';
import api from "../service/api";
import RentApp from "../components/RentApp";
import Count from "../components/Count";
import {phoneCheck} from "../utils/inputCheck";


export default class ChangePSW extends RentApp {
    static navigationOptions = {
        title: "修改密码"
    }
    state = {
        oPSW: "",
        nPSW: ""
    }

    constructor(props) {
        super(props)
    }

    async changePsw() {

        try {
            if (!this.state.phoneNo) {

                Toast.info("请输入手机号", 1.5)
                return

            }
            if (!phoneCheck(this.state.phoneNo)) {

                Toast.info("请输入正确的手机号", 1.5)
                return

            }
            if (!this.state.verifyCode) {

                Toast.info("请输入验证码", 1.5)
                return

            }

            const params = {
                openId: this.openId,
                userId: this.userId,
                provCode: this.provinceCode,
                cityCode: this.cityCode,
                ...this.state
            }

            const rsp = await api.unbindBankCard(params);
            console.log(rsp)
            const {data} = rsp
            if (data.errcode === 1) {
                Toast.info("解绑成功", 1.5)
                setTimeout(() => this.props.navigation.replace("BackCardPage"), 1500)
            } else {
                Toast.info(data.errmsg)
            }
        } catch (e) {

        }
    }


    render() {

        const {phoneNo, verifyCode} = this.state;
        const {navigation} = this.props;

        return (
            <ScrollView>
                <WingBlank size="md">
                    <List renderHeader={() => <View><Text>银行卡信息</Text></View>}>
                        <InputItem type="number" value={phoneNo}
                                   onChange={(phoneNo) => this.setState({phoneNo})}
                                   placeholder={"银行预留手机号"}>
                            <Image
                                style={styles.icon}
                                source={phoneNo ?
                                    require('../assets/copyUser.png') :
                                    require('../assets/defaultUser.png')}/>
                        </InputItem>
                        <InputItem type="password" value={verifyCode}
                                   onChange={(verifyCode) => this.setState({verifyCode})}
                                   extra={<Count username={this.state.phoneNo}/>}

                                   placeholder={"请输入验证码"}>
                            <Image
                                style={styles.icon}
                                source={verifyCode ?
                                    require('../assets/confirmSelect.png') :
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

    icon: {
        width: 18,
        height: 18,
        resizeMode: 'stretch'
    },

    btn: {
        backgroundColor: '#06C1AE',
        borderColor: '#06C1AE'
    }
})