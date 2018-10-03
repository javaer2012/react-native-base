import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, AsyncStorage, FlatList, RefreshControl } from 'react-native'
// import { Button } from 'antd-mobile-rn';
import { bannerNav_mock, productList_mock } from '../../mock/home'
import { flexRow } from '../../styles/common'
import ProudcuItem from '../../components/ProudcuItem'
import api from '../.././service/api'
import RentApp from "../../components/RentApp";
import { throttle } from '../../utils/funs'
import { Flex, Drawer, WhiteSpace, Button } from 'antd-mobile-rn';
import Color from '../../styles/var'
import Search from '../Search';
import Sidebar from '../../components/common/SlideBar'
const { queryGoodsList, HTTP_IMG } = api

// 

export default class ProductListPage extends RentApp {
  static navigationOptions = {
    title: "商品列表"
  }
  state = {
    products:[],
    pageNum:1,
    pageSize:10,
    refreshing: false,
    isLoreMoreing: '',
    selected: [],  // 选中的筛选条件,
    isShowSelected: false,
    cateList: []
  }

  async componentDidMount(){
    await this.getOpenIdAndUserId()
    this.getData()
    this.getCateList()
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
        provinceCode,
        cityCode,
        category,
        pageNum,
        pageSize
      }
      
      const rsp = await queryGoodsList(params)
      const { data,data: { errcode, goodsList, totalPage } } = rsp || {}
      // console.log(data)
      if (errcode === 1 && goodsList.length) {
        // const isLoreMoreing = goodsList.length ? 'LoreMoreing' : 'LoreMoreEmpty';
        this.setState({
          products: [...products, ...goodsList],
          totalPage,
          refreshing: false,
          isLoreMoreing: 'LoreMoreing'
        })
      } else if (errcode === 1 && !goodsList.length) {
        this.setState({
          isLoreMoreing: 'LoreMoreEmpty'
        })
      }
    } catch (e) {

    }
  }

  async getCateList() {
    try {
      console.log("Call api of List")
      const listRsp = await api.queryConditionList({
        "provinceCode": this.provinceCode,
        "cityCode": this.cityCode,
        "category": '1'
      });
      console.log(listRsp, '=====>listRsp')
      if (listRsp.data.errcode === 1) {
        this.setState({
          cateList: listRsp.data.cateList
        })
      }
    } catch (e) {
      console.log(e)
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
    await this.getData()
    this.hasDo = false

  }

  _renderItem = ({ item }) => {
    const { navigate } = this.props.navigation;

    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => navigate('ProductDetail', { productId: item.id})}
      >
        <ProudcuItem imageStyle={{ width: 100, height: 100 }} data={item}>
          <Button onClick={() => navigate('ProductDetail', { productId: item.id })} style={{ width: 80, backgroundColor: Color.mainPink }} size='small'>
            <Text style={{ color: '#fff' }}>去购买</Text>
          </Button>
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

  onSelect(id) {
    const idIndex = this.state.selected.indexOf(id),
      selected = Array.from(this.state.selected);
    if (idIndex !== -1) {
      selected.splice(idIndex, 1);
    } else {
      selected.push(id)
    }
    this.setState({
      ...this.state,
      selected
    })
  }

  render() {
    let { products, pageNum, selected, cateList } = this.state
    const searchBtnStyle = [{
      paddingHorizontal: 36,
      paddingVertical: 10
    }]
    return (
      <Flex direction="column" align="stretch" style={{ height: '100%'}}>
        <Flex direction='column' align="stretch" style={{ backgroundColor: '#fff', paddingVertical: 6,borderBottomColor: '#eee',borderBottomWidth:0.5 }}>
          <Flex direction="row" justify="around" align="stretch">
            <TouchableOpacity style={[searchBtnStyle]}>
              <Text style={{color: selected === 1 ? Color.mainPink : '#333'}}>推荐</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[searchBtnStyle, { borderLeftWidth: 1, borderRightWidth: 1 ,borderColor: '#eee'}]} >
              <Text style={{ color: selected === 2 ? Color.mainPink : '#333' }}>价格</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[searchBtnStyle]} onPress={() => this.setState({ isShowSelected: true})}>
              <Text style={{ color: selected ===3 ? Color.mainPink : '#333' }}>筛选</Text>
            </TouchableOpacity>
          </Flex>
        </Flex>
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
        <Drawer
          sidebar={<Sidebar source={cateList} selected={selected} onSelect={this.onSelect} />}
          position="right"
          open={false}
          drawerRef={(el) => (this.drawer = el)}
          onOpenChange={this.onOpenChange}
          drawerBackgroundColor="#ccc"
          drawerWidth={328}
        >
          <View style={{ flex: 1, marginTop: 114, padding: 8, minHeight: 603, zIndex: 10 }}>
            <Button onClick={() => this.drawer && this.drawer.openDrawer()}>
              Open drawer
                    </Button>
            <WhiteSpace />
          </View>
        </Drawer>
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




