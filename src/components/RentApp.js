import {Component} from "react";
import {AsyncStorage} from "react-native";

export default class RentApp extends Component{
    constructor(props){
        super(props)

        setTimeout(() => {
            this.getOpenIdAndUserId()
        }, 0);
    }


    async getOpenIdAndUserId(){
        try{
           // await AsyncStorage.clear()
            const ids = await AsyncStorage.multiGet(['openId','userId','addressInfos'])
            console.log(ids,"idsidsidsids")
            this.openId = ids[0][1]
            this.userId = ids[1][1]
            this.cityCode = JSON.parse(ids[2][1]).cityCode
            this.provinceCode = JSON.parse(ids[2][1]).provinceCode
        } catch (e) {

        }
    }
}