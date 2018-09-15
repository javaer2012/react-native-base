import React from 'react';
import {View, ScrollView, Text, TouchableOpacity, StyleSheet, Image, TextInput, AsyncStorage} from 'react-native';
import {List, InputItem, Button, WingBlank, WhiteSpace, Flex} from 'antd-mobile-rn';
import api from "../service/api";
import RentApp from "../components/RentApp";



export default class BadRecords extends RentApp {
    static navigationOptions = {
        title: "负面记录"
    }

    constructor(props){
        super(props)
    }



    async getBadList(){
        try{

            const rsp = await api.negativeList()
        } catch (e) {

        }
    }

    render() {
        console.log("App :",this)
        return (
            <ScrollView>
                <Flex direction={"column"} justify={"center"}>
                    <WhiteSpace size={"xl"}/>
                    <WhiteSpace size={"xl"}/>
                    <Image style={{width: 175, height: 200, resizeMode: "stretch"}}
                           source={require('../images/imageNew/one/record-img.png')}/>
                    <WhiteSpace size={"xl"}/>
                    <Text >你没有负面行为，很赞！</Text>
                </Flex>
            </ScrollView>
        )
    }
}