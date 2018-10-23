import React from 'react'
import RentApp from "../components/RentApp";
import {AsyncStorage, FlatList, Image, Text, View} from 'react-native'
import {Flex, WhiteSpace, WingBlank,Toast  } from "antd-mobile-rn";
import api from "../service/api";

export default class NegativeRecord extends RentApp{

    static navigationOptions = {
        title: "负面记录"
    }

    state = {
        list:[]
    }


    constructor(props){
        super(props)
    }

    componentDidMount(){
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

            //Toast.info(params.toString(),1)

            const rsp = await api.negativeList(params)

            console.log(rsp)

            const {data} = rsp

            if(data.errcode === 1){
                this.setState({
                    list:data.negativeList
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        //console.log("App :",this)
        //Toast.info('render',1)
        return (
            <View style={{backgroundColor: 'white',width:'100%',height:'100%'}}>
                {this.state.list.length === 0? <Flex direction={"column"} justify={"center"}>
                        <WhiteSpace size={"xl"}/>
                        <WhiteSpace size={"xl"}/>
                        <Image style={{width: 175, height: 200, resizeMode: "contain"}}
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