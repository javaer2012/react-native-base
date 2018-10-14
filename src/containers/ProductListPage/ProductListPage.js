import React, {Component} from 'react'
import {Text, View, StyleSheet, Image, TouchableOpacity, AsyncStorage, FlatList, RefreshControl} from 'react-native'
// import { Button } from 'antd-mobile-rn';
import {bannerNav_mock, productList_mock} from '../../mock/home'
import {flexRow} from '../../styles/common'
import ProudcuItem from '../../components/ProudcuItem'
import api from '../.././service/api'
import RentApp from "../../components/RentApp";
import {throttle} from '../../utils/funs'
import {Flex, Drawer, WhiteSpace, Button} from 'antd-mobile-rn';
import Color from '../../styles/var'
import Search from '../Search';
import Sidebar from '../../components/common/SlideBar'

const {queryGoodsList, HTTP_IMG} = api
import Spinner from 'react-native-loading-spinner-overlay';
// import throttle from '../../utils/throttle'

export default class ProductListPage extends RentApp {
    static navigationOptions = {
        title: "商品列表"
    }
    state = {
        products: [],
        pageNum: 1,
        pageSize: 10,
        refreshing: false,
        isLoreMoreing: '',
        selected: [],  // 选中的筛选条件,
        isShowSelected: false,
        cateList: [],
        loading: false,
        maxPrice: false,
        minPrice: false,
        sortList: false,
    }

    async componentDidMount() {
        await this.getOpenIdAndUserId()
        this.getData()
        this.getCateList()
    }

