import React from 'react'
import { View,Text,StyleSheet,Image,ImageBackground,TouchableOpacity} from 'react-native'
import {Flex,WhiteSpace} from 'antd-mobile-rn'
import RentApp from "../components/RentApp";

const styles = StyleSheet.create({
    img:{
        width:157,
        height:118
    }
})

export default class BankCard extends RentApp{

    constructor(props){
        super(props)
    }

    render(){
        return (
            <View>
                <WhiteSpace size={"lg"}/>
               <Flex direction={"column"} justify={"start"} align={"center"}>
                   <Image style={styles.img} source={require('../images/backCard/card.png')}/>

                   <WhiteSpace size={"md"}/>

                   <Text>您未绑定银行卡，快去绑定吧</Text>

                   <WhiteSpace size={"lg"}/>

                   <ImageBackground style={{width:320,height:47,paddingTop: 8}} source={require('../images/backCard/dot.png')}>
                       <TouchableOpacity onPress={()=>this.props.navigation.navigate("AddBankCardPage")}>
                           <Flex direction={"row"} justify={"center"} align={"center"}>
                               <Image style={{widht:30,height:30}} source={require('../images/backCard/add.png')}/>
                               <Text>添加银行卡</Text>
                           </Flex>
                       </TouchableOpacity>
                   </ImageBackground>
               </Flex>
            </View>
        )
    }
}