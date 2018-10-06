import React, { Component } from 'react';
import {
  View, Image, TouchableOpacity, Modal, AsyncStorage, Text, FlatList, TextInput, Dimensions, StyleSheet, Alert
} from 'react-native';
import { areaDict } from '../../utils/city1.json'
import { Flex, SearchBar } from 'antd-mobile-rn';
import Color from '../../styles/var'
import { NavigationActions } from 'react-navigation'
import RentApp from "../../components/RentApp";
import { schoolObjs } from '../../utils/school'
import { cityObj, setAreaInfo } from '../../utils/areaSchool'

const areaDictArr = Object.values(areaDict)
const letters = ["A", "B", "C", "F", "G", "H", "J", "L", "N", "Q", "S", "T", "X", "Y", "Z"] 
import _ from 'lodash';
const { width, height } = Dimensions.get('window')
const SECTIONHEIGHT = 30, ROWHEIGHT = 40
let city = []//城市的数组
var totalheight = [];//每个字母对应的城市和字母的总高度
var that = null
var totalNumber = 10;//总条数的数据
var searchHeight = 35;//搜索框高度
var searchHeightMargin = 2;//搜索框margin

const schoolSingleDeck = [] // 单层地址数组

// function areaListFun() {
//   let tempArr = [];

//   letters.map(
//     initial => {
//       let tempObj = {};
//       let areaInfo = [];

//       tempObj.initial = initial;
//       tempObj.areaInfo = cityObj.filter(
//         city => city.initial == initial
//       );

//       tempArr.push(tempObj);
//     }
//   );

//   return tempArr;
// }

// const areaList = areaListFun()

export default class SchoolSearchPage extends RentApp {
  static navigationOptions = {
    title: "选择学校"
  }
  state = {
    dataSource: [],
    addressMsg:{},
    userAddressMsg:{},
    searchText:'', // 选择地名称
    selectedLetters:'', // 选择 的首字母
    searchschoolObjs:[],
    citySchoolObjs:[]  // 当前城市学校对象
    // baseSchoolObjs: baseSchoolObjsFun()
  }
  areaListFun = (cityObj) => {
    let tempArr = [];

    letters.map(
      initial => {
        let tempObj = {};
        let areaInfo = [];

        tempObj.initial = initial;
        tempObj.areaInfo = cityObj.filter(
          city => city.initial == initial
        );

        tempArr.push(tempObj);
      }
    );
    return tempArr;
  }
  // setSchoolList = () => {
  //   const ARR = []
  //   areaList.map((areaItem, index) => {
  //     areaItem.areaInfo.map((item, index) => {

  //       schoolObjs.forEach((school) => {
  //         if (school.id === item.id) {
  //           ARR.push
  //         }
  //       })

  //       return item.id
  //     })
  //   })
  // }
  
  // 从缓存中取出位置信息对象
  // getAddressMsg = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('addressInfos');
  //     if (value !== null) {
  //       // We have data!!
  //       return JSON.parse(value);
  //     }
  //   } catch (error) {
  //     // Error retrieving data
  //   }
  // }

  async componentDidMount() {
   
  }
  // async componentDidMount(){
  //   try {
  //     const addressMsg = await this.getAddressMsg()
  //     this.setState({
  //       userAddressMsg: addressMsg,
  //     }) 
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  renderLetters(letter, index) {
    return (
      <TouchableOpacity key={index} activeOpacity={0.6} onPress={() => { this.setState({ selectedLetters: letter }); this.scrollTo(index) }}>
        <View style={styles.letter}>
          <Text style={styles.letterText}>{letter}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  changedata = (item) => {
    const JS_STR_item = JSON.stringify(item)
    const addressInfos = {
      selectedSchool: JS_STR_item
    }
    this.GO_BACK(addressInfos)
  }
  renderRow =  ({item}) => {
    return (
      <TouchableOpacity
        key={item.short}
        style={{
          borderBottomColor: '#faf0e6',
          borderBottomWidth: 0.5,
          height: ROWHEIGHT, justifyContent: 'center', paddingLeft: 20, paddingRight: 30
        }}
        onPress={() => { this.changedata(item) }}>
        <View><Text style={styles.rowdatatext}>{item.schoolName}</Text></View>

      </TouchableOpacity>
    )
  }
  // 搜索
  changeText = (text) => {
    const { searchschoolObjs } = this.state
    const newSearchschoolObjs =[]
    schoolObjs.filter(item => {
       item.schoolInfo.filter(cItem => {
         if (cItem.schoolName.indexOf(text) !== -1 || cItem.initial.indexOf(text) !== -1 || cItem.short.indexOf(text) !== -1 || cItem.shorter.indexOf(text) !== -1  ) {

           newSearchschoolObjs.push(cItem)
        }
      })
    })

    this.setState({
      searchText: text,
      searchschoolObjs: newSearchschoolObjs
    })
  }
  renderSectionHeader = (sectionData, sectionID) => {
    const { userAddressMsg } = this.state;
    return (
      <Flex direction='column'  style={{padding: 8, position: 'absolute', top: 0, width: '100%', zIndex: 10, backgroundColor: '#fff'}}>
        <View style={styles.searchBox}>
          {/* <Image source={require('../res/image/search_bar_icon_normal.png')} style={styles.searchIcon} /> */}
          <TextInput 
            style={styles.inputText}
            onChangeText={(text) => this.changeText(text)}
            underlineColorAndroid='transparent' //设置下划线背景色透明 达到去掉下划线的效果
            placeholder='输入地区名或拼音查询' />
        </View>
        {/* <Flex direction='column' justify="start" align='start' style={{flex: 1, width: '100%', paddingLeft: 10}}>
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
        </Flex> */}
      </Flex>
    )
  }

  render(){
    const { searchschoolObjs, citySchoolObjs } = this.state
    const cityId = this.props.navigation.getParam('cityId')
    console.log(cityId,"!!!!!!!!1")
    
    // const { citySchoolObjs } =
    return (      
        <View style={{ height: Dimensions.get('window').height, marginBottom: 10, paddingTop: 60 }}>
          {this.renderSectionHeader()}
          <FlatList
            contentContainerStyle={styles.contentContainer}
            ref={listView => this._listView = listView}
            extraData={this.state}
            data={(searchschoolObjs.length && searchschoolObjs) || schoolObjs[cityId].schoolInfo}
          
            renderItem={this.renderRow}
            // ListHeaderComponent={this.renderSectionHeader}
            onEndReachedThreshold={0.1}
            style={{ height: '100%' }}

          />
          <View style={styles.letters}>
            {letters.map((letter, index) => this.renderLetters(letter, index))}
          </View>
        </View>

    )
  }
}

const styles = StyleSheet.create({
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
    backgroundColor: '#FFF',
    borderWidth: 0.8,
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
    height: height * 3.3 / 100,
    width: width * 3 / 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  letterText: {
    textAlign: 'center',
    fontSize: height * 1.1 / 50,
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
    fontSize: 13,
    paddingBottom: 0,
    paddingTop: 0,
    paddingLeft: 10,
    flex: 1,
  },
})