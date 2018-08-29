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
import store from './src/store/store';
import AppNavigator from './src/router'

import { StackNavigator } from 'react-navigation';


export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator></AppNavigator>
      </Provider>
      
    );
  }
}
