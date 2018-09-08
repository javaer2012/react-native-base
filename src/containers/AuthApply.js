import React from 'react';
import {ScrollView, StyleSheet, View, Text,TouchableOpacity} from 'react-native';
import {WingBlank, WhiteSpace, Flex, InputItem, List,Checkbox} from 'antd-mobile-rn';
import Button from '../components/common/Button';

const styles = StyleSheet.create({
    topText: {
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        height: 75
    },
    text: {
        textAlign: 'center',
        lineHeight: 20,
        fontSize: 15
    }
})

export default class AuthApply extends React.Component {
    static navigationOptions = {
        title:'信用租机'
    }
    state = {
        checked:false
    }

    render() {

        const {navigation} = this.props

        return (
            <View style={{backgroundColor:'#F5F5F9'}}>
                <View style={styles.topText}>
                    <WingBlank size={"md"}>
                        <WhiteSpace size={"xl"}/>
                        <Text style={styles.text}>请您填写个人真实信息，本资料仅做授权查询办理资格使用，绝不外泄！</Text>

                    </WingBlank>
                    <WhiteSpace size={"xl"}/>
                </View>
                <WhiteSpace size={"md"}/>

                <View>
                    <List renderHeader={<View>
                        <Text>基本信息</Text>
                        <WhiteSpace size={"sm"}/>
                    </View>}>
                        <InputItem placeholder={"本人真实姓名"}>姓名</InputItem>
                        <InputItem placeholder={"仅中国大陆身份证"} type={"number"}>身份证</InputItem>
                        <InputItem placeholder={"您的手机号"} type={"phone"}>手机号</InputItem>
                        <InputItem placeholder={"手机验证码"} type={"number"} extra={
                            <Button style={{width:89,height:40,lineHeight:40,backgroundColor: "#F5475F",borderRadius:3}}>点击获取</Button>
                        }>验证码</InputItem>
                    </List>
                    <WhiteSpace size={"md"}/>
                    <List renderHeader={<View>
                        <Text>家族信息</Text>
                        <WhiteSpace size={"sm"}/>
                    </View>}>
                        <InputItem placeholder={"请选择与直系亲属关系"}>亲属关系</InputItem>
                        <InputItem placeholder={"直系亲属姓名"}>亲属姓名</InputItem>
                        <InputItem placeholder={"直系亲属电话"} type={"phone"}>亲属电话</InputItem>
                        <InputItem placeholder={"家庭住址"}>家庭地址</InputItem>
                        <WhiteSpace size={"md"}/>
                        <Checkbox style={{marginLeft:12,color:'pink'}} value={this.state.checked} onChange={()=>this.setState({
                            checked:!this.state.checked
                        })}>
                            <View style={{display: 'flex',flexDirection: 'row'}}>
                                <Text>请阅读并勾选</Text>
                                <TouchableOpacity onPress={()=>navigation.navigate("TermPage")}>
                                    <Text style={{color:'#F5475F'}}>《隐私条款和数据授权协议》</Text>
                                </TouchableOpacity>
                                <Text>协议</Text>
                            </View>
                        </Checkbox>
                        <WhiteSpace size={"md"}/>
                    </List>
                    <WhiteSpace size={"lg"}/>

                    <Flex direction={"row"} justify={"center"}>


                    <Button style={{width:353,height:50,lineHeight:50,color:'#CBCBCB'}}>提交</Button>
                    </Flex>

                </View>
            </View>
        )
    }
}