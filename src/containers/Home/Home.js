// import React, { Component } from 'react'
// import { Text, View } from 'react-native'
// import { Button } from 'antd-mobile-rn';

// export default class Home extends Component {
//   render() {
//     return (
//       <View> 
//         <Button>
//           Start
//         </Button>
//       </View>
//     )
//   }
// }


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
          {/* <View style={[styles.containerHorizontal, { backgroundColor: 'red' }]}>
            <Text>Carousel 1</Text>
          </View>
          <View style={[styles.containerHorizontal, { backgroundColor: 'blue' }]}>
            <Text>Carousel 2</Text>
          </View>
          <View style={[styles.containerHorizontal, { backgroundColor: 'yellow' }]}>
            <Text>Carousel 3</Text>
          </View>
          <View style={[styles.containerHorizontal, { backgroundColor: 'aqua' }]}>
            <Text>Carousel 4</Text>
          </View>
          <View style={[styles.containerHorizontal, { backgroundColor: 'fuchsia' }]}>
            <Text>Carousel 5</Text>
          </View> */}
        </Carousel>
      </View>
    )
  }

  renderBanner = (list) => {
    return list.map((item, index) => (
    <View 
      key={index} 
      style={[styles.containerHorizontal, { backgroundColor: 'yellow' }]}
    >
      <Text>item</Text>
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
