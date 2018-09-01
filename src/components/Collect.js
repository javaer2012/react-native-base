import { Text, View, StyleSheet, Image } from 'react-native'
import React from 'react'
import { flexRow, mainPink } from '../styles/common'
// , contentPadding, mainPink
const HEIGHT_LINE = 20
export default ({ collectStatus }) => {
  return (
    <View style={[flexRow, {alignItems: 'center'}]}>
      <Image
        style={{ width: HEIGHT_LINE - 4, height: HEIGHT_LINE -4 }}
        source={
          collectStatus !== 1 ? require('../images/imageNew/three/beforeCollect.png') : require('../images/imageNew/three/collected.png') 
        }
      />
      <Text style={[
          { color: collectStatus !== 1 ? '#ccc' : mainPink.color },
          { lineHeight: HEIGHT_LINE, height: HEIGHT_LINE, marginLeft: 4 } 
        ]}>收藏</Text>
    </View>
  )
  // return class CollectHoc extends React.Component {
  //   collectFun = () => {

  //   }

  //   render() {
  //     return (
  //       <WrappedComponent 
  //         onPress={this.collectFun}
  //         {...this.props} 
  //       />
  //     )
  //   }
  // } 
}



const styles = StyleSheet.create({
  container: {

  }
})