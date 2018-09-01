import { StackNavigator, TabNavigator } from 'react-navigation';

import Home from '../containers/Home'
import Login from "../containers/Login";
import Register from "../containers/Register";
import ForgetPSW from "../containers/ForgetPSW";
import ChangePSW from "../containers/ChangePSW";
import DrawerTest from "../containers/DrawerTest";
import { Home } from '../containers/Home'
import { ProductListPage } from '../containers/ProductListPage'
import { ProductDetailPage } from '../containers/ProductDetailPage'


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
  // Profile: { screen: ProfileScreen },
}, {
    initialRouteName: 'LoginPage',
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