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
import EasyModal from './components/EasyModal'
import { authAppSecret } from '../../config'
const { queryGoodsDetail, HTTP_IMG, commitOrder, collectGoods, payment } = api
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
  { title: '电信套餐', sub: '1' },
  // { title: '单产品套餐', sub: '2' },
];

export default class ProductDetailPage extends RentApp {
  state = {
    photoList:[], // 图片列表
    telecomProdList:[], // 电信套餐列表
    skuDetailList:[], // 产品sku列表
    capitalProdList:[], // 分期列表
    disposeCapitalProdList:[], // 
    maxAvailAmount: 0, // 最大额度
    goodsBaseInfo: {}, // 商品基本信息
    isTelConf: false, // 是否配置电信产品
    insureList:[], // 保险列表
    skuGroupList:[], // sku分组列表
    paymentInfo:{}, //  接口返回的支付信息
    computedPaymentInfo:{},
    mealSelected: {}, //用户选择的套餐；
    capitalProdSelected:{}, // 已选择分期
    isShowPackage: false, // 套餐窗口的展示
    isShowCapital: false, // 分期窗口
    productId: '',  // 产品id
    collectStatus: 0,
    userInfos:{}, // 用户信息
    showNotCredit:false,
    capacityId: '', // 已选择的内存skuId
    colorId: '', // 已选择的颜色skuId
    isShowBindCard: false,
    isShowEasyModal: false,
    EasyModalInfos:{},
  }
  async componentDidMount() {
    // '201807191036353330096584' || 
    const productId = "201807191036353330096584" || this.props.navigation.getParam('productId');
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
        userId: user.userId || authAppSecret
      })
      // console.log(queryGoodsDetailData, "mmmmmmmmmm")
      if (!queryGoodsDetailData || queryGoodsDetailData.errcode !==1 ) {
        throw queryGoodsDetailData.errmsg ||  "queryGoodsDetailData 获取数据失败"
        return 
      }

      this.handleDataFun(queryGoodsDetailData)

    } catch (error) {
      this.showToast(error)
    }
  }
  handleDataFun = (data) => {
    // console.log(JSON.stringify(data))
    const { 
      photoList, // 图片列表
      telecomProdList, // 电信套餐列表
      skuDetailList, // 产品sku列表
      capitalProdList, // 分期列表
      maxAvailAmount, // 最大额度
      goodsBaseInfo, // 商品基本信息
      isTelConf, // 是否配置电信产品
      insureList, // 保险列表
      skuGroupList, // sku分组列表
      paymentInfo, //  参数返回的支付信息
      bizTypeCode, // 业务类型编码
    } = data
    
    // if(res.data.capitalMealProdList != null && res.data.capitalMealProdList != '' && res.data.capitalMealProdList != 'undefined' ){
    //   that.goodsConfigType = 2;
    // }

    // const singleList = [];
    // const mixList = []
    // telecomProdList.forEach(element => {
    //   if (element.mealType == 1) {
    //     singleList.push(element)
    //   } else if (element.mealType == 2) {
    //     mixList.push(element)
    //   }
    //   // 1 - 单产品套餐；2 - 融合套餐 initPayment
    // });
    const mealSelected = telecomProdList[0]
    if(bizTypeCode == 'zq_rent_phone'){
      if(isTelConf == 1){
        mealSelected.selectMealIndex = 0	//套餐选中的列

        // const canStageAmount = (goodsBaseInfo.goodsPrice + packagePrice - this.state.realDownPayment).toFixed(2);  //设置可分期金额

        this.setState({
          mealSelected: telecomProdList[0],
          // canStageAmount:  (goodsBaseInfo.goodsPrice + telecomProdList[0].price - this.state.realDownPayment).toFixed(2)
        })
      }
    }
    // capitalProdList
    const disposeCapitalProdList =  capitalProdList.map((item, index) => {
      let sum = goodsBaseInfo.goodsPrice * (1 + item.monthFee * item.periods) + mealSelected.price;
      const monthPay = (sum / item.periods).toFixed(2);
      return { ...item, monthPay, sum}
    })

    this.setState({
      photoList, // 图片列表
      telecomProdList, // 电信套餐列表
      skuDetailList, // 产品sku列表
      capitalProdList, // 分期列表
      disposeCapitalProdList, // 处理后的分期列表
      maxAvailAmount, // 最大额度
      goodsBaseInfo, // 商品基本信息
      isTelConf, // 是否配置电信产品
      insureList, // 保险列表
      skuGroupList, // sku分组列表
      paymentInfo, //  支付信息
      bizTypeCode
    })
  }

  selectMealFun = (data) => {
    this.setState({
      mealSelected: data,
      isShowPackage: false
    })
  }


  // 渲染套餐
  renderMealList = (data) => {
    if (!data || !(data instanceof Array)) return false

    const { mealSelected } = this.state
    const selectMealStyle={
      borderWidth: 1,
      borderColor: Color.mainPink
    }
    
    return data.map((item, index) => {
      const boxStyle = [styles.mealItemStyle, { marginTop: 10 }]
      if (item.prodCode === mealSelected.prodCode) {
        boxStyle.push(selectMealStyle)
      }
      return (
        <TouchableOpacity style={boxStyle} key={item.prodCode || index} onPress={this.selectMealFun.bind(this, item)}>
          <Flex>
            <Flex.Item>
              <Text>
                {item.prodName}
              </Text>
              <Text>
                {item.prodDesc}
              </Text>
            </Flex.Item>
          </Flex>
        </TouchableOpacity>
        
      )
    })
  }

  // 渲染分期 
  renderCapitalProdList = (disposeCapitalProdList) => {

    const { capitalProdSelected, goodsBaseInfo, mealSelected } = this.state
    
    return disposeCapitalProdList.map((item, index) => {
      // var obj = Object.assign({}, item, { monthPay: monthPay.toFixed(2), downPayment: 0, defaultIndex: index });
      return (
        <TouchableOpacity key={index} style={{ width: '100%' }} onPress={this.selectedCapitalProdFun.bind(this, item)}>
          <Flex style={{ width: '100%', paddingVertical: 15, borderBottomColor: '#f6f6f6', borderBottomWidth: 1 }} direction="row" justify="start" align="center">
            <Text style={{ backgroundColor: item.prodId === capitalProdSelected.prodId  ? Color.mainPink : '#fff', width: 14, height: 14, marginRight: 10, borderWidth: 2, borderColor: '#ccc', borderRadius: 7, overflow: 'hidden' }}></Text>
            <Text>{item.monthPay} x {item.periods}期</Text>
            <Text>{item.prodDesc}</Text>
          </Flex>
        </TouchableOpacity>
      )
    })
  }

  capacityId_color_fun = (type, subSkuId ) => {  // 选择内存和颜色的方法
    if (this.state[type]) {
      this.setState({ [type]: '' })
    }else{
      this.setState({ [type]: subSkuId })
    }
  
  }

  check = async () => {
    try {
      const { userInfos } = this.state
      // var isBinding = userInfos.isBinding;
      var isCredited = userInfos.isCredited;
      // await AsyncStorage.multiSet([['userId', userInfo.userId], ['openId', userInfo.openId], ['isLoggedIn', '1']])
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn')


      if (isLoggedIn !== "1") {
        this.setState({
          isShowEasyModal: true,
          EasyModalInfos: {
            title: '提示',
            text: '您还没登录，是否立即登录?',
            toPage: "LoginPage"
          }
        })
        return false;
      } else if (isCredited === 0) {
        this.setState({
          isShowEasyModal: true,
          EasyModalInfos: {
            title: '提示',
            text: '您还没授信，是否立即授信?',
            toPage: "AuthApplyPage"
          }
        })
        return false;
      }
      return true
    } catch (error) {
    }
  }
  // 选择分期产品
  selectedCapitalProdFun = (data) => {
    this.setState({
      capitalProdSelected: data,
      isShowCapital: false
    })
  }

  // 展示关闭套餐选择
  togglePackageFun = (isShow) => {
    this.setState({
      isShowPackage: isShow
    })
  }

  // 展示关闭分期选择
  toggleCapitalFun = async (isShow) => {
    // console.log(await this.check(),"this.check()")
    if (! await this.check()) {
      return false
    }
    this.setState({
      isShowCapital: isShow
    })
  }

  // 展示关闭详细数据
  toggleDetailInfosFun = () => {
    
  }

  // 收藏状态切换
  toggleCollectFun = async () => {
    try {
      const { cityCode, userId, provinceCode} = this
      const { productId, goodsBaseInfo } = this.state
      const { data } = await collectGoods({
        goodsId: productId,
        cityCode,
        userId,
        provinceCode,
      })
      this.showToast(data.errmsg)
      this.setState({
        goodsBaseInfo: {...goodsBaseInfo, collectStatus: data.status  }
      })
    } catch (error) {
      console.error(error,"!!!")
    }
  }

  // 下单支付
  goToPayFun = async () => {
    const { openId, provinceCode, cityCode, userId } = this
    const {
      productId,
      userInfos,
      computedPaymentInfo,
      paymentInfo,
      capitalProdSelected,
      mealSelected,
      goodsBaseInfo,
      skuDetailList,
      capacityId,
      colorId,
    } = this.state


    //绑卡判断
    if ( capitalProdSelected && capitalProdSelected.isCreditCard == 1 && userInfos.isCreditCard == 0) {
      //需要绑卡并且还没有绑卡
      this.setState({
        isShowBindCard: true
      })
      return false
    }
    // 判断是否选择套餐了
    if (!capitalProdSelected.sum) {
      this.showToast('请选择套餐')
    }
    
    // 根据颜色 内存容量确定机器
    let goodsSkuId = ''
    skuDetailList.filter((item) => {
      const unionId = JSON.parse(item.skuJsonStr).unionId
      if (unionId.indexOf(capacityId) !== -1 && unionId.indexOf(colorId) !== -1) {
        goodsSkuId = item.skuId
      }
    })  
    console.log(goodsSkuId,"===========>goodsSkuId")


    var options = {};
    var _userInfo = {
      userId,
      phoneNo: userInfos.phoneNo,
      userName: userInfos.userName,
      idCardNo: userInfos.idCardNo,
      creditScore: userInfos.creditScore,
      maxAvailAmount: userInfos.maxAvailAmount,
    }
    const userInfoJson = JSON.stringify(_userInfo);

    var _goodsInfo = {
      // goodsFirstAmount: 
      totalStageAmount: capitalProdSelected.sum,
      monthRate: capitalProdSelected.monthFee,
      periods: capitalProdSelected.periods,
      teleFirstAmount: 0,
      poundgeRate: capitalProdSelected.poundgeRate,
      goodsSkuId: goodsSkuId,
      goodsId: goodsBaseInfo.goodsId
    };
    const goodsInfoJson = JSON.stringify(_goodsInfo)

    // 套餐选择
    var _mealInfo = {}
    
    _mealInfo["mealId"] = mealSelected.prodId;//套餐价格与电信套餐价格的区别；
    const mealInfoJson = JSON.stringify(_mealInfo);

    // 金融分期产品
    var _capitalInfo = {}
    _capitalInfo.prodId = capitalProdSelected.prodId
    const capitalInfoJson = JSON.stringify(_capitalInfo);
  
    const params = {
      "openId": this.openId,
      "provinceCode": this.provinceCode,
      "cityCode": this.cityCode,
      "orderType": goodsBaseInfo.category,
      userInfoJson,
      goodsInfoJson,
      mealInfoJson,
      capitalInfoJson,
      "insureJson": "[]",
      "activeId": goodsBaseInfo.activeId,
      "paymentId": paymentInfo.paymentId,
      // "sourceType": 2
    }
    try {
      const { data } = await commitOrder(params)
      console.log(data,"=========》data")
      if (data.errcode !== 1 && data.errmsg) {
        this.showToast(data.errmsg) 
        return false
      } else if (data.errcode === 1 ) {
        this.showToast(data.errmsg)
        await AsyncStorage.setItem('pastDueTime', JSON.stringify((+new Date()) + 1800000))
        const { navigate } = this.props.navigation;
        navigate('Pay', { 
          amount: 0,
          orderId: data.orderId,
          orderSn: data.orderSn,
          activeId: goodsBaseInfo.activeId
          // firstPay: data.firstPay
         })
      }

    } catch (error) {
      
    }
  }
  bindCardFun = () => {

  }

  render() {
    const that = this
    const footerButtons = [
        { text: '取消', onPress: () => {
            this.setState({ isShowEasyModal: false})
        }
      },
      { text: '确定', onPress: () => {
        that.props.navigation.navigate(EasyModalInfos.toPage)
        this.setState({ isShowEasyModal: false })
      }},
    ];
  
    const { 
      photoList, // 图片列表
      telecomProdList, // 电信套餐列表
      skuDetailList, // 产品sku列表
      capitalProdList, // 分期列表
      disposeCapitalProdList,
      maxAvailAmount, // 最大额度
      goodsBaseInfo, // 商品基本信息
      isTelConf, // 是否配置电信产品
      insureList, // 保险列表
      skuGroupList, // sku分组列表
      paymentInfo, //  支付信息
      computedPaymentInfo,
      mealSelected,
      capitalProdSelected,
      isShowPackage,
      isShowCapital,
      showNotCredit,
      EasyModalInfos,
      isShowEasyModal
      
    } = this.state
      if (!photoList) return false
    const { goodsName, goodsDesc, goodsDetailText, goodsPrice } = goodsBaseInfo || {}
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
              {_renderImage(photoList)}
            </Carousel>
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.infoStyle}>
              <Text style={[]}>{goodsName} {goodsDesc}</Text>
              <View style={styles.btnBox}>
                <Text style={[{ color: Color.mainPink }, { fontWeight: '600' }]}>￥ {goodsPrice}</Text>
                <View>
                  <Collect
                    onTollectCollect={this.toggleCollectFun}
                    collectStatus={goodsBaseInfo.collectStatus || 0}
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
                    onPress={this.capacityId_color_fun.bind(this, 'capacityId')}
                  />
                </View>
              </View>
            </View>
            {
              skuGroupList[1] && (
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
                        data={skuGroupList[1].subSkuList}
                        onPress={this.capacityId_color_fun.bind(this, 'colorId')}
                      />
                    </View>
                  </View>
                </View>
              )}
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
                    <Text style={{ color: '#ccc' }}>{mealSelected.prodName}</Text>
                    <Text>></Text>
                  </Flex>
                </Flex.Item>
              </Flex>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.toggleCapitalFun.bind(this, true)}>
              <Flex style={[contentPadding, { backgroundColor: '#fff' }]} direction='row' justify='between' align='center' >
                <Flex.Item style={{ flex: 0, paddingVertical: 14, paddingRight: 10 }}>
                  <Text>分期</Text>
                </Flex.Item>
                <Flex.Item>
                  <Flex direction="row" justify='between' align="center">
                    <Text style={{ color: '#ccc' }}>{capitalProdSelected.prodName}</Text>
                    {/* {console.log(capitalProdSelected,"!!!!!")} */}
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
                {renderDetailImage(photoList)}
              </View>
            </Flex>
          </View>
        </ScrollView>
        <View style={[styles.paybarStyle]}>
          <PayBar
            goToPay={this.goToPayFun}
            data={0} />
        </View>
        <Modal
          popup
          maskClosable={true}
          onClose={() => { this.setState({ isShowPackage: false }) }}
          visible={isShowPackage}
          animationType="slide-up"
        >
          <Flex style={{ backgroundColor: '#fff', marginTop: 10, paddingHorizontal: 10 }}>
            <Tabs tabs={tabs} initialPage={0}>
              <View style={{ height: 400, padding: 10, position: 'relative' }}>
                <ScrollView style={{height: 350}}>
                  {this.renderMealList(telecomProdList)}  
                </ScrollView>
                {/* <Flex style={styles.mealBtnBox}>
                  <TouchableOpacity 
                    style={{ padding: 14, backgroundColor: Color.mainPink, width: '100%'}}
                    onPress={() => this.selecteCapitalProdSure(this.state.capitalProdObj) }>
                    <Text style={{ color: '#fff', textAlign: "center" }}>确定</Text>
                  </TouchableOpacity>
                </Flex> */}
              </View>
            </Tabs>
          </Flex>
        </Modal>
        <Modal
          popup
          maskClosable={true}
          onClose={() => { this.setState({ isShowPackage: false }) }}
          visible={isShowPackage}
          animationType="slide-up"
        >
          <Flex style={{ backgroundColor: '#fff', marginTop: 10, paddingHorizontal: 10 }}>
            <Tabs tabs={tabs} initialPage={0}>
              <View style={{ height: 400, padding: 10, position: 'relative' }}>
                <ScrollView style={{height: 350}}>
                  {this.renderMealList(telecomProdList)}  
                </ScrollView>
                {/* <Flex style={styles.mealBtnBox}>
                  <TouchableOpacity 
                    style={{ padding: 14, backgroundColor: Color.mainPink, width: '100%'}}
                    onPress={() => this.selecteCapitalProdSure(this.state.capitalProdObj) }>
                    <Text style={{ color: '#fff', textAlign: "center" }}>确定</Text>
                  </TouchableOpacity>
                </Flex> */}
              </View>
            </Tabs>
          </Flex>
        </Modal>
        <Modal
          visible={showNotCredit}
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
          onClose={() => { this.setState({ isShowCapital: false }) }}
          visible={isShowCapital}
          animationType="slide-up"
        >
          <Flex direction="column" style={{ backgroundColor: '#fff', marginTop: 10, height: 400 }}>
            <Flex justify="start" style={{ paddingBottom: 20, paddingHorizontal: 30, marginTop: 30 ,width: '100%', borderBottomWidth: 1, borderColor: '#f2f2f2'}}>
              <Text>分期金额：</Text><Text>{capitalProdSelected.sum} 元</Text>
            </Flex>
            <Flex style={{ flex: 1, width: '100%', paddingHorizontal: 30}} direction="column" justify="start">
              {this.renderCapitalProdList(disposeCapitalProdList)}
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
        <Modal
          title="提示"
          transparent
          onClose={this.bindCardFun}
          maskClosable
          visible={this.state.isShowBindCard}
          closable
          footer={footerButtons}
        >
          <View style={{ paddingVertical: 20 }}>
            <Text style={{ textAlign: 'center' }}>您还绑定银行卡，是否立即绑定?</Text>t>
          </View>
        </Modal>
        <Modal
          title="提示"
          transparent
          onClose={() => this.setState({ isShowEasyModal: false})}
          maskClosable
          closable={false}
          visible={isShowEasyModal}
          closable
          footer={footerButtons}
        >
          <View style={{ paddingVertical: 20 }}>
            <Text style={{ textAlign: 'center' }}>{EasyModalInfos.text}</Text>
          </View>
        </Modal>
      </Flex>
    )
  }
}


// 渲染banner
_renderImage = (data) => {
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

// 渲染图文详情
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