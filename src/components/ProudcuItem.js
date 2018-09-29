import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { flexRowBet, flexRow, contentPadding } from '../styles/common'
import Color from '../styles/var'
import { HTTP_IMG } from '../service/api'
const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

export default ({ data, children, imageStyle }) => {
  return (
    <View
      style={styles.container}
     // onPress={() => navigate('ProductListPage', {})}
    >
      {/* <Image
        style={{ width: 50, height: 80, marginRight: 10 }}
        source={require('../images/find.png')}
        //  || data.imgPath
      /> */}
      <Image 
        resizeMode="cover" 
        style={{ 
          width: imageStyle ? imageStyle.width : 50, 
          height: imageStyle ? imageStyle.height : 80, 
          marginRight: 10 
        }} source={{ uri: `${HTTP_IMG}${data.imgPath || data.goodsImgPath}` }} />

      <View style={styles.contentBox}>
        {/* <Text style={styles.phoneName}>{data.phoneName || data.goodsName} <Text>{data.phoneDesc}</Text></Text>
        {data.goodsDesc && <Text>{data.goodsDesc}</Text>} */}
        <Text style={{ flexWrap: 'wrap', width: WIDTH - 80 }}>
          {data.phoneName || data.goodsName}
          <Text style={{ flexWrap: 'wrap' }}>{data.phoneDesc}</Text>
        </Text>
        {data.goodsDesc && <Text style={{ flexWrap: 'wrap' }}>{data.goodsDesc}</Text>}

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