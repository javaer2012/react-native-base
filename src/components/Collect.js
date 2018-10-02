import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { flexRow, mainPink } from '../styles/common'
// , contentPadding, mainPink
const HEIGHT_LINE = 20
export default ({ collectStatus, onTollectCollect }) => {
  const tollectCollect = () => {
    const newCollectStatus = collectStatus == 1 ? 0 : 1
    onTollectCollect(newCollectStatus)
  }
  return (
    <TouchableOpacity onPress={tollectCollect} style={[flexRow, {alignItems: 'center'}]}>
      <Image
        style={{ width: HEIGHT_LINE - 4, height: HEIGHT_LINE -4 }}
        source={
          collectStatus != 1 ? require('../images/imageNew/three/beforeCollect.png') : require('../images/imageNew/three/collected.png') 
        }
      />
      <Text style={[
          { color: collectStatus != 1 ? '#ccc' : mainPink.color },
          { lineHeight: HEIGHT_LINE, height: HEIGHT_LINE, marginLeft: 4 } 
        ]}>收藏</Text>
    </TouchableOpacity>
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