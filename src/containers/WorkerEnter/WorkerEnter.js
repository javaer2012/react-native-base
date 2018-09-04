import React, { Component } from 'react'
import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, Alert } from 'react-native';
import { Flex, List, Card, WhiteSpace, WingBlank, Tabs, SearchBar } from 'antd-mobile-rn';

export default class WorkerEnter extends Component {
  state = {
  }

  componentDidMount() {
  }
  searchFun = () => {

  }
  renderOrders = (list) => {
    list= [1]
    return list.map((item, index) => {
      return (
        <Flex direction="column" align="start">
          <Text style={styles.title}>订单流水号：{22}</Text>
          <Text style={styles.textBase}>用户姓名：{22}</Text>
          <Text style={styles.textBase}>身份证号：{22}</Text>
          <Text style={styles.textBase}>电话号码：{22}</Text>
          <Text style={styles.textBase}>状态：{22}</Text>
          <Text style={styles.textBase}>下单时间：{22}</Text>
        </Flex>
      )
    })
  }

  render() {
    const { orderList } = this.state
    const { navigate } = this.props.navigation;
    const tabs = [
      { title: '已受理' },
      { title: '未受理' },
    ];
    const style = {
      alignItems: 'stretch',
      justifyContent: 'center',
      flexGrow: 1,
      backgroundColor: '#fff',
    }
    return (
        <ScrollView style={{backgroundColor: '#fff', flex: 1}}>
          <Flex style={{ flexGrow:1, height: '100%' }} direction="column" align="stretch">
            <Tabs tabs={tabs} initialPage={1}>
            <TouchableOpacity onPress={() => navigate('MyInstallmentPage', {})}>
              <Flex direction="column" align='stretch' >
                <SearchBar
                  style={{ border: 'none' }}
                  showCancelButton={false}
                  onSubmit={this.searchFun}
                  defaultValue="初始值" placeholder="搜索所有订单" />
                <Flex style={{ backgroundColor: '#fff' }} direction="column" align="stretch">
                  {this.renderOrders([])}
                </Flex>
              </Flex>
            </TouchableOpacity>
             
              <View style={style}>
                <Text>Content of Second Tab</Text>
              </View>
              <View style={style}>
                <Text>Content of Third Tab</Text>
              </View>
            </Tabs>
          </Flex>
        </ScrollView>
    )
  }
}


const styles = StyleSheet.create({
  textBase: {
    height: 24,
    lineHeight: 24
  }
});
