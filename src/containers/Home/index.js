import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, TouchableHighlight, ScrollView, AsyncStorage } from 'react-native'
import { Button, Carousel, List } from 'antd-mobile-rn';
import { bannerNav_mock, productList_mock } from '../../mock/home'
import ProudcuItem from '../../components/ProudcuItem'
import { flexRow } from '../../styles/common'
import Color from '../../styles/var'
import TabBarCom from '../../components/TabBarCom'
import Location from '../../components/Location'
import api from '../.././service/api'

const { isCityOpen, getBannerAndNav, hotProducts } = api



export default class Home extends Component {
  state = {
    bannerList: [1, 2, 3],
    products: [],
    addressMsg:{},
    value: [],
    pickerValue: [],
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

  checkIsCityOpen = async () => {
    const { addressMsg: {citycode, provinceCode} } = this.state
    try {
      const res = await isCityOpen({
        citycode,
        provinceCode
      })
      console.log(res,"22222222")
    } catch (error) {
      console.error(error)
    }
  }


  async componentWillMount(){
    const addressMsg = await this.getAddressMsg()
    await this.setState({
      addressMsg
    })
    const isCityOpen = this.checkIsCityOpen()
  }

  componentDidMount() {
    const { bannerList, navList } = bannerNav_mock
    const { hotPhoneList } = productList_mock

    this.setState({
      bannerList,
      navList,
      products: hotPhoneList
    })
  }

  // 渲染热销商品
  renderList = (data) => {
    const { navigate } = this.props.navigation;
    if (!data || !(data instanceof Array)) return false
    return data.map((item, index) => {
      return (
        <View key={index}>
          <ProudcuItem data={item}>
            <Button onClick={() => navigate('ProductDetailPage', {})} style={{ width: 66, backgroundColor: Color.mainPink }} size='small'>
              <Text style={{ color: '#fff' }}>去购买</Text>
            </Button>
          </ProudcuItem>
        </View>
      )
    })
  }

  // 手动选择地址后，重新获取地址信息
  uploadAddress = async () => {
    const addressMsg = await this.getAddressMsg()
    this.setState({
      addressMsg
    })
  }

  render() {
    const { bannerList, navList, products, addressMsg } = this.state
    const { navigate } = this.props.navigation;
    // return (
    //   <View>
    //     <TabBarCom />
    //     <Text>11</Text>
    //   </View>
    // )
    return (
      <View style={{ position: 'relative', height: '100%' }}>
        <View style={{ marginTop: 0 }}>
          <Location 
            addressMsg={addressMsg}
            uploadAddress={this.uploadAddress}
            />
        </View>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {/* <View>
            <Text onClick={this.onClick} numberOfLines={10} ellipsizeMode="tail">{addressMsg.formatted_address}</Text>
          </View> */}
        
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
            {this.renderList(products)}
            {/* <ProductList 
              data={products}
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
    return list.map((item, index) => (
      <View
        key={index}
        style={[styles.containerHorizontal, { backgroundColor: 'yellow' }]}
      >
        {/* <Image
          source={item.imgPath}
        /> */}
        <Text>
          1122
        </Text>
      </View>))
  }
  renderNavList = (list) => {
    const { navigate } = this.props.navigation;
    return list.map((item, index) => (
      <TouchableOpacity
        key={index}
        style={[styles.navItem]}
        onPress={() => navigate('ProductListPage', {})}
      >
        <Image
          style={{ width: 49, height: 49 }}
          source={require('../../images/find.png')}
        //  || data.imgPath
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
