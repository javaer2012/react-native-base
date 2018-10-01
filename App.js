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
import { areaDict } from './src/utils/city1.json'
import { cityObj, localCodeInfo } from './src/utils/city'
// this.registerUser();
const { AmapRegeo, registerUser, isCityOpen, setCrmCode } = api

export default class App extends Component {

    constructor(props){
        super(props)
        console.log('App start')

        /**
         * App initialize
         */
        // this.isOpen()
    }
    componentWillMount(){
        this.beginWatch()
    }

    isOpen = async (params)=>{
        try{
            const rsp = await isCityOpen(params);
            if (rsp.data.errcode == 1) {
                AsyncStorage.setItem('isCityOpen',rsp.data.isOpen)
            }
            else{
                // throw (1)
                console.log("x!!!! 判断isOpen失败")
            }
            // console.log(rsp)

        } catch (e) {
            console.log("isOpen 函数错误 x!!!! 地址失败")
        }
    }



    registerUser = async ()=>{
        try{

            //await AsyncStorage.removeItem('openId')
            const openId = await AsyncStorage.multiGet(['openId','userId']);

            console.log(openId)

            if(!openId[0][1] || !openId[1][1]){
                const params = {
                    provinceCode: this.provinceCode,
                    cityCode: this.cityCode,
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
        var city;
        try {
            const { data } = await AmapRegeo(lat, lon)
            let {
                status,
                infocode,
                regeocode: {
                    addressComponent: {
                        district, city:gdCity, citycode, adcode, province
                    }
                }
            } = data;
            if (data.infocode == '10000') {
                try {
                  city = !(gdCity instanceof Array) && !!gdCity  ? gdCity.substring(0, gdCity.length - 1):province.substring(0,province.length -1);
                
                  var code = localCodeInfo(city);
                    // const { data } = await setCrmCode(code)
                    // if (data && data.areaDict) {
                        // const { areaDict } = data;
                        var option = {};
                        
                        for (var key in areaDict) {
                            //console.log("code：", code, "key：", key,)
                            if (key == code) {
                                option["city"] = province;
                                option["provinceCode"] = areaDict[key].crmProvCode;
                                option["cityCode"] = areaDict[key].crmCityCode;
                            }
                        }
                        await AsyncStorage.setItem('addressInfos', JSON.stringify(option));
                        this.registerUser()
                        this.isOpen({
                            provinceCode: option["provinceCode"],
                            cityCode: option["cityCode"],
                            openId: config.authAppId
                        })
                    // }
                } catch (error) {
                  this.showToast(error,'setCrmCode 接口出错!!!!!!!!!!')
                    console.log()
                }
            }
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

