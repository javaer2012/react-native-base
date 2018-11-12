import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, Button, Dimensions, AsyncStorage } from 'react-native'
import { Flex } from 'antd-mobile-rn';
// import { orderInfo_mock } from '../../mock/ProductDetailPage'
import ProudcuItem from '../../components/ProudcuItem'
import { flexRow, contentPadding } from '../../styles/common'
import Color from '../../styles/var'
import api from '../.././service/api'
import RentApp from "../../components/RentApp";
const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
const { queryOrderDetail, HTTP_IMG } = api

const bgf = {
  backgroundColor: '#fff'
}


export default class OrderInfo extends RentApp {
  static navigationOption = {
    title: '租机信息'
  }
  state = {
    completePay: false,
    userInfo:{},
    qrCodePath:'',
    orderTime:'',
    orderSn:'',
    stageInfo:{},
    insureList:[],
    goodsInfo:{},
    hallList:[],
  }

  async componentDidMount() {
    const orderId = this.props.navigation.getParam('orderId');
    const orderSn = this.props.navigation.getParam('orderSn');
    
    await this.getOpenIdAndUserId()
    let user = await AsyncStorage.getItem('userInfo')
    user = { ...JSON.parse(user) }
    console.log(user, "====>缓存中读取的userInfo")
    // this.setState({
    //   userInfos: user,
    //   // productId
    // })

    try {
      const { data: queryOrderDetailData } = await queryOrderDetail({
        provinceCode: this.provinceCode,
        cityCode: this.cityCode,
        orderId
      })

      console.log(JSON.stringify(queryOrderDetailData), "======>queryOrderDetailData")
      // debugger

      if (!queryOrderDetailData || queryOrderDetailData.errcode !== 1) {
        throw queryOrderDetailData.errmsg || "queryOrderDetailData 获取数据失败"
        return
      }
      this.handleDataFun(queryOrderDetailData)

    } catch (error) {
      // debugger
      this.showToast(error)
    }
  }

  handleDataFun = ({ userInfo, qrCodePath, orderTime, orderSn, stageInfo, insureList, goodsInfo, hallList }) => {
    this.setState({
      userInfo,
      qrCodePath,
      orderTime,
      orderSn,
      stageInfo,
      insureList,
      goodsInfo,
      hallList 
    })
    // queryOrderDetailData
  }

  goToPayFun = () => {
    const { navigate } = this.props.navigation;
    const orderId = this.props.navigation.getParam('orderId');
    const orderSn = this.props.navigation.getParam('orderSn');
    const { goodsInfo }= this.state
    navigate('Pay', {
      amount: goodsInfo.totalFirstAmount,
      orderId,
      orderSn,
      activeId: goodsInfo.activeId
      // firstPay: data.firstPay
    })
  }

  render() {
    const { 
      completePay, userInfo,qrCodePath, orderTime, orderSn, stageInfo, insureList, goodsInfo, hallList 
    } =this.state
    return (
      <Flex direction="column">
        <Flex direction="column" justify="center" style={styles.QRCode}>
          <Image
            style={{ width: 150, height: 150 }}
            source={require('../../images/find.png')}
            source={{ uri: `${HTTP_IMG}${qrCodePath}` }}
          />
          <Text style={{ marginTop: 10 }}>
            凭此二维码到营业厅办理业务
              </Text>
        </Flex>
        
        <Flex style={styles.titleBox} direction="row" justify="start" align="start">
          <Text style={styles.title}>用户信息</Text>
        </Flex>
        <Flex direction="column" style={styles.mainContentBox}>
          <Text style={[styles.base]}>姓名: {userInfo.userName}</Text>
          <Text style={[styles.base]}>手机号码: {userInfo.phoneNo}</Text>
          <Text style={[styles.base]}>身份证号: {userInfo.idCardNo}</Text>
        </Flex>
        <Flex direction="column" align="start" style={styles.bottomMainBox}>
          <Flex style={styles.titleBox} direction="row" justify="start" align="start">
            <Text style={styles.title}>租机信息</Text>
          </Flex>
          <Flex style={{backgroundColor: '#fff'}}>
            <ProudcuItem data={{
              // "id": "1",
              "imgPath": goodsInfo.goodsImagePath,
              "phoneName": goodsInfo.goodsName,
              // "phoneDesc": "全网通4G+64G 双卡双待手机 金色",
              // "price": goodsInfo.goodsPrice,s
              infos: (
                <Flex style={{ paddingVertical: 2 }} direction='column' align='start'>
                  <Text style={styles.textStyle}>颜色：{goodsInfo.color}</Text>
                  <Text style={styles.textStyle}>内存：{goodsInfo.storage}</Text>
                  <Text style={styles.textStyle}>套餐：{goodsInfo.mealName}</Text>
                </Flex>
              ),
              // "linkUrl": "/pages/productDetail/productDetail"
            }} />
          </Flex>
        </Flex>
        {/* {(!completePay && (fromPage !== 'MyPage')) && (
        <Flex direction="column" style={[styles.canBuyBox]}>
          <Text style={{ marginBottom: 10 }}>恭喜您获得购买资格</Text>
            <Text>您仅需支付: ￥{goodsInfo.totalFirstAmount}</Text>
            <TouchableOpacity 
              style={{ padding: 14, marginTop: 20, backgroundColor: Color.mainPink, width: '100%'}}
              onPress={() => this.goToPayFun() }>
              <Text style={{ color: '#fff', textAlign: "center" }}>确定</Text>
            </TouchableOpacity>
        </Flex>)} */}
        
        
      </Flex>
      
    )
  }
}


const styles = StyleSheet.create({
  textStyle: { fontSize: 12, color: '#888' },
  title:{
    
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
  QRCode:{
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
  base:{
    width: '100%',
    paddingVertical: 10
  }
});
