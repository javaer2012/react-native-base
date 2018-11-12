import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, AsyncStorage, ScrollView } from 'react-native'
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
  static navigationOption = {
    title: '我的分期'
  }
  state = {
    noRepayAmount:"-",
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
    this.getData()
  }
  advanceReimbursement = () => {
    const { noRepayAmount, stageId } = this.state
    const { navigate } = this.props.navigation;
    // const { orderSn, activeId, orderId } = this.props.navigation.state.params
    // const orderId = this.props.navigation.getParam('orderId');
    const orderSn = this.props.navigation.getParam('orderSn');
    const activeId = this.props.navigation.getParam('activeId');
    navigate('Pay', {
      amount: noRepayAmount,
      orderId: stageId,
      orderSn,
      activeId,
      payType: '3',
      fromPage: 'MyInstallmentPage'
    })
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
      console.log(JSON.stringify(data) ,"datadatadatadatadata")
      if (data.errcode !== 1 && data.errmsg) Toast.info(data.errmsg);
      this.setState({
        periodList: data.periodList,
        noRepayAmount: data.noRepayAmount,
        stageId: data.stageId
      })

    } catch (error) {
      console.log(error, "error")
    } finally {
      this.setState({ loading: false })
    }
  }
  // 每条分期还款
  reimbursement = (item) => {
    if (item.accountStatus === 0) {
      const { navigate } = this.props.navigation;
      // const { orderSn, activeId, orderId } = this.props.navigation.state.params
      // const orderId = this.props.navigation.getParam('orderId');
      const orderSn = this.props.navigation.getParam('orderSn');
      const activeId = this.props.navigation.getParam('activeId');
      navigate('Pay', {
        amount: item.periodNoRepayAmount,
        orderId: item.detailId,
        orderSn,
        activeId,
        payType: '2',
        fromPage: 'MyInstallmentPage'
      })
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
                <Text style={{ width: 100 }}>{item.periodNoRepayAmount} </Text>
                <Text onPress={this.reimbursement.bind(this, item)} style={{ color: '#999999'}}>
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
        <Flex align='start' justify='center' style={styles.topBox}>
          <Flex style={styles.totalMoneyStyle} direction="column" justify="center">
            <Text style={[styles.textBase]}>全部待还(元)</Text>
            <Text style={[styles.textBase, {
              fontSize: 24,
              fontWeight: '600',
            }]}>{noRepayAmount}</Text>
          </Flex>
          <TouchableOpacity style={[styles.advance]} onPress={() => this.advanceReimbursement()}>
            <Text>
              提前还款
            </Text>
          </TouchableOpacity>
        </Flex>
        <ScrollView>
          <Flex direction="column" style={styles.cardBox}>
            {(!!periodList && !!periodList.length) && this.renderListTest(periodList)}
          </Flex>
        </ScrollView>
        

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
    overflow: 'visible',
    backgroundColor: '#2FCBC3',
    height: 130
  },
  topBox:{
    position: 'relative',
    height: 150
  },
  advance:{
    position: 'absolute',
    zIndex: 5,
    height: advanceH,
    
    // lineHeight: advanceH,
    bottom: 0,
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
