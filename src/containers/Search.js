import React from 'react';
import {ScrollView,View,Text,FlatList} from 'react-native';
import {Flex,Icon,WhiteSpace,WingBlank} from 'antd-mobile-rn';

export default class Search extends React.Component{
    static navigationOptions = {
        title:"搜索"
    }
    render(){
        return(
            <ScrollView>
                <View >
                    <WhiteSpace size={"sm"}/>
                    <WingBlank size={"sm"}>
                        <Flex direction={"row"} justify={"center"}
                              style={{backgroundColor:'white',paddingTop:5,paddingBottom:5}}>
                            <View style={{width:20,height:20,backgroundColor:'green'}}></View>
                            <Text>请输入商品名称</Text>
                        </Flex>
                    </WingBlank>
                    <WhiteSpace size={"sm"}/>
                </View>
                <FlatList style={{backgroundColor:'white'}}></FlatList>
            </ScrollView>
        )
    }
}