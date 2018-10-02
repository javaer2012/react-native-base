import {Component} from "react";
import {AsyncStorage} from "react-native";
import { Toast } from 'antd-mobile-rn';

export default class RentApp extends Component{
    constructor(props){
        super(props)
        setTimeout(() => {
            this.getOpenIdAndUserId()
        }, 0);
        this.showToast = this.showToast
        this.getOpenIdAndUserId = this.getOpenIdAndUserId
    }

    showToast(data){
        Toast.info(data, 1.5,null , false);
    }
    
    async getOpenIdAndUserId(){
        try{
           // await AsyncStorage.clear()
            const ids = await AsyncStorage.multiGet(['openId','userId','addressInfos'])
            this.openId = ids[0][1]
            // console.log(this., "idsidsidsids")
            this.userId = ids[1][1]
            this.cityCode = JSON.parse(ids[2][1]).cityCode
            this.provinceCode = JSON.parse(ids[2][1]).provinceCode
        } catch (e) {

        }
    }
}