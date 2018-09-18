import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, AsyncStorage, FlatList, RefreshControl } from 'react-native'
import { Button } from 'antd-mobile-rn';
import { bannerNav_mock, productList_mock } from '../../mock/home'
import { flexRow } from '../../styles/common'
import ProudcuItem from '../../components/ProudcuItem'
import api from '../.././service/api'
import RentApp from "../../components/RentApp";
import { throttle } from '../../utils/funs'
import { Flex } from 'antd-mobile-rn';
const { queryGoodsList, HTTP_IMG } = api

// 

export default class ProductListPage extends RentApp {
  state = {
    products:[],
    pageNum:1,
    pageSize:10,
    refreshing: false,
    isLoreMoreing: ''
  }

  async componentDidMount(){
    this.getData()

    // const { data } = queryGoodsList({
    //   sourceType: 3,
    // })
    // const { navList } = bannerNav_mock
    // const { hotPhoneList } = productList_mock

    // this.setState({
    //   navList,
    //   products: hotPhoneList
    // })
  }

  getData = async () =>{
    const category = this.props.navigation.getParam('category');
    const { pageNum, pageSize, products } = this.state
    try {
      const user = await AsyncStorage.multiGet(['userId', 'openId', 'isLogin', 'addressInfos'])
      const userId = this.userId,
        openId = this.openId,
        isLogin = user[2][1] || false,
        cityCode = this.cityCode,
        provinceCode = this.provinceCode;

      const params = {
        userId,
        openId,
        // cityCode,
        // provinceCode,
        provinceCode: "844",
        cityCode: "84401",
        category,
        pageNum,
        pageSize
      }
      
      const rsp = await queryGoodsList(params)
      const { data: { errcode, goodsList, totalPage } } = rsp || {}
      if (errcode === 1) {
        const isLoreMoreing = goodsList.length ? 'LoreMoreing' : 'LoreMoreEmpty';
        this.setState({
          products: [...products, ...goodsList],
          totalPage,
          refreshing: false,
          isLoreMoreing
        })
      } else{
        // throw('出错')
      }
    } catch (e) {

    }
  }
  hasDo = false

  loadMoreFun = async (pageNum) => {
    // debugger
    this.hasDo = true
    await this.setState({
      pageNum,
      refreshing: true,
    })
    console.log(999)
    await this.getData()
    this.hasDo = false

  }

  _renderItem = ({ item }) => {
    const { navigate } = this.props.navigation;
    // debugger
    // let rowData = item.item;
    // let index = rowData.key

    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => navigate('ProductDetailPage', {})}
      >
        <ProudcuItem imageStyle={{ width: 100, height: 100 }} data={item}>
          {/* <Button style={{ width: 80, backgroundColor: Color.mainPink }} size='small'>
                  <Text style={{ color: '#fff' }}>去购买</Text>
                </Button> */}
        </ProudcuItem>
      </TouchableOpacity>
    )
  };

  renderList = (data) => {
    const { navigate } = this.props.navigation;
    if (!data || !(data instanceof Array)) return false
    return data.map((item, index) => {
      return (
        <TouchableOpacity
          key={index}
          onPress={() => navigate('ProductDetailPage', {})}
        >
          <ProudcuItem imageStyle={{width: 100, height: 100}} data={item}>
            {/* <Button style={{ width: 80, backgroundColor: Color.mainPink }} size='small'>
              <Text style={{ color: '#fff' }}>去购买</Text>
            </Button> */}
          </ProudcuItem>
        </TouchableOpacity>
      )
    })
  }

  render() {
    let { products, pageNum } = this.state
    return (
      <Flex style={{ height: '100%'}}>
        <FlatList
          data={products || []}
          onEndReachedThreshold={0.1}
          extraData={this.state}
          style={{height: '100%'}}
          onEndReached={() => {
            if (this.hasDo) {
              return false
            }
            this.loadMoreFun( pageNum + 1)
          }}
          // refreshing={this.state.refreshing}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          ListFooterComponent={this.renderFooter}//尾巴
        />
        {/* <FlatList style={styles.productListBox}>
          {this.renderList(products) }
         
        </FlatList> */}
      </Flex>
    )
  }

  renderFooter = () => {
    // return (
    //   <Text>333</Text>
    // )
    const { products, isLoreMoreing } = this.state
    if (products.length != 0 && isLoreMoreing == 'LoreMoreing') {
      return (
        <View style={{
          height: 44,
          backgroundColor: 'rgb(200,200,200)',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text>{'正在加载....'}</Text>
        </View>
      )
    } else if (isLoreMoreing == 'LoreMoreEmpty') {
      return (
        <View style={{
          height: 44,
          backgroundColor: 'rgb(200,200,200)',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text>{'暂无更多'}</Text>
        </View>
      )
    } else {
      return null
    }

  }
}


const styles = StyleSheet.create({

});




