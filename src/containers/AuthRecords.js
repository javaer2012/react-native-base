import React, {Component} from 'react';
import {View, AsyncStorage, Text,TouchableOpacity, StyleSheet,Image, ImageBackground, FlatList} from 'react-native';
import {WingBlank, WhiteSpace, Flex} from 'antd-mobile-rn';
import AuthInfo from "../components/AuthInfo";
import api, {HTTP_IMG} from "../service/api";
import RentApp from "../components/RentApp";
import Button from '../components/common/Button'

export default class AuthRecords extends RentApp {
    static navigationOptions = {
        title: "信用历史"
    }

    state = {
        list: []
    }

    componentDidMount(){
        setTimeout(()=>this.getAuthData(),0)
    }

    getAuthData = async ()=>{
        try{
            await AsyncStorage.getItem('openId')
            const params = {
                openId:this.openId,
                userId:this.userId,
                cityCode:844,
                provinceCode:84401
            }

            const rsp = await api.creditHistory(params)

            console.log(rsp)

            const {data} = rsp

            if(data.errcode === 1){
                this.setState({
                    list:data.creditHistoryList
                })
            }

        }catch (e) {

        }
    }

    renderRecord(item,index){


        return <View key={index}>
            <WhiteSpace size={"lg"}/>
            <WingBlank size={"md"}>
               <Flex direction={"row"} justify={"between"}>
                   <Flex direction={"row"}>
                       <Image style={{width:44,height:44,marginRight: 20}} source={{uri:`${HTTP_IMG}${item.activeIconUrl}`}}/>
                       <Flex direction={"column"} align={"start"}>
                           <Text style={{fontSize:14,color:'black'}}>{`${item.activeName}  履约${item.carryonTimes}次`}</Text>
                           <WhiteSpace size={"md"}/>
                           <Text style={{fontSize:12,color:'#565656'}}>{`更新时间:${item.lastUpdateTime.substring(0,9)}`}</Text>
                       </Flex>
                   </Flex>
                   <Button style={{borderColor:'#06C1AE', color: "#06C1AE",borderRadius:4,fontSize: 10 ,width: 55, height: 21, lineHeight: 21}}>再次享用</Button>
               </Flex>
            </WingBlank>
            <WhiteSpace size={"lg"}/>

        </View>
    }

    render() {
        return (
            <View>
                <ImageBackground resizeMode={"stretch"} style={{width:'100%',height:180}} source={require('../images/authHistory.jpeg')}>
                    <Flex style={{height:'100%'}} direction={"column"} justify={"center"}>
                        <Text style={{color:'brown',fontSize:20}}>我共履约了</Text>
                        <WhiteSpace size={"md"}/>
                        <Text style={{color:'#06C1AE'}}>{`${this.state.list.length}次`}</Text>
                        <WhiteSpace size={"md"}/>

                        <Button style={{backgroundColor: "#06C1AE",borderRadius:4 ,width: 100, height: 36, lineHeight: 36, color: "white"}}>炫耀一下</Button>
                    </Flex>
                </ImageBackground>
                <FlatList style={{backgroundColor:'white'}}
                    ItemSeparatorComponent={(h)=>
                        <View style={{height: 1,width:375,borderBottomWidth: 1,borderBottomColor:'#F2F2F2'}}/>
                    }
                    data={this.state.list}
                    renderItem={({item}, index) =>this.renderRecord(item,index)}
                />
            </View>
        )
    }
}