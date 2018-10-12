import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native'
import { Flex, List, ImagePicker, Button, WhiteSpace, Result } from 'antd-mobile-rn';
// import { orderInfo_mock } from '../../mock/ProductDetailPage'
import Color from '../../styles/var'
import Progress from '../../components/Progress'

const bgf = {
  backgroundColor: '#fff'
}


export default class Pay extends Component {
  state = {
    completePay: false,
    orderId:''
  }

  componentDidMount() {
    // const orderId = this.props.
    const orderId = this.props.navigation.getParam('orderId');
    this.setState({ orderId })
  }

  render() {
    const { replace } = this.props.navigation;
    const { orderId } = this.state
    return (
      <View style={{backgroundColor: '#fff', flex: 1}}>
        <Result
          imgUrl={require('../../images/success.png')}
          buttonType="primary"
          // buttonText="回到首页"
          // onButtonClick={(e) => replace("tab")}
          title="支付成功"
          message="0元"
        />
        <Flex direction="row" justify="around" style={{marginTop: 20}}>
          <Button style={{ backgroundColor: Color.mainPink}} style={{ backgroundColor: Color.mainPink }} onClick={() => replace("OrderInfo", {orderId})}>
            <Text style={{color: '#fff'}}>
              查看订单
            </Text>
          </Button>
          <Button style={{ backgroundColor: Color.mainPink}} onClick={() => replace("tab")}>
            <Text style={{ color: '#fff' }}>
              回到首页
            </Text>
          </Button>
        </Flex>
        {/* <Result
          imgUrl={require('../../images/success.png')}
          buttonType="primary"
          buttonText="回到首页"
          onButtonClick={(e) => replace("tab")}
          title="支付成功"
          message="0元"
        /> */}
      </View>

      // <Flex direction="column" style={{ backgroundColor: '#f6f6f6', flex: 1 ,padding: 20, borderRadiu: 5}}>
      //   <Flex justify="center" style={{width: '100%', height: 150,backgroundColor: '#fff'}}>
      //     <Text>支付成功</Text>
      //     <Text>已支付金额 ￥{0}</Text>
      //   </Flex>
      //   <Flex style={{ marginTop: 0, width: '100%', padding: 10 }}>
      //     <Button style={{ flexGrow: 1 }}>确定</Button>
      //     {/* <Button style={{ flexGrow: 1, marginHorizontal: 5  }}>返回首页</Button> */}
      //   </Flex>

      //   {/* <ActivityIndicator /> */}
      // </Flex>
    )
  }
}


const styles = StyleSheet.create({
});
