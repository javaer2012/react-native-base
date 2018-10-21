import React from 'react'
import RentApp from "../components/RentApp";
import { AsyncStorage, FlatList, Image, Text, View, Alert } from 'react-native'
import { Flex,  } from "antd-mobile-rn";

export default class NegativeRecord extends RentApp {

  static navigationOptions = {
    title: "网络断开"
  }

  state = {
    list: []
  }


  constructor(props) {
    super(props)
  }

  componentDidMount() {
   
    // setTimeout(() => this.getBadList(), 0)
  }

  confirmFun = () => {
    // const 
  }


  render() {
    return (
      <Flex>
        {Alert.alert("提示", "网络出现故障，点我重试", [
          {
            text: "确认", onPress: () => { this.confirmFun() }
          },
          // { text: "否" }
        ])}
      </Flex>
    )
  }

}