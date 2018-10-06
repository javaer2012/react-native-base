/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store/store';
import AppNavigator from './src/router';
import {AsyncStorage, Platform, Linking, Alert } from 'react-native';
import api from './src/service/api'
import config from './src/config';
import DeviceInfo from 'react-native-device-info'
import {areaDict} from './src/utils/city1.json'
import {cityObj, localCodeInfo} from './src/utils/city'
import RentApp from "./src/components/RentApp";


import {
    isFirstTime,
    isRolledBack,
    checkUpdate,
    downloadUpdate,
    switchVersion,
    switchVersionLater,
    markSuccess,
} from 'react-native-update';

import _updateConfig from './update.json';

const {appKey} = _updateConfig[Platform.OS];
// this.registerUser();
const {AmapRegeo, registerUser, isCityOpen, setCrmCode} = api

export default class App extends RentApp {

    constructor(props) {
        super(props)
        console.log('App start')

        /**
         * App initialize
         */
        // this.isOpen()
    }


    componentWillMount() {


        if (isFirstTime) {
            //标记首次首次启动
            markSuccess()
        } else if(isRolledBack){
            Alert.alert("更新失败，回滚到上一个可用版本")
        }

        //Alert.alert(`Is First Time:${isFirstTime}`)

        this.checkUpdate()


        this.getOpenIdAndUserId()
        this.beginWatch()
    }

    checkUpdate = ()=>{


        checkUpdate(appKey)
            .then(info=>{

                if (info.expired) {
                    Alert.alert('提示', '您的应用版本已更新,请前往应用商店下载新的版本', [
                        {
                            text: '确定', onPress: () => {
                                info.downloadUrl && Linking.openURL(info.downloadUrl)
                            }
                        },
                    ]);
                } else if (info.upToDate) {
                    //最新版本，不需要操作
                    //Alert.alert('提示', '您的版本已经最新')
                } else {
                    Alert.alert('提示', '检查到新的版本' + info.name + ',是否下载?\n' + info.description, [
                        {
                            text: '是', onPress: () => {
                                this.doUpdate(info)
                            }
                        },
                        {text: '否',},
                    ]);
                }
            })
            .catch(err=>Alert.alert(err.toString()))
    }

    isOpen = async (params) => {
        try {
            const rsp = await isCityOpen(params);
            if (rsp.data.errcode == 1) {
                AsyncStorage.setItem('isCityOpen', rsp.data.isOpen)
            }
            else {
                // throw (1)
                console.log("x!!!! 判断isOpen失败")
            }
            // console.log(rsp)

        } catch (e) {
            console.log("isOpen 函数错误 x!!!! 地址失败")
        }
    }

    doUpdate = async (info) => {

        downloadUpdate(info)
            .then(download=>{
                Alert.alert('提示', '下载完毕,是否重启应用?', [
                    {
                        text: '是', onPress: () => {
                            switchVersion(download);
                        }
                    },
                    {text: '否',},
                    {
                        text: '下次启动时', onPress: () => {
                            switchVersionLater(download);
                        }
                    },
                ]);
            })
    }


    registerUser = async (option) => {
        try {
           // await AsyncStorage.clear()

           // await AsyncStorage.removeItem('openId')
            const openId = await AsyncStorage.multiGet(['openId', 'userId', 'isLoggedIn']);

            console.log(openId)

            if (!openId[0][1] || !openId[1][1]) {
                const params = {
                    provinceCode: option.provinceCode,
                    cityCode: option.cityCode,
                    openId: DeviceInfo.getUniqueID()
                }
                const register = await registerUser(params);

                console.log(register)
                const {data} = register;
                if (data.errcode === 1) {
                    const {openId, userId} = data;
                    await AsyncStorage.multiSet([['openId', openId], ['userId', userId]])
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
            const {data} = await AmapRegeo(lat, lon)
            let {
                status,
                infocode,
                regeocode: {
                    addressComponent: {
                        district, city: gdCity, citycode, adcode, province
                    }
                }
            } = data;
            if (data.infocode == '10000') {
                try {
                    city = !(gdCity instanceof Array) && !!gdCity ? gdCity.substring(0, gdCity.length - 1) : province.substring(0, province.length - 1);

                    var code = localCodeInfo(city);
                    // const { data } = await setCrmCode(code)
                    // if (data && data.areaDict) {
                    // const { areaDict } = data;
                    
                    var option = {};

                    for (var key in areaDict) {
                        //console.log("code：", code, "key：", key,)
                        if (key == code) {
                            option["city"] = areaDict[key].crmCityName;
                            option["provinceCode"] = areaDict[key].crmProvCode;
                            option["cityCode"] = areaDict[key].crmCityCode;
                        }
                    }
                    await AsyncStorage.setItem('addressInfos', JSON.stringify(option));
                    this.registerUser(option)
                    this.isOpen({
                        provinceCode: option["provinceCode"],
                        cityCode: option["cityCode"],
                        openId: config.authAppId
                    })
                    // }
                } catch (error) {
                    this.showToast(error, 'setCrmCode 接口出错!!!!!!!!!!')
                }
            }
        } catch (error) {
            console.error(error)
        }

    }

    beginWatch = async () => {
        //await AsyncStorage.clear()
        const value1 = await AsyncStorage.getItem('Test')
        console.log("Test1", value1)


        navigator.geolocation.getCurrentPosition(
            ({coords}) => {
                const {latitude, longitude} = coords
                this.getCityFun(latitude, longitude)
                // var initialPosition = JSON.stringify(position);
                // this.setState({ initialPosition });
            },
            (error) => alert(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
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

