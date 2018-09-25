import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, AsyncStorage } from 'react-native'
import { Button, Toast } from 'antd-mobile-rn';
import { bannerNav_mock, productList_mock } from '../../mock/ProductDetailPage'
import { flexRow, mainGray } from '../../styles/common'
import { Flex, List } from 'antd-mobile-rn';
import api from '../.././service/api'
import RentApp from "../../components/RentApp";
const { myStageList } = api

const periodList = [{
  "accountTime": "201804",
  "totalRepayAmount": 1003.00,
  "actualRepayAmount": 0.00,
  "periodNoRepayAmount": 1003.00,
  "shouldClearDate": "2018年04月15日 00:00",
  "accountCycleDate": "2018年03月15日-04月14日",
  "lastRepayTime": "2018年04月20日 00:00",
  "orderSn": "201802251645327270001381",
  "goodsName": "iphone7 plus",
  "status": 1000
}, {
    "accountTime": "201803",
    "totalRepayAmount": 1003.00,
    "actualRepayAmount": 0.00,
    "periodNoRepayAmount": 1003.00,
    "shouldClearDate": "2018年04月15日 00:00",
    "accountCycleDate": "2018年03月15日-04月14日",
    "lastRepayTime": "2018年04月20日 00:00",
    "orderSn": "201802251645327270001381",
    "goodsName": "iphone7 plus",
    "status": 1000
  } , {
    "accountTime": "201704",
    "totalRepayAmount": 1003.00,
    "actualRepayAmount": 0.00,
    "periodNoRepayAmount": 1003.00,
    "shouldClearDate": "2018年04月15日 00:00",
    "accountCycleDate": "2018年03月15日-04月14日",
    "lastRepayTime": "2018年04月20日 00:00",
    "orderSn": "201802251645327270001381",
    "goodsName": "iphone7 plus",
    "status": 1000
  }]

const Item = List.Item;

export default class MyInstallmentPage extends RentApp {
  state = {
    totalMoney:"111",
    periodList: periodList,
    // dataObj:{
    //   noRepayAmount:'100',
    //   stageId: '22',
    //   periodList: [
    //     {
    //       detailId:'',
    //       accountTime:''
    //     }
    //   ]
    // }
  }

  componentDidMount(){
    this.getData()
  }
  
  async getData() {

    try {
      const ids = await AsyncStorage.multiGet(['openId', 'userId', 'addressInfos'])
      this.openId = ids[0][1]
      this.userId = ids[1][1]
      this.cityCode = JSON.parse(ids[2][1]).cityCode
      this.provinceCode = JSON.parse(ids[2][1]).provinceCode

      const { openId, cityCode, userId, provinceCode } = this
      console.log(provinceCode, "RRRRRR")
      const params = {
        sourceType: 3,
        openId,
        cityCode,
        userId,
        provinceCode,
        orderId: '0355df170a52440db9cb5dc614703ac7'
      }
      const { data } = await myStageList(params)
      if (data.errcode !== 1 && data.errmsg) Toast.info(data.errmsg);
      console.log(data, '=========>myStageList')

    } catch (error) {
      console.log(error, "error")
    }
  }

  renderListTest = (list) => {
    const titleSet = new Set();
    const lastData = {}
    if (list.length > 1) {
      list.forEach(item => {
        titleSet.add(item.accountTime.substring(0, 4))
      });
    }
    const titleArr = [...titleSet]

    titleArr.forEach(arrItem => {
      list.forEach(listItem => {
        if (listItem.accountTime.substring(0, 4) === arrItem) {
          if (!lastData[arrItem]) lastData[arrItem] = []
          lastData[arrItem].push(listItem)
        }
      });
    });
    const renderArr = []
    for (const key in lastData) {
      if (lastData.hasOwnProperty(key)) {
        var renderOneYearList = () => {
          const element = lastData[key];
          const one_year_list = element.map((item, index) => {
            const { paymentStatus } = item
            // direction = "column"
            return (
              <Flex key={item.accountTime} justify="between" style={{ width: '100%', backgroundColor: '#fff', paddingHorizontal: 20, paddingVertical:10, borderTopWidth: 0.5, borderTopColor: '#f2f2f2' }}>
                <Text style={{width: 100}}>
                  {item.accountTime}
                </Text>
                <Text style={{ width: 100 }}>{item.actualRepayAmount} </Text>
                <Text>
                  {paymentStatus === '1' && '未还款 >'}
                  {paymentStatus === '2' && '还款中 >'}
                  {paymentStatus === '3' && '还款完成 >'}
                  {paymentStatus === '4' && '逾期还款 >'}
                  {paymentStatus === undefined && ' >'} 
                </Text>
              </Flex>
            )
          })
          return one_year_list
        }
      }
      const one_year_item = <Flex key={key} direction="column" style={{ width: '100%',  marginBottom: 20 }}>
        <Flex justify="center" align="stretch" style={{ width: '100%', backgroundColor: '#f2f2f2', paddingVertical: 10}}>
          <Text style={{ backgroundColor: 'transparent'}}>{key}年</Text>
        </Flex>
        {renderOneYearList()}
      </Flex>
      renderArr.push(one_year_item)
    }
    return renderArr.sort((a,b) => {
      return b.key - a.key
    })
  }

  render() {
    const { totalMoney, periodList } = this.state
    return (
      <Flex direction="column" align="stretch">
        <Flex style={styles.totalMoneyStyle} direction="column" justify="center">
          <Text style={[styles.textBase]}>全部待还(元)</Text>
          <Text style={[styles.textBase]}>{totalMoney}</Text>
          <Text style={[ styles.advance]}>
            提前还款
          </Text>
        </Flex>
        <Flex direction="column" style={styles.cardBox}>
          {this.renderListTest(periodList)}
        </Flex>
        
      </Flex>
    )
  }
}

const advanceH = 40
const styles = StyleSheet.create({
  totalMoneyStyle:{
    position: 'relative',
    width: '100%',
    padding: 30,
    backgroundColor: 'green',
  },
  advance:{
    position: 'absolute',
    height: advanceH,
    lineHeight: advanceH,
    bottom: 0 - advanceH / 2,
    // paddingVertical: 7,
    paddingHorizontal: 60,
    backgroundColor: '#fff'
  },
  cardBox:{
    marginHorizontal: 15,
    marginTop: 30,
    // backgroundColor: '#fff'
  },
  // itemStyle:{
  //   width: '100%', 
  //   padding: 14,
  //   borderBottomWidth: 1,
  //   borderBottomColor: '#f2f2f2'
  // },
  textBase:{
    color: '#fff'
  }
});
