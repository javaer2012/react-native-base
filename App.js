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
import config from './src/config';
import {ActivityIndicator} from 'antd-mobile-rn'

const { AmapRegeo,registerUser,isCityOpen } = api

export default class App extends Component {

    constructor(props){
        super(props)
        console.log('App start')

        /**
         * App initialize
         */
        this.registerUser();
        this.isOpen()
    }
    componentWillMount(){
        this.beginWatch()
    }

    isOpen = async ()=>{
        try{

            const params = {
                provinceCode:844,
                cityCode:84402,
                openId:config.authAppId,
            }

            const rsp = await isCityOpen(params);
            if(rsp.data.errmsg === 'ok'){
                await AsyncStorage.setItem('isCityOpen',rsp.data.isOpen)
            }
            console.log(rsp)

        } catch (e) {

        }
    }

    registerUser = async ()=>{
        try{
            const openId = await AsyncStorage.multiGet(['openId','userId']);

            if(!openId[0][1] || !openId[1][1]){
                const params = {
                    provinceCode:844,
                    cityCode:84401,
                    openId:config.authAppId
                }
                const register = await registerUser(params);
                const {data} = register;
                if(data.errcode === 1){
                    const {openId,userId} = data;
                    await AsyncStorage.multiSet([['openId',openId],['userId',userId]])
                }
                console.log(register)
            }

        } catch (e) {
            console.log(e)
        }
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

            console.log(addressObj)

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

    }

    render() {
        return (
            <Provider store={store}>
                <AppNavigator></AppNavigator>
            </Provider>

        );
    }
       
}

