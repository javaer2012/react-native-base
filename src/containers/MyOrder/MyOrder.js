import React, { Component } from 'react'
import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Flex, List, Card, WhiteSpace, WingBlank } from 'antd-mobile-rn';

export default class MyOrder extends Component {
  state = {
    orderList:[{
      orderSn:1,
      orderId:2,
      orderType:3,
      orderStatus:4
    },{
      orderSn:1,
      orderId:2,
      orderType:3,
      orderStatus:4
    }]
  }

  componentDidMount() {
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
                    <Text style={styles.textBase}>内存：</Text>
                    <Text style={styles.textBase}>价格：</Text>
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
          {this.renderList(orderList)}
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
