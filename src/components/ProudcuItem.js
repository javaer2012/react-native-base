import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { flexRowBet, flexRow, contentPadding } from '../styles/common'
import Color from '../styles/var'
import { HTTP_IMG } from '../service/api'
import { Flex } from 'antd-mobile-rn';


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

      <Flex direction='column' justify='between' align='stretch' style={styles.contentBox}>
        <Flex style={{flex: 1,}}>
          <Text style={{ flexWrap: 'wrap', fontSize: 18, width: WIDTH - 40 - ( imageStyle ? imageStyle.width : 50) }}>
            {data.phoneName || data.goodsName}
            <Text style={{ flexWrap: 'wrap', fontSize: 18, width: WIDTH - 40 - ( imageStyle ? imageStyle.width : 50) }}>{data.phoneDesc}</Text>
          </Text>
          {data.goodsDesc && <Text style={{ flexWrap: 'wrap',fontSize: 18, width: WIDTH - 40 - (imageStyle ? imageStyle.width : 50)  }}>{data.goodsDesc}</Text>}
        </Flex>
        <Flex style={{flex: 1}}>
          {data.infos}
        </Flex>
        <Flex justify='between'  style={{ flex: 1, alignItems:'stretch', width: '100%' }}>
          <Text style={styles.priceStyle}>￥ {data.price}</Text>
          <View>
            {children}
          </View>
        </Flex>
      </Flex>
       
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
    flex: 1,
    // display: 'flex',
    flexWrap: 'wrap',
    // flexGrow: 1,
    // alignItems: 'stretch',
    paddingVertical: 4,
    // justifyContent: 'space-between',
  },
  btnBox: {
    alignItems: 'center',
  },
  priceStyle:{
    fontSize: 18,
    color: Color.mainPink,
  }
})