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
import DeviceInfo from 'react-native-device-info'


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
        console.log(DeviceInfo.getUniqueID())
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

            //await AsyncStorage.multiRemove(['openId','userId'])
            const openId = await AsyncStorage.multiGet(['openId','userId']);

            console.log(openId)

            if(!openId[0][1] || !openId[1][1]){
                const params = {
                    provinceCode:844,
                    cityCode:84401,
                    openId:DeviceInfo.getUniqueID()
                }
                const register = await registerUser(params);

                console.log(register)
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
                cityCode: citycode,
                provinceCode: adcode
            }

            console.log(addressObj)

            await AsyncStorage.setItem('addressInfos', JSON.stringify(addressObj));


            // console.log("=====>cityMsg!!!!!!", JSON.stringify(regeocode))
        } catch (error) {
            console.error(error)
        }



    }

    beginWatch =async () => {
       //await AsyncStorage.clear()
        const value1 = await AsyncStorage.getItem('Test')
        console.log("Test1",value1)


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

