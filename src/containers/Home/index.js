import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Button, Carousel } from 'antd-mobile-rn';


export default class Home extends Component {
  state = {
    list: [1,2,3]
  }

  render() {
    const { list } = this.state
    return (
      <View>
        <Carousel
          style={styles.wrapper}
          selectedIndex={2}
          autoplay
          infinite
          afterChange={this.onHorizontalSelectedIndexChange}
        >
          {this.renderBanner(list)}
        </Carousel>
          <Button onClick={()=>this.props.navigation.navigate("LoginPage")}>Go Login</Button>

      </View>
    )
  }

  renderBanner = (list) => {
    return list.map((item, index) => (
    <View 
      key={index} 
      style={[styles.containerHorizontal, { backgroundColor: 'yellow' }]}
    >
      <Text>{`Item ${index}`}</Text>
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
});
