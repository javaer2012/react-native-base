import React, { Component } from 'react';
import {
  View, Image, TouchableOpacity, Modal, ScrollView, AsyncStorage, Text, FlatList, TextInput, Dimensions, StyleSheet, Alert
} from 'react-native';
import { areaObjs } from '../utils/areaSchool'
import { Flex, SearchBar } from 'antd-mobile-rn';
import Color from '../styles/var'
import RentApp from "../components/RentApp";
const { width, height } = Dimensions.get('window')
const SECTIONHEIGHT = 30, ROWHEIGHT = 40

let city = []//城市的数组
var that = null
var totalNumber = 10;//总条数的数据
var searchHeight = 35;//搜索框高度
var searchHeightMargin = 2;//搜索框margin

export default class Provinces extends RentApp {
  static navigationOptions = {
    title: "选择地区"
  }
  letterArr = [] // 字母数组
  scrollToArr = []
  state = {
    dataSource: [],
    addressMsg: {},
    userAddressMsg: {},
    searchText: '',
    searchAreaObjs: [], //  searchAreaObjs 和 schoolObjs 格式不同
    areaObjs: [],


    areaObjs:{}
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

  async componentDidMount() {
    this.setState({
      // areaObjs: _areaObjs.schoolInfo
      areaObjs: areaObjs
    })
  }
  
  renderLetters(letter, index) {
    return (
      <TouchableOpacity key={index} activeOpacity={0.6} onPress={() => { this.scrollTo(index) }}>
        <View style={styles.letter}>
          <Text style={styles.letterText}>{letter}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  changedata = (item) => {
    const JS_STR_item = JSON.stringify(item)
    const addressInfos = {
      selectedProvince: JS_STR_item
    }
    this.GO_BACK(addressInfos)
  }

  changeText = (text) => {
    const { searchAreaObjs, areaObjs } = this.state
    const newSearchAreaObjs = []
    areaObjs.filter(cItem => {
      if (cItem.province.indexOf(text) !== -1 || cItem.initial.indexOf(text) !== -1 || cItem.short.indexOf(text) !== -1 || cItem.shorter.indexOf(text) !== -1) {
        newSearchAreaObjs.push(cItem)
      }
    })

    this.setState({
      searchText: text,
      searchAreaObjs: newSearchAreaObjs
    })
  }
  //touch right indexLetters, scroll the left
  scrollTo = (index) => {
    this._listView.scrollTo({
      y: this.scrollToArr[index]
    })
  }
  renderSectionHeader = (sectionData, sectionID) => {
    const { userAddressMsg } = this.state;

    return (
      <Flex direction='column' style={{ padding: 8, backgroundColor: '#fff' }}>
        <View style={styles.searchBox}>
          {/* <Image source={require('../res/image/search_bar_icon_normal.png')} style={styles.searchIcon} /> */}
          <TextInput
            style={styles.inputText}
            onChangeText={(text) => this.changeText(text)}
            underlineColorAndroid='transparent' //设置下划线背景色透明 达到去掉下划线的效果
            placeholder='请输入地区名称或拼音' />
        </View>
        <Flex direction='column' justify="start" align='start' style={{ flex: 1, width: '100%', paddingLeft: 10 }}>
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
            borderRadius: 6
          }}>{userAddressMsg && userAddressMsg.city}</Text>
        </Flex>
      </Flex>
    )
  }

  renderList = (list) => {
    let lastLetter = ''
    let lastTop = 0 //  距离
    this.letterArr = []
    this.scrollToArr = []
    return list.map((item, index) => {
      if (lastLetter !== item.initial) {
        // scrollToArr[index] = (item.cityInfo.length + 1) * 40
        this.scrollToArr.push(lastTop)
        lastTop = lastTop + 80
        lastLetter = item.initial
        this.letterArr.push(item.initial)
        return (
          <Flex key={index} direction="column" align='stretch' style={{ flex: 1 }}>
            <Flex style={styles.letterBoxStyle}><Text style={{ color: '#808080' }}>{item.initial}</Text></Flex>
            <TouchableOpacity
              key={index}
              style={{ borderBottomColor: '#faf0e6', borderBottomWidth: 0.5, width: '100%', height: ROWHEIGHT, justifyContent: 'center', paddingLeft: 20, paddingRight: 30, }}
              onPress={() => { this.changedata(item) }}
            >
              <View><Text style={styles.rowdatatext}>{item.province}</Text></View>
            </TouchableOpacity>
          </Flex>
        )
      }
      lastTop = lastTop + 40
      return (
        <Flex key={index} direction="column" align='stretch' style={{ flex: 1 }}>
          <TouchableOpacity
            key={item.rowId}
            style={{ borderBottomColor: '#faf0e6', borderBottomWidth: 0.5, width: '100%', height: ROWHEIGHT, justifyContent: 'center', paddingLeft: 20, paddingRight: 30, }}
            onPress={() => { this.changedata(item) }}>
            <View><Text style={styles.rowdatatext}>{item.province}</Text></View>
          </TouchableOpacity>
        </Flex>
      )
    })
  }

  render() {
    const { searchAreaObjs, searchText } = this.state
    return (
      <View style={{ flex: 1 }}>
        {this.renderSectionHeader()}
        <ScrollView
          ref={listView => this._listView = listView}
          style={{ backgroundColor: '#fff', flex: 1 }}>
          <Flex direction="column" align='stretch' style={{ flex: 1 }}>
            { areaObjs && this.renderList(!!searchText ? searchAreaObjs : areaObjs)}
          </Flex>
        </ScrollView>

        <View style={styles.letters}>
          {this.letterArr.map((letter, index) => this.renderLetters(letter, index))}
        </View>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  letterBoxStyle: { backgroundColor: '#f2f2f2', borderRadius: 6, overflow: 'hidden', flex: 1, paddingHorizontal: 20, height: 40 },
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