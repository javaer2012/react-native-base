import React, { Component } from 'react';
import {
  View, Image, TouchableOpacity, Modal, ScrollView, AsyncStorage, Text, FlatList, TextInput, Dimensions, StyleSheet, Alert
} from 'react-native';
import { areaDict } from '../../utils/city1.json'
import letterPlaceJson from '../../utils/city1014.json'

import { Flex, SearchBar } from 'antd-mobile-rn';
import Color from '../../styles/var'
import { NavigationActions } from 'react-navigation'
import RentApp from "../../components/RentApp";

// const areaDictArr = Object.values(areaDict)

import _ from 'lodash';
const { width, height } = Dimensions.get('window')
const SECTIONHEIGHT = 30, ROWHEIGHT = 40
//这是利用lodash的range和数组的map画出26个英文字母
const letters = _
  .range('A'.charCodeAt(0), 'Z'.charCodeAt(0) + 1)
  .map(n => String.fromCharCode(n).substr(0))
_.pull(letters, 'O', 'V')//去掉o和V,这两个下面没有城市
let city = []//城市的数组
var totalheight = [];//每个字母对应的城市和字母的总高度
var that = null
var totalNumber = 10;//总条数的数据
var searchHeight = 35;//搜索框高度
var searchHeightMargin = 2;//搜索框margin



 let scrollToArr = []
export default class List extends RentApp {
  static navigationOptions = {
    title: "选择地址"
  }
  state = {
    dataSource: [],
    addressMsg:{},
    userAddressMsg:{},
    searchText:''
  }
  
