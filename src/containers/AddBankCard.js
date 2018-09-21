import React from 'react';
import {ScrollView, StyleSheet, View, Text, TouchableOpacity,AsyncStorage} from 'react-native';
import {WingBlank, WhiteSpace, Flex, InputItem, List, Checkbox,Toast} from 'antd-mobile-rn';
import Button from '../components/common/Button';
import Count from "../components/Count";
import api from "../service/api";
import RentApp from "../components/RentApp";
import Bank from '../utils/bankcardInfo';

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

export default class AddBankCard extends RentApp {
    static navigationOptions = {
        title: '绑定银行卡'
    }

    state = {
        userName:"",
        cardNo:"",
        success:"",
        cardInfo:""
    }

    constructor(props){
        super(props)

        this.getUserInfo()
    }

    async getUserInfo(){
        const userInfo = await AsyncStorage.getItem('userInfo')
        this.userInfo = JSON.parse(userInfo);
       // console.log(JSON.parse(userInfo))
    }

    next = async ()=>{

        const {userName,cardNo} = this.state
        if(!userName || !cardNo){
            Toast.info("姓名和银行卡号不能为空",2)
            return
        }

        if(userName !== this.userInfo.userName){
            Toast.info("姓名与授信信息不相符",2)
            return
        }

        Bank.getBankBin(cardNo.split(' ').join(""),(type,info)=>{
            console.log(type)
            console.log(info)
           if(type === null){
               if(info.cardType === "DC"){
                   this.props.navigation.navigate("CardInfoPage",{
                       info:{
                           ...info,
                           cardNo
                       }

                   })
               } else {
                   Toast.info('暂时仅支持储蓄卡',2)
               }
           } else {
               Toast.info(type,2)
           }
        })
    }

    render() {


        const {navigation} = this.props
        const {userName,cardNo} = this.state

        return (
            <View style={{backgroundColor: '#F4F3F4',height:'100%'}}>
                <View style={styles.topText}>
                    <WingBlank size={"md"}>
                        <WhiteSpace size={"xl"}/>
                        <Text style={styles.text}>请先绑定您本人的银行卡</Text>

                    </WingBlank>
                    <WhiteSpace size={"xl"}/>
                </View>
                <WhiteSpace size={"md"}/>

                <View>
                    <List>
                        <InputItem id={"userName"}
                                   placeholder={"本人真实姓名"}
                                   style={{textSize:10}}
                                   value={userName}
                                   onChange={(userName)=>this.setState({userName})}>持卡人</InputItem>

                        <InputItem placeholder={"仅中国大陆身份证"} type={"bankCard"}
                                   value={cardNo} onChange={(cardNo)=>this.setState({cardNo})}>银行卡号</InputItem>


                    </List>


                    <WhiteSpace size={"xl"}/>

                    <WingBlank size={"md"}>
                        <Flex direction={"row"} justify={"center"}>
                            <Button style={{width: 353, height: 50, lineHeight: 50, color: '#CBCBCB'}}
                                onClick={this.next}
                            >下一步</Button>
                        </Flex>

                        <WhiteSpace size={"md"}/>

                        <Text style={{textSize:14,color:'#989898'}}>支持的银行如下：</Text>
                        <WhiteSpace size={"md"}/>
                        <Text style={{textSize:14,color:'#989898'}}>中国工商银行、中国农业银行、中国银行、中国建设银行
                            中国交通银行、中国邮政储蓄银行、中信银行、中国光大
                            银行、兴业银行、民生银行、招商银行、广发银行、平安银行、浦发银行、华夏银行、上海银行</Text>
                    </WingBlank>


                </View>
            </View>
        )
    }
}