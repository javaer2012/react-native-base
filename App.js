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


export default class App extends Component {

  constructor(props){
    super(props)

      /**
       * App initialize
       */
  }
    render() {
    return (
      <Provider store={store}>
        <AppNavigator></AppNavigator>
      </Provider>
      
    );
  }
}