  // 从缓存中取出位置信息对象
  getAddressMsg = async () => {
    try {
      const value = await AsyncStorage.getItem('addressInfos');
      if (value !== null) {
        // We have data!!
        return JSON.parse(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  }
  renderPlaceList = (item, letterIndex) => {
 
    // letterIndex
    scrollToArr[letterIndex] = (item.cityInfo.length + 1)* 40
    const { searchText } = this.state
    const renderCitys = (cityInfo) => {
      const citys = []
      cityInfo.filter((item, index) => {
        if (searchText && item.city !== searchText) return false
        const CITY = (
          <TouchableOpacity
            key={item.rowId}
            style={{ borderBottomColor: '#faf0e6', borderBottomWidth: 0.5, width: '100%', height: ROWHEIGHT, justifyContent: 'center', paddingLeft: 20, paddingRight: 30, }}
            onPress={() => { this.changedata(item) }}>
            <View><Text style={styles.rowdatatext}>{item.city}</Text></View>
          </TouchableOpacity>
        )
        citys.push(CITY)
      })

      return citys
    }
    const CITYS = renderCitys(item.cityInfo)

    if (CITYS.length) {
      return (
      <Flex  direction='column' justify='start' align='stretch' key={letterIndex}>
        <Flex style={styles.letterBoxStyle}><Text style={{color: '#808080'}}>{item.initial}</Text></Flex>
        <Flex direction='column'> 
            {CITYS}
        </Flex>
      </Flex>
    )
    }
    
  }

  async componentDidMount(){
    try {
      const addressMsg = await this.getAddressMsg()
      this.setState({
        userAddressMsg: addressMsg,
      }) 
    } catch (error) {
      console.error(error)
    }
  }
  // render ringht index Letters
  renderLetters(letter, index) {
    return (
      <TouchableOpacity key={index} activeOpacity={0.6} onPress={() => { this.scrollTo(index) }}>
        <View style={styles.letter}>
          <Text style={styles.letterText}>{letter}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  changedata = ({ id, provincecode, city, code, initial }) => {
    const addressData = areaDict[code] // 选中的地址的crm数据
    if (addressData) {
      // addressData
      const addressInfos = {
        crmProvName: addressData.crmProvName,
        city,
        cityCode: addressData.crmCityCode,
        provinceCode: addressData.crmProvCode
      }
      this.GO_BACK(addressInfos) 
    } else {
      this.showToast("地址暂未查询到")
    }
    
    
  }

  renderRow = ({ item }) => {
    const { searchText } = this.state
    if (searchText && item.crmCityName !== searchText) return false

    return (
      <TouchableOpacity
        key={item.rowId}
        style={{ 
          borderBottomColor: '#faf0e6',
          borderBottomWidth: 0.5,
          height: ROWHEIGHT, justifyContent: 'center', paddingLeft: 20, paddingRight: 30 }}
          onPress={() => { this.changedata(item) }}>
        <View><Text style={styles.rowdatatext}>{item.crmCityName}</Text></View>

      </TouchableOpacity>
    )
  }

  changeText = (text) => {
    this.setState({
      searchText: text
    })
  }
  //touch right indexLetters, scroll the left
  scrollTo = (index) => {
    let sum = 0;
    (scrollToArr.slice(0, index)).forEach(function (val, index) {
      sum += val;
    })
    let position = index * 40; 
    this._listView.scrollTo({
      y: sum
    })
  }
  renderSectionHeader = (sectionData, sectionID) => {
    const { userAddressMsg } = this.state;
    
    return (
      <Flex direction='column'  style={{padding: 8, backgroundColor: '#fff'}}>
        <View style={styles.searchBox}>
          {/* <Image source={require('../res/image/search_bar_icon_normal.png')} style={styles.searchIcon} /> */}
          <TextInput 
            style={styles.inputText}
            onChangeText={(text) => this.changeText(text)}
            underlineColorAndroid='transparent' //设置下划线背景色透明 达到去掉下划线的效果
            placeholder='请输入城市名称或拼音' />
        </View>
        <Flex direction='column' justify="start" align='start' style={{flex: 1, width: '100%', paddingLeft: 10}}>
          <Text style={{
            textAlign: 'left',
            marginTop: 10
          }}>当前选择城市</Text>
          <Text style={{
            textAlign: 'left', 
            borderWidth: 1, 
            borderColor: Color.mainGreen,
            color: Color.mainGreen,
            marginTop: 10,
            paddingHorizontal: 20,
            paddingVertical: 8,
            borderRadius:6
          }}>{userAddressMsg && userAddressMsg.city}</Text>
        </Flex>
      </Flex>
    )
  }

  renderList = (letterPlaceJson ) =>{
    return letterPlaceJson.map((item, index) => {
      return (
        <Flex key={item.id || index} direction="column" align='stretch' style={{flex: 1}}>
          {this.renderPlaceList(item, index)}
        </Flex>
      )
    })
  }

  render(){
    return (      
      <View style={{flex: 1, paddingBottom: 40 }}>
        {this.renderSectionHeader()}
          <ScrollView 
            ref={listView => this._listView = listView}
            style={{backgroundColor: '#fff', flex: 1}}>
            <Flex direction="column" align='stretch' style={{flex: 1}}>
              {this.renderList(letterPlaceJson)}
            </Flex>
          </ScrollView>

          <View style={styles.letters}>
            {letters.map((letter, index) => this.renderLetters(letter, index))}
          </View>
        </View>

    )
  }
}

const styles = StyleSheet.create({
  letterBoxStyle: {backgroundColor: '#f2f2f2', borderRadius: 6, overflow: 'hidden', flex: 1, paddingHorizontal: 20, height: 40 },
  contentContainer: {
    width: width,
    backgroundColor: 'white',
  },
  letters: {
    position: 'absolute',
    height: height,
    top: 0,
    bottom: 0,
    right: 10,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBox: {//最外层搜索框包裹
    height: searchHeight,
    flexDirection: 'row',   // 水平排布
    // width: '100%',
    flexGrow: 1,
    backgroundColor: '#e5e5e5',
    borderWidth: 0,
    borderRadius: 10,
    borderColor: 'gray',
    alignItems: 'center',
    marginLeft: 8,
    paddingTop: 0,
    marginTop: searchHeightMargin,
    marginBottom: searchHeightMargin,
    paddingBottom: 0,
    marginRight: 8,

  },
  letter: {
    height: height * 3 / 100,
    width: width * 3 / 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  letterText: {
    textAlign: 'center',
    // fontSize: height * 1.1 / 50,
    fontSize: 10,
    color: 'rgb(40,169,185)'
  },
  rowdata: {
    borderBottomColor: '#faf0e6',
    borderBottomWidth: 0.5
  },
  rowdatatext: {
    color: 'gray',
  },
  inputText: {//搜索框
    backgroundColor: 'transparent',
    borderColor: '#fff',
    fontSize: 13,
    paddingBottom: 0,
    paddingTop: 0,
    paddingLeft: 10,
    flex: 1,
  },
})