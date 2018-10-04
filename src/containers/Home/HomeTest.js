import React, { Component } from 'react'
import {Text, View, StyleSheet, Image, TouchableOpacity, Alert, Linking} from 'react-native'
import { Button, Carousel } from 'antd-mobile-rn';
import { bannerNav_mock, productList_mock } from '../../mock/home'
import ProductList from '../../components/ProductList'
import { flexRow } from '../../styles/common'
import {checkUpdate, downloadUpdate, switchVersion, switchVersionLater} from "react-native-update";



export default class Home extends Component {
  state = {
    bannerList: [1,2,3],
    products:[]
  }

  componentDidMount(){
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
        <TouchableOpacity
          key={index}
          onPress={() => navigate('ProductDetailPage', {})}
        >
          <ProudcuItem data={item}>
            <Button style={{ width: 80, backgroundColor: Color.mainPink }} size='small'>
              <Text style={{ color: '#fff' }}>去购买</Text>
            </Button>
          </ProudcuItem>
        </TouchableOpacity>
      )
    })
  }

    doUpdate = info => {
        downloadUpdate(info).then(hash => {
            Alert.alert('提示', '下载完毕,是否重启应用?', [
                {text: '是', onPress: ()=>{switchVersion(hash);}},
                {text: '否',},
                {text: '下次启动时', onPress: ()=>{switchVersionLater(hash);}},
            ]);
        }).catch(err => {
            Alert.alert('提示', '更新失败.');
        });
    };
    checkUpdate = () => {
        checkUpdate(appKey).then(info => {
            if (info.expired) {
                Alert.alert('提示', '您的应用版本已过期,请前往应用商店下载新的版本', [
                    {text: '确定', onPress: ()=>{info.downloadUrl && Linking.openURL(info.downloadUrl)}},
                ]);
            } else if (info.upToDate) {
                Alert.alert('提示', '您的应用版本已是最新.');
            } else {
                Alert.alert('提示', '检查到新的版本'+info.name+',是否下载?\n'+ info.description, [
                    {text: '是', onPress: ()=>{this.doUpdate(info)}},
                    {text: '否',},
                ]);
            }
        }).catch(err => {
            Alert.alert('提示', '更新失败.');
        });
    };

  render() {
    const { bannerList, navList, products } = this.state
    return (
      <View stlye={{marginTop: 50}}>

          <TouchableOpacity onPress={this.checkUpdate}>
              <Text>检测版本</Text>
          </TouchableOpacity>

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

      </View>
    )
  }

  renderBanner = (list) => {
    // if (!list || list.length) {
    //   return <View></View>
    // }
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
        onPress={ () => navigate('ProductListPage', {}) }
      >
        <Image
          style={{ width: 50, height: 50 }}
          source={require('../../images/find.png')}
        //  || data.imgPath
        />
        <Text style={{textAlign: 'center'}}>
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
    paddingVertical: 10,
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
  listTitle:{
    textAlign: 'center',
    fontSize: 15,
    padding: 20,
    backgroundColor: '#fff'
  }
});
