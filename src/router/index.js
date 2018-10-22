// import {StackNavigator} from 'react-navigation';
import React from 'react';
import { StackNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Home from '../containers/Home'
import Login from "../containers/Login";
import Register from "../containers/Register";
import ForgetPSW from "../containers/ForgetPSW";
import ChangePSW from "../containers/ChangePSW";
import DrawerTest from "../containers/DrawerTest";
import BadRecords from "../containers/BadRecords";

import { ProductListPage } from '../containers/ProductListPage'
import { ProductDetailPage } from '../containers/ProductDetailPage'
import My from "../containers/My";
import AuthRecords from "../containers/AuthRecords";
import MyOrders from "../containers/MyOrders";
import PersonalInfo from "../containers/PersonalInfo";
import AuthApply from "../containers/AuthApply";
import Term from "../containers/Term";
import DrivingLicense from "../containers/DrivingLicense";
import Education from "../containers/Education";
import Search from "../containers/Search";
import Find from "../containers/Find";
import Score from "../containers/Score";
import KnowScore from "../containers/KnowScore";

import ProductParameterPage from '../containers/ProductParameterPage/ProductParameterPage'
import OrderInfo from '../containers/OrderInfo/OrderInfo'
import MyInstallmentPage from '../containers/MyInstallmentPage/MyInstallmentPage'
import MyOrder from '../containers/MyOrder/MyOrder'
import WorkerEnter from '../containers/WorkerEnter/WorkerEnter'
import WorkerOrder from '../containers/WorkerOrder/WorkerOrder'

import Accept from '../containers/Accept/Accept'
import UploadImg from '../containers/UploadImg/UploadImg'
import Pay from '../containers/Pay/Pay'
import PayResult from '../containers/PayResult/PayResult'
import TakePicture from "../containers/TakePicture";
import TabNavigator from '../components/TabNavigator'
import Wait from "../containers/Wait";
import AuthSuccess from "../containers/AuthSuccess";
import BankCard from "../containers/BankCard";
import AddBankCard from "../containers/AddBankCard";
import MyCollections from "../containers/MyCollections";
import CardInfo from "../containers/CardInfo";
import LocationPage from '../containers/LocationPage/LocationPage'
import FindDetail from '../containers/FindDetail';
import Imagepicker from '../containers/ImagePicker'
import NegativeRecord from '../containers/NegativeRecord'
import OrderDetail from '../containers/OrderDetail/OrderDetail';
import CrmPage_2 from '../containers/crmPage_2'
import SchoolSearchPage from '../containers/SchoolSearchPage/SchoolSearchPage'
import RentOrderDetail from '../containers/RentOrderDetail/RentOrderDetail'
import Provinces from '../containers/Provinces'
// import App from './App'
// console.log(App,"!!!!")


import { Image } from "react-native";
import Color from "../styles/var";  // 确认订单
import BarTest from '../containers/BarTest';


const HomeStack = createStackNavigator({
    Home,
    SearchPage: Search, // 搜索页面
    ProductDetail: ProductDetailPage, //商品详情
    ProductParameterPage: ProductParameterPage,  // 商品参数详情
    ProductListPage: ProductListPage,
    // OrderDetail, // 从WorkerEnter进入受理订单页面
    Accept: Accept,  // 受理：crm信息回填
    UploadImg: UploadImg,
    Pay,
    PayResult,
    LocationPage,
    AuthApplyPage: AuthApply, // 填写信用租机信息
    LoginPage: Login,
    BackCardPage: BankCard,
    AddBankCardPage: AddBankCard,
    CardInfoPage: CardInfo,
    ChangePSWPage: ChangePSW,//银行卡解绑
    RentOrderDetail,
    OrderInfo: OrderInfo,  // 租机信息 （凭此二维码....）
    OrderDetail, // 从WorkerEnter进入受理订单页面,
    Barcode:BarTest,
}, {
        navigationOptions: {
            // initialRouteName: "Pay",
            headerStyle: {
                backgroundColor: '#06C1AE',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    })

const FindStack = createStackNavigator({
    FindPage: Find,
    FindDetailPage: FindDetail,

}, {
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#06C1AE',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    })

const MyStack = createStackNavigator({
    MyPage: My,
    LoginPage: Login,
    RegisterPage: Register,
    ForgetPSWPage: ForgetPSW,
    ChangePSWPage: ChangePSW,//银行卡解绑
    BadRecordPage: BadRecords,  // 负面记录
    AuthRecordPage: AuthRecords, // 授信纪录
    MyOrderPage: MyOrders, // 昊天的
    PersonalInfoPage: PersonalInfo,  // 个人信息 学历驾驶证
    AuthApplyPage: AuthApply, // 填写信用租机信息
    TermPage: Term, // 信息条款说明
    DrivingPage: DrivingLicense, // 驾驶证件
    EducationPage: Education, // 学籍学历
    ScorePage: Score, // 晒晒分
    KnowScorePage: KnowScore, // 了解信用分
    MyInstallmentPage: MyInstallmentPage, // 我的分期
    MyOrder: MyOrder, // 孟令禹 我的订单
    WorkerEnter: WorkerEnter, // 营业员入口
    WorkerOrder: WorkerOrder, // 啥都没有
    WaitPage: Wait,
    AuthSuccessPage: AuthSuccess,
    BackCardPage: BankCard,
    AddBankCardPage: AddBankCard,
    MyCollectionsPage: MyCollections,
    CardInfoPage: CardInfo,
    NegativeRecord,
    CrmPage_2,
    Provinces, // 选择学校时候需要选择省份
    LocationPage,
    SchoolSearchPage,
    RentOrderDetail,
    ProductDetail: ProductDetailPage, //商品详情
    ProductParameterPage: ProductParameterPage,  // 商品参数详情
    ProductListPage: ProductListPage,
    Pay,
    PayResult,
    LoginPage: Login,
    BackCardPage: BankCard,
    AddBankCardPage: AddBankCard,
    CardInfoPage: CardInfo,
    OrderDetail, // 从WorkerEnter进入受理订单页面
    OrderInfo: OrderInfo,  // 租机信息 （凭此二维码....）
    
}, {
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#06C1AE',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    })

HomeStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }

    return {
        headerStyle: {
            backgroundColor: '#06C1AE',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
        tabBarVisible,
    };
};

FindStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }

    return {
        headerStyle: {
            backgroundColor: '#06C1AE',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
        tabBarVisible,
    };
};

MyStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }

    return {
        headerStyle: {
            backgroundColor: '#06C1AE',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
        tabBarVisible,
    };
};

export default createBottomTabNavigator({
    Home: HomeStack,
    FindPage: FindStack,
    MyPage: MyStack
},
    {
        navigationOptions: ({ navigation }) => {
            const { routeName } = navigation.state;

            let label;
            switch (routeName) {
                case 'Home':
                    label = "首页"
                    break
                case 'FindPage':
                    label = "发现"
                    break
                case 'MyPage':
                    label = '我的'
                    break
                default:
                    label = "信用租机"
            }

            return {
                tabBarLabel: label,
                tabBarIcon: ({ focused, tintColor }) => {

                    //console.log("Haha, I'm back")
                    let iconName;
                    if (routeName === 'Home') {
                        // iconName = `ios-information-circle${focused ? '' : '-outline'}`;
                        iconName = (!focused
                            ? <Image style={{ width: 20, height: 20 }} source={require('../images/home.png')} />
                            : <Image style={{ width: 20, height: 20 }} source={require('../images/homeActive.png')} />
                        )
                    } else if (routeName === 'FindPage') {
                        iconName = (!focused
                            ? <Image style={{ width: 22, height: 22 }} source={require('../images/find.png')} />
                            : <Image style={{ width: 22, height: 22 }} source={require('../images/findActive.png')} />)
                    } else if (routeName === 'MyPage') {
                        iconName = (!focused
                            ? <Image style={{ width: 20, height: 20 }} source={require('../images/my.png')} />
                            : <Image style={{ width: 20, height: 20 }} source={require('../images/myActive.png')} />)
                    }

                    // You can return any component that you like here! We usually use an
                    // icon component from react-native-vector-icons
                    // return <Ionicons name={iconName} size={25} color={tintColor} />;
                    return iconName
                }
            }
        },
        tabBarOptions: {
            activeTintColor: Color.mainGreen,
            inactiveTintColor: 'gray',
        },
    })

// export default StackNavigator({
//     tab: TabNavigator,
//     LoginPage: Login,
//     Home: Home,
//     RegisterPage: Register,
//     ForgetPSWPage: ForgetPSW,
//     ChangePSWPage: ChangePSW,
//     MyPage: My,
//     BadRecordPage: BadRecords,  // 负面记录
//     AuthRecordPage: AuthRecords, // 授信纪录
//     MyOrderPage: MyOrders, // 昊天的
//     PersonalInfoPage: PersonalInfo,  // 个人信息 学历驾驶证
//     AuthApplyPage: AuthApply, // 填写信用租机信息
//     TermPage: Term, // 信息条款说明
//     DrivingPage: DrivingLicense, // 驾驶证件
//     EducationPage: Education, // 学籍学历
//     SearchPage: Search, // 搜索页面
//     //FindPage:Find, // 发现页面
//     ScorePage: Score, // 晒晒分
//     KnowScorePage: KnowScore, // 了解信用分
//     ProductDetail: ProductDetailPage, //商品详情
//     ProductParameterPage: ProductParameterPage,  // 商品参数详情
//     ProductListPage: ProductListPage,
//     OrderInfo: OrderInfo,  // 租机信息 （凭此二维码....）
//     MyInstallmentPage: MyInstallmentPage, // 我的分期
//     MyOrder: MyOrder, // 孟令禹 我的订单
//     WorkerEnter: WorkerEnter, // 营业员入口
//     WorkerOrder: WorkerOrder, // 啥都没有
//     OrderDetail, // 从WorkerEnter进入受理订单页面
//     Accept: Accept,  // 受理：crm信息回填
//     UploadImg: UploadImg,
//     Pay,
//     PayResult,
//     TakePicturePage: TakePicture,
//     WaitPage: Wait,
//     AuthSuccessPage: AuthSuccess,
//     BackCardPage: BankCard,
//     AddBankCardPage: AddBankCard,
//     MyCollectionsPage: MyCollections,
//     CardInfoPage: CardInfo,
//     LocationPage,
//     FindDetailPage: FindDetail,
//     NegativeRecord,
//     CrmPage_2,
//     SchoolSearchPage,
//     RentOrderDetail
// }, {
//     // initialRouteName:"Pay",
//     /* The header config from HomeScreen is now here */
//     navigationOptions: {
//         headerStyle: {
//             backgroundColor: '#06C1AE',
//         },
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//             fontWeight: 'bold',
//         },
//     }
// })

