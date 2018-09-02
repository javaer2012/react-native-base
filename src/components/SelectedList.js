import React from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { flexRow } from '../styles/common'

// const selectedStyle = {
//   backgroundColor: 'red'
// }
const commonStyle = {
  backgroundColor: '#fff'
}

export default (WrappedComponent) => {
  return class SelectedListHoc extends React.Component {
    state = {
      subSkuId: false,
      selectedObj: {

      }
    }
    collectFun = (subSkuId) => {
      // console.log(selected, "FFFFF")
      // const { selectedObj } = this.state
      this.setState({
        subSkuId: subSkuId
      })
      this.props.onPress(subSkuId)
    }
    
    renderList = (data) => {
      const { selectedObj, subSkuId } = this.state
      return data.map((item, index) => {
        return (
          <TouchableOpacity
            key={item.subSkuId}
            onPress={this.collectFun.bind(this, item.subSkuId)}
            // style={subSkuId === item.subSkuId ? selectedStyle : commonStyle}
          >
            <WrappedComponent
              subSkuId={subSkuId}
              itemData={item}
              {...this.props}
            />
          </TouchableOpacity>
        )
      })
    }

    render() {
      const { data } = this.props
      return (
        <View style={flexRow}>
          {this.renderList(data)}
        </View>
      )
    }
  } 
}