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
import api from './src/service/api'

const { AmapRegeo } = api

export default class App extends Component {

    constructor(props){
        super(props)
        console.log('App start')

        /**
         * App initialize
         */
    }
    componentWillMount(){
        this.beginWatch()
    }

    getCityFun = async (lat, lon) => {
        try {
            const { data } = await AmapRegeo(lat, lon)
            const {
                status,
                infocode,
                regeocode: {
                    addressComponent: {
                        district, city, citycode, adcode
                    }
                }
            } = data
            const addressObj = {
                district,
                citycode: citycode,
                provinceCode: adcode
            }

            await AsyncStorage.setItem('addressInfos', JSON.stringify(addressObj));


            // console.log("=====>cityMsg!!!!!!", JSON.stringify(regeocode))
        } catch (error) {
            console.error(error)
        }



    }

    beginWatch = () => {
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                const { latitude, longitude } = coords
                this.getCityFun(latitude, longitude)
                // var initialPosition = JSON.stringify(position);
                // this.setState({ initialPosition });
            },
            (error) => alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        )
        //  Geolocation.watchPosition(
        //    ({ coords }) => {
        //      debugger
        //       // return location
        //      const { latitude, longitude } = coords

        //      this.getCityFun( latitude, longitude )
        //     },
        //     error => {
        //       alert("获取位置失败：" + error)
        //     }
        //   )
    }


    render() {
        return (
            <Provider store={store}>
                <AppNavigator></AppNavigator>
            </Provider>

        );
    }
}
