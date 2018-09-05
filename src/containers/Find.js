import React from 'react';
import {ScrollView,View,Text,FlatList} from 'react-native';
import {Flex,Icon,WhiteSpace,WingBlank} from 'antd-mobile-rn';

export default class Find extends React.Component{
    static navigationOptions = {
        title:"发现"
    }
    render(){
        return(
            <ScrollView>
                <View>
                    <Text>发现</Text>
                </View>
            </ScrollView>
        )
    }
}