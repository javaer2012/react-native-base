import React, {Component} from 'react';
import {View, ScrollView, Text, TouchableOpacity, StyleSheet, Image, FlatList} from 'react-native';
import {WingBlank, WhiteSpace, Flex} from 'antd-mobile-rn';
import AuthInfo from "../components/AuthInfo";


export default class AuthRecords extends Component {
    static navigationOptions = {
        title: "授信记录"
    }

    state = {
        list: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    }

    render() {
        return (
            <View>
                <FlatList style={{backgroundColor:'white'}}
                    ItemSeparatorComponent={(h)=>
                        <View style={{height: 1,width:375,borderBottomWidth: 1,borderBottomColor:'#F2F2F2'}}/>
                    }
                    data={this.state.list}
                    renderItem={(item, index) => <AuthInfo/>}
                    onEndReachedThreshold={0.3}
                    onEndReached={()=>this.setState({
                        list:Array.from([...this.state.list,...this.state.list])
                    })}
                />
            </View>
        )
    }
}