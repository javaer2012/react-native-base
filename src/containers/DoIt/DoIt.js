import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native'
import { Flex, List, InputItem, Button } from 'antd-mobile-rn';
// import { orderInfo_mock } from '../../mock/ProductDetailPage'
import Color from '../../styles/var'
import Progress from '../../components/Progress'

const bgf = {
  backgroundColor: '#fff'
}


export default class DoIt extends Component {
  state = {
    completePay: false
  }

  componentDidMount() {
  }

  render() {
    // const { navigate } = this.props.navigation;
    // const { completePay } = this.state
    var options = {};
    
    const data = [
      {
        active: false,
        text: '填信息'
      }, {
        active: true,
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
        <Progress data={data}/>
        <Flex  style={{marginTop: 80, width: '100%'}}>
          <Flex direction="column" style={{ flex: 1, borderColor: '#fff' }}>
            <Flex  style={[inputBoxStyle]}>
              <Text style={[labelStyle,{marginRight: 10}]}>合约号码</Text>
              <TextInput
                style={ inputBaseStyle }
                onChangeText={(text) => this.setState({ text })}
                value={"11111"}
              />
            </Flex >
            <Flex   style={[inputBoxStyle]}>
              <Text style={[labelStyle,{marginRight: 10}]}>合约号码</Text>
              <TextInput
                style={ inputBaseStyle }
                onChangeText={(text) => this.setState({ text })}
                value={"2222"}
              />
            </Flex >
            <Flex  style={[inputBoxStyle]}>
              <Text style={[labelStyle,{marginRight: 10}]}>合约号码</Text>
              <TextInput
                style={ inputBaseStyle }
                onChangeText={(text) => this.setState({ text })}
                value={"33333"}
              />
            </Flex >
            <Flex justify="center" style={{width: '100%', marginTop: 40}}>
              <Button style={{ width: 340}}>下一步</Button>
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
