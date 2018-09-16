import React from 'react';
import RentApp from "../components/RentApp";
import {View,Text,Image,StyleSheet} from 'react-native'
import {Flex,WhiteSpace,Toast} from 'antd-mobile-rn'
import api from "../service/api";

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        paddingTop:57,
        backgroundColor:'white'
    },
    img:{
        width:170,
        height: 170
    },
    text:{
        fontSize:18,
        color:'#565656'
    }
})

export default class Wait extends RentApp{

    static navigationOption = {
        title:'信用租机'
    }

    constructor(props){
        super(props)

        const params = props.navigation.getParam('params')

        this.applyAuth(params)
    }

    async applyAuth(params){
        try{

            const rsp = await api.applyCredit(params)

            console.log(rsp)

            const {data} = rsp

            if(data.errcode === 1){
                //成功
                this.props.navigation.replace("AuthSuccessPage",{...data})
            } else{
                Toast.info(data.errmsg,3)
                setTimeout(()=>this.props.navigation.replace('AuthApplyPage'),3000)
            }

        } catch (e) {

        }
    }

    render(){

        //setTimeout(()=>this.props.navigation.replace('AuthSuccessPage'),2000)

     return(
         <View style={styles.container}>
             <Flex direction={"column"} align={"center"} justify={"start"}>
                 <Image style={styles.img}  source={require('../images/wait.gif')} />

                 <Text style={styles.text}>正在审核中，请您耐心等待......</Text>
                 <WhiteSpace size={"md"}/>
                 <Text style={styles.text}>审核结果将会以微信消息的形式通知您!</Text>

             </Flex>
         </View>
     )
    }
}