import { StackNavigator, TabNavigator } from 'react-navigation';

import Home from '../containers/Home'
import Login from "../containers/Login";
import Register from "../containers/Register";
import ForgetPSW from "../containers/ForgetPSW";
import ChangePSW from "../containers/ChangePSW";
import DrawerTest from "../containers/DrawerTest";
import { ProductListPage } from '../containers/ProductListPage'
import { ProductDetailPage } from '../containers/ProductDetailPage'
import ProductParameterPage from '../containers/ProductParameterPage/ProductParameterPage'
import OrderInfo from '../containers/OrderInfo/OrderInfo'


const AppNavigator = StackNavigator({
    HomePage: Home,
    LoginPage:Login,
    RegisterPage:Register,
    ForgetPSWPage:ForgetPSW,
    ChangePSWPage:ChangePSW,
    DrawerPage:DrawerTest,
    ProductDetailPage: ProductDetailPage,
    ProductParameterPage: ProductParameterPage,
    ProductListPage: ProductListPage,
    OrderInfo: OrderInfo
},{
    initialRouteName: 'HomePage',
    /* The header config from HomeScreen is now here */
    navigationOptions: {
        headerStyle: {
            backgroundColor: '#06C1AE',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    },
});
export default AppNavigator;