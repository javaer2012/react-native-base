import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native'
import { Flex, List, InputItem, Button } from 'antd-mobile-rn';
// import { orderInfo_mock } from '../../mock/ProductDetailPage'
import Color from '../../styles/var'
import Progress from '../../components/Progress'

const bgf = {
  backgroundColor: '#fff'
}


export default class Accept extends Component {
  state = {
    completePay: false,
    agreement:'',
    crm:'',
    client: ''
  }

  goToNext = () => {
    const { navigate } = this.props.navigation
    const { agreement, crm, client } = this.state
    navigate('Pay', {
      agreement,
      crm,
      client,
      // firstPay: data.firstPay
    })
  }

  render() {
    // const { navigate } = this.props.navigation;
    // const { completePay } = this.state
    var options = {};
    
    const data = [
      {
        active: true,
        text: '填信息'
      }, {
        active: false,
        text: '上传并签协议'
      }
    ]
    const inputBoxStyle = {
      marginTop: 10,
      borderBottomColor: '#f2f2f2',
      borderBottomWidth: 1,
      width: '100%',
      padding: 10
      // alignItems: 'stretch',
      
    }
    const inputBaseStyle = {
      marginTop: 5,
      borderColor: '#fff',
      color: '#ccc',
      // backgroundColor: 'red',
      paddingVertical: 5,
      flex: 1
    }
    const labelStyle = {

    }
    return (
      <Flex direction="column" style={{backgroundColor: '#fff', flex: 1}}>
        <Flex style={{marginTop: 16}}>
          <Progress data={data} />
        </Flex>
        <Flex  style={{marginTop: 80, width: '100%', backgroundColor: '#fff'}}>
          <Flex direction="column" style={{ flex: 1, borderColor: '#fff', paddingHorizontal: 20 }}>
            <Flex  style={[inputBoxStyle]}>
              <Text style={[labelStyle,{marginRight: 10}]}>合约号码</Text>
              <TextInput
                style={ inputBaseStyle }
                onChangeText={(text) => this.setState({ agreement: text })}
                value={"请输入合约号码"}
              />
            </Flex >
            <Flex   style={[inputBoxStyle]}>
              <Text style={[labelStyle, { marginRight: 10 }]}>crm订单号</Text>
              <TextInput
                style={ inputBaseStyle }
                onChangeText={(text) => this.setState({ crm:text })}
                value={"请输入crm订单号"}
              />
            </Flex >
            <Flex  style={[inputBoxStyle]}>
              <Text style={[labelStyle, { marginRight: 10 }]}>终端串码</Text>
              <TextInput
                style={ inputBaseStyle }
                onChangeText={(text) => this.setState({ client:text })}
                value={"请输入终端串码"}
              />
            </Flex >
            <Flex justify="center" style={{width: '100%', marginTop: 40}}>
              {/* <Button style={{ width: 340}}>下一步</Button> */}
              <TouchableOpacity
                style={{ padding: 14, backgroundColor: Color.mainPink, width: '100%' }}
                onPress={() => this.goToNext() }>
                <Text style={{ color: '#fff', textAlign: "center" }}>下一步</Text>
              </TouchableOpacity>
            </Flex>
          </Flex>
        </Flex>
        
        {/* <ActivityIndicator /> */}
      </Flex>
    )
  }
}


const styles = StyleSheet.create({
});
