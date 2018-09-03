import { Text, View, StyleSheet, Image } from 'react-native'
import React from 'react'
import { flexRowBet, flexRow, contentPadding, contentMargin } from '../styles/common'
import color from '../styles/var'

export default ({ data, children }) => {
  return (
    <View style={styles.container}>
      
      <View style={{ width: 67}}>
        <Image
          style={{ width: 50, height: 80 }}
          source={require('../images/find.png')}
        //  || data.imgPath
        />
      </View>
      <View style={styles.contentBox}>
        {/* <Text>2</Text> */}
        <Text style={styles.phoneNameStyle}>
          {data.phoneName}  {data.phoneDesc}
        </Text>
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

    // flexWrap: 'wrap',
    alignItems: 'stretch',
    backgroundColor: '#fff',
    ...contentPadding,
    paddingVertical: 20,
    marginBottom: 1,
  },
  contentBox:{
    display: 'flex',
    // flexDirection: 'row',
    justifyContent: 'space-between',
    flexGrow: 1,
    width: 200,
    flexWrap: 'wrap',
  },
  phoneNameStyle: {
    // backgroundColor: 'red'
  },
  btnBox: {
    alignItems: 'center',
  },
  priceStyle:{
    color: color.mainPink,
  }
})