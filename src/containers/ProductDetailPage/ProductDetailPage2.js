import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, TouchableHighlight, Dimensions, AsyncStorage } from 'react-native'
import { Button, Carousel, List, Flex, Tabs, Modal, Popover } from 'antd-mobile-rn';
import { ProductDetailPage_mock } from '../../mock/ProductDetailPage'
import { flexRow, contentPadding, mainGray, mainPink } from '../../styles/common'
import Color from '../../styles/var'
import Collect from '../../components/Collect'
import SelectedListHoc from '../../components/SelectedList'
import NumberSelect from '../../components/NumberSelect'
import PayBar from '../../components/PayBar'
import ActionSheet from 'react-native-actionsheet'
import api from '../.././service/api'
const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
import RentApp from "../../components/RentApp";
const { queryGoodsDetail, HTTP_IMG, commitOrder, collectGoods } = api
// const PRODUCT_ID = '201802241102330510355414'

const storageItem = ({ data, itemData, onPress, subSkuId }) => {
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

// activeCode

export default class ProductDetailPage extends RentApp {
  state = {
    productDetail: {},
    isShowPackage: false,
    isShowDetailInfos: false,
    lastPrice: 0,
    skuDetailList:[],
    photoList: [],
    productId: '',
    goodsBaseInfo:{
      "goodsId": "201802241102330510355414",
      "goodsName": "OPPO R9S 128G版",
      "goodsDesc": "OPPO R9S",
      "goodsBrand": "OPPO",
      "goodsModel": "OPPO R9S",
      "goodsImgPath": "goods/20180226/201802261340332840248210.png",
      "goodsConfigType": 1,
      "category": "1",
      "collectStatus": "0",
      "goodsDetailText": "<p>OPPO R9S 128G版</p>",
      "goodsPrice": 2000,
      "activeId": "6da93d6aab194e48bd5b4f214b752638",
      "activeCode": "gz-rent-phone",
      "downPayment": 2000
    },
    goodsAfterInfo:{},
    skuGroupList:[],
    singleList:[],
    mixList:[],
    count: 0,
    capacityId:'',
    colorId:'',
    selectMeal:{
      mealId: 0,
      mealPrice: 0,
      mealText: '请选择套餐'
    },
    showInstallment:false,
    showNotCredit: false,
    installmentInfo:{},
    capitalProdList:[],
    userInfos:{},
    paymentInfo:{},
    capitalProdId:'',
    telecomProdList:[],
    capitalProdObj:{},
    // selectedCapitalProd:{
    //   text: '请选择分期'
    // }
    stageProdObj:{
      text: '请选择分期'
    },
    selectedStageProd:{

    }
  }
  async componentDidMount() {
    const productId = this.props.navigation.getParam('productId');
    await this.getOpenIdAndUserId()
    let user = await AsyncStorage.getItem('userInfo')
    user = { ...JSON.parse(user) }
    console.log(user,"====>缓存中读取的userInfo")
    this.setState({
      userInfos: user,
      productId
    })

    try {
      const { data: queryGoodsDetailData } = await queryGoodsDetail({
        provinceCode: this.provinceCode,
        cityCode: this.cityCode,
        goodsId: productId,
        userId: user.userId
      })
      console.log(JSON.stringify(queryGoodsDetailData),"mmmmmm")

      if (!queryGoodsDetailData) return false

      const { 
        photoList, 
        telecomProdList, 
        skuDetailList, 
        capitalProdList, 
        maxAvailAmount, 
        mealList, 
        bizTypeCode, 
        isCapitalConf, 
        goodsBaseInfo, 
        isTelConf, 
        insureList, 
        skuGroupList, 
        paymentInfo 
      } = queryGoodsDetailData
      const singleList = [];
      const mixList = []
      mealList.forEach(element => {
        if (element.mealType == 1) {
          singleList.push(element)
        } else if (element.mealType == 2) {
          mixList.push(element)
        }
        // 1 - 单产品套餐；2 - 融合套餐 initPayment
      });
    
      this.setState({
        photoList,
        goodsBaseInfo,
        skuGroupList,
        singleList,
        mixList,
        skuDetailList,
        capitalProdList, // 分期
        paymentInfo,
        telecomProdList,
      })
    } catch (error) {
      this.showToast(error)
      // console.error(error)
    }
  }
  showActionSheet = () => {
    this.ActionSheet.show()
  }

  renderImage = (data) => {
    if (!data || !(data instanceof Array)) return false

    return data.map((item, index) => {
        return (
          <View key={item.photoId || index} style={[styles.containerHorizontal]}>
            <Image 
              resizeMode="stretch"
              style={{ width: WIDTH, height: WIDTH }}
              source={{ uri: `${HTTP_IMG}${item.photoPath}` }}
              />
          </View>
      )
    })
  }

  renderDetailImage = (data) => {
    if (!data || !(data instanceof Array)) return false
    return data.map((item, index) => {
      return (
        <View key={item.photoId || index} style={[{ backgroundColor: '#fff' }]}>
          <Image
            resizeMode="center"
            style={{ width: WIDTH, height: WIDTH }}
            source={{ uri: `${HTTP_IMG}${item.photoPath}` }}
          />
        </View>
      )
    })
  }

  selectMealFun = (item) => {
    this.setState({
      selectMeal: {
        mealId: item.mealId,
        mealText: item.mealName,
        mealPrice: item.mealPrice
      },
    })
  }
  renderMealList = (data) => {
    // debugger
    if (!data || !(data instanceof Array)) return false
    const { selectMeal } = this.state
    const selectMealStyle={
      borderWidth: 1,
      borderColor: Color.mainPink
    }
    
    return data.map((item, index) => {
      const boxStyle = [styles.mealItemStyle, { marginTop: 10 }]
      if (item.mealId === selectMeal.mealId) {
        boxStyle.push(selectMealStyle)
      }
      return (
        <TouchableOpacity style={boxStyle} key={item.photoId || index} onPress={this.selectMealFun.bind(this, item)}>
          <Flex>
            <Flex.Item>
              <Text>
                {item.mealName}
              </Text>
              <Text>
                {item.mealDesc}
              </Text>
            </Flex.Item>
          </Flex>
        </TouchableOpacity>
        
      )
    })
  }

  renderSelectCombo = () => {

  }

  selectedFun = (subSkuId, type) => {
    this.setState({ [type]: subSkuId })
  }
  togglePackageFun = (isShow) => {
    this.setState({
      isShowPackage: isShow
    })
  }
  toggleInstallmentFun = async (isShow) => {
    if (!"没有授信") {
      this.setState({
        showNotCredit: true
      })
    } else{
      this.setState({
        showInstallment: isShow
      })
    }
  }
  toggleDetailInfosFun = (isShow) => {
    const { navigate } = this.props.navigation;
    navigate('ProductParameterPage', {})
    // this.setState({
    //   isShowDetailInfos: isShow
    // })
  }
  // 分期
  selectedStageFun = () =>{
    let { goodsBaseInfo, selectMeal } = this.state
    const num = this.computPrice(item)
    this.setState({
      stageProdObj: item,
      selectedStageProd: {
        stagePrice: num,
        prodId: item.prodId,
        text: item.prodName
      },
    })
  }
  // 确认分期
  selectedStageFunSure = () => {
    let { goodsBaseInfo, selectMeal } = this.state
    const num = this.computPrice(stageProdObj)
    this.setState({
      selectedstSgeProd: {
        stagePrice: num,
        prodId: stageProdObj.prodId,
        text: stageProdObj.prodName
      },
      showInstallment: false
    })
  }

  goToPayFun = async () => {
    const { 
      selectMeal, goodsBaseInfo, capacityId, colorId,telecomProdList,
      paymentInfo, capitalProdId, userInfos, capitalProdObj, skuDetailList 
    } = this.state

    let goodsSkuId = ''
    skuDetailList.filter((item) => {
      // return 
      const unionId = JSON.parse(item.skuJsonStr).unionId
      if (unionId.indexOf(capacityId) !== -1 && unionId.indexOf(colorId) !== -1 ) {
        goodsSkuId = item.skuId
      }
    })

    var goodsInfoJson = {
      totalStageAmount: selectMeal.mealPrice + goodsBaseInfo.goodsPrice,
      monthRate: capitalProdObj.monthFee,
      periods: capitalProdObj.periods,
      poundgeRate: capitalProdObj.poundgeRate,
      goodsId: goodsBaseInfo.goodsId,
      goodsSkuId,
      goodsFirstAmount: goodsBaseInfo.downPayment,
      teleFirstAmount: telecomProdList && telecomProdList.initPayment
    }

    const mealInfoJson = JSON.stringify({
      mealId: selectMeal.mealId
    })
    const capitalInfoJson = JSON.stringify({
      prodId: capitalProdId
    })

    // goodsInfoJson = JSON.stringify(goodsInfoJson)
    const params = {
      "openId": this.openId,
      "provinceCode": this.provinceCode,
      "cityCode": this.cityCode,
      "orderType": "1",
      // "userInfoJson": "{\"userId\":\"201808241044425400117198\",\"phoneNo\":\"18316579205\",\"userName\":\"邓夏宁\",\"idCardNo\":\"440883199305105071\",\"creditScore\":\"700\",\"maxAvailAmount\":3000}",
      userInfoJson: JSON.stringify(userInfos),
      // "goodsInfoJson": "{\"goodsFirstAmount\":0,\"totalStageAmount\":0,\"monthRate\":0.005,\"periods\":24,\"teleFirstAmount\":0,\"poundgeRate\":0,\"goodsSkuId\":\"201809071024544610527721\",\"goodsId\":\"201807191523324900507633\"}",
      goodsInfoJson: JSON.stringify(goodsInfoJson),
      mealInfoJson,
      capitalInfoJson,
      "insureJson": "[]",
      "activeId": goodsBaseInfo.activeId,
      "paymentId": paymentInfo.paymentId,
      "sourceType": 2
    }
    console.log(JSON.stringify(params),"params=>>>>>>>GGGGGGGGGG")
    try {
      const { data } = await commitOrder(params)
      console.log(data,"=========》data")
      if (data.errcode !== 1 && data.errmsg) {
        this.showToast(data.errmsg) 
        return false
      }
      console.log(data, "===========>")
    } catch (error) {
      
    }
  }
  onClosesNotCredit = () => {
    this.setState({
      showNotCredit: false
    })
  }
  tollectCollectFun = async (status) => {
    try {
      const { openId, cityCode, userId, provinceCode} = this
      const { productId } = this.state
      const { data } = await collectGoods({
        goodsId: productId,
        cityCode,
        userId,
        provinceCode,
      })
      if (data.errcode === 1) {
        this.showToast(data.errmsg)
        this.setState({
          collectStatus: data.status
        })
      }
      // else { console.error(data.errmsg) }
    } catch (error) {
      console.error(error,"!!!")
    }
  }
  // // 选择分期套餐
  // selecteCapitalProd = (item) => {
  //   debugger
  //   let { goodsBaseInfo, selectMeal } = this.state
  //   const num = this.computPrice(item)
  //   this.setState({
  //     capitalProdObj: item,
  //     selectedCapitalProd: {
  //       capitalPrice: num,
  //       prodId: item.prodId,
  //       text: item.prodName
  //     },
  //   })
  // }
  // 确认选择分期套餐
  // selecteCapitalProdSure = (capitalProdObj) => {
  //   let { goodsBaseInfo, selectMeal } = this.state
  //   const num = this.computPrice(capitalProdObj)
  //   this.setState({
  //     selectedCapitalProd: {
  //       capitalPrice: num,
  //       prodId: capitalProdObj.prodId,
  //       text: capitalProdObj.prodName
  //     },
  //     showInstallment: false
  //   })
  // }
  computPrice = (data) => {
    const { goodsBaseInfo: { goodsPrice }, telecomProdList } = this.state
    const { price } = telecomProdList[0]
    const { monthFee, periods } = data
    const num = (goodsPrice * (1 + monthFee * periods) + price) / periods
    // return `${num.toFixed(2)} x ${periods}期`
    return num.toFixed(2)
  }
  renderCapitalProdList = (capitalProdList) => {
    const { capitalProdObj } = this.state
    
    return capitalProdList.map((item, index) => {
      return (
        <TouchableOpacity key={index} style={{ width: '100%' }} onPress={this.selectedStageFun.bind(this, item)}>
          <Flex style={{ width: '100%', paddingVertical: 15, borderBottomColor: '#f6f6f6', borderBottomWidth: 1 }} direction="row" justify="start" align="center">
            <Text style={{ backgroundColor: item.prodId === capitalProdObj.prodId  ? Color.mainPink : '#fff', width: 14, height: 14, marginRight: 10, borderWidth: 2, borderColor: '#ccc', borderRadius: 7, overflow: 'hidden' }}></Text>
            <Text>{this.computPrice(item)} x {item.periods}期</Text>
            <Text>{item.prodDesc}</Text>
          </Flex>
        </TouchableOpacity>
      )
    })
  }

  render() {
    const { 
      photoList, goodsBaseInfo, skuGroupList, userInfos,
      singleList, mixList, lastPrice, count, isShowPackage, selectMeal,
      showInstallment, installmentInfo, capitalProdList, selectedStageProd 
      } = this.state
    // console.log(selectMealId,"hhhhhhhhhh")
    if (!photoList) return false
    const { goodsName, goodsDesc, goodsDetailText, collectStatus, goodsPrice } = goodsBaseInfo || {}
    return (
      <Flex style={{ position: 'relative', width: '100%' }} direction="column">
        <ScrollView
          style={{width: '100%', backgroundColor: '#fff'}}
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
              {this.renderImage(photoList)}
            </Carousel>
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.infoStyle}>
              <Text style={[]}>{goodsName} {goodsDesc}</Text>
              <View style={styles.btnBox}>
                <Text style={[{ color: Color.mainPink }, { fontWeight: '600' }]}>￥ {goodsPrice}</Text>
                <View>
                  <Collect
                    onTollectCollect={this.tollectCollectFun}
                    collectStatus={collectStatus || 0}
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
                }}>容量</Text>
                <View style={{ marginLeft: 10 }}>
                  <SelectedROMList
                    data={skuGroupList[0] ? skuGroupList[0].subSkuList : []} 
                    onPress={this.selectedFun.bind(this, 'capacityId')}
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
                }}> 颜色</Text>
                <View>
                  <SelectedColorList
                    data={skuGroupList[1] ? skuGroupList[1].subSkuList : []} 
                    onPress={this.selectedFun.bind(this, 'colorId')}
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
            </Flex>
            <TouchableOpacity onPress={this.togglePackageFun.bind(this, true)}>
              <Flex style={[contentPadding, { backgroundColor: '#fff', marginBottom: 1 }]} direction='row' justify='between' align='center' >
                <Flex.Item style={{ flex: 0, paddingVertical: 14, paddingRight: 10 }}>
                  <Text>套餐</Text>
                </Flex.Item>
                <Flex.Item>
                  <Flex direction="row" justify='between' align="center">
                    <Text style={{ color: '#f2f2f2' }}>{selectMeal.mealText}</Text>
                    <Text>></Text>
                  </Flex>
                </Flex.Item>
              </Flex>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.toggleInstallmentFun.bind(this, true)}>
              <Flex style={[contentPadding, { backgroundColor: '#fff' }]} direction='row' justify='between' align='center' >
                <Flex.Item style={{ flex: 0, paddingVertical: 14, paddingRight: 10 }}>
                  <Text>分期</Text>
                </Flex.Item>
                <Flex.Item>
                  <Flex direction="row" justify='between' align="center">
                    <Text style={{ color: '#f2f2f2' }}>{selectedCapitalProd.text}</Text>
                    <Text>></Text>
                  </Flex>
                </Flex.Item>
              </Flex>
            </TouchableOpacity>
            <Flex style={[{ marginTop: 10, backgroundColor: '#fff' }, styles.basePadding]}>
              <TouchableOpacity onPress={this.toggleDetailInfosFun.bind(this, true)}>
                <Flex direction="row" justify='between' align="center">
                  <Text>产品参数</Text>
                </Flex>
              </TouchableOpacity>
            </Flex>
            <Flex direction='column' style={{ backgroundColor: '#fff' }}>
              <View>
                <Text>图文详情</Text>
              </View>
              <View style={styles.photoDetail}>
                {this.renderDetailImage(photoList)}
              </View>
            </Flex>
          </View>

        </ScrollView>
        <View style={[styles.paybarStyle]}>
          <PayBar
            goToPay={this.goToPayFun}
            data={lastPrice} />
        </View>
        <Modal
          popup
          maskClosable={true}
          onClose={() => { this.setState({ isShowPackage: false }) }}
          visible={isShowPackage}
          // onClose={this.onClose('modal2')}
          animationType="slide-up"
        >
          <Flex style={{ backgroundColor: '#fff', marginTop: 10, paddingHorizontal: 10 }}>
            <Tabs tabs={tabs}
              initialPage={1}
              // onChange={(tab, index) => { console.log('onChange', index, tab); }}
              // onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
            >
              <View style={{ height: 400, padding: 10, position: 'relative' }}>
                <ScrollView style={{height: 350}}>
                  {this.renderMealList(mixList)}  
                </ScrollView>
                <Flex style={styles.mealBtnBox}>
                  <TouchableOpacity 
                    style={{ padding: 14, backgroundColor: Color.mainPink, width: '100%'}}
                    onPress={() => this.selecteCapitalProdSure(this.state.capitalProdObj) }>
                    <Text style={{ color: '#fff', textAlign: "center" }}>确定</Text>
                  </TouchableOpacity>
                </Flex>
              </View>
              <View style={{ height: 400 }}>
                {this.renderMealList(singleList)}
                <TouchableOpacity 
                  style={{ padding: 20, backgroundColor: Color.mainPink, width: '100%'}}
                  onPress={() => this.selecteCapitalProdSure(this.state.capitalProdObj) }>
                  <Text style={{ color: '#fff', textAlign: "center" }}>确定</Text>
                </TouchableOpacity>
              </View>
            </Tabs>
          </Flex>
        </Modal>
        <Modal
          visible={this.state.showNotCredit}
          transparent
          maskClosable={false}
          // onClose={this.onClose('modal1')}
          // title="Title"
          footer={[{ text: 'Ok', onPress: () => { this.onClosesNotCredit() } }]}
          // wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
          <Text>还没有授信，是否立刻去授信</Text>
        </Modal>
        <Modal
          popup
          maskClosable={true}
          onClose={() => { this.setState({ showInstallment: false }) }}
          visible={showInstallment}
          // onClose={this.onClose('modal2')}
          animationType="slide-up"
        >
          <Flex direction="column" style={{ backgroundColor: '#fff', marginTop: 10, height: 400 }}>
            <Flex justify="start" style={{ paddingBottom: 20, paddingHorizontal: 30, marginTop: 30 ,width: '100%', borderBottomWidth: 1, borderColor: '#f2f2f2'}}>
              <Text>分期金额：</Text><Text>{selectedCapitalProd.capitalPrice} 元</Text>
            </Flex>
            <Flex style={{ flex: 1, width: '100%', paddingHorizontal: 30}} direction="column" justify="start">
              {this.renderCapitalProdList(capitalProdList)}
            </Flex>
            <Flex>
              {/* <TouchableOpacity 
                style={{ padding: 20, backgroundColor: Color.mainPink, width: '100%'}}
                onPress={() => this.selecteCapitalProdSure(this.state.capitalProdObj) }>
                <Text style={{ color: '#fff', textAlign: "center" }}>确定</Text>
              </TouchableOpacity> */}
            </Flex>
          </Flex>
        </Modal>
        
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
  canSelectedBox: {
    marginBottom: 1
  },
  btnBox: {
    marginTop: 15,
    ...flexRow,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  wrapper: {
    // height: 150
  },
  photoDetail: {

  },
  mealBtnBox: {
    position: 'absolute',
    width: '100%',
    bottom: 20
  },
  containerHorizontal: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 400,
  },
  paybarStyle: {
    width: '100%',
    position: 'absolute',
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