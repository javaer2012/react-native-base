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
  }

  componentDidMount() {

  }

  render() {
    const { replace } = this.props.navigation;
    // const { completePay } = this.state
    return (
      <Result
        imgUrl={require('../../images/success.png')}
        buttonType="primary"
        buttonText="回到首页"
        onButtonClick={(e) => replace("tab")}
        title="支付成功"
        message="0元"
      />

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
