import React from 'react'
import {View, Text, AsyncStorage, FlatList,TouchableOpacity,Image,Dimensions} from 'react-native'
import {Flex,WingBlank,WhiteSpace} from 'antd-mobile-rn'
import RentApp from "../components/RentApp";
import api, {HTTP_IMG} from "../service/api";





export default class MyCollections extends RentApp{

    static navigationOptions = {
        title:'我的收藏'
    }

    state = {
        list:[]
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

        }
    }

    renderCollection(item,index){
        return <WingBlank size={"md"} style={{width:this.width}}>
            <Flex key={index} direction={"row"} style={{width:'100%'}}>
                <Image resizeMode={"contain"} style={{width:80,height:90}} source={{uri:`${HTTP_IMG}${item.imagePath}`}}/>
               <WingBlank size={"md"}>
                   <Flex direction={"column"} style={{width:'87%'}} align={"start"}>
                       <Text>{item.goodsName}</Text>
                       <WhiteSpace size={"sm"}/>
                       <Text style={{color:'#989898',fontSize:12,wrap:'wrap'}}>{item.goodsDesc}</Text>
                       <WhiteSpace size={"sm"}/>

                       <View style={{width:'100%',position:'relative',height:25}} >
                           <Text style={{width:100,color:'red',fontSize:20,position:'absolute',left:0}}>{`￥${item.price}`}</Text>
                           <TouchableOpacity>
                               <Text style={{position:'absolute',right:0,width:70,height:20,lineHeight:20,fontSize:10, textAlign:'center',borderColor:'#989898',borderRadius:4,borderWidth:1}}>取消收藏</Text>
                           </TouchableOpacity>
                       </View>

                   </Flex>
               </WingBlank>
            </Flex>
        </WingBlank>
    }

    render(){
        return <View>
            <FlatList style={{backgroundColor:'white'}}
                      ItemSeparatorComponent={(h)=>
                          <View style={{height: 1,width:375,borderBottomWidth: 1,borderBottomColor:'#F2F2F2'}}/>
                      }
                      data={this.state.list}
                      renderItem={({item}, index) =>this.renderCollection(item,index)}
            />
        </View>
    }
}