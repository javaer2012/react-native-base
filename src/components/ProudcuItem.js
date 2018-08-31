import { Text, View, StyleSheet, Image } from 'react-native'
import React from 'react'
import { flexRowBet, flexRow, contentPadding } from '../styles/common'
import color from '../styles/var'

export default ({ data, children }) => {
  return (
    <View style={styles.container}>
      <Image
        style={{ width: 50, height: 80, marginRight: 10 }}
        source={require('../images/find.png')}
        //  || data.imgPath
      />
      <View style={styles.contentBox}>
        <Text style={styles.phoneName}>{data.phoneName} <Text>{data.phoneDesc}</Text></Text>
        <View style={[flexRowBet, styles.btnBox]}>
          <Text style={styles.priceStyle}>￥ {data.price}</Text>
          <View>
            {children}
          </View>
        </View>
      </View>
       
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...flexRow,
    alignItems: 'center',
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
    justifyContent: 'space-between'
  },
  btnBox: {
    alignItems: 'center',
  },
  priceStyle:{
    color: color.mainPink,
  }
})