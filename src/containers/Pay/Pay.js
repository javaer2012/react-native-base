import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, ActivityIndicator, TextInput, Dimensions, AsyncStorage } from 'react-native'
import { Flex, List, ImagePicker, Toast, Button, WhiteSpace, InputItem } from 'antd-mobile-rn';
// import { orderInfo_mock } from '../../mock/ProductDetailPage'
import Color from '../../styles/var'
import Progress from '../../components/Progress'
import api from '../.././service/api'
import moment from 'moment'
import RentApp from "../../components/RentApp";
import Count from "../../components/Count";
// import { userInfo } from 'os';
const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
const { payment, HTTP_IMG } = api

const bgf = {
  backgroundColor: '#fff'
}

// firstPay: 4265
// orderId: "1a9cae5f179b478bb5d2894d641e53db"
// orderSn: "201810012110058120796604"

export default class Pay extends RentApp {
  static navigationOptions = {
    title: "支付"
  }
  state = {
    completePay: false,
    passDueTime:'',
    animating: false,
    userInfo:{},
    amount:0,
    code:'', //验证码
    phoneNumber:'',
    orderId:'',
  }

  async componentDidMount() {
    const  pastDueTime = await AsyncStorage.getItem('pastDueTime')
    const passDueTime = moment(+pastDueTime).format("hh:mm")
    const amount = this.props.navigation.getParam('amount', 0);
    let user = await AsyncStorage.getItem('userInfo')
    user = { ...JSON.parse(user) }
    await this.getOpenIdAndUserId()
    const orderId = this.props.navigation.getParam('orderId');
    this.setState({ passDueTime, userInfo: user, amount, orderId })
  }

  check=()=>{
    const { phoneNumber, code } = this.state;
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    // if (!myreg.test($poneInput.val())) {
    //   return false;
    // }
    if (!phoneNumber) {
      Toast.info("手机号不能为空")
      return
    } else if (!code) {
      Toast.info("验证码不能为空")
      return false
    } else if (!myreg.test(phoneNumber.split(' ').join(''))) {
      Toast.info("手机号格式有误")
      return false
    } 
    return true
  }

  goToPay = async () => {
    await this.setState({
      animating: true
    })
    const orderId = this.props.navigation.getParam('orderId');
    const activeId = this.props.navigation.getParam('activeId');
    const payType = this.props.navigation.getParam('payType');
    
    const params = {
      "amount": this.state.amount,
      "orderId": orderId,
      "activeId": activeId,
      "userId": this.userId,
      "openId": this.openId,
      "provCode": this.provinceCode,
      "cityCode": this.cityCode,
      "payType": payType  || '1',
      "phoneNo": `${this.state.phoneNumber.split(' ').join('')}`,
      "validCode": this.state.code,
    }
    console.log(params, '========> params')
    if (!this.check()) {
      await this.setState({
        animating: false
      })
      return false
    }
    try {
      const { data } = await payment(params)
      if (data.errcode !== 1 && data.errmsg) {
        this.showToast(data.errmsg)
        return false
      } else if (data.errcode === 1) {
        this.showToast(data.errmsg)
        const { navigate } = this.props.navigation;
        navigate('PayResult', {
            result: 'success',
            orderId: this.state.orderId
         })
      }
     
    } catch (error) {
      console.error(error)
    } finally {
      this.setState({
        animating: false
      })
    }
  }
  _renderPay =()=>{
    const { code } = this.state;
    return (
      <Flex direction="column" align="stretch" style={{ backgroundColor: 'red' }}> 
        {/* <Flex direction="column" align="stretch" style={{backgroundColor :'#fff'}}> */}
        <List renderHeader={() => '请填写您所绑定的银行卡信息'}>
          <InputItem
            clear
            type="phone"
            // error
            labelNumber={8}
            onErrorPress={() => alert('clicked me')}
            value={this.state.phoneNumber}
            style={{fontSize: 13}}
            onChange={(value) => {
              this.setState({
                phoneNumber: value,
              });
            }}
            // extra="元"
            placeholder="请输入银行预留手机号"
          >
            银行预留手机号：
          </InputItem>
          <InputItem type="number" value={code}
            onChange={(code) => this.setState({ code })} placeholder={"请输入验证码"}
            extra={<Count username={this.state.phoneNumber} />}>
                验证码
          </InputItem>
        </List>
        {/* </Flex> */}
      </Flex>
    )
  }

  render() {
    // const { navigate } = this.props.navigation;
    const { passDueTime, animating, amount } = this.state
    return (
      <Flex direction="column" align="stretch" style={{ backgroundColor: '#f6f6f6', flex: 1 }}>
        <Flex style={{ width: '100%',  backgroundColor: '#f6f6f6', paddingHorizontal: 10, paddingVertical: 17}}>
          <Text>
            订单已提交，订单将于<Text>{passDueTime}</Text>关闭，请在规定时间内支付
          </Text>
        </Flex>
        
        <Flex justify="between" style={{width: '100%', paddingVertical: 20, paddingHorizontal: 10, backgroundColor: '#fff'}}>
          <Text style={{fontSize: 15}}>
            需支付金额
          </Text>
          <Text>
            ￥ {amount || 0} 
          </Text>
        </Flex>
        <Flex direction='column' align="stretch">
          {this._renderPay()}
        </Flex>
        {/* +amount > 0 &&  */}
        <Flex style={{marginTop: 0, width: '100%', padding: 20}}>
          <TouchableOpacity onPress={this.goToPay} style={{flexGrow: 1, color: '#fff',backgroundColor: Color.mainPink, paddingVertical: 15, borderRadius: 5, overflow: 'hidden'}}>
            <Text style={{color: '#fff', textAlign: 'center'}}>立即支付</Text>
          </TouchableOpacity>
        </Flex>
        
        <ActivityIndicator animating={animating} text="正在加载" />
      </Flex>
    )
  }
}


const styles = StyleSheet.create({
});
