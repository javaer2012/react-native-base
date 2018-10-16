import React, { Component } from 'react'
import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, Alert } from 'react-native';
import { Flex, List, Card, WhiteSpace, WingBlank, Tabs, SearchBar } from 'antd-mobile-rn';
import api from '../.././service/api'
// const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
import RentApp from "../../components/RentApp";
const { HTTP_IMG, orderList: orderList_ajax } = api

export default class WorkerOrder extends RentApp {
  static navigationOption = {
    title: '营业员'
  }
  state = {
    // orderList:[],
    notDoOrderList: [],
    hasDoOrderList: [],
    pageNum: 1,
    pageSize: 10
  }

  async componentDidMount() {
    await this.getOpenIdAndUserId()
    this.getData(1)
    this.getData(2) // 已受理
  }

  getData = async (type) => {
    const { pageNum, pageSize } = this.state
    const params = {
      sourceType: 3,
      "openId": this.openId,
      "provinceCode": this.provinceCode,
      "cityCode": this.cityCode,
      userId: this.userId,
      status: type,
      pageSize,
      pageNum
    }
    const { data } = await orderList_ajax(params)
    if (type === 1) {
      console.log(data.orderList, "======>notDoOrderList")
      this.setState({
        notDoOrderList: data.orderList
      })
    } else if (type === 2) {
      console.log(data.orderList, "======>hasDoOrderList")
      this.setState({
        hasDoOrderList: data.orderList
      })
    }

  }

  searchFun = () => {

  }
  renderOrders = (list, type) => {
    return list.map((item, index) => {
      const {
        orderId,
        orderSn,
        orderType,
        userName,
        idCardNo,
        phoneNo,
        orderTime,
        handleTime
      } = item
      const { navigate } = this.props.navigation;
      return (
        <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => navigate('MyInstallmentPage', {})}>
          <Flex style={styles.orderBox} key={index} direction="column" align="start">
            <View style={styles.title}>
              <Text>订单流水号：{orderSn}</Text>
            </View>
            <Text style={styles.textBase}>用户姓名：{userName}</Text>
            <Text style={styles.textBase}>身份证号：{idCardNo}</Text>
            <Text style={styles.textBase}>电话号码：{phoneNo}</Text>
            <Text style={styles.textBase}>状态：{type === 1 && '未受理'}{type === 2 && '已受理'}</Text>
            <Text style={styles.textBase}>下单时间：{orderTime}</Text>
          </Flex>
        </TouchableOpacity>
      )
    })
  }

  render() {
    const { notDoOrderList, hasDoOrderList } = this.state
    const { navigate } = this.props.navigation;
    const tabs = [
      { title: '已受理' },
      { title: '未受理' },
    ];
    const STYLE = {
      alignItems: 'stretch',
      justifyContent: 'center',
      flexGrow: 1,
      backgroundColor: 'red'
      // backgroundColor: '#fff',, backgroundColor: '#fafafa'
    }
    return (
      <ScrollView style={{ backgroundColor: '#fff', flex: 1 }}>
        <Flex>
          <Text>用户信息</Text>
        </Flex>
        {/* <Flex style={{ flexGrow: 1, height: '100%', position: 'relative', backgroundColor: '#fafafa' }} direction="column" align="stretch">
          
        </Flex> */}
      </ScrollView>
    )
  }
}


const styles = StyleSheet.create({
  title: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#E9E8E8',
    flex: 1,
    width: '100%',
    paddingHorizontal: 9,
    marginBottom: 13
  },
  orderBox: {
    flex: 1,

  },
  textBase: {
    height: 24,
    lineHeight: 24,
    paddingHorizontal: 9
  }
});
