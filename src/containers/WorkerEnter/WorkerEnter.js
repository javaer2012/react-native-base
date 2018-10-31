import React, { Component } from 'react'
import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, Alert, Dimensions } from 'react-native';
import { Flex, List, Card, WhiteSpace, WingBlank, Tabs, SearchBar } from 'antd-mobile-rn';
import api from '../.././service/api'
import {newTabsStyle} from '../../antdStyle'
// const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
import RentApp from "../../components/RentApp";
import CSearch from '../../components/common/CTextInput'


const { HTTP_IMG, orderList: orderList_ajax } = api
const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

export default class WorkerEnter extends RentApp {
  static navigationOption = {
    title: '营业员'
  }
  state = {
    // orderList:[],
    notDoOrderList:[],
    hasDoOrderList:[],
    searchNotDoOrderList:[], 
    searchHasDoOrderList:[],
    pageNum: 1,
    pageSize: 10,
    value:''
  }

  async componentDidMount() {
    await this.getOpenIdAndUserId()
    const { orderList: notDoOrderList} = await this.getData(1) // 未受理
    const { orderList: hasDoOrderList }  = await this.getData(2) //  已受理
    
    this.setState({
      hasDoOrderList,
      notDoOrderList
    })
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
    console.log(JSON.stringify(data),"!!!!!!!")
    if (!data || data.errcode !== 1) {
      throw data.errmsg || "data 获取数据失败"
      return
    } else{
      return data
    }
  }

  searchFun = (type) => {
    const { notDoOrderList, hasDoOrderList, value } = this.state
    if (type == 1) {  // 未受理
      const filterArr = notDoOrderList.filter(item => {
        const text = Object.values(item).filter(i => typeof i === 'string').join('')
        return text.indexOf(value) !== -1
      })

      this.setState({
        // notDoOrderList: filterArr
        searchNotDoOrderList: filterArr
      })
    } else if (type == 2) { // 已受理
      const filterArr = hasDoOrderList.filter(item => {
        const text = Object.values(item).filter(i => typeof i === 'string').join('')
        return text.indexOf(value) !== -1
      })

      this.setState({
        // hasDoOrderList: filterArr
        searchHasDoOrderList: filterArr
      })
    }
  }
  renderOrders = (type) => {
    let { notDoOrderList, searchNotDoOrderList, searchHasDoOrderList, hasDoOrderList, value } = this.state
    if (value === '') {
        searchNotDoOrderList= notDoOrderList
        searchHasDoOrderList= hasDoOrderList
    }
    renderList = (list) => {
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
          <TouchableOpacity
            key={index}
            style={{ marginBottom: 10, backgroundColor: '#fff', paddingBottom: 20 }}
            onPress={() => {
              if (type == 2) return
              navigate('OrderDetail', {
                orderId,
              })
            }}
          >
            <Flex style={styles.orderBox} direction="column" align="start">
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

    if (type === 1) {
      return (
        <ScrollView style={{ height: HEIGHT - 140 }}>
          {renderList(searchNotDoOrderList)}
        </ScrollView>
      )
    } else if (type === 2) {
      return (
        <ScrollView style={{ height: HEIGHT - 140 }}>
          {renderList(searchHasDoOrderList)}
        </ScrollView>
      )
    }
    


  }

  render() {
    const { notDoOrderList, hasDoOrderList } = this.state
    const { navigate } = this.props.navigation;
    const tabs = [
      { title: '未受理' },
      { title: '已受理' },
     
    ];
    const STYLE = {
      alignItems: 'flex-start',
      justifyContent: 'center',
      flexGrow: 1,
      // backgroundColor: '#fff',, backgroundColor: '#fafafa'
    }
    return (
        <ScrollView style={{ flex: 1, height: HEIGHT - 90 }}>
          <Flex style={{ flexGrow: 1, height: '100%', position: 'relative',  }} direction="column" align="stretch">
          <Tabs styles={newTabsStyle}  tabBarUnderlineStyle style={{borderBottomWidth: 0,borderColor:'#f2f2f2'}} tabs={tabs} initialPage={0}>
          {/* 未受理 */}
                {(!!notDoOrderList && !!notDoOrderList.length)
                  ? (
                <Flex style={{ flex: 1 }}  direction="column" align="stretch">
                      <Flex  direction="column" align="stretch">
                        <CSearch
                          style={{ borderColor: '#E9E8E8' }}
                          value={this.state.value}
                          onChange={(value) => this.setState({ value })}
                          showCancelButton={false}
                          onSubmit={this.searchFun.bind(this, 1)}
                          placeholder="搜索未受理订单" />
                      </Flex>
                      {this.renderOrders(1)}

                    </Flex>
                  ) 
                  : (
                    <Flex justify="center" align="center" style={{ flex: 1, height: HEIGHT - 140 }}>
                      <Text style={{ color: '#888', fontSize: 14 }}>暂无订单</Text>
                    </Flex>
                  )
                }

                {(!!hasDoOrderList && !!hasDoOrderList.length)
                  ? (
                <Flex style={{ flex: 1 }}  direction="column" align="stretch">
                      <Flex direction="column" align="stretch">
                        <CSearch
                          // style={{ border: 'none' }}
                          value={this.state.value}
                          onChange={(value) => this.setState({ value })}
                          showCancelButton={false}
                          onSubmit={this.searchFun.bind(this, 2)}
                           placeholder="搜索已受理订单" />
                      </Flex>
                      {this.renderOrders(2)}
                    </Flex>
                  )
                  : (
                    <Flex justify="center" align="center" style={{ flex: 1, height: HEIGHT - 140 }}>
                      <Text style={{ color: '#888', fontSize: 14 }}>暂无订单</Text>
                    </Flex>
                  )
                }
              </Tabs>
              
            </Flex>
        </ScrollView>
    )
  }
}


const styles = StyleSheet.create({
  title:{
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#E9E8E8',
    flex: 1,
    width: '100%',
    paddingHorizontal: 9,
    marginBottom: 13
  },
  orderBox:{
    flex: 1,
    
  },
  textBase: {
    height: 24,
    lineHeight: 24,
    paddingHorizontal: 9
  }
});
