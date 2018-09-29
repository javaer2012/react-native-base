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
      goodsFirstAmount:'商品首付金额',
      stageMonthRate:'',
      payStatus:1,
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
          // orderList: data.orderList
        })
      }

      console.log(JSON.stringify(data), '=========>getData res')
    } catch (e) {
      console.log(e,"Err")
    }
  }
  
  renderList = (orderList) => {
    const { navigate } = this.props.navigation;
    return orderList.map((item, index) => {
      const { 
        orderSn,
        orderId,
        orderType,
        orderStatus,
        contractPhone,
        orderTime,
        handleTime,
        actualAmount,
        mealName,
        mealDesc,
        mealMonthFee,
        goodsPrice,
        goodsName,
        goodsDesc,
        goodsImage,
        goodsSkus,
        totalFirstAmount,
        goodsFirstAmount,
        stageMonthRate,
        payStatus
       } = item || {}
      return (
        <WingBlank key={index} style={{marginTop: 20}} size="lg">
          <Card>
            <Card.Header title={'订单号：' + orderSn}/>
            <Card.Body style={{borderBottomWidth: 1, borderBottomColor: '#f2f2f2'}}>
              {/* MyInstallmentPage */}
              <TouchableOpacity onPress={() => navigate('MyInstallmentPage', {})}>
                <Flex style={{ paddingHorizontal: 20}}>
                  <Image source={require('../../images/find.png')}/>
                  <Flex style={{marginLeft: 20}} direction="column" align="start">
                  
                    <Text style={styles.textBase}>{goodsName}{goodsDesc}</Text>
                    {/* <Text style={styles.textBase}>内存：</Text> */}
                    <Text style={styles.textBase}>价格：{goodsPrice}</Text>
                    <Text style={styles.textBase}>首付总金额：{goodsFirstAmount}</Text>
                    <Text style={styles.textBase}>分期利率：{stageMonthRate}</Text>
                    <Text style={styles.textBase}>分期金额：{mealMonthFee}</Text>
                    <Text style={styles.textBase}>应还总金额：{totalFirstAmount}</Text>
                    <Text style={styles.textBase}>支付状态：
                      {payStatus === 1 && '待支付'}
                      {payStatus === 2 && '已支付'}
                      {payStatus === 3 && '已退款'}
                    </Text>
                    {/* 1-待支付；2-已支付；3-已退款 */}
                    <Text style={styles.textBase}>订单状态：
                      {orderStatus === 1 && '已下单'} 
                      {orderStatus === 11 && '营业员扫码办理中'}
                      {orderStatus === 3 && '已办理'}
                    </Text>
                  </Flex>
                </Flex>
              </TouchableOpacity>
            </Card.Body>
            <Card.Footer
              style={{paddingTop: 7}}
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
