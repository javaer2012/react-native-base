import React, { Component } from 'react';
import { View,ScrollView, Text,TouchableOpacity,StyleSheet,Image } from 'react-native';
import {List,InputItem,WingBlank,WhiteSpace,Flex} from 'antd-mobile-rn';
import Button from "../components/common/Button";
import { cityObj } from '../utils/areaSchool'

export default class Education extends Component{
    static navigationOptions = {
        title:"学籍学历"
    }
    state = {
        cityId: ''
    }
    setCityIdFun = (data) => {
        cityObj.forEach(element => {
            if (data.crmProvName === element.province) {
                this.setState({
                    cityId: element.id
                })
            }
        });
    }

    setSchoolFun = (data) => {
        console.log(data,"!!!")

    }
    render(){

        const Item = List.Item;
        const {navigation} = this.props;
        return (
            <View>
                <Flex direction={"row"} justify={"center"} style={{backgroundColor:'white',height:80,paddingLeft:15}}>
                    <WhiteSpace size={"lg"}/>
                    <Text>信息保护中</Text>
                    <WhiteSpace size={"lg"}/>
                </Flex>
                <WhiteSpace size={"lg"}/>
                <List >
                    <Item arrow={"horizontal"} onClick={
                        () => navigation.navigate('LocationPage', {
                            callback: (data) => this.setCityIdFun(data)
                        })}>地区
                    </Item>
                    <Item arrow={"horizontal"} onClick={() => navigation.navigate("SchoolSearchPage",  {
                        cityId: this.state.cityId,
                        callback: (data) => this.setSchoolFun(data)
                    })}>院校名称</Item>
                    <Item arrow={"horizontal"} onClick={()=>navigation.navigate("DrivingPage")}>当前状态</Item>

                </List>

                <WhiteSpace size={"xl"}/>
                <WingBlank size={"md"}>
                   <Flex direction={"column"} justify={"start"} align={"center"}>
                       <Text style={{textAlign: 'center'}}>请确认您的个人信息真实有效</Text>
                       <Text style={{textAlign: 'center'}}>上传虚假信息将对你的信用产生负面影响</Text>
                   </Flex>

                </WingBlank>
                <WhiteSpace size={"md"}/>

                <Flex direction={"row"} justify={"center"}>
                    <Button style={{backgroundColor:"#06C1AE",width:355,height:36,lineHeight:36,color:"white"}}>完成</Button>
                </Flex>
            </View>
        )
    }
}