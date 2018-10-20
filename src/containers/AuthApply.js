import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { WingBlank, WhiteSpace, Flex, InputItem, List, Checkbox, Toast, Picker } from 'antd-mobile-rn';
import Button from '../components/common/Button';
import Count from "../components/Count";
import api from "../service/api";
import RentApp from "../components/RentApp";
import { idCardCheck, phoneCheck } from "../utils/inputCheck";

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        fontSize: 15
    }
})

const RELATION = [
    {
        label: '父女',
        value: '父女'
    },
    {
        label: '母子',
        value: '母子'
    },
    {
        label: '父子',
        value: '父子'
    },
    {
        label: '母女',
        value: '母女'
    },
    {
        label: '兄弟',
        value: '兄弟'
    },
    {
        label: '兄妹',
        value: '兄妹'
    },
    {
        label: '姐弟',
        value: '姐弟'
    },
    {
        label: '夫妻',
        value: '夫妻'
    },
    {
        label: '其他',
        value: '其他'
    }
]

export default class AuthApply extends RentApp {
    static navigationOptions = {
        title: '信用租机'
    }
    state = {
        checked: false,
        userName: "",
        idCardNo: "",
        phoneNo: "",
        familyRelation: [],
        familyName: "",
        familyPhone: "",
        familyAddress: "",
        verifyCode: ""
    }

    onChange(e) {
        console.log(e)
    }

    async onSubmit() {
        if (!this.state.checked) {
            Toast.info("请勾选协议", 1.5)
            return
        }

        if (!this.state.userName) {
            Toast.info("请输入真实姓名", 1.5)
            return
        }
        if (!this.state.idCardNo) {
            Toast.info("请输入大陆身份证", 1.5)
            return
        }
        if (!idCardCheck(this.state.idCardNo)) {
            Toast.info("请输入正确的二代身份证", 1.5)
            return
        }
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
        if (this.state.familyRelation.length === 0) {
            Toast.info("请选择直系亲属关系", 1.5)
            return
        }
        if (!this.state.familyName) {
            Toast.info("请输入直系亲属姓名", 1.5)
            return
        }
        if (!this.state.familyPhone) {
            Toast.info("请输入直系亲属电话", 1.5)
            return
        }
        if (!phoneCheck(this.state.familyPhone)) {
            Toast.info("请输入正确的亲属手机号", 1.5)
            return
        }
        if (!this.state.familyAddress) {
            Toast.info("请输入直系亲属住址", 1.5)
            return
        }

        console.log(this.state)

        const newState = Object.assign({}, this.state);
        newState.phoneNo = newState.phoneNo.split(' ').join("")
        const params = {
            openId: this.openId,
            userId: this.userId,
            cityCode: this.cityCode,
            provinceCode: this.provinceCode,
            ...newState
        }
        params.familyRelation = params.familyRelation[0]
        this.props.navigation.navigate('WaitPage', {
            params
        })
    }

