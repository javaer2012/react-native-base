import { StackNavigator, TabNavigator } from 'react-navigation';

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
  
  // Profile: { screen: ProfileScreen },
});
export default AppNavigator;