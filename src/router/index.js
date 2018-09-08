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


const AppNavigator = StackNavigator({
    ProductDetailPage: {
        screen: ProductDetailPage,
        navigationOptions: {
            header: null
        }
    },
    ProductListPage: {
        screen: ProductListPage,
        navigationOptions: {
            header: null
        }
    },
    HomePage: {
        screen: Home,
        navigationOptions: {
            header: null
        }
    },
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
    KnowScorePage:KnowScore
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