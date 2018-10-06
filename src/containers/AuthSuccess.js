import React from 'react';
import RentApp from "../components/RentApp";
import {View,Text,Image,StyleSheet,AsyncStorage} from 'react-native'
import {Flex,WhiteSpace} from 'antd-mobile-rn'
import Button from '../components/common/Button'
import api from "../service/api";

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        paddingTop:57,
        backgroundColor:'white'
    },
    img:{
        width:95,
        height: 84
    },
    text:{
        fontSize:20,
        color:'#F5475F'
    },
    btn:{
        backgroundColor: '#F5475F',
        color:'white',
        textAlign: 'center',
        fontSize: 20
    }
})

export default class AuthSuccess extends RentApp{

    static navigationOption = {
        title:'信用租机'
    }


    constructor(props){
        super(props)

        this.max = props.navigation.getParam('maxCreditAmount', 0)
        this.score = props.navigation.getParam('creditScore', 0)
        this.monthFee = props.navigation.getParam('monthFee', 0)

        this.saveData(this.max,this.score,this.monthFee)
    }

    async saveData(max,score,monthFee){
        await AsyncStorage.multiSet([['maxCreditAmount',max.toString()],['creditScore',score.toString()],['monthFee',monthFee.toString()]])
    }

    async componentDidMount(){

        try{
            const fromPage = await AsyncStorage.multiGet(['fromPageName','fromPageParams']);
            // debugger

            this.fromPageName = fromPage[0][1] || 'MyPage' //默认跳转至我的页面
            this.fromPageParams = fromPage[1][1]?JSON.parse(fromPage[1][1]) : {} //默认没有参数

            const userInfo = await AsyncStorage.getItem('userInfo'),
                userInfoJson = JSON.parse(userInfo),
                userParam = {
                    userId:this.userId,
                    openId:this.openId,
                    cityCode:84401,
                    provinceCode:844,
                },
                userRsp = await api.getUserInfo(userParam)


            const {data} = userRsp

            if(data.errcode === 1){

                const newUserInfo = {}
                Object.assign(newUserInfo,{...userInfoJson},{...data.userInfo})

                await AsyncStorage.setItem(['userInfo',JSON.stringify(newUserInfo)])
            }

        } catch (e) {
            console.log(e,"!!!!")
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <Flex direction={"column"} align={"center"} justify={"start"}>
                    <Image style={styles.img}  source={require('../images/success.png')} />
                    <WhiteSpace size={"md"}/>

                    <Text style={styles.text}>恭喜您，申请成功！</Text>
                    <WhiteSpace size={"xl"}/>
                    <Text style={styles.text}>{`您的信用额度为${this.max}元`}</Text>
                    <WhiteSpace size={"xl"}/>

                    <Button style={styles.btn} onClick={()=>this.props.navigation.replace(this.fromPageName,{...this.fromPageParams})}>立即使用</Button>
                </Flex>

            </View>
        )
    }
}