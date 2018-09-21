import React from 'react';
import {ScrollView,View,Text,FlatList,AsyncStorage,Image} from 'react-native';
import {Flex,Icon,WhiteSpace,WingBlank,Toast,Carousel} from 'antd-mobile-rn';
import RentApp from "../components/RentApp";
import api from "../service/api";


const imgUrl = "https://mobile2.lychee-info.cn/cps-rest/showImg?fileName="

export default class Find extends RentApp{


    static navigationOptions = {
        title:"发现"
    }

    state = {
        data:[]
    }

    constructor(props){
        super(props)


    }

    getData = async ()=>{

        const user = await AsyncStorage.getItem('userInfo')
        console.log(JSON.parse(user))
        try{

            const params = {
                openId:this.openId,
                userId:this.userId,
                provinceCode:844,
                cityCode:84401,
                pageNum:1,
                pageSize:10
            }

            const rsp = await api.findItemList(params)

            console.log(rsp)

            const {data} = rsp
            if(data.errcode === 0){
                Toast.info(data.errmsg,2)
            } else {
                //set list to state
                this.setState({
                    data:data.findItemList
                })
            }
        }
        catch (e) {

        }
    }

    renderCarousel(item){

        const {detailList} = item;

        if(detailList.length < 0){
            return null
        } else {
            return (
                <Carousel infinite={true} autoplay={true} style={{width:'100%',height:190}}>
                    {
                        detailList.map((item,index)=>{
                            return (
                               <View style={{width:'100%',height:200}}>
                                   <Image resizeMode={'contain'} style={{width:'100%',height:190}} source={{uri:`${imgUrl}${item.imagePath}`}} />
                               </View>
                            )
                        })
                    }
                </Carousel>
            )
        }
    }

    renderArtical(item){

    }

    componentDidMount(){
       setTimeout(()=>this.getData(),0)
    }


    render(){

        const {data} = this.state

        if(data.length === 0) return null

        return(
            <ScrollView>
                <View>
                    {
                        data.map((item,index)=>{
                            if(item.itemType === 1){
                                return this.renderCarousel(item)
                            }
                        })
                    }
                </View>
            </ScrollView>
        )
    }
}