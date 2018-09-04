import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, TouchableHighlight, ScrollView, AsyncStorage } from 'react-native'
import { Button, Carousel, Picker, List } from 'antd-mobile-rn';
import { bannerNav_mock, productList_mock } from '../../mock/home'
import ProudcuItem from '../../components/ProudcuItem'
import { flexRow } from '../../styles/common'
import Color from '../../styles/var'
import { district, provinceLite } from 'antd-mobile-demo-data';

const CustomChildren = (props) => (
  <TouchableOpacity onPress={props.onClick}>
    <View
      style={{ height: 36, paddingLeft: 15, flexDirection: 'row', alignItems: 'center' }}
    >
      <Text style={{ flex: 1 }}>{props.children}</Text>
      <Text style={{ textAlign: 'right', color: '#888', marginRight: 15 }}>{props.extra}</Text>
    </View>
  </TouchableOpacity>
);

export default class Home extends Component {
  state = {
    bannerList: [1, 2, 3],
    products: [],
    addressMsg:{},
    data: [],
    value: [],
    pickerValue: [],
  }

  getAddressMsg = async () =>{
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
    const addressMsg = await this.getAddressMsg()
    this.setState({
      addressMsg
    })
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

  onClick = () => {
    // console.log('start loading data');
    setTimeout(() => {
      this.setState({
        data: district,
      });
    }, 500);
  }
  onChange = (value: any) => {
    // console.log(value);
    this.setState({ value });
  }

  render() {
    const { bannerList, navList, products, addressMsg } = this.state
    const { navigate } = this.props.navigation;
    return (
      <ScrollView
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text numberOfLines={10} ellipsizeMode="tail">{addressMsg.formatted_address}</Text>
        </View>
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
        <View style={{ marginTop: 30 }}>
          <List>
            <Picker
              data={this.state.data}
              cols={2}
              value={this.state.value}
              onChange={this.onChange}
            >
              <List.Item arrow="horizontal" last onClick={this.onClick}>
                省市选择(异步加载)
            </List.Item>
            </Picker>
            <Picker
              title="选择地区"
              data={district}
              cols={2}
              value={this.state.pickerValue}
              onChange={(v) => this.setState({ pickerValue: v })}
              onOk={(v) => this.setState({ pickerValue: v })}
            >
              <CustomChildren>Customized children</CustomChildren>
            </Picker>
          </List>
        </View>
      </ScrollView>
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
