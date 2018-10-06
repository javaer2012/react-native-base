import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, ActivityIndicator, TextInput, Dimensions, AsyncStorage } from 'react-native'
import { Flex, List, ImagePicker, Button, WhiteSpace } from 'antd-mobile-rn';
// import { orderInfo_mock } from '../../mock/ProductDetailPage'
import Color from '../../styles/var'
import Progress from '../../components/Progress'
import api from '../.././service/api'
import moment from 'moment'
import RentApp from "../../components/RentApp";
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
  state = {
    completePay: false,
    passDueTime:'',
    animating: false,
    userInfo:{}
  }

  async componentDidMount() {

    console.log("Pay Page")
    const  pastDueTime = await AsyncStorage.getItem('pastDueTime')
    const passDueTime = moment(+pastDueTime).format("hh:mm")
    let user = await AsyncStorage.getItem('userInfo')
    user = { ...JSON.parse(user) }
    await this.getOpenIdAndUserId()
    this.setState({ passDueTime, userInfo: user })
  }

  goToPay = async () => {
    await this.setState({
      animating: true
    })
    const orderId = this.props.navigation.getParam('orderId');
    const activeId = this.props.navigation.getParam('activeId');
    
    try {
      const { data } = await payment({
        "userId": this.userId,
        "openId": this.openId,
        "amount":"0",
        "orderId": orderId,
        "provCode": this.provinceCode,
        "cityCode": this.cityCode,
        "activeId": activeId,
        "payType":"1",
        "phoneNo": `${this.state.userInfo.phoneNo}`,
        "validCode":"",
      })
      if (data.errcode !== 1 && data.errmsg) {
        this.showToast(data.errmsg)
        return false
      } else if (data.errcode === 1) {
        this.showToast(data.errmsg)
        const { navigate } = this.props.navigation;
        navigate('PayResult', {
            result: 'success'
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

  render() {
    // const { navigate } = this.props.navigation;
    const { passDueTime, animating } = this.state
    return (
      <Flex direction="column" style={{ backgroundColor: '#f6f6f6', flex: 1 }}>
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
            ￥ {0} 
          </Text>
        </Flex>
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
