import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, ActivityIndicator, TextInput, Dimensions } from 'react-native'
import { Flex, List, ImagePicker, Button, WhiteSpace } from 'antd-mobile-rn';
// import { orderInfo_mock } from '../../mock/ProductDetailPage'
import Color from '../../styles/var'
import Progress from '../../components/Progress'
import api from '../.././service/api'
const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
const { payment, HTTP_IMG } = api

const bgf = {
  backgroundColor: '#fff'
}


export default class Pay extends Component {
  state = {
    completePay: false,
  }

  componentDidMount() {

  }

  goToPay = async () => {
    try {
      const { data } = await payment()
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    // const { navigate } = this.props.navigation;
    // const { completePay } = this.state
    return (
      <Flex direction="column" style={{ backgroundColor: '#f6f6f6', flex: 1 }}>
        <Flex style={{ width: '100%', backgroundColor: '#f6f6f6', padding: 8}}>
          <Text>
            订单已提交，订单将于<Text>23:00</Text>关闭，请在规定时间内支付
          </Text>
        </Flex>
        
        <Flex justify="between" style={{width: '100%', paddingVertical: 8, paddingHorizontal: 14, backgroundColor: '#fff'}}>
          <Text>
            需支付金额
          </Text>
          <Text>
            ￥ {0} 
          </Text>
        </Flex>
        <Flex style={{marginTop: 0, width: '100%', padding: 20}}>
          <Button onClick={this.goToPay} style={{flexGrow: 1}}>立即支付</Button>
        </Flex>
        
        {/* <ActivityIndicator /> */}
      </Flex>
    )
  }
}


const styles = StyleSheet.create({
});
