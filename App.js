/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './src/store/store';
import AppNavigator from './src/router';
import {AsyncStorage} from 'react-native';
import {setData,getData} from './src/utils/storage'
import {getToken} from "./src/service/api";

export default class App extends Component {

    constructor(props){
        super(props)
        console.log('App start')

        /**
         * App initialize
         */
    }
    componentWillMount(){
       
    }

    

    


    render() {
        return (
            <Provider store={store}>
                <AppNavigator></AppNavigator>
            </Provider>

        );
    }
}
