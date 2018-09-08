import React, {Component} from 'react';
import {View, ScrollView, Text, TouchableOpacity, StyleSheet, Image, TextInput} from 'react-native';
import {List, InputItem, Button, WingBlank, WhiteSpace, Flex} from 'antd-mobile-rn';

export default class BadRecords extends Component {
    static navigationOptions = {
        title: "负面记录"
    }

    render() {
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