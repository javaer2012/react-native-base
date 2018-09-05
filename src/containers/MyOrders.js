import React, { Component } from 'react';
import { View,ScrollView, Text,TouchableOpacity,StyleSheet,Image } from 'react-native';
import {List,InputItem,Button,WingBlank,WhiteSpace,Flex} from 'antd-mobile-rn';


export default class MyOrders extends Component{
    static navigationOptions = {
        title:"我的订单"
    }

    render(){
        return (
            <View>
                <Flex direction={"row"} justify={"center"}>
                    <Image  source={require('../images/imageNew/one/no_collection.jpg')}/>
                </Flex>
            </View>
        )
    }
}