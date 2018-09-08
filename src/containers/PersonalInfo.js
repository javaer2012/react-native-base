import React, { Component } from 'react';
import { View,ScrollView, Text,TouchableOpacity,StyleSheet,Image } from 'react-native';
import {List,InputItem,Button,WingBlank,WhiteSpace,Flex} from 'antd-mobile-rn';

export default class PersonalInfo extends Component{
    static navigationOptions = {
        title:"个人信息"
    }

    render(){

        const Item = List.Item;
        const {navigation} = this.props;
        return (
            <View>
                <Flex direction={"row"} justify={"start"} style={{backgroundColor:'white',height:80,paddingLeft:15}}>
                    <WhiteSpace size={"lg"}/>
                    <Image style={{width:60,height: 60,resizeMode:'stretch',marginRight: 15}} source={require('../images/imageNew/one/no_collection.jpg')}/>
                    <View>
                        <Text>Sky</Text>
                        <Flex direction={"row"} justify={"between"} style={{height:50}}>
                            <Text>13912341234</Text>
                            <TouchableOpacity style={{marginLeft: 15}}><Text style={{color:'blue'}}>[解除绑定]</Text></TouchableOpacity>
                        </Flex>
                    </View>
                    <WhiteSpace size={"lg"}/>
                </Flex>
                <WhiteSpace size={"lg"}/>
                <List renderHeader={
                    <View>
                        <Text style={{marginLeft:5}}>基本信息</Text>
                        <WhiteSpace size={"md"}/>
                    </View>
                }>
                    <Item arrow={"horizontal"} onClick={()=>navigation.navigate("EducationPage")}>学历学籍</Item>
                    <Item arrow={"horizontal"} onClick={()=>navigation.navigate("DrivingPage")}>驾驶证</Item>
                </List>

                <WhiteSpace size={"xl"}/>
                <WingBlank size={"md"}>
                    <Text>您的个人信息以严格的认证标准进行保护，未经您的授权不会对任何第三方提供。</Text>

                </WingBlank>
            </View>
        )
    }
}