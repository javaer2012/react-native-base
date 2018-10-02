import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, TouchableHighlight, ScrollView, AsyncStorage, Dimensions } from 'react-native'
import { Button, Carousel, List } from 'antd-mobile-rn';
import ProudcuItem from '../../components/ProudcuItem'
import { flexRow } from '../../styles/common'
import Color from '../../styles/var'
import TabBarCom from '../../components/TabBarCom'
import api from '../.././service/api'

const {  getBannerAndNav, hotProducts, HTTP_IMG } = api
const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

const BANNER_HEIGHT = WIDTH / 75 * 42
import { getIdData, schoolList, schoolData } from '../../utils/school'
import RentApp from "../../components/RentApp";


export default class Home extends RentApp {
  state = {
    bannerList: [1, 2, 3],
    hotPhoneList: [],
    addressMsg:{},
    value: [],
    pickerValue: [],
  }

  goToAddressPage = () => {

  }

  async componentWillMount(){
    await this.getOpenIdAndUserId()
    // const addressMsg = await this.getAddressMsg({})
    const user = await AsyncStorage.getItem('userInfo')
    // await this.setState({
    //   addressMsg
    // })
  }

  async componentDidMount() {
    try {
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

  // 手动选择地址后，重新获取地址信息
  uploadAddress = async () => {
    const addressMsg = await this.getAddressMsg({})
    this.setState({
      addressMsg
    })
  }

  render() {
    const { bannerList, navList, hotPhoneList, addressMsg } = this.state
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;

    return (
      <View style={{ position: 'relative', height: '100%' }}>
        <View style={{ marginTop: 0 }}>
          <TouchableOpacity onPress={() => navigate('LocationPage', {})}>
            <Text>{addressMsg && addressMsg.city}</Text>
          </TouchableOpacity>

        </View>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <Carousel
            style={styles.wrapper}
            selectedIndex={2}
            autoplay
            infinite
            afterChange={this.onHorizontalSelectedIndexChange}
          >
            {bannerList && this.renderBanner(bannerList)}
          </Carousel>
          
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
    console.log(list,"ggggggfffffff")
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
