import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { flexRowBet, flexRow, contentPadding } from '../styles/common'
import Color from '../styles/var'
import { HTTP_IMG } from '../service/api'

export default ({ data, children }) => {
  console.log(data,"@@@@@@@")
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigate('ProductListPage', {})}
    >
      {/* <Image
        style={{ width: 50, height: 80, marginRight: 10 }}
        source={require('../images/find.png')}
        //  || data.imgPath
      /> */}
      <Image resizeMode="stretch" style={{ width: 50, height: 80, marginRight: 10 }} source={{ uri: `${HTTP_IMG}${data.imgPath}` }} />

      <View style={styles.contentBox}>
        <Text style={styles.phoneName}>{data.phoneName} <Text>{data.phoneDesc}</Text></Text>
        <View style={[flexRowBet, styles.btnBox]}>
          <Text style={styles.priceStyle}>￥ {data.price}</Text>
          <View>
            {children}
          </View>
        </View>
      </View>
       
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    ...flexRow,
    alignItems: 'stretch',
    backgroundColor: '#fff',
    ...contentPadding,
    paddingVertical: 10,
    marginBottom: 1
  },
  contentBox:{
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1,
    alignItems: 'stretch',
    paddingVertical: 8,
    justifyContent: 'space-between',
  },
  btnBox: {
    alignItems: 'center',
  },
  priceStyle:{
    color: Color.mainPink,
  }
})