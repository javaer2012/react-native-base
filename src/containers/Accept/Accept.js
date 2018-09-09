import React, { Component } from 'react'
import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, Alert } from 'react-native';
import { Flex, List, Card, WhiteSpace, WingBlank, Tabs, SearchBar, Button } from 'antd-mobile-rn';
import ProudcuItem from '../../components/ProudcuItem'


export default class Accept extends Component {
  state = {

  }

  componentDidMount() {
  }

  renderList = (data) => {
    const { navigate } = this.props.navigation;
    if (!data || !(data instanceof Array)) return false
    return data.map((item, index) => {
      return (
        <TouchableOpacity
          key={index}
          onPress={() => navigate('ProductDetailPage', {})}
        >
          <ProudcuItem data={item}>
            {/* <Button style={{ width: 80, backgroundColor: Color.mainPink }} size='small'>
              <Text style={{ color: '#fff' }}>去购买</Text>
            </Button> */}
          </ProudcuItem>
        </TouchableOpacity>
      )
    })
  }

  render() {
    const { orderList } = this.state
    const { navigate } = this.props.navigation;
    return (
      <Flex direction="column" align='stretch' >
        <Flex direction="column" align='stretch' style={styles.topCard}>
          <Text>分期月利率: {1}</Text>
          <Text>每期分期金额: {1}</Text>
          <Text>分期总金额: {1}</Text>
        </Flex> 
        <Flex direction="column" align='stretch' style={styles.topCard}>
          <Text style={styles.title}>套餐信息: {1}</Text>
          <Text>套餐编码: {1}</Text>
          <Text>套餐名称: {1}</Text>
          <Text>套餐描述: {1}</Text>
        </Flex> 
        <Flex direction="column" align='stretch' style={styles.topCard}>
          <Text style={styles.title}>租机信息: {1}</Text>
          {this.renderList([{
            "goodsId": "11",
            "goodsName": "oppo R9s",
            "goodsDesc": "全网通4G+64G 双卡双待手机 金色",
            "goodsBrand": null,
            "goodsModel": "",
            "goodsDetailText": "手机详情富文本描述"
          }])}
        </Flex> 
        <Flex>
          <Text>
            已支付差价金额 ￥ {0.0}
          </Text>
        </Flex>
        <Button>返回首页</Button>
        <Button></Button>
      </Flex>
      // <ScrollView style={{ backgroundColor: '#fff', flex: 1 }}>
      // </ScrollView>
    )
  }
}


const styles = StyleSheet.create({
  title:{
    fontSize: 20
  },
  topCard:{
   
  },
  textBase: {
    height: 24,
    lineHeight: 24
  }
});
