import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import { Button, Carousel, List, Flex } from 'antd-mobile-rn';
import { ProductDetailPage_mock } from '../../mock/ProductDetailPage'
import { flexRow, contentPadding, mainGray } from '../../styles/common'
import Color from '../../styles/var'
import Collect from '../../components/Collect'
import SelectedListHoc from '../../components/SelectedList'
const storageItem = ({ data, itemData, onPress, subSkuId}) => {
  const boxStyle = [{
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 1
  }]
  const textStyle = []
  // debugger
  if (subSkuId === itemData.subSkuId) {
    boxStyle.push({
      backgroundColor: Color.mainPink
    })
    textStyle.push({
      color: '#fff'
    })
  }
  return (
    <View style={boxStyle}>
      <Text style={textStyle}>{itemData.subSkuName}</Text>
    </View>
  )
}
const SelectedList = SelectedListHoc(storageItem)


export default class ProductDetailPage extends Component {
  state = {
    productDetail:{}
  }

  componentDidMount(){
    
    this.setState({
      productDetail: ProductDetailPage_mock
    })
  }

  renderImage = (data) => {
    if (!data || !(data instanceof Array)) return false

    return data.map((item, index) => {
        return (
          <View key={item.photoId} style={[styles.containerHorizontal]}>
            <Image 
              resizeMode="center"
              style={{ width: 50, height: 50, backgroundColor:"red" }}
              source={{ uri: item.photoPath }}
              />
          </View>
      )
    })
  }

  renderDetailImage = (data) => {
    if (!data || !(data instanceof Array)) return false
    return data.map((item, index) => {
      return (
        <View key={item.photoId} style={[{backgroundColor:'#ccc'}]}>
          <Image
            resizeMode="center"
            style={{ width: 50, height: 150, backgroundColor: "red" }}
            source={{ uri: item.photoPath }}
          />
        </View>
      )
    })
  }

  renderSkuGroupList = (data) => {
    return data.map((item, index) => {
      // return ()
        // <CheckboxItem>

        // </CheckboxItem>
    })
  }

  selectedFun = (subSkuId) => {
    console.log(subSkuId, "YYYYYYYYYYYYYYy")
  }

  render() {
    const { productDetail } = this.state
    if (!productDetail.photoList) {
      return false
    }
    const { goodsBaseInfo: { goodsName, goodsDesc, goodsDetailText }, skuGroupList } = productDetail
    console.log(skuGroupList,"FFFFxxx")
    return (
      <ScrollView
        style={{ flex: 1 }}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Carousel
            style={styles.wrapper}
            selectedIndex={2}
            autoplay
            infinite
            afterChange={this.onHorizontalSelectedIndexChange}
          >
            {this.renderImage(productDetail.photoList)}
          </Carousel>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.infoStyle}>
            <Text style={[]}>{goodsName} {goodsDesc}</Text>
            <View style={styles.btnBox}>
              <Text style={[{ color: Color.mainPink},{fontWeight: '600'}]}>{222 || goodsPrice}</Text>
              <View>
                <Collect 
                  collectStatus={ 1 || collectStatus }
                />
              </View>
            </View>
          </View>
          <View style={[styles.canSelectedBox]}>
            <View style={[flexRow, contentPadding, {
              backgroundColor: '#fff',
              paddingVertical: 10,
              alignItems: 'center'
            }]}>
              <Text style={{
                ...mainGray
              }}>内存</Text>
              <View style={{ marginLeft: 10 }}>
                {/* {this.renderSkuGroupList(skuGroupList)} */}
                <SelectedList
                  data={skuGroupList[0].subSkuList} 
                  onPress={this.selectedFun}
                />
              </View>
            </View>
          </View>
          <Flex style={[contentPadding, { backgroundColor: '#fff', marginBottom: 10}]} direction='row' justify='between' align='center' >
            <Flex.Item style={{ flex: 0, paddingVertical: 14, paddingRight: 10}}>
              <Text>套餐</Text>
            </Flex.Item>
            <Flex.Item>
              <Flex direction="row" justify='between' align="center">
                  <Text>{222 || 333}</Text>
                  <Text>></Text>
              </Flex>
            </Flex.Item>
          </Flex>

          <Flex style={[contentPadding, { backgroundColor: '#fff', marginBottom: 10 }]} direction='row' justify='between' align='center' >
            <Flex.Item style={{ flex: 0, paddingVertical: 14, paddingRight: 10 }}>
              <Text>分期</Text>
            </Flex.Item>
            <Flex.Item>
              <Flex direction="row" justify='between' align="center">
                <Text>{222 || 333}</Text>
                <Text>></Text>
              </Flex>
            </Flex.Item>
          </Flex>
          <Flex direction='column' style={{backgroundColor: '#fff'}}>
            <View>
              <Text>图文详情</Text>
            </View>
            <View style={styles.photoDetail}>
              {this.renderDetailImage(productDetail.photoList)}
            </View>
          </Flex>
        </View>
      </ScrollView>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    
  },
  contentContainer: {
    
  },
  infoStyle: {
    backgroundColor: '#fff',
    ...contentPadding,
    paddingVertical: 20,
    marginBottom: 12
    
  },
  canSelectedBox:{
    marginBottom: 1
  },
  btnBox: {
    marginTop: 15,
    ...flexRow,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  wrapper:{
    // height: 150
  },
  photoDetail:{

  },
  containerHorizontal: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 400,
  },
});
