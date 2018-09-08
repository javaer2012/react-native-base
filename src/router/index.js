import {StackNavigator, TabNavigator} from 'react-navigation';

import Home from '../containers/Home'
import Login from "../containers/Login";
import Register from "../containers/Register";
import ForgetPSW from "../containers/ForgetPSW";
import ChangePSW from "../containers/ChangePSW";
import DrawerTest from "../containers/DrawerTest";
import BadRecords from "../containers/BadRecords";

import {ProductListPage} from '../containers/ProductListPage'
import {ProductDetailPage} from '../containers/ProductDetailPage'
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
import Test from '../containers/Test'
import MyInstallmentPage from '../containers/MyInstallmentPage/MyInstallmentPage'
import MyOrder from '../containers/MyOrder/MyOrder'
import WorkerEnter from '../containers/WorkerEnter/WorkerEnter'
import Accept from '../containers/Accept/Accept'
import DoIt from '../containers/DoIt/DoIt'
import UploadImg from '../containers/UploadImg/UploadImg'
import Pay from '../containers/Pay/Pay'
import PayResult from '../containers/PayResult/PayResult'


const AppNavigator = StackNavigator({
    HomePage: Home,
    LoginPage: Login,
    RegisterPage: Register,
    ForgetPSWPage: ForgetPSW,
    ChangePSWPage: ChangePSW,
    DrawerPage: DrawerTest,
    MyPage: My,
    BadRecordPage:BadRecords,
    AuthRecordPage:AuthRecords,
    MyOrderPage:MyOrders,
    PersonalInfoPage:PersonalInfo,
    AuthApplyPage:AuthApply,
    TermPage:Term,
    DrivingPage:DrivingLicense,
    EducationPage:Education,
    SearchPage:Search,
    FindPage:Find,
    ScorePage:Score,
    KnowScorePage:KnowScore,
    ProductDetailPage: ProductDetailPage,
    ProductParameterPage: ProductParameterPage,
    ProductListPage: ProductListPage,
    OrderInfo: OrderInfo,
    MyInstallmentPage: MyInstallmentPage,
    MyOrder: MyOrder,
    WorkerEnter: WorkerEnter,
    Accept: Accept,
    DoIt: DoIt,
    UploadImg: UploadImg,
    Pay,
    PayResult
}, {
    initialRouteName: 'MyPage',
    /* The header config from HomeScreen is now here */
    navigationOptions: {
        headerStyle: {
            backgroundColor: '#06C1AE',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    }
});
export default AppNavigator;