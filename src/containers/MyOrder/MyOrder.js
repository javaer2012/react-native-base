import React, { Component } from 'react'
import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Flex, List, Card, WhiteSpace, WingBlank } from 'antd-mobile-rn';
import api from '../.././service/api'
import RentApp from "../../components/RentApp";
const { myOrderList } = api
export default class MyOrder extends RentApp {
  state = {
    orderList:[{
      orderSn:'订单流水号',
      orderId:2,
      orderType: 1000,
      orderStatus:1,
      contractPhone:'13124077261',
      orderTime:'下单时间',
      handleTime:'办理时间',
      actualAmount:'实际使用额度',
      mealName: '套餐名称',
      mealDesc: '套餐描述',
      mealMonthFee: '套餐月费用',
      goodsPrice: '手机价格',
      goodsName: '商品名称',
      goodsDesc: '商品描述',
      goodsImage: '商品图片',
      goodsSkus: '机型sku',
      totalFirstAmount: '首付总金额',
      goodsFirstAmount:'商品首付金额'
    },{
      orderSn:1,
      orderId:2,
      orderType:3,
      orderStatus:4
    }]
  }

  async componentDidMount() {
    try {
      await this.getOpenIdAndUserId()
      this.getData()
    } catch (error) {
      console.log(error,"error")
    }
  }

  async getData() {
    try {

      // const user = await AsyncStorage.multiGet(['userId', 'openId', 'isBinding', 'addressInfos'])
      const params = {
        userId: this.userId,
        openId: this.openId,
        cityCode: this.cityCode,
        provinceCode: this.provinceCode
      }
      // console.log(params, '=======》 params')
      const { data } = await api.myOrderList(params)
      if (data.errcode === 1) {
        this.setState({
          orderList: data.orderList
        })
      }

      console.log(JSON.stringify(rsp), '=========>getData res')
    } catch (e) {

    }
  }
  
  renderList = (orderList) => {
    const { navigate } = this.props.navigation;
    return orderList.map((item, index) => {
      return (
        <WingBlank key={index} style={{marginTop: 20}} size="lg">
          <Card>
            <Card.Header
              title="订单号"
              // extra="this is extra"
            />
            <Card.Body>
              {/* MyInstallmentPage */}
              <TouchableOpacity onPress={() => navigate('MyInstallmentPage', {})}>
                <Flex style={{ paddingHorizontal: 20}}>
                  <Image source={require('../../images/find.png')}/>
                  <Flex style={{marginLeft: 20}} direction="column" align="start">
                    {/* <Text style={styles.textBase}>内存：</Text>
                    <Text style={styles.textBase}>价格：</Text> */}
                    <Text style={styles.textBase}>首付总金额：</Text>
                    <Text style={styles.textBase}>分期利率：</Text>
                    <Text style={styles.textBase}>分期金额：</Text>
                    <Text style={styles.textBase}>应还总金额：</Text>
                    <Text style={styles.textBase}>支付状态：</Text>
                    <Text style={styles.textBase}>订单状态</Text>
                  </Flex>
                </Flex>
              </TouchableOpacity>
            </Card.Body>
            <Card.Footer
              content="查看我的分期"
              extra=">"
            />
          </Card>
        </WingBlank>
      )
    })
  }

  render() {
    const { orderList } =this.state
    return (
      <ScrollView>
        <Flex direction="column" align="stretch">
          {!!orderList.length && this.renderList(orderList)}
          { !orderList.length && <Text style={{textAlign: 'center', marginTop: 100, color: '#888'}}>暂无订单信息</Text> }
        </Flex>
      </ScrollView>
    )
  }
}


const styles = StyleSheet.create({
  textBase:{
    height: 24,
    lineHeight: 24
  }
});
