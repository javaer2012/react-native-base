import React from 'react'
import {View, Text, AsyncStorage, FlatList,TouchableOpacity,Image,Dimensions,ActivityIndicator} from 'react-native'
import {Flex,WingBlank,WhiteSpace,Toast} from 'antd-mobile-rn'
import RentApp from "../components/RentApp";
import api, {HTTP_IMG} from "../service/api";
import Spinner from 'react-native-loading-spinner-overlay'
import Button from '../components/common/Button'


const a = 0


export default class MyCollections extends RentApp{

    static navigationOptions = {
        title:'我的收藏'
    }

    state = {
        list:[],
        loading:false
    }

    constructor(props){
        super(props)

        const {height, width} = Dimensions.get('window');
        this.width = width;
        this.height = height;
        console.log(this)
    }

    componentDidMount(){
        setTimeout(()=>this.initData(),0)
    }

    async initData(){
        try{

            await this.setState({
                loading:true
            })
            const user = await AsyncStorage.multiGet(['userId', 'openId', 'isBinding', 'addressInfos'])

            const params = {
                userId:this.userId,
                openId:this.openId,
                cityCode:84401,
                provinceCode:844
            }
            console.log(params)
            const rsp = await api.myCollect(params)

            console.log(rsp)

            const {data} = rsp
            if(data.errcode === 1){
                this.setState({
                    list:data.collectList
                })
            }
        } catch (e) {

        } finally {
            await this.setState({
                loading:false
            })
        }
    }

    renderCollection(item,index){
        return <WingBlank size={"md"} >
            <Flex key={index} direction={"row"}>
                <Image resizeMode={"contain"} style={{width:100,height:100}} source={{uri:`${HTTP_IMG}${item.imagePath}`}}/>
               <WingBlank size={"md"}>
                   <Flex direction={"column"} align={"start"}>
                       <Text numberOfLines={2} style={{width:241}}>{item.goodsName}</Text>
                       <WhiteSpace size={"sm"}/>
                       <Text numberOfLines={2} style={{color:'#989898',fontSize:12,width:242}}>{item.goodsDesc}</Text>
                       <WhiteSpace size={"sm"}/>

                       <Flex direction={"row"}  justify={"between"} style={{width:241}}>
                           <Text style={{width:100,color:'red',fontSize:20}}>{`￥${item.price}`}</Text>
                           <TouchableOpacity onPress={()=>Toast.loading(`${a+1} hello`,0,null,false)}>
                               <Text style={{width:70,height:26,lineHeight:26,fontSize:10, textAlign:'center',borderColor:'#989898',borderRadius:4,borderWidth:1}}>取消收藏</Text>
                           </TouchableOpacity>
                       </Flex>

                       <WhiteSpace size={"md"}/>

                   </Flex>
               </WingBlank>
            </Flex>
        </WingBlank>
    }

    render(){
        return <View>

            {this.state.list.length >0 ?  <FlatList style={{backgroundColor:'white'}}
                                                    ItemSeparatorComponent={(h)=>
                                                        <View style={{height: 1,width:375,borderBottomWidth: 1,borderBottomColor:'#F2F2F2'}}/>
                                                    }
                                                    data={this.state.list}
                                                    renderItem={({item}, index) =>this.renderCollection(item,index)}
            />:
            <Flex direction={"column"} justify={"center"} align={"center"} style={{marginTop:73}}>
                <Image style={{width:153,height:160}} source={require('../images/noCollect.png')}/>
                <WhiteSpace size={"md"}/>
                <Text>收藏夹里没有商品是件很悲伤的事情</Text>
                <WhiteSpace size={"md"}/>

                <Text style={{color:'#989898'}}>赶紧去逛逛~</Text>
                <WhiteSpace size={"xl"}/>

                <Button
                    style={{width:166,height:45,lineHeight: 45,borderRadius: 2,backgroundColor:'#F5475F',color:'white',fontSize:18}}
                >去逛逛</Button>

            </Flex>
            }



        </View>
    }
}