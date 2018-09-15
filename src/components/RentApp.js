import {Component} from "react";
import {AsyncStorage} from "react-native";

export default class RentApp extends Component{
    constructor(props){
        super(props)

        this.getOpenIdAndUserId()
    }


    async getOpenIdAndUserId(){
        try{
            const ids = await AsyncStorage.multiGet(['openId','userId','addressInfos'])
            console.log(ids)
            this.openId = ids[0][1]
            this.userId = ids[1][1]
            this.cityCode = JSON.parse(ids[2][1]).citycode
            this.provinceCode = JSON.parse(ids[2][1]).provinceCode
        } catch (e) {

        }
    }
}