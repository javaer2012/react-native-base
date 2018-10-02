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
    fromPage:''
  }

  async componentDidMount() {
    const orderId = '109aa832c2534d8c8512d8709024dc2d' || this.props.navigation.getParam('orderId');
    const orderSn = '201810011834098838036560' || this.props.navigation.getParam('orderSn');
    const fromPage = this.props.navigation.getParam('fromPage') ||  '';
    this.setState({ fromPage })
    
    await this.getOpenIdAndUserId()
    let user = await AsyncStorage.getItem('userInfo')
    user = { ...JSON.parse(user) }
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

      if (!queryOrderDetailData || queryOrderDetailData.errcode !== 1) {
        throw queryOrderDetailData.errmsg || "queryOrderDetailData 获取数据失败"
        return
      }
      // this.showToast(queryOrderDetailData.errmsg)
      this.handleDataFun(queryOrderDetailData)

    } catch (error) {
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

  render() {
    const { 
      completePay, userInfo, fromPage,qrCodePath, orderTime, orderSn, stageInfo, insureList, goodsInfo, hallList 
    } =this.state
    return (
      <Flex direction="column">
        {
          (!completePay && (fromPage === 'MyPage') ) && (
            <Flex direction="column" justify="center" style={styles.QRCode}>
              <Image
                style={{ width: 150, height: 150 }}
                source={require('../../images/find.png')}
                source={{ uri: `${HTTP_IMG}${qrCodePath}` }} 
              />
              <Text style={{marginTop: 10}}>
                凭此二维码到营业厅按理业务
              </Text>
            </Flex>
          )
        }
        
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
              "price": goodsInfo.goodsPrice,
              // "linkUrl": "/pages/productDetail/productDetail"
            }} />
          </Flex>
        </Flex>
        {(!completePay && (fromPage !== 'MyPage')) && (
        <Flex direction="column" style={[styles.canBuyBox]}>
          <Text style={{ marginBottom: 10 }}>恭喜您获得购买资格</Text>
          <Text>您仅需支付: ￥{700}</Text>
            <TouchableOpacity 
              style={{ padding: 20, backgroundColor: Color.mainPink, width: '100%'}}
              onPress={() => this.selecteCapitalProdSure(this.state.capitalProdObj) }>
              <Text style={{ color: '#fff', textAlign: "center" }}>确定</Text>
            </TouchableOpacity>
        </Flex>)}
        
        
      </Flex>
      
    )
  }
}


const styles = StyleSheet.create({
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
