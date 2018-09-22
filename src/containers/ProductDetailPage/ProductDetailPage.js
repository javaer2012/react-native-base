import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, TouchableHighlight, Dimensions } from 'react-native'
import { Button, Carousel, List, Flex, Tabs, Modal } from 'antd-mobile-rn';
import { ProductDetailPage_mock } from '../../mock/ProductDetailPage'
import { flexRow, contentPadding, mainGray } from '../../styles/common'
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
const PRODUCT_ID = '201802241102330510355414'

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
    photoList: [],
    goodsBaseInfo:{},
    skuGroupList:[],
    singleList:[],
    mixList:[],
    count: 0,
    capacityId:'',
    colorId:'',
    selectMealId:'',
  }

  async componentDidMount() {
    // const productId = this.props.navigation.getParam('productId');

    try {
      const { data: queryGoodsDetailData } = await queryGoodsDetail({
        provinceCode: "844",
        cityCode: "84401",
        goodsId: PRODUCT_ID,
        userId: "12389"
      })

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
        // 1 - 单产品套餐；2 - 融合套餐
      });
    
      this.setState({
        photoList,
        goodsBaseInfo,
        skuGroupList,
        singleList,
        mixList
        // productDetail: ProductDetailPage_mock
      })
    } catch (error) {
      console.error(error)
    }
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
  renderMealList = (data) => {
    // debugger
    if (!data || !(data instanceof Array)) return false
    const selectMeal = (id) => {
      this.setState({
        selectMealId: id
      })
    }
    const { selectMealId } = this.state
    const selectMealStyle={
      borderWidth: 1,
      borderColor: Color.mainPink
    }
    
    return data.map((item, index) => {
      const boxStyle = [styles.mealItemStyle, { marginTop: 10 }]
      if (item.mealId === selectMealId) {
        boxStyle.push(selectMealStyle)
      }
      return (
        <TouchableOpacity style={boxStyle} key={item.photoId || index} onPress={selectMeal.bind(this, item.mealId)}>
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

  // renderSkuGroupList = (data) => {
  //   return data.map((item, index) => {
  //     // return ()
  //       // <CheckboxItem>

  //       // </CheckboxItem>
  //   })
  // }

  selectedFun = (subSkuId, type) => {
    this.setState({ [type]: subSkuId })
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

  goToPayFun = async () => {
    const params = {
      "openId": "otp3cjjLq6cQ7oPHIINRef8cFruA",
      "provinceCode": "844",
      "cityCode": "84401",
      "orderType": "1",
      "userInfoJson": "{\"userId\":\"201808241044425400117198\",\"phoneNo\":\"18316579205\",\"userName\":\"邓夏宁\",\"idCardNo\":\"440883199305105071\",\"creditScore\":\"700\",\"maxAvailAmount\":3000}",
      "goodsInfoJson": "{\"goodsFirstAmount\":0,\"totalStageAmount\":0,\"monthRate\":0.005,\"periods\":24,\"teleFirstAmount\":0,\"poundgeRate\":0,\"goodsSkuId\":\"201809071024544610527721\",\"goodsId\":\"201807191523324900507633\"}",
      "mealInfoJson": "{\"mealId\":\"201808301508165440336042\"}",
      "capitalInfoJson": "{\"prodId\":\"87f667ff3f274fd1918885c966169c0d\"}",
      "insureJson": "[]",
      "activeId": "524eaa42bfec4d00b77f50d56fd82fe5",
      "paymentId": "201806210950040190225842",
      "sourceType": 2
    }

    const res = await commitOrder(params)
  }
  
  tollectCollectFun = async (status) => {
    try {
      const { openId, cityCode, userId, provinceCode} = this
      const { data } = await collectGoods({
        goodsId: PRODUCT_ID,
        cityCode,
        userId,
        provinceCode,
      })
      console.log(data,"tttt")
      // debugger
      if (data.errcode === 1) {
        thi.setState({
          collectStatus: data.status
        })
      }
      else{ console.error(data.errmsg) }
    } catch (error) {
      console.error(error,"!!!")
    }
  }

  render() {
    const { photoList, goodsBaseInfo, skuGroupList, singleList, mixList, lastPrice, count, isShowPackage } = this.state
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
                  <SelectedColorList
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
                  <SelectedROMList
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
                    <Text style={{ color: '#ccc' }}>请选择套餐</Text>
                    <Text>></Text>
                  </Flex>
                </Flex.Item>
              </Flex>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.toggleAgingFun.bind(this, true)}>
              <Flex style={[contentPadding, { backgroundColor: '#fff' }]} direction='row' justify='between' align='center' >
                <Flex.Item style={{ flex: 0, paddingVertical: 14, paddingRight: 10 }}>
                  <Text>分期</Text>
                </Flex.Item>
                <Flex.Item>
                  <Flex direction="row" justify='between' align="center">
                    <Text style={{color: '#ccc'}}>请选择分期</Text>
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
          visible={isShowPackage}
          // onClose={this.onClose('modal2')}
          animationType="slide-up"
        >
          <Flex style={{ backgroundColor: '#fff', marginTop: 10, paddingHorizontal: 10 }}>
            <Tabs tabs={tabs}
              initialPage={1}
              onChange={(tab, index) => { console.log('onChange', index, tab); }}
              onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
            >
              <View style={{ height: 400, padding: 10 }}>
                {this.renderMealList(mixList)}
              </View>
              <View style={{ height: 400 }}>
                {this.renderMealList(singleList)}
              </View>
            </Tabs>
          </Flex>
        </Modal>
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



// import React, { Component } from 'react'
// import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
// import { Button, Carousel, List, Flex } from 'antd-mobile-rn';
// import { ProductDetailPage_mock } from '../../mock/ProductDetailPage'
// import { flexRow, contentPadding, mainGray } from '../../styles/common'
// import Color from '../../styles/var'
// import Collect from '../../components/Collect'
// import SelectedListHoc from '../../components/SelectedList'
// import api from '../.././service/api'
// const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

// const { queryGoodsDetail, HTTP_IMG } = api

// // queryGoodsDetail

// const storageItem = ({ data, itemData, onPress, subSkuId}) => {
//   const boxStyle = [{
//     paddingVertical: 5,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     marginBottom: 1
//   }]
//   const textStyle = []
//   // debugger
//   if (subSkuId === itemData.subSkuId) {
//     boxStyle.push({
//       backgroundColor: Color.mainPink
//     })
//     textStyle.push({
//       color: '#fff'
//     })
//   }
//   return (
//     <View style={boxStyle}>
//       <Text style={textStyle}>{itemData.subSkuName}</Text>
//     </View>
//   )
// }
// const SelectedList = SelectedListHoc(storageItem)


// export default class ProductDetailPage extends Component {
//   state = {
//     photoList:[],
//     goodsBaseInfo:{},
//     skuGroupList:[]
//   }
//   componentWillReceiveProps(nextProps){

//   }

//   async componentDidMount(){
//     // const productId = this.props.navigation.getParam('productId');
//     const productId = '201802241102330510355414'

//     try {
//       const { data: queryGoodsDetailData } = await queryGoodsDetail({
//         provinceCode: "844",
//         cityCode: "84401",
//         goodsId: productId,
//         userId: "12389"
//       })
//       const { 
//         photoList, 
//         telecomProdList, 
//         skuDetailList, 
//         capitalProdList, 
//         maxAvailAmount, 
//         mealList, 
//         bizTypeCode, 
//         isCapitalConf, 
//         goodsBaseInfo, 
//         isTelConf, 
//         insureList, 
//         skuGroupList, 
//         paymentInfo 
//       } = queryGoodsDetailData
//       console.log(queryGoodsDetailData, "mmnnns")
//       this.setState({
//         photoList,
//         goodsBaseInfo,
//         skuGroupList
//         // productDetail: ProductDetailPage_mock
//       })
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   renderImage = (data) => {
//     if (!data || !(data instanceof Array)) return false

//     return data.map((item, index) => {
//         return (
//           <View key={item.photoId} style={[styles.containerHorizontal]}>
//             <Image 
//               resizeMode="stretch"
//               style={{ width: WIDTH, height: WIDTH }}
//               source={{ uri: `${HTTP_IMG}${item.photoPath}` }}
//               />
//           </View>
//       )
//     })
//   }

//   renderDetailImage = (data) => {
//     if (!data || !(data instanceof Array)) return false
//     return data.map((item, index) => {
//       return (
//         <View key={item.photoId} style={[{backgroundColor:'#ccc'}]}>
//           <Image
//             resizeMode="stretch"
//             style={{ width: 50, height: 150, backgroundColor: "red" }}
//             source={{ uri: item.photoPath }}
//           />
//         </View>
//       )
//     })
//   }

//   renderSkuGroupList = (data) => {
//     return data.map((item, index) => {
//       // return ()
//         // <CheckboxItem>

//         // </CheckboxItem>
//     })
//   }

//   selectedFun = (subSkuId) => {
//     console.log(subSkuId, "YYYYYYYYYYYYYYy")
//   }

//   render() {
//     const { photoList, goodsBaseInfo, skuGroupList } = this.state
//     if (!photoList) {
//       return false
//     }
//     const { goodsName, goodsDesc, goodsDetailText } = goodsBaseInfo

//     return (
//       <ScrollView
//         style={{ flex: 1 }}
//         automaticallyAdjustContentInsets={false}
//         showsHorizontalScrollIndicator={false}
//         showsVerticalScrollIndicator={false}
//       >
//         <View style={styles.container}>
//           <Carousel
//             style={styles.wrapper}
//             selectedIndex={2}
//             autoplay
//             infinite
//             afterChange={this.onHorizontalSelectedIndexChange}
//           >
//             {this.renderImage(photoList)}
//           </Carousel>
//         </View>
//         <View style={styles.contentContainer}>
//           <View style={styles.infoStyle}>
//             <Text style={[]}>{goodsName} {goodsDesc}</Text>
//             <View style={styles.btnBox}>
//               <Text style={[{ color: Color.mainPink},{fontWeight: '600'}]}>{222 || goodsPrice}</Text>
//               <View>
//                 <Collect 
//                   collectStatus={ 1 || collectStatus }
//                 />
//               </View>
//             </View>
//           </View>
//           <View style={[styles.canSelectedBox]}>
//             <View style={[flexRow, contentPadding, {
//               backgroundColor: '#fff',
//               paddingVertical: 10,
//               alignItems: 'center'
//             }]}>
//               <Text style={{
//                 ...mainGray
//               }}>内存</Text>
//               <View style={{ marginLeft: 10 }}>
//                 {/* {this.renderSkuGroupList(skuGroupList[])} */}
//                 <SelectedList
//                   data={skuGroupList[0] ? skuGroupList[0].subSkuList : []} 
//                   onPress={this.selectedFun}
//                 />
//               </View>
//             </View>
//             <View style={[flexRow, contentPadding, {
//               backgroundColor: '#fff',
//               paddingVertical: 10,
//               alignItems: 'center'
//             }]}>
//               <Text style={{
//                 ...mainGray
//               }}>颜色</Text>
//               <View style={{ marginLeft: 10 }}>
//                 {/* {this.renderSkuGroupList(skuGroupList[])} */}
//                 <SelectedList
//                   data={skuGroupList[0] ? skuGroupList[0].subSkuList : []}
//                   onPress={this.selectedFun}
//                 />
//               </View>
//             </View>
//           </View>
//           <Flex style={[contentPadding, { backgroundColor: '#fff', marginBottom: 10}]} direction='row' justify='between' align='center' >
//             <Flex.Item style={{ flex: 0, paddingVertical: 14, paddingRight: 10}}>
//               <Text>套餐</Text>
//             </Flex.Item>
//             <Flex.Item>
//               <Flex direction="row" justify='between' align="center">
//                   <Text>{222 || 333}</Text>
//                   <Text>></Text>
//               </Flex>
//             </Flex.Item>
//           </Flex>

//           <Flex style={[contentPadding, { backgroundColor: '#fff', marginBottom: 10 }]} direction='row' justify='between' align='center' >
//             <Flex.Item style={{ flex: 0, paddingVertical: 14, paddingRight: 10 }}>
//               <Text>分期</Text>
//             </Flex.Item>
//             <Flex.Item>
//               <Flex direction="row" justify='between' align="center">
//                 <Text>{222 || 333}</Text>
//                 <Text>></Text>
//               </Flex>
//             </Flex.Item>
//           </Flex>
//           <Flex direction='column' style={{backgroundColor: '#fff'}}>
//             <View>
//               <Text>图文详情</Text>
//             </View>
//             <View style={styles.photoDetail}>
//               {this.renderDetailImage(photoList)}
//             </View>
//           </Flex>
//         </View>
//       </ScrollView>
//     )
//   }
// }


// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#fff',
    
//   },
//   contentContainer: {
    
//   },
//   infoStyle: {
//     backgroundColor: '#fff',
//     ...contentPadding,
//     paddingVertical: 20,
//     marginBottom: 12
    
//   },
//   canSelectedBox:{
//     marginBottom: 1
//   },
//   btnBox: {
//     marginTop: 15,
//     ...flexRow,
//     justifyContent: 'space-between',
//     alignItems: 'center'
//   },
//   wrapper:{
//     // height: 150
//   },
//   photoDetail:{

//   },
//   containerHorizontal: {
//     flexGrow: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: 400,
//   },
// });
