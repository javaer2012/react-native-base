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
    
    GO_BACK(data) { // 后退功能，如果有callback，则传递data到callback
        const { navigate, goBack, state } = this.props.navigation;
        // debugger
        state.params && state.params.callback && state.params.callback(data);
        this.props.navigation.goBack();
    }

    showToast(data){ // 阴影提示
        Toast.info(data, 1.5,null , false);
    }
    
    async getOpenIdAndUserId(){  //  获取openId和UserId，后期建议走redux 而不是缓存
        try{
            const ids = await AsyncStorage.multiGet(['openId','userId','addressInfos'])
            this.openId = ids[0][1]
            this.userId = ids[1][1]
            this.cityCode = JSON.parse(ids[2][1]).cityCode
            this.provinceCode = JSON.parse(ids[2][1]).provinceCode
            console.log(this.provinceCode,"=====>this.provinceCode")
        } catch (e) {

        }
    }


}