import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, TouchableHighlight, ScrollView } from 'react-native'
import { Button, Carousel } from 'antd-mobile-rn';
import { bannerNav_mock, productList_mock } from '../../mock/home'
import ProudcuItem from '../../components/ProudcuItem'
import { flexRow } from '../../styles/common'
import Color from '../../styles/var'



export default class Home extends Component {
  state = {
    bannerList: [1, 2, 3],
    products: []
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

  render() {
    const { bannerList, navList, products } = this.state
    const { navigate } = this.props.navigation;
    return (
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
          {this.renderList(products)}
          {/* <ProductList 
            data={products}
          /> */}
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
