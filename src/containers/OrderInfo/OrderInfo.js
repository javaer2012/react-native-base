import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, Button } from 'react-native'
import { Flex } from 'antd-mobile-rn';
// import { orderInfo_mock } from '../../mock/ProductDetailPage'
import ProudcuItem from '../../components/ProudcuItem'
import { flexRow, contentPadding } from '../../styles/common'
import Color from '../../styles/var'

const bgf = {
  backgroundColor: '#fff'
}


export default class OrderInfo extends Component {
  state = {
    completePay: false
  }

  componentDidMount() {
  }

  render() {
    const { navigate } = this.props.navigation;
    const { completePay } =this.state
    return (
      <Flex direction="column">
        {
          !completePay && (
            <Flex direction="column" justify="center" style={styles.QRCode}>
              <Image
                style={{ width: 100, height: 100 }}
                source={require('../../images/find.png')}
              //  || data.imgPath
              />
              <Text style={{marginTop: 10}}>
                凭此二维码到营业厅按理业务
              </Text>
            </Flex>
          )
        }
        
        <Flex style={styles.titleBox} direction="row" justify="start" align="start">
          <Text style={styles.title}>用户信息</Text>
        </Flex>
        <Flex direction="column" style={styles.mainContentBox}>
          <Text style={[styles.base]}>姓名: {11}</Text>
          <Text style={[styles.base]}>手机号码: {222}</Text>
          <Text style={[styles.base]}>身份证号: {333}</Text>
        </Flex>
        <Flex direction="column" align="start" style={styles.bottomMainBox}>
          <Flex style={styles.titleBox} direction="row" justify="start" align="start">
            <Text style={styles.title}>租机信息</Text>
          </Flex>
          <Flex style={{backgroundColor: '#fff'}}>
            <ProudcuItem data={{
              "id": "1",
              "imgPath": "https://域名/source/images/xxxx",
              "phoneName": "oppo R9S",
              "phoneDesc": "全网通4G+64G 双卡双待手机 金色",
              "price": "2499",
              "linkUrl": "/pages/productDetail/productDetail"
            }} />
          </Flex>
        </Flex>
        {!completePay && (
        <Flex direction="column" style={[styles.canBuyBox]}>
          <Text style={{ marginBottom: 10 }}>恭喜您获得购买资格</Text>
          <Text>您仅需支付: ￥{700}</Text>
          <Button
            style={{ width: "100%", backgroundColor: Color.mainPink }}
            onPress={() => navigate('ProductDetailPage', {})}
            title="提交"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
        </Flex>)}
        
        
      </Flex>
      
    )
  }
}


const styles = StyleSheet.create({
  title:{
    
  },
  titleBox: {
    paddingVertical: 15,
    ...contentPadding,
    width: '100%',
    ...bgf,
    marginBottom: 1
  },
  mainContentBox: {
    backgroundColor: '#fff',
    ...contentPadding,
    paddingVertical: 10,
    width: '100%'
    // flexGrow: 1
  },
  bottomMainBox: {
    marginTop: 14,
    ...bgf,
  },
  QRCode:{
    width: '100%',
    backgroundColor: '#fff',
    height: 200
  },
  canBuyBox: {
    marginTop: 14,
    width: '100%',
    padding: 30,
    ...bgf
  },
  base:{
    width: '100%',
    paddingVertical: 10
  }
});
