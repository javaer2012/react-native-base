/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */


import React, { Component } from 'react';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import store from './src/redux/store';
// import AppNavigator from './routerConfigs/index'
import AppNavigator from './src/router'

import { StackNavigator } from 'react-navigation';
// export default class App extends Component<Props> {
//   render() {
//     return (
//       <Provider store={store}>
//         <Root {...this.props} />
//       </Provider>
//     );
//   }
// }


export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator></AppNavigator>
      </Provider>
      
    );
  }
}