    getData = async (otherParams) => {
      if (otherParams) {
        await this.setState({
          ...this.state,
          ...otherParams
        })
      }
      const { pageNum, pageSize, products, isLoreMoreing, selected, maxPrice, minPrice} = this.state
      if (isLoreMoreing === 'LoreMoreEmpty') return false

      const category = this.props.navigation.getParam('category');
      const keyWord = this.props.navigation.getParam('keyWord');
      
      await this.setState({ loading: true })
      try {
        const user = await AsyncStorage.multiGet(['userId', 'openId', 'isLogin', 'addressInfos'])
        const userId = this.userId,
          openId = this.openId,
          isLogin = user[2][1] || false,
          cityCode = this.cityCode,
          provinceCode = this.provinceCode;

        const params = { userId, openId, provinceCode, cityCode, category, keyWord, pageNum, pageSize, ...otherParams }

        if (selected.length) params.queryCateList = JSON.stringify(selected)

        if (minPrice !== false) params.minPrice = minPrice
        if (maxPrice !== false)params.maxPrice = maxPrice

        console.log(params, '=========> params')

        const rsp = await queryGoodsList(params)
        console.log("Products:", rsp)
        const { data } = rsp || {}
        console.log(data, '======>data')

        const { errcode, goodsList, totalPage } = data
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
        } else if (errcode !== 1) {
          this.showToast(data.errmsg)
        }
      } catch (e) {
        console.log(e,"========>err")
      } finally {
        this.setState({ loading: false })
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
            console.log(JSON.stringify(listRsp.data.cateList), '=====>listRsp')
            if (listRsp.data.errcode === 1) {
                this.setState({
                    cateList: listRsp.data.cateList
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    throttleGetData = throttle(this.getData, 1000)

    loadMoreFun = async () => {
        await this.setState({
            refreshing: true,
        })
      this.throttleGetData({ pageNum: this.state.pageNum + 1})
    }

    _renderItem = ({item}) => {
        const {navigate} = this.props.navigation;

        return (
            <TouchableOpacity
                key={item.id}
                onPress={() => navigate('ProductDetail', {productId: item.id})}
            >
                <ProudcuItem imageStyle={{width: 100, height: 100}} data={item}>
                    <Button onClick={() => navigate('ProductDetail', {productId: item.id})}
                            style={{width: 80, backgroundColor: Color.mainPink}} size='small'>
                        <Text style={{color: '#fff'}}>去租机</Text>
                    </Button>
                </ProudcuItem>
            </TouchableOpacity>
        )
    };

    renderList = (data) => {
        const {navigate} = this.props.navigation;
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

    onSelect = (id) => {
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

    onPriceChange = (value, type) => {
      // console.log(value,"dddddddddd", type)
        this.setState({
            [type]: value
        })
    }

    onReset = async () => {
       await this.setState({
            maxPrice:false,
            minPrice:false,
            selected:[],
            pageNum: 1
        })
      this.getData()
    }

  onConfirm = async () => {
    await this.setState({
      products: []
    })
    this.getData({pageNum: 1})
    this.drawer.closeDrawer()
  }

  sortFun = async () => {
    let { sortList } = this.state
    let newSortList = []

    await this.setState({
      products: [],
    })
    if (sortList === false) {  // 初始化状态,默认升序
      newSortList.push({
        paramName: 'price',
        sortType: 'asc'
      })
    } else{
      sortList = JSON.parse(sortList)
      if (sortList[0] && sortList[0].sortType === 'asc') {
        newSortList.push({
          paramName: 'price',
          sortType: 'desc'
        })
      }
      if (sortList[0] && sortList[0].sortType === 'desc') {
        newSortList.push({
          paramName: 'price',
          sortType: 'asc'
        })
      }
    }
    newSortList = JSON.stringify(newSortList)
    await this.setState({ sortList: newSortList })
    const params = { pageNum: 1 }
    params.sortList = newSortList

    this.getData(params)
  }

  tuiJian = async () => {
    let { sortList } = this.state
    await this.setState({
      products: [],
      sortList: false,
    })
    const params = { pageNum: 1 }
    this.getData(params)
  }


    render() {
        // console.log("New", this.state)
        let {products, pageNum, selected, cateList, maxPrice,minPrice, isLoreMoreing} = this.state
        const searchBtnStyle = [{
            paddingHorizontal: 36,
            paddingVertical: 10
        }]

        return (
            <Drawer
                sidebar={
                  <Sidebar 
                    source={cateList}
                    selected={selected}
                    onChange={this.onPriceChange}
                    onSelect={this.onSelect}
                    onReset={this.onReset}
                    maxPrice={maxPrice}
                    minPrice={minPrice}
                    onConfirm={this.onConfirm}          
                />}
                position="right"
                open={false}
                drawerRef={(el) => (this.drawer = el)}
                drawerBackgroundColor="#ccc"
                drawerWidth={328}
            >
                {/* <View style={{ flex: 1, marginTop: 114, padding: 8, minHeight: 603, zIndex: 10 }}>
          <Button onClick={() => this.drawer && this.drawer.openDrawer()}>
            Open drawer
                    </Button>
          <WhiteSpace />
        </View> */}
                <Flex direction="column" align="stretch" style={{height: '100%'}}>
                    <Flex direction='column' align="stretch" style={{
                        backgroundColor: '#fff',
                        paddingVertical: 6,
                        borderBottomColor: '#eee',
                        borderBottomWidth: 0.5
                    }}>
                        <Flex direction="row" justify="around" align="stretch">
                            <TouchableOpacity onPress={() => this.tuiJian()} style={[searchBtnStyle]}>
                                <Text style={{color: selected === 1 ? Color.mainPink : '#333'}}>推荐</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                              onPress={this.sortFun}
                              style={[searchBtnStyle, {
                                borderLeftWidth: 1,
                                borderRightWidth: 1,
                                borderColor: '#eee'
                            }]}>
                                <Text style={{color: selected === 2 ? Color.mainPink : '#333'}}>价格</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[searchBtnStyle]} onPress={() => this.drawer.openDrawer()}>
                                <Text style={{color: selected === 3 ? Color.mainPink : '#333'}}>筛选</Text>
                            </TouchableOpacity>
                        </Flex>
                    </Flex>
                    <FlatList
                        data={products || []}
                        onEndReachedThreshold={0.1}
                        extraData={this.state}
                        style={{height: '100%'}}
                        onEndReached={() => {
                            if (isLoreMoreing !== 'LoreMoreEmpty') {
                                this.loadMoreFun()
                            } else if (isLoreMoreing == 'LoreMoreing') {
                                console.log('LoreMoreing')
                            }

                        }}
                        // refreshing={this.state.refreshing}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                        ListFooterComponent={this.renderFooter}//尾巴
                    />

                </Flex>
            </Drawer>
        )
    }

    renderFooter = () => {
        // return (
        //   <Text>333</Text>
        // )
        const {products, isLoreMoreing} = this.state
        if (products.length != 0 && isLoreMoreing == 'LoreMoreing') {
            return (
                <View style={{
                    height: 44,
                    // backgroundColor: 'rgb(200,200,200)',
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
                    // backgroundColor: 'rgb(200,200,200)',
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


const styles = StyleSheet.create({});




