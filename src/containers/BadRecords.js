import React from 'react';
import {
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    TextInput,
    AsyncStorage,
    FlatList
} from 'react-native';
import {List, InputItem, Button, WingBlank, WhiteSpace, Flex} from 'antd-mobile-rn';
import api from "../service/api";
import RentApp from "../components/RentApp";
import AuthInfo from "../components/AuthInfo";



export default class BadRecords extends RentApp {
    static navigationOptions = {
        title: "负面记录"
    }

    state = {
        list:[]
    }

    constructor(props){
        super(props)
    }

    async componentDidMount(){
        await this.getOpenIdAndUserId()
        setTimeout(()=>this.getBadList(),0)
    }


    renderItem(item,index){
        //console.log(item)
       return <WingBlank size={"md"}>
           <Flex key={index} style={{width:'100%'}} direction={"column"} align={"start"}>
               <WhiteSpace size={"md"}/>
               <Text>{item.title}</Text>
               <WhiteSpace size={"md"}/>

               <Text style={{color:'#989898'}}>{item.detailDesc}</Text>
               <WhiteSpace size={"md"}/>

               <Flex direction={"row"}>
                   <Text style={{color:'#CDCDCD',paddingRight: 10,borderRightColor:'#CDCDCD',borderRightWidth: 1}}>{item.status === 0?"未处理":"已处理"}</Text>
                   <Text style={{color:'#CDCDCD'}}>{`创建时间：${item.createTime}`}</Text>

               </Flex>
               <WhiteSpace size={"md"}/>

           </Flex>
       </WingBlank>
    }


    async getBadList(){

        try{
            await AsyncStorage.getItem('openId')
            const params = {
                openId:this.openId,
                userId:this.userId,
                cityCode: this.cityCode,
                provinceCode: this.provinceCode
            }

            const rsp = await api.negativeList(params)

            console.log(rsp)

            const {data} = rsp

            if(data.errcode === 1){
                this.setState({
                    list:data.negativeList
                })
            }
        } catch (e) {

        }
    }

    render() {
        console.log("App :",this)
        return (
            <View style={{backgroundColor: 'white',width:'100%',height:'100%'}}>
                {this.state.list.length === 0? <Flex direction={"column"} justify={"center"}>
                    <WhiteSpace size={"xl"}/>
                    <WhiteSpace size={"xl"}/>
                    <Image style={{width: 175, height: 200, resizeMode: "stretch"}}
                           source={require('../images/imageNew/one/record-img.png')}/>
                    <WhiteSpace size={"xl"}/>
                    <Text >你没有负面行为，很赞！</Text>
                </Flex>:
                    <FlatList style={{backgroundColor:'white'}}
                              ItemSeparatorComponent={(h)=>
                                  <View style={{height: 1,width:375,borderBottomWidth: 1,borderBottomColor:'#F2F2F2'}}/>
                              }
                              data={this.state.list}
                              renderItem={({item}, index) => this.renderItem(item,index)}
                    />
                }
            </View>
        )
    }
}