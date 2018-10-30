import React, { Component } from 'react'
import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, AsyncStorage } from 'react-native';
import { Flex, List, WhiteSpace, WingBlank,Toast } from 'antd-mobile-rn';
// import Button from '../../components/common/Button'
import Card from './components/Card'
import api from '../.././service/api'
import RentApp from "../../components/RentApp";
import ProudcuItem from '../../components/ProudcuItem'
import Color from '../../styles/var'
import Spinner from 'react-native-loading-spinner-overlay';
const { staffOrderDetail } = api
const Button_ = ({ children, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ flex: 1, justifyContent:'center', backgroundColor: Color.mainPink, paddingVertical: 13, height: 40 }}>
      <Text style={{ color: '#fff', textAlign: 'center' }} >{children}</Text>
    </TouchableOpacity>
  )
}
export default class OrderDetail extends RentApp {
  static navigationOption = {
    title: '订单详情'
  }
  state = {
    userInfo:{},  // 缓存获取的用户信息
    goodsInfo: {
      goodsImagePath: '',
      goodsName: '',
      goodsDesc: '',
      actualUsedAmount: '',
      totalFirstAmount: '',
      goodsSkus: ''
    },
    orderUserInfo: {  // 接口获取的用户信息
      userName: '',
      phoneNo: '',
      idCardNo: '',
      creditAmount: '',
      creditScore: '',
    },
    stageInfo: {
      totalStageAmount: '',
      capitalProdName: '',
      stagePeriods: '',
      stageMonthRate: '',
      eachStageAmount: '',
    },
    contractMealInfo: {
      mealId: '',
      mealCode: '',
      mealName: '',
      mealPrice: '',
      mealType: '',
      mealAmount: ''
    },
    insureList: [
      {
        insureId: '',
        insureName: '',
        insureType: "",
        policyNo: '',
        insureAmount: '',
        insureStartTime: '',
        insureEndTime: '',
        insureStatus: ''
      }
    ],

    orderId: '',
    loading: false
  }

  async componentDidMount() {
    try {
      await this.getOpenIdAndUserId()
      const orderId = this.props.navigation.getParam('orderId');
      console.log(orderId,"!!!!")
      this.setState({
        orderId
      })
      this.getData()
    } catch (error) {
      console.log(error, "error")
    }
  }

  async getData() {
    try {
      await this.setState({ loading: true })
      let user = await AsyncStorage.getItem('userInfo')
      user = { ...JSON.parse(user) }
      this.setState({
        userInfo: user
      })
      const { orderId } = this.state
      const params = {
        userId: this.userId,
        openId: this.openId,
        orderId,
        cityCode: this.cityCode,
        provinceCode: this.provinceCode,
        staffNo: user.staffNo
      }
      console.log(params, '=======》 params')
      const { data } = await staffOrderDetail(params)
      if (data.errcode === 1) {
        const { 
          // orderUserInfo: userInfo, 
          userInfo,
          orderTime, 
          stageInfo, 
          insureList, 
          contractMealInfo,
          goodsInfo 
        } = data
        this.setState({
          orderUserInfo: userInfo,
          orderTime,
          stageInfo,
          insureList,
          contractMealInfo,
          goodsInfo 
        })
      } else{
        Toast.info(data.errmsg,1.5)
        setTimeout(()=>this.props.navigation.popToTop(),1800)
      }

      console.log(JSON.stringify(rsp), '=========>getData res')
    } catch (e) {

    } finally {
      this.setState({ loading: false })
    }
  }

  goHome = ()=>{
    this.props.navigation.popToTop()
    this.props.navigation.navigate('Home')
  }

  render() {
    const { userInfo, stageInfo, contractMealInfo, orderUserInfo } = this.state
    console.log(orderUserInfo,"userInfouserInfouserInfo")
    return (
      <ScrollView>
        <Flex direction="column">
          <Flex style={styles.cardBox} align="stretch">
            <Card title="用户信息">
              <Flex direction="column" align="start">
                <Text style={styles.textBase}>姓名：{orderUserInfo.userName}</Text>
                <Text style={styles.textBase}>电话号码：{orderUserInfo.phoneNo}</Text>
                <Text style={styles.textBase}>身份证号：{orderUserInfo.idCardNo}</Text>
              </Flex>
            </Card>
          </Flex>
          <Flex>
            <Card title="分期信息">
              <Flex direction="column" align="start">
                <Text style={styles.textBase}>金融产品名称：{stageInfo.capitalProdName}</Text>
                <Text style={styles.textBase}>分期：{stageInfo.stagePeriods}</Text>
                <Text style={styles.textBase}>分期月利率：{stageInfo.stageMonthRate}</Text>
                <Text style={styles.textBase}>每月分期金额：{stageInfo.eachStageAmount}</Text>
              </Flex>
            </Card>
          </Flex>
          <Flex>
            <Card title="套餐信息">
              <Flex direction="column" align="start">
                <Text style={styles.textBase}>套餐编码：{contractMealInfo.mealCode}</Text>
                <Text style={styles.textBase}>套餐名称：{contractMealInfo.mealName}</Text>
                <Text style={styles.textBase}>套餐描述：{contractMealInfo.mealAmount}</Text>
              </Flex>
            </Card>
          </Flex>
          <Flex direction='column' align="stretch" style={{ backgroundColor: '#fff' }}>
            <Flex style={{ paddingLeft: 10, paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#f3f3f3' }}>
              <Text>
                信用租机
              </Text>
            </Flex>
            <Flex style={{ backgroundColor: '#f2f2f2' }}>
              <ProudcuItem data={{
                "id": "1",
                "imgPath": "https://域名/source/images/xxxx",
                "phoneName": "oppo R9S",
                "phoneDesc": "全网通4G+64G 双卡双待手机 金色",
                "price": "2499",
                "linkUrl": "/pages/productDetail/productDetail"
              }} />
            </Flex>
            <Flex justify="center" align="center" style={{ paddingTop: 36, paddingBottom: 56 }}>
              <Text style={{ color: '#989898' }}>已支付差价金额：<Text style={{ color: Color.mainPink }}>{0}元</Text></Text>
            </Flex>
          </Flex>
          <Flex direction="column" align="stretch" style={{ paddingHorizontal: 10, flex: 1, width: '100%', backgroundColor:'#fff',paddingBottom: 80 }}>
            <Flex style={{ marginTop: 30 }}>
              <Button_ onPress={() =>this.goHome()}>
                {'回到首页'}
              </Button_>
            </Flex>
            <Flex style={{marginTop: 20}}>
              <Button_ onPress={() => { this.props.navigation.navigate('Accept', {
                orderId: this.state.orderId,
                staffNo: userInfo.staffNo
              }) }}>
                {'营业员受理'}
              </Button_>
            </Flex>
          </Flex>

        </Flex>
        
      </ScrollView>
    )
  }
}


const styles = StyleSheet.create({
  cardBox: {
    flex: 1,
  },
  textBase: {
    height: 24,
    lineHeight: 24
  }
});
