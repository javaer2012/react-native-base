import React from 'react'
import {View, Text, AsyncStorage} from 'react-native'
import RentApp from "../components/RentApp";
import api from "../service/api";

export default class MyCollections extends RentApp{

    constructor(props){
        super(props)
        //this.initData()
    }

    componentDidMount(){
        this.initData()
    }

    async initData(){
        try{

            const user = await AsyncStorage.multiGet(['userId', 'openId', 'isBinding', 'addressInfos'])

            const params = {
                userId:this.userId,
                openId:this.openId,
                cityCode:this.cityCode,
                provinceCode:this.provinceCode
            }
            console.log(params)
            const rsp = await api.myCollect(params)

            console.log(rsp)
        } catch (e) {

        }
    }

    render(){
        return <View>
            <Text>MyCollections</Text>
        </View>
    }
}