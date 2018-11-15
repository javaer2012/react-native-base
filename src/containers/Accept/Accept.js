import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native'
import { Flex, List, InputItem, Button, WhiteSpace } from 'antd-mobile-rn';
// import { orderInfo_mock } from '../../mock/ProductDetailPage'
import Color from '../../styles/var'
// import Progress from '../../components/Progress'

const bgf = {
  backgroundColor: '#fff'
}


export default class Accept extends Component {
  state = {
    completePay: false,
    agreement:'',
    crm:'',
    client: '',
    orderId:''
  }
  componentDidMount(){
    // const orderId = this.props.navigation.get
    const orderId = this.props.navigation.getParam('orderId');
    this.setState({ orderId })
  }
  goToNext = () => {
    const { navigate } = this.props.navigation
    const { agreement, crm, client, orderId } = this.state
    navigate('CrmPage_2', {
      agreement,
      crm,
      client,
      orderId,
      // staffNo: "312",
      // firstPay: data.firstPay
    })
  }

  render() {
    const { agreement, crm, client } = this.state
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
        <WhiteSpace size={"xl"} />
        <Flex style={styles.progressBox} direction={"row"} align="start" justify={"between"}>
          <Flex direction='column'>
            <View style={styles.circle}>
              <Text style={styles.text}>1</Text>
            </View>
            <Flex>
              <Text style={{ color: '#3487FF', fontSize: 10, marginTop: 5}}>填写信息</Text>
            </Flex>
          </Flex>

          <View style={styles.line}></View>

          <Flex direction='column'>
            <View style={styles.circle2}>
              <Text style={styles.text}>2</Text>
            </View>
            <Flex>
              <Text style={{ color: '#ccc', fontSize: 10, marginTop: 5 }}>上传照片并协议</Text>
            </Flex>
          </Flex>
        </Flex>
        <WhiteSpace size={"xl"} />
        <Flex  style={{marginTop: 20, width: '100%', backgroundColor: '#fff'}}>
          <Flex direction="column" style={{ flex: 1, borderColor: '#fff', paddingHorizontal: 20 }}>
            <Flex  style={[inputBoxStyle]}>
              <Text style={[labelStyle,{marginRight: 10}]}>合约号码</Text>
              <TextInput
                style={ inputBaseStyle }
                onChangeText={(text) => this.setState({ agreement: text })}
                placeholder={"请输入合约号码"}
                value={agreement}
              />
            </Flex >
            <Flex   style={[inputBoxStyle]}>
              <Text style={[labelStyle, { marginRight: 10 }]}>crm订单号</Text>
              <TextInput
                style={ inputBaseStyle }
                onChangeText={(text) => this.setState({ crm:text })}
                placeholder={"请输入crm订单号"}
                value={crm}
              />
            </Flex >
            <Flex  style={[inputBoxStyle]}>
              <Text style={[labelStyle, { marginRight: 10 }]}>终端串码</Text>
              <TextInput
                style={ inputBaseStyle }
                onChangeText={(text) => this.setState({ client:text })}
                placeholder={"请输入终端串码"}
                value={client}
              />
            </Flex >
            <Flex justify="center" style={{width: '100%', marginTop: 40}}>
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
  progressBox:{ width: 200, position: 'relative' },
  circle: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#3487FF' },
  circle2: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#ccc' },
  text: { textAlign: 'center', height: 36, lineHeight: 36, fontSize: 20, color: 'white' },
  text2: { textAlign: 'center', height: 36, lineHeight: 36, fontSize: 20, color: 'white' },
  line: { width: 100, height: 2, backgroundColor: '#ccc', marginHorizontal: 5, marginTop: 18, position: 'absolute', marginLeft: 43 },
  camera: { width: 35, height: 35 }
})