
import { Text, View, StyleSheet, Image, TouchableOpacity, AsyncStorage } from 'react-native'
import React, { Component } from 'react'
import { List, Picker } from 'antd-mobile-rn';
import { district } from 'antd-mobile-demo-data';
import api from '../../src/service/api'
import { cityJSON } from '../utils/cityJSON'

const { setCrmCode } = api

const triangle = {
  width: 0,
  height: 0,
  borderWidth:5,
  borderColor: '#fff',
  borderTopColor: '#ccc'
}
const CustomChildren = (props) => {
  debugger
  return (
    <TouchableOpacity style={{ backgroundColor: '#fff', width: 100 }} onPress={props.onClick}>
      <View
        style={{ height: 36, paddingLeft: 15, flexDirection: 'row', alignItems: 'center' }}
      >
        <Text style={{ flex: 1 }} numberOfLines={1} ellipsizeMode="tail">{props.addressMsg.district}</Text>
        <View style={triangle}></View>
        {/* <Text style={{ flex: 1 }}>{props.children}</Text>
      <Text style={{ textAlign: 'right', color: '#888', marginRight: 15 }}>{props.extra}</Text> */}
      </View>
    </TouchableOpacity>
  )
};
export default class PopupExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      value: [],
      pickerValue: [],
    };
  }
  onClick = () => {
    setTimeout(() => {
      this.setState({
        data: district,
      });
    }, 500);
  }
  onChange = (value) => {
    this.setState({ value });
  }
  selectedAddress = async (v) => {
    try {
      // debugger
      let admCityName = cityJSON[v[0]] && cityJSON[v[0]].admCityName;
      admCityName = cityJSON[v[1]] && cityJSON[v[1]].admCityName;

      const addressObj = {
        district: admCityName,
        cityCode: v[0],
        provinceCode: v[1]
      }
      await AsyncStorage.setItem('addressInfos', JSON.stringify(addressObj));
      this.props.uploadAddress(addressObj)

    } catch (error) {
      console.error(error,"!!!")
    }
  }
  render() {
    const { addressMsg } = this.props
    return (
      <Picker
        title="选择地区"
        data={district}
        cols={2}
        value={this.state.pickerValue}
        onChange={(v) => this.onChange}
        onOk={(v) => this.selectedAddress(v)}
      >
        <CustomChildren addressMsg={addressMsg} />
      </Picker>
    );
  }
}