    render() {

        const { navigation } = this.props
        const {
            userName,
            idCardNo,
            phoneNo,
            familyRelation,
            familyName,
            familyPhone,
            familyAddress,
            verifyCode
        } = this.state

        return (
            <ScrollView style={{ backgroundColor: '#F5F5F9', height: '100%' }}>
                <Flex direction={"column"} style={{ backgroundColor: '#F5F5F9' }}>
                    <Flex style={{ backgroundColor: 'white', width: '100%', height: 75 }}>
                        <Text style={styles.text}>请您填写个人真实信息，本资料仅做授权查询办理资格使用，绝不外泄！</Text>

                        <WhiteSpace size={"xl"} />
                    </Flex>
                    <WhiteSpace size={"md"} />

                    <WingBlank size={"sm"} style={{ width: '100%' }}>
                        <Flex direction={"column"} style={{ width: '100%', marginVertical: 5 }}>

                            <List
                                style={{ width: '100%' }}
                                renderHeader={<View>
                                    <WingBlank size={"md"}>
                                        <Text>基本信息</Text>
                                        <WhiteSpace size={"sm"} />
                                    </WingBlank>
                                </View>}
                            >
                                <InputItem id={"userName"} placeholder={"本人真实姓名"}
                                    value={userName}
                                    onChange={(userName) => this.setState({ userName })}>姓名</InputItem>
                                <InputItem placeholder={"仅中国大陆身份证"} type={"number"}
                                    value={idCardNo}
                                    onChange={(idCardNo) => this.setState({ idCardNo })}>身份证</InputItem>
                                <InputItem placeholder={"您的手机号"} type={"phone"} value={phoneNo}
                                    onChange={(phoneNo) => this.setState({ phoneNo })}>手机号</InputItem>
                                <InputItem placeholder={"手机验证码"} type={"number"} value={verifyCode}
                                    onChange={(verifyCode) => this.setState({ verifyCode })}
                                    extra={
                                        <Count username={phoneNo} />
                                    }>验证码</InputItem>
                            </List>

                            <WhiteSpace size={"md"} />

                            <List style={{ width: '100%' }}
                                renderHeader={<View>
                                    <WingBlank size={"md"}>
                                        <Text>家族信息</Text>
                                        <WhiteSpace size={"sm"} />
                                    </WingBlank>
                                </View>}
                            >

                                <Picker
                                    data={RELATION}
                                    cols={1}
                                    value={familyRelation}
                                    onChange={(v) => this.setState({ familyRelation: v })}
                                    onPickerChange={(v) => this.setState({ familyRelation: v })}
                                    onOk={(v) => this.setState({ familyRelation: v })}
                                >
                                    <List.Item arrow={"down"}>亲属关系</List.Item>
                                </Picker>
                                {/*<InputItem placeholder={"请选择与直系亲属关系"} value={familyRelation}*/}
                                {/*onChange={(familyRelation) => this.setState({familyRelation})}>亲属关系</InputItem>*/}
                                <InputItem placeholder={"直系亲属姓名"} value={familyName}
                                    onChange={(familyName) => this.setState({ familyName })}>亲属姓名</InputItem>
                                <InputItem placeholder={"直系亲属电话"} type={"phone"} value={familyPhone}
                                    onChange={(familyPhone) => this.setState({ familyPhone })}>亲属电话</InputItem>
                                <InputItem placeholder={"家庭住址"} value={familyAddress}
                                    onChange={(familyAddress) => this.setState({ familyAddress })}>家庭地址</InputItem>
                                <WhiteSpace size={"md"} />
                                <Checkbox style={{ marginLeft: 12, color: 'pink' }} value={this.state.checked}
                                    onChange={() => this.setState({
                                        checked: !this.state.checked
                                    })}>
                                    <Flex direction={"row"} wrap={"wrap"}>
                                        <Text style={{ fontSize: 15 }}>请阅读并勾选</Text>
                                        <TouchableOpacity onPress={() => navigation.navigate("TermPage")}>
                                            <Text style={{ color: '#F5475F', fontSize: 15 }}>《隐私条款和数据授权协议》</Text>
                                        </TouchableOpacity>
                                        <Text style={{ fontSize: 15 }}>协议</Text>
                                    </Flex>
                                </Checkbox>
                                <WhiteSpace size={"md"} />
                            </List>
                            <WhiteSpace size={"lg"} />

                            <WingBlank size={"md"}>
                                <Flex direction={"row"} style={{ width: '100%' }} justify={"center"}>


                                    <Button style={{
                                        width: '100%',
                                        height: 45,
                                        lineHeight: 45,
                                        color: '#989898',
                                        backgroundColor: '#CBCBCB'
                                    }}
                                        onClick={this.onSubmit.bind(this)}>提交</Button>
                                </Flex>
                            </WingBlank>

                        </Flex>
                    </WingBlank>
                </Flex>
            </ScrollView>
        )
    }
}