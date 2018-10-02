import React, { Component } from 'react'
import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Flex, List, WhiteSpace, WingBlank } from 'antd-mobile-rn';
// import Button from '../../components/common/Button'
import Card from './components/Card'
import api from '../.././service/api'
import RentApp from "../../components/RentApp";
import ProudcuItem from '../../components/ProudcuItem'
import Color from '../../styles/var'
const { staffOrderDetail } = api
const Button_ = ({children}) => {
  return (
    <TouchableOpacity style={{ flex: 1, justifyContent:'center', backgroundColor: Color.mainPink, paddingVertical: 13, height: 40 }}>
      <Text style={{ color: '#fff', textAlign: 'center' }} >{children}</Text>
    </TouchableOpacity>
  )
}
export default class OrderDetail extends RentApp {
  state = {
    data: {
      goodsInfo: {
        goodsImagePath: '',
        goodsName: '',
        goodsDesc: '',
        actualUsedAmount: '',
        totalFirstAmount: '',
        goodsSkus: ''
      },
      userInfo: {
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
      ]

    }
  }

  async componentDidMount() {
    try {
      await this.getOpenIdAndUserId()
      this.getData()
    } catch (error) {
      console.log(error, "error")
    }
  }

  async getData() {
    try {

      // const user = await AsyncStorage.multiGet(['userId', 'openId', 'isBinding', 'addressInfos'])
      const params = {
        userId: this.userId,
        openId: this.openId,
        orderId: '31524c0b69a44ebbb163862094f412ec',
        cityCode: this.cityCode,
        provinceCode: this.provinceCode
      }
      // console.log(params, '=======》 params')
      const { data } = await staffOrderDetail(params)
      console.log(data, "ggggggggggggggggggggggggggggggggggggg")
      if (data.errcode === 1) {
       
        this.setState({
          // orderList: data.orderList
        })
      }

      console.log(JSON.stringify(rsp), '=========>getData res')
    } catch (e) {

    }
  }
  render() {
    const { data: { userInfo, stageInfo, contractMealInfo } } = this.state
    return (
      <ScrollView>
        <Flex direction="column">
          <Flex style={styles.cardBox} align="stretch">
            <Card title="用户信息">
              <Flex direction="column" align="start">
                <Text style={styles.textBase}>姓名：{userInfo.userName}</Text>
                <Text style={styles.textBase}>电话号码：{userInfo.phoneNo}</Text>
                <Text style={styles.textBase}>身份证号：{userInfo.idCardNo}</Text>
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
              <Button_>
                {'回到首页'}
              </Button_>
            </Flex>
            <Flex style={{marginTop: 20}}>
              <Button_>
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
