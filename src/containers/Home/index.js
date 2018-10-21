import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, TouchableHighlight, ScrollView, AsyncStorage, Dimensions, DeviceEventEmitter } from 'react-native'
import { Button, Carousel, List, Flex } from 'antd-mobile-rn';
import ProudcuItem from '../../components/ProudcuItem'
import { flexRow } from '../../styles/common'
import Color from '../../styles/var'
import api from '../.././service/api'
// import { NavigationEvents } from 'react-navigation';
// import Spinner from 'react-native-loading-spinner-overlay';

const {  getBannerAndNav, hotProducts, HTTP_IMG } = api
const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

const BANNER_HEIGHT = WIDTH / 75 * 42
import RentApp from "../../components/RentApp";
import { connect } from 'react-redux'

class Home extends RentApp {
  static navigationOptions = {
    title: "首页",
    
  }
  state = {
    bannerList: [],
    hotPhoneList: [],
    addressMsg:{},
    value: [],
    pickerValue: [],
    loading: true,
  }

  componentWillMount =() =>{
  }

  async componentDidMount() {
    // this.subscription = DeviceEventEmitter.addListener('refreshDataHome', this.refreshData)
    // console.log(this.props, "======> this.props")
  }

  componentWillReceiveProps = async (nextProps) => {
    const { locationInfos } = nextProps
    if (locationInfos && locationInfos.provinceCode !== this.state.addressMsg.provinceCode) {
      this.setState({
        addressMsg: locationInfos
      })
      this.props.dispatch({ type: 'HOME_GET_HOME_PRODUCTS', })
      this.props.dispatch({ type: 'HOME_GET_BANNER_AND_NAV' })
    }
    // console.log(addressMsg, "redux 中拿出locationInfos")
  } 

  refreshData = () => {
    this.props.dispatch({type: 'home/GET_HOME_PRODUCTS'})
    this.props.dispatch({ type: 'home/GET_BANNER_AND_NAV' })
    this.props.dispatch({
      type: 'IS_OPEN_ASYNC',
      // locationInfos: option
    })
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
              <Text style={{ color: '#fff' }}>去租机</Text>
            </Button>
          </ProudcuItem>
        </View>
      )
    })
  }
  setAddressInfosFun = async (data) => {
    try {
      // await this.setState({
      //   addressMsg: data
      // })
      this.props.dispatch({
        type: 'SET_LOCATION',
        locationInfos: data
      })
      await this.setState({ loading: true })
       this.refreshData()
      await AsyncStorage.setItem('addressInfos', JSON.stringify(data));
      
    } catch (error) {
      console.error(error)
    } finally {
      await this.setState({ loading: false })
    }
  }

  render() {
    const { addressMsg } = this.state
    const { hotPhoneList, bannerList, navList, isOpen } =this.props
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    return (
      <Flex style={{flex: 1, width:WIDTH}}>
        {isOpen === '0'
          ? (<Flex direction='column' justify='center' align='center' style={{height:HEIGHT, width: WIDTH, backgroundColor:'#fff'}}>
            <Image style={{ width: 60, height: 60 }} source={require('../../images/imageNew/one/gift.png')}></Image>

            <Text style={{width: 200, marginTop: 20,textAlign: 'center', color: '#666', fontSize: 14,lineHeight: 20}}>该城市暂未开通信用租机业务，目前已开通江苏无锡市，请切换到相应地市试试...</Text>
          </Flex>) 
          : <View style={{ position: 'relative', height: '100%', width: WIDTH}}>
            <Flex direction="row" align="center" style={{ marginTop: 0, padding: 10, backgroundColor: '#06C1AE' }}>
              <TouchableOpacity style={styles.leftAddressBox} onPress={() => navigate('LocationPage', {
                callback: (data) => {
                  this.setAddressInfosFun(data)
                }
              })}>
                <Text style={{ color: '#fff', marginRight: 4 }}>{addressMsg && addressMsg.city}</Text>
                <View style={styles.triangle}></View>
              </TouchableOpacity>
              <TouchableOpacity style={{ paddingLeft: 10, flex: 1, height: 27 }} onPress={() => navigate('SearchPage', {})}>
                <Flex style={{ backgroundColor: '#fff', flex: 1, borderRadius: 13, overflow: 'hidden', paddingLeft: 20 }}>
                  <Image style={{ width: 14, height: 14, marginRight: 4 }} source={require("../../images/imageNew/one/search.png")} />
                  <Text style={{ color: '#ccc' }}>搜索商品</Text>
                </Flex>
              </TouchableOpacity>

            </Flex>
            <ScrollView
              automaticallyAdjustContentInsets={false}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              {
                (bannerList && bannerList.length) === 1 ? (
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
              </View>
              <View style={{height: 60}}>
              {/* 占位 */}
              </View>

            </ScrollView>
            <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
              {/* <TabNavigator /> */}
            </View>
          </View>
        }
        
      </Flex>
      
    )
  }

  renderBanner = (list) => {
    const { navigate } = this.props.navigation
    return list.map((item, index) =>{ 
      let productId = item.linkUrl.match(/\?id=(\S*)/)
      productId = productId && productId[1];

      return (
        <View
          key={item.id || index}
          style={[styles.containerHorizontal, { width: WIDTH, height: BANNER_HEIGHT }]}
        > 
          <TouchableOpacity onPress={() => navigate('ProductDetail', { productId})}>
            <Image resizeMode="stretch" style={{ width: WIDTH, height: BANNER_HEIGHT }} source={{ uri: `${HTTP_IMG}${item.imgPath}` }} />
          </TouchableOpacity>
         
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
  leftAddressBox:{
    alignItems: 'flex-end',
    // justifyContent: 'center',
    flexDirection: 'row'
  },
  triangle:{
    width: 0,
    height: 0,
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: '#fff'
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
const mapStateToProps = state => {
  const { hotMealList, hotPhoneList, bannerList, navList } = state.homeDataReducer
  return {
    locationInfos: state.locationReducer.locationInfos, 
    // homeData: state.homeDataReducer
    hotMealList,
    hotPhoneList,
    bannerList,
    navList,
    isOpen: state.locationReducer.isOpen
  }
}

export default connect(mapStateToProps)(Home)