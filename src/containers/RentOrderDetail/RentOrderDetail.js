import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, Button, Dimensions, AsyncStorage } from 'react-native'
import { Flex } from 'antd-mobile-rn';
import ProudcuItem from '../../components/ProudcuItem'
import { contentPadding } from '../../styles/common'
import Color from '../../styles/var'
import api from '../.././service/api'
import RentApp from "../../components/RentApp";
const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
const { HTTP_IMG, commitOrder } = api

const bgf = {
  backgroundColor: '#fff'
}


export default class RentOrderDetail extends RentApp {
  static navigationOptions = {
    title: '租机信息'
  }
  state = {
    params:{}, 
    userInfos:{}, 
    goodsInfo:{},
    goodsBaseInfo:{},
  }

  async componentDidMount() {
    await this.getOpenIdAndUserId()
    let user = await AsyncStorage.getItem('userInfo');
    const params = this.props.navigation.getParam('params');
    const userInfos = this.props.navigation.getParam('userInfos');
    const goodsInfo = this.props.navigation.getParam('goodsInfo');
    const goodsBaseInfo = this.props.navigation.getParam('goodsBaseInfo');
    
    this.setState({ params, userInfos, goodsInfo, goodsBaseInfo })
  }

  goToPayFun = async () => {
    const { params, goodsInfo } = this.state
    console.log(goodsInfo,"========>goodsInfo")
    try {
      const { data } = await commitOrder(params)
      console.log(data, "=========》data")
      if (data.errcode !== 1 && data.errmsg) {
        this.showToast(data.errmsg)
        return false
      } else if (data.errcode === 1) {
        this.showToast(data.errmsg)
        await AsyncStorage.setItem('pastDueTime', JSON.stringify((+new Date()) + 1800000))
        const { navigate } = this.props.navigation;
        setTimeout(() => {
          navigate('Pay', {
            amount: goodsInfo.totalFirstAmount || goodsInfo.teleFirstAmount, 
            orderId: data.orderId,
            orderSn: data.orderSn,
            activeId: params.activeId
            // firstPay: data.firstPay
          })
        }, 800);
      }

    } catch (error) {
      this.showToast(error)
    }
  }

  render() {
    const { params, userInfos, goodsInfo, goodsBaseInfo } = this.state
    return (
      <Flex direction="column">
        <Flex style={styles.titleBox} direction="row" justify="start" align="start">
          <Text style={styles.title}>用户信息</Text>
        </Flex>
        <Flex direction="column" style={styles.mainContentBox}>
          <Text style={[styles.base]}>姓名: {userInfos.userName}</Text>
          <Text style={[styles.base]}>手机号码: {userInfos.phoneNo}</Text>
          <Text style={[styles.base]}>身份证号: {userInfos.idCardNo}</Text>
        </Flex>
        <Flex direction="column" align="start" style={styles.bottomMainBox}>
          <Flex style={styles.titleBox} direction="row" justify="start" align="start">
            <Text style={styles.title}>租机信息</Text>
          </Flex>
          <Flex style={{ backgroundColor: '#fff' }}>
            <ProudcuItem data={{
              // "id": "1",
              "imgPath": goodsBaseInfo.goodsImagePath,
              "phoneName": goodsBaseInfo.goodsName,
              // "phoneDesc": "全网通4G+64G 双卡双待手机 金色",
              "price": goodsBaseInfo.goodsPrice,
              // "linkUrl": "/pages/productDetail/productDetail"
            }} />
          </Flex>
        </Flex>
        <Flex direction="column" style={[styles.canBuyBox]}>
          <Text style={{ marginBottom: 10 }}>恭喜您获得购买资格</Text>
          <Text>您仅需支付: ￥{goodsInfo.totalFirstAmount || 0}</Text>
          <TouchableOpacity
            style={{ padding: 14, marginTop: 20, backgroundColor: Color.mainPink, width: '100%' }}
            onPress={() => this.goToPayFun()}>
            <Text style={{ color: '#fff', textAlign: "center" }}>确定</Text>
          </TouchableOpacity>
        </Flex>


      </Flex>

    )
  }
}


const styles = StyleSheet.create({
  title: {

  },
  titleBox: {
    paddingVertical: 15,
    ...contentPadding,
    width: '100%',
    ...bgf,
    marginBottom: 1
  },
  mainContentBox: {
    backgroundColor: '#fff',
    ...contentPadding,
    paddingVertical: 10,
    width: '100%'
    // flexGrow: 1
  },
  bottomMainBox: {
    marginTop: 14,
    ...bgf,
  },
  QRCode: {
    width: '100%',
    backgroundColor: '#fff',
    height: 200
  },
  canBuyBox: {
    marginTop: 14,
    width: '100%',
    padding: 30,
    ...bgf
  },
  base: {
    width: '100%',
    paddingVertical: 10
  }
});
