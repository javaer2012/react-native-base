import React, { Component } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { Button, Carousel } from 'antd-mobile-rn';
import { bannerNav_mock } from '../../mock/home'


export default class Home extends Component {
  state = {
    bannerList: [1,2,3]
  }

  componentDidMount(){
    const { bannerList, navList } = bannerNav_mock
    this.setState({
      bannerList,
      navList
    })
  }

  render() {
    const { bannerList, navList } = this.state
    return (
      <View stlye={{marginTop: 50}}>
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
      </View>
    )
  }

  renderBanner = (list) => {
    // if (!list || list.length) {
    //   return <View></View>
    // }
  return list.map((item, index) => (
    <View 
      key={item.id} 
      style={[styles.containerHorizontal, { backgroundColor: 'yellow' }]}
    >
        {/* <Image
          source={item.imgPath}
        /> */}
        <Text>
          11
        </Text>
    </View>))
  }
  renderNavList = (list) => {
    const { navigate } = this.props.navigation;
    return list.map((item, index) => (
      <View
        key={item.id}
        style={[styles.navItem]}
      >
        <Image
          source={item.iconPath}
        />
        <Text onPress={() =>
          navigate( linkUrl , { name: 'Jane' })
        }>
          {item.navTitle}
        </Text>
      </View>))
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
    display: 'flex',
    flexDirection: 'row'
  },
  navItem: {
    width: 120,
    height: 120
  }
});
