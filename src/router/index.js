import { StackNavigator, TabNavigator } from 'react-navigation';

import { Home } from '../containers/Home'

const AppNavigator = StackNavigator({
  HomePage: {
    screen: Home,
    navigationOptions: {
      header: null
    }
  },
});
export default AppNavigator;