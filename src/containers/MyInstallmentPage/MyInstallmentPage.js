import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, AsyncStorage } from 'react-native'
import { Button, Toast } from 'antd-mobile-rn';
import { bannerNav_mock, productList_mock } from '../../mock/ProductDetailPage'
import { flexRow, mainGray } from '../../styles/common'
import { Flex, List } from 'antd-mobile-rn';
import Spinner from 'react-native-loading-spinner-overlay';
import api from '../.././service/api'
import RentApp from "../../components/RentApp";
const { myStageList } = api

const Item = List.Item;

export default class MyInstallmentPage extends RentApp {
  state = {
    noRepayAmount:"111",
    periodList: [],
    loading: false,
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

  async componentDidMount(){
    await this.getOpenIdAndUserId()
    console.log(this.props.navigation.state.params,"=>>>>>>this.props.navigation.state.params")
    this.getData()
  }
  
  async getData() {
    await this.setState({ loading: true })
    const orderId = this.props.navigation.getParam('orderId');

    try {
      const { openId, cityCode, userId, provinceCode } = this
      const params = {
        sourceType: 3,
        openId,
        cityCode,
        userId,
        provinceCode,
        orderId,
        // 343164f313df40098c2e48d0a193de20
      }
      const { data } = await myStageList(params)
      console.log(data,"datadatadatadatadata")
      if (data.errcode !== 1 && data.errmsg) Toast.info(data.errmsg);
      this.setState({
        periodList: data.periodList,
        noRepayAmount: data.noRepayAmount
      })

    } catch (error) {
      console.log(error, "error")
    } finally {
      this.setState({ loading: false })
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
          const element = lastData[key].reverse();
          const one_year_list = element.map((item, index) => {
            const { accountStatus, repayStatus } = item
            // direction = "column"
            return (
              <Flex key={item.accountTime} justify="between" style={{ width: '100%', backgroundColor: '#fff', paddingHorizontal: 20, paddingVertical:10, borderTopWidth: 0.5, borderTopColor: '#f2f2f2' }}>
                <Text style={{width: 100}}>
                  {item.accountTime.substring(4, 6)}月份
                </Text>
                <Text style={{ width: 100 }}>{item.actualRepayAmount} </Text>
                <Text style={{ color: '#999999'}}>
                  {accountStatus === 0 && '未出账 >'}
                  {accountStatus === 1 && '已出账 >'}
                  {/* {repayStatus === 0 && '还款完成 >'}
                  {repayStatus === 1 && '逾期还款 >'} */}
                  {accountStatus === undefined && ' >'} 
                </Text>
              </Flex>
            )
          })
          return one_year_list
        }
      }
      const one_year_item = <Flex key={key} direction="column" style={{ width: '100%'}}>
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
    const { noRepayAmount, periodList, loading } = this.state
    return (
      <Flex direction="column" align="stretch">
        <Flex style={styles.totalMoneyStyle} direction="column" justify="center">
          <Text style={[styles.textBase]}>全部待还(元)</Text>
          <Text style={[styles.textBase]}>{noRepayAmount}</Text>
          <TouchableOpacity style={[styles.advance]} onPress={() => this.showToast('敬请期待')}>
            <Text>
              提前还款
            </Text>
          </TouchableOpacity>
          
        </Flex>
        <Flex direction="column" style={styles.cardBox}>
          {(!!periodList && !!periodList.length) && this.renderListTest(periodList)}
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
    backgroundColor: '#2FCBC3',
  },
  advance:{
    position: 'absolute',
    height: advanceH,
    // lineHeight: advanceH,
    bottom: 0 - advanceH / 2,
    // paddingVertical: 7,
    alignItems: 'center',
    justifyContent: 'center',
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
