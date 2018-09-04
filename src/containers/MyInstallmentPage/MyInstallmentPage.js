import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Button } from 'antd-mobile-rn';
import { bannerNav_mock, productList_mock } from '../../mock/ProductDetailPage'
import { flexRow, mainGray } from '../../styles/common'
import { Flex, List } from 'antd-mobile-rn';

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
  }]

const Item = List.Item;

export default class MyInstallmentPage extends Component {
  state = {
    totalMoney:"111",
    periodList: periodList
  }

  componentDidMount(){
  }
  renderListTest = (list) => {
    const arr = [];
    const isSameYear = (year1, year2) => {
      return (+(year1.substring(0, 3))) - (+(year2.substring(0, 3)) )
    }
    if (list.length > 1) {
      for (let index = 1; index < list.length; index++) {
        // const ITEMCOM = (
        //   <Flex justify="space-between">
        //     <Flex></Flex>
        //     <Flex>{actualRepayAmount}</Flex>
        //     <Flex>
        //       <Text>未出账 > </Text>
        //     </Flex>
        //   </Flex>
        // )
        console.log(isSameYear(list[index].accountTime, list[index - 1].accountTime), "=====>renderList")

      }
    }
  }
  renderList = (list) => {
    return list.map((item, index) => {
      return (
        <Flex key={index} justify="space-between" style={styles.itemStyle}>
          <Flex>
            <Text>
              {item.accountTime}
            </Text>
          </Flex>
          <Flex>
            <Text>{item.actualRepayAmount} </Text>
          </Flex>
          <Flex>
            <Text>未出账 > </Text>
          </Flex>
        </Flex>
      )
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
          {this.renderList(periodList)}
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
    backgroundColor: '#fff'
  },
  itemStyle:{
    // width: '100%'
  },
  textBase:{
    color: '#fff'
  }
});
