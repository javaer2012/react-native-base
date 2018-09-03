import { Text, View, StyleSheet, TouchableHighlight } from 'react-native'
import { Button, Carousel, List, Flex } from 'antd-mobile-rn';
import React, { Component } from 'react'

// export default ({ data }) => {
//   return (
//     <View>

//     </View>
//   )
// }
const LENGTH = 80
const HEIGHT = 28
const styles = StyleSheet.create({
  box: {
    borderRadius: 5,
    backgroundColor: '#f2f2f2',
    padding: 1,
    width: LENGTH,
  },
  base:{
    textAlign: 'center',
    lineHeight: HEIGHT,
    height: HEIGHT,
    backgroundColor: '#fff',
    width: (LENGTH - 2) / 3
  }
})

export default class NumberSelect extends Component {
  state = {
    number: 0
  }

  _onPress = ( num ) => {
    const { number } = this.state
    if (number < 1 && num < 0) return false
    this.setState({
      number: number + num
    })
    this.props._onPress(number + num)
  }

  render() {
    const { number } = this.state
    return (
      <Flex align='stretch' style={styles.box}>
        <TouchableHighlight onPress={this._onPress.bind(this, -1)}>
          <Text style={[styles.base]}>-</Text>
        </TouchableHighlight>
        <Text style={[styles.base, {marginHorizontal: 1}]}>{number}</Text>
        <TouchableHighlight onPress={this._onPress.bind(this, 1)}>
          <Text style={[styles.base]}>+</Text>
        </TouchableHighlight>
      </Flex>
    )
  }
}