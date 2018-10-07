import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, TouchableHighlight, ScrollView, AsyncStorage, Dimensions } from 'react-native'
import { Button, Carousel, List, Flex } from 'antd-mobile-rn';
import ProudcuItem from '../../components/ProudcuItem'
import { flexRow } from '../../styles/common'
import Color from '../../styles/var'
import TabBarCom from '../../components/TabBarCom'
import api from '../.././service/api'
import { NavigationEvents } from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay';

const {  getBannerAndNav, hotProducts, HTTP_IMG } = api
const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

const BANNER_HEIGHT = WIDTH / 75 * 42
import { getIdData, schoolList, schoolData } from '../../utils/school'
import RentApp from "../../components/RentApp";
import {updating} from "../../../App";


export default class Home extends RentApp {
  static navigationOptions = {
    title: "信用租机"
  }
  state = {
    bannerList: [1, 2, 3],
    hotPhoneList: [],
    addressMsg:{},
    value: [],
    pickerValue: [],
    loading: false,
  }

  goToAddressPage = () => {

  }

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

  async componentWillMount(){
    // await this.getOpenIdAndUserId()
    const addressMsg = await this.getAddressMsg()
    // const user = await AsyncStorage.getItem('userInfo')
    this.setState({
      addressMsg
    })
  }

  async componentDidMount() {
    try {
      await this.setState({ loading: true })
      const { data: getBannerAndNavData , data: { bannerList, navList } } = await getBannerAndNav({})
     
      const { data: hotProductsData, data:{ hotMealList, hotPhoneList }} = await hotProducts({
        provinceCode: this.provinceCode,  // 测试用
        cityCode: this.cityCode
      })
      this.setState({
        bannerList,
        navList,
        hotPhoneList,
        hotMealList: hotMealList
      })
    } catch (error) {
      console.error(error)
    } finally {
      await this.setState({ loading: false })
    }
  }

  // 渲染热销商品
  renderList = (data) => {
    const { navigate } = this.props.navigation;
    if (!data || !(data instanceof Array)) return false
    return data.map((item, index) => {
      return (
        <View key={item.id || index}>
          <ProudcuItem data={item}>
            <Button 
              onClick={() => navigate('ProductDetail', {productId: item.id})} 
              style={{ width: 66, backgroundColor: Color.mainPink }} size='small'>
              <Text style={{ color: '#fff' }}>去购买</Text>
            </Button>
          </ProudcuItem>
        </View>
      )
    })
  }
  setAddressInfosFun = async (data) => {
    console.log(data,"datadatadata")
    // debugger
    try {
      await this.setState({
        addressMsg: data
      })
      await this.setState({ loading: true })
      await AsyncStorage.setItem('addressInfos', JSON.stringify(data));
      const { data: { bannerList, navList } } = await getBannerAndNav({})

      const { data: { hotMealList, hotPhoneList } } = await hotProducts({
        provinceCode: data.provinceCode,  // 测试用
        cityCode: data.cityCode
      })
      this.setState({
        bannerList,
        navList,
        hotPhoneList,
        hotMealList,
      })
    } catch (error) {
      console.error(error)
    } finally {
      await this.setState({ loading: false })
    }
    // const addressMsg = await this.getAddressMsg()
  }

  render() {
    const { bannerList, navList, hotPhoneList, addressMsg } = this.state
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;

    return (
      <View style={{ position: 'relative', height: '100%' }}>
        <Flex direction="row" align="center" style={{ marginTop: 0, padding: 10, backgroundColor: '#06C1AE' }}>
          <TouchableOpacity  onPress={() => navigate('LocationPage', {
            callback: (data) => {
              this.setAddressInfosFun(data)
            }
          })}>
            <Text style={{color: '#fff'}}>{addressMsg && addressMsg.city}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ paddingLeft: 10, flex: 1, height: 27 }} onPress={() => navigate('SearchPage', {})}>
            <Flex style={{backgroundColor: '#fff', flex: 1, borderRadius: 13, overflow: 'hidden', paddingLeft: 20}}>
              <Text style={{color: '#ccc'}}>搜索商品</Text>
            </Flex>
          </TouchableOpacity>

        </Flex>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        > 
          {
            bannerList.length !== 1 ? (
              <View
                style={[styles.containerHorizontal, { width: WIDTH, height: BANNER_HEIGHT }]}
              >
                <Image resizeMode="stretch" style={{ width: WIDTH, height: BANNER_HEIGHT }} source={{ uri: `${HTTP_IMG}${bannerList[0].imgPath}` }} />
              </View>
            ) : (
                <Carousel
                  style={styles.wrapper}
                  selectedIndex={2}
                  autoplay
                  infinite
                  afterChange={this.onHorizontalSelectedIndexChange}
                >
                  {bannerList && this.renderBanner(bannerList)}
                </Carousel>              
            )
          }
          
          
          <View style={[styles.navBox]}>
            {navList && this.renderNavList(navList)}
          </View>
          <View style={styles.productListBox}>
            <Text style={styles.listTitle}>推荐产品</Text>
            {this.renderList(hotPhoneList)}
            {/* <ProductList 
              data={hotPhoneList}
            /> */}
          </View>
          
        </ScrollView>
        <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
          {/* <TabBarCom navigate={navigate}/> */}
          {/* <TabNavigator /> */}
        </View>
      </View>
    )
  }

  renderBanner = (list) => {
    return list.map((item, index) =>{ 
      return (
        <View
          key={item.id || index}
          style={[styles.containerHorizontal, { width: WIDTH, height: BANNER_HEIGHT }]}
        > 
          <Image resizeMode="stretch" style={{ width: WIDTH, height: BANNER_HEIGHT }} source={{ uri: `${HTTP_IMG}${item.imgPath}`}}/>
        </View>
      )
    }
    )
  }
  renderNavList = (list) => {
    const { navigate } = this.props.navigation;
    return list.map((item, index) => (
      <TouchableOpacity
        key={index}
        style={[styles.navItem]}
        onPress={() => navigate('ProductListPage', { category : item.id })}
      >
        <Image 
          style={{ width: 49, height: 49 }} 
          resizeMode="stretch" 
          source={{ uri: `${HTTP_IMG}${item.imgPath}` }} 
        />
        <Text style={{ textAlign: 'center' }}>
          {item.navTitle}
        </Text>
      </TouchableOpacity>))
  }
}


const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
  },
  containerHorizontal: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
  },
  containerVertical: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
  },
  text: {
    color: '#fff',
    fontSize: 36,
  },
  navBox: {
    ...flexRow,
    justifyContent: 'space-around',
    paddingVertical: 30,
    backgroundColor: '#fff'
  },
  navItem: {

    // width: 120,
    // height: 120
  },
  productListBox: {
    marginTop: 12
    // ...flexRow,
    // justifyContent: 'center'
  },
  listTitle: {
    textAlign: 'center',
    fontSize: 15,
    padding: 20,
    backgroundColor: '#fff'
  }
});
