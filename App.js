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
import AppNavigator from './src/router';
import {AsyncStorage} from 'react-native';
import axios from 'axios';
import {setData,getData} from './src/utils/storage'
import {getToken} from "./src/service/api";
import http from './src/utils/httpRequest';
import api from "./src/service/api";


export default class App extends Component {

  constructor(props){
    super(props)
      console.log('App start')

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
