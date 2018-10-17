import React from 'react'
import {View,Text,AsyncStorage} from 'react-native'
import {WingBlank, WhiteSpace, Flex, Toast, List, InputItem} from 'antd-mobile-rn'
import RentApp from "../components/RentApp";
import Count from "../components/Count";
import Button from '../components/common/Button'
import api from "../service/api";
import {connect} from 'react-redux';


class CardInfo extends RentApp{

    static navigationOptions = {
        title:'绑定银行卡'
    }




    constructor(props){
        super(props)
        this.cardInfo = props.navigation.getParam('info',{})
        console.log(this.cardInfo)

        this.activeId = props.navigation.getParam('activeId',"")
        this.productId = props.navigation.getParam('productId',"")

        this.state = {
            phoneNo:'',
            verifyCode:'',
            ...this.cardInfo
        }
    }

    componentDidMount = () =>{
        this.getOpenIdAndUserId()
    }

    smsCall = async ()=>{
        const user = await AsyncStorage.getItem('userInfo')
        console.log(JSON.parse(user))
        try{


            const {bankCode,bankName,cardNo} = this.state
            const params = {
                openId:this.openId,
                userId:this.userId,
                accountNo:cardNo.split(' ').join(""),
                accountType:'00',
                certNo:JSON.parse(user).idCardNo,
                certType:'0',
                phoneNo:this.state.phoneNo,
                bankCode,
                bankName,
                provCode: this.provinceCode,
                cityCode: this.cityCode,
                activeId:this.activeId || '524eaa42bfec4d00b77f50d56fd82fe5'

            }
            const rsp = await api.applyBindCardCode(params);
            console.log(rsp)

            const {data} = rsp
            if(data.errcode === 0){
                Toast.info(data.errmsg,1)
            } else {
                this.setState({
                    signMsgSn:data.signMsgSn
                })
            }
        } catch (e) {
            
        }
    }

    sign = async ()=>{
        const user = await AsyncStorage.getItem('userInfo')
        console.log(JSON.parse(user))
        try{

            const {bankCode,bankName,cardNo,signMsgSn} = this.state
            const params = {
                openId:this.openId,
                userId:this.userId,
                cardNumber:cardNo.split(' ').join(""),
                accountType:'00',
                certNo:JSON.parse(user).idCardNo,
                certType:'0',
                phoneNo:this.state.phoneNo,
                bankCode,
                bankName,
                provCode: this.provinceCode,
                cityCode: this.cityCode,
                activeId:this.activeId || '524eaa42bfec4d00b77f50d56fd82fe5',
                signMsgSn,
                verifyCode:111111

            }
            const rsp = await api.applyBindCard(params);
            console.log(rsp)

            const {data} = rsp
            if(data.errcode === 1){
                Toast.info('绑卡成功',1.5)

                this.props.dispatch({type:'MYPAGE_INIT'})

                this.props.navigation.replace("ProductDetail",{
                    productId:this.productId
                })

            } else {
                Toast.info(data.errmsg,1.5)
            }
        } catch (e) {

        }
    }

    render(){

        const {phoneNo,verifyCode} = this.state
        return(
            <View style={{height: '100%'}}>
                <WhiteSpace size={"md"}/>
                <WingBlank size={"md"}>
                    <List renderHeader={
                        <View>
                            <WhiteSpace size={"sm"}/>
                            <Text>银行卡信息</Text>
                            <WhiteSpace size={"sm"}/>
                        </View>
                    }>

                        <InputItem value={this.cardInfo.bankName} disabled={true}>银行名称</InputItem>
                        <InputItem value={"储蓄卡"} editable={false} disabled={true}>卡类型</InputItem>
                        <InputItem value={phoneNo} onChange={(phoneNo)=>this.setState({phoneNo})}>预留手机</InputItem>
                        <InputItem value={verifyCode} onChange={(verifyCode)=>this.setState({verifyCode})} extra={<Count username={phoneNo} smsCall={this.smsCall}/>}>验证码</InputItem>

                    </List>
                </WingBlank>


                <WhiteSpace size={"md"}/>
            <Flex direction={"row"} justify={"center"}>
                <Button style={{width:353,height:45,lineHeight:45,color:'white',backgroundColor:'#06C1AE',borderRadius:5}}
                    onClick={this.sign}
                >绑定</Button>
            </Flex>
            </View>
        )
    }
}

const stateToProps =(state)=>{
    console.log(state)
    return {
        provinceCode: state.locationReducer.locationInfos.provinceCode,
        cityCode: state.locationReducer.locationInfos.cityCode,
        openId: state.app.openId,
        userId: state.app.userId
    }
}

export default connect(stateToProps)(CardInfo)