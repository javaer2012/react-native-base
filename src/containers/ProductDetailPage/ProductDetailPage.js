import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, TouchableHighlight } from 'react-native'
import { Button, Carousel, List, Flex, Tabs } from 'antd-mobile-rn';
import { ProductDetailPage_mock } from '../../mock/ProductDetailPage'
import { flexRow, contentPadding, mainGray } from '../../styles/common'
import Color from '../../styles/var'
import Collect from '../../components/Collect'
import SelectedListHoc from '../../components/SelectedList'
import NumberSelect from '../../components/NumberSelect'
import PayBar from '../../components/PayBar'
import ActionSheet from 'react-native-actionsheet'

const storageItem = ({ data, itemData, onPress, subSkuId}) => {
  const boxStyle = [{
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 1
  }]
  const textStyle = []
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
const SelectedColorList = SelectedListHoc(storageItem)
const SelectedROMList = SelectedListHoc(storageItem)
const tabs = [
  { title: '融合套餐', sub: '1' },
  { title: '单产品套餐', sub: '2' },
];



export default class ProductDetailPage extends Component {
  state = {
    productDetail:{},
    isShowPackage: false,
    isShowDetailInfos: false,
    lastPrice: 0
  }

  componentDidMount(){
    
    this.setState({
      productDetail: ProductDetailPage_mock
    })
  }
  showActionSheet = () => {
    this.ActionSheet.show()
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
        <View key={item.photoId || index} style={[{backgroundColor:'#ccc'}]}>
          <Image
            resizeMode="center"
            style={{ width: 50, height: 150, backgroundColor: "red" }}
            source={{ uri: item.photoPath }}
          />
        </View>
      )
    })
  }
  renderMealList = (data) => {
    if (!data || !(data instanceof Array)) return false
    return data.map((item, index) => {
      return (
        <Flex key={item.photoId || index} style={[styles.mealItemStyle, {marginTop: 10}]}>
          <Flex.Item>
            <Text>
              {item.mealName}
            </Text>
            <Text>
              {item.mealDesc}
            </Text>
          </Flex.Item>
        </Flex>
      )
    })
  }
  renderSelectCombo = () => {

  }

  // renderSkuGroupList = (data) => {
  //   return data.map((item, index) => {
  //     // return ()
  //       // <CheckboxItem>

  //       // </CheckboxItem>
  //   })
  // }

  selectedFun = (subSkuId) => {
    console.log(subSkuId, "YYYYYYYYYYYYYYy")
  }
  togglePackageFun = (isShow) => {
    this.setState({
      isShowPackage: isShow
    })
  }
  toggleAgingFun = (isShow) => {
    this.setState({
      isShowAgin: isShow
    })
  }
  toggleDetailInfosFun = (isShow) => {
    const { navigate } = this.props.navigation;
    navigate('ProductParameterPage', {})
    // this.setState({
    //   isShowDetailInfos: isShow
    // })
  }

  goToPayFun = () => {
    
  }

  render() {
    const { productDetail, isShowPackage, lastPrice } = this.state
    if (!productDetail.photoList) {
      return false
    }
    const { goodsBaseInfo: { goodsName, goodsDesc, goodsDetailText }, skuGroupList, mealList } = productDetail
    return (
      <Flex style={{position: 'relative'}}  direction="column">
        <Text onPress={this.showActionSheet}>Open ActionSheet</Text>
        <ScrollView
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
                <Text style={[{ color: Color.mainPink }, { fontWeight: '600' }]}>{222 || goodsPrice}</Text>
                <View>
                  <Collect
                    collectStatus={1 || collectStatus}
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
                }}>颜色</Text>
                <View style={{ marginLeft: 10 }}>
                  <SelectedColorList
                    data={skuGroupList[0].subSkuList}
                    onPress={this.selectedFun}
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
                  ...mainGray,
                  marginRight: 10
                }}>容量</Text>
                <View>
                  <SelectedROMList
                    data={skuGroupList[0].subSkuList}
                    onPress={this.selectedFun}
                  />
                </View>
              </View>
            </View>
            <Flex style={{ backgroundColor: '#fff', padding: 10 }} direction='row' align='center'>
              <Text style={{
                ...mainGray,
                marginRight: 10
              }}>数量</Text>
              <NumberSelect
                _onPress={(count) => {
                  this.setState({
                    count: count
                  }, () => { console.log(count, "ffff") })
                }}
              ></NumberSelect>
              <Text style={[{ ...mainGray }]}>
                库存 {"###"}
              </Text>
            </Flex>
            <TouchableHighlight onPress={this.togglePackageFun.bind(this, true)}>
              <Flex style={[contentPadding, { backgroundColor: '#fff', marginBottom: 1 }]} direction='row' justify='between' align='center' >
                <Flex.Item style={{ flex: 0, paddingVertical: 14, paddingRight: 10 }}>
                  <Text>套餐</Text>
                </Flex.Item>
                <Flex.Item>
                  <Flex direction="row" justify='between' align="center">
                    <Text>{222 || 333}</Text>
                    <Text>></Text>
                  </Flex>
                </Flex.Item>
              </Flex>
            </TouchableHighlight>
            <TouchableHighlight onPress={this.toggleAgingFun.bind(this, true)}>
              <Flex style={[contentPadding, { backgroundColor: '#fff' }]} direction='row' justify='between' align='center' >
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
            </TouchableHighlight>
            <Flex style={{ backgroundColor: '#fff', marginTop: 10 }}>
              <Tabs tabs={tabs}
                initialPage={1}
                onChange={(tab, index) => { console.log('onChange', index, tab); }}
                onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
              >
                <View style={{ height: 400, padding: 10 }}>
                  {this.renderMealList(mealList)}
                </View>
                <View style={{ height: 400 }}>
                  <Text>Content of tow Tab</Text>
                </View>
              </Tabs>
            </Flex>
            <Flex style={[{ marginTop: 10, backgroundColor: '#fff' }, styles.basePadding]}>
              <TouchableHighlight onPress={this.toggleDetailInfosFun.bind(this, true)}>
                <Flex direction="row" justify='between' align="center">
                  <Text>产品参数</Text>
                </Flex>
              </TouchableHighlight>
            </Flex>
            <Flex direction='column' style={{ backgroundColor: '#fff' }}>
              <View>
                <Text>图文详情</Text>
              </View>
              <View style={styles.photoDetail}>
                {this.renderDetailImage(productDetail.photoList)}
              </View>
            </Flex>
          </View>
          {/* {isShowPackage && (
            <Flex>

            </Flex>
          )} */}

        </ScrollView>
        <View style={[styles.paybarStyle]}>
          <PayBar 
            goToPay={this.goToPayFun}
            data={lastPrice} />
        </View>
        
        <ActionSheet
          ref={o => this.ActionSheet = o}
          title={'选择套餐'}
          options={this.renderSelectCombo}
          cancelButtonIndex={2}
          destructiveButtonIndex={1}
          onPress={(index) => { /* do something */ }}
        />
      </Flex>
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
  paybarStyle:{
    width: '100%',
    position:'absolute',
    bottom: 0
  },
  basePadding: {
    ...contentPadding,
    paddingVertical: 8
  },
  mealItemStyle: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f2f2f2',
    borderRadius: 5,
    padding: 10
  }
});
