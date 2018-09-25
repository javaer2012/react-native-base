import React from 'react';
import {ScrollView, View, Text, FlatList, AsyncStorage, StyleSheet, TouchableOpacity} from 'react-native';
import {Flex, Icon, WhiteSpace, WingBlank, SearchBar} from 'antd-mobile-rn';
import api from "../service/api";
import ProudcuItem from "../components/ProudcuItem";
import Spinner from 'react-native-loading-spinner-overlay'


const styles = StyleSheet.create({
    tag: {
        paddingVertical: 11,
        paddingHorizontal: 20,
        backgroundColor: '#F4F4F4',
        borderRadius: 4,
        marginVertical: 5,
        marginHorizontal: 5
    }
})

export default class Search extends React.Component {
    static navigationOptions = {
        title: "搜索"
    }

    state = {
        value: '',
        products: [],
        keywords:[],
        latest:[],
        pageNum:1,
        pageSize:10,
        refreshing:false,
        loadMore:''
    }


    componentDidMount(){
        this.getHotKeywords()
        this.getLatestKeyword()
    }

    getLatestKeyword = async()=>{
        try{

            const rsp = await AsyncStorage.getItem("latestKeywords")
            if(rsp !== null){
                this.setState({
                    latest:JSON.parse(rsp)
                })
            }
            console.log(rsp)
        }catch (e) {

        }
    }

    getHotKeywords = async () => {
        try{
            //await AsyncStorage.removeItem('latestKeywords')

            const params = {
                cityCode:84401,
                provinceCode:844
            }

            const rsp = await api.getHotWord(params)

            console.log(rsp)

            const {data} = rsp;

            if(data.errcode === 1){
                this.setState({
                    keywords:data.hotWordList
                })
            }

        } catch (e) {

        }
    }

    queryGoodsByKeyWords = async (clean)=>{
        try{
            await this.setState({
                refreshing: true,
            })

            const params = {
                cityCode:84401,
                provinceCode: 844,
                keyWord:this.state.value,
                pageNum:clean?1:this.state.pageNum,
                pageSize:this.state.pageSize
            }

            const rsp = await api.queryGoodsByKeyWord(params)
            //await AsyncStorage.removeItem('latestKeywords')

            console.log(rsp)
            const latestString = await AsyncStorage.getItem('latestKeywords')
            const latest = JSON.parse(latestString) || []

            let dupplicate = false;
            latest.forEach(item=>{
                if(item.name === this.state.value) dupplicate = true
            })
            if(!dupplicate)
                latest.push({
                    name:this.state.value
                })

            await AsyncStorage.setItem('latestKeywords',JSON.stringify(latest))

            const { data: { errcode, goodsList, totalPage } } = rsp || {}
            if (errcode === 1) {
                const loadMore = goodsList.length > 0 ? 'loadMore' : 'loadMoreEmpty';

                const newGoods = clean?[...goodsList]:[...this.state.products,...goodsList]
                this.setState({
                    products: newGoods,
                    totalPage,
                    loadMore
                })
            } else{
                // throw('出错')
            }



        }catch (e) {

        } finally {
            await this.setState({
                refreshing:false
            })
        }
    }

    hasDo = false

    loadMoreFun = async (pageNum) => {
        // debugger
        this.hasDo = true
        await this.setState({
            pageNum
        })
        console.log(999)
        await this.queryGoodsByKeyWords()
        this.hasDo = false

    }

    _renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                key={item.id}
                onPress={() => this.props.navigation.navigate('ProductListPage',{})}
            >
                <ProudcuItem imageStyle={{ width: 100, height: 100 }} data={item}>
                    {/* <Button style={{ width: 80, backgroundColor: Color.mainPink }} size='small'>
                  <Text style={{ color: '#fff' }}>去购买</Text>
                </Button> */}
                </ProudcuItem>
            </TouchableOpacity>
        )
    }

    renderFooter = () => {
        // return (
        //   <Text>333</Text>
        // )
        const { products, loadMore } = this.state
        if (products.length != 0 && loadMore == 'loadMore') {
            return (
                <View style={{
                    height: 44,
                    backgroundColor: 'rgb(200,200,200)',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text>{'正在加载....'}</Text>
                </View>
            )
        } else if (loadMore == 'loadMoreEmpty') {
            return (
                <View style={{
                    height: 44,
                    backgroundColor: 'rgb(200,200,200)',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text>{'暂无更多'}</Text>
                </View>
            )
        } else {
            return null
        }

    }


    render() {
        return (
            <View style={{width: '100%', backgroundColor: 'white'}}>
                <Spinner visible={this.state.refreshing} textContent={"正在加载"}/>

                <SearchBar style={{width: '100%', backgroundColor: 'white', color: 'black'}}
                           value={this.state.value} onChange={(value)=>this.setState({value})}
                           onSubmit={()=>this.queryGoodsByKeyWords(true)}/>

                {this.state.products.length === 0? <View>
                    {this.state.latest.length >0?<WingBlank size={"md"} style={{backgroundColor: 'white'}}>
                        <WhiteSpace size={"xl"}/>
                        <Text>历史搜索</Text>
                        <WhiteSpace size={"md"}/>

                        <Flex direction={"row"} justify={"start"} wrap={"wrap"}>
                            {this.state.latest.map((item,index)=> <Text key={index} style={styles.tag}>{item.name}</Text>)}

                        </Flex>
                    </WingBlank>:null}

                    <WhiteSpace size={"xl"}/>

                    {this.state.keywords.length >0 ?<WingBlank size={"md"} style={{backgroundColor: 'white'}}>
                        <WhiteSpace size={"xl"}/>
                        <Text>热门搜索</Text>
                        <WhiteSpace size={"md"}/>

                        <Flex direction={"row"} justify={"start"} wrap={"wrap"}>
                            {this.state.keywords.map((item,index)=>
                                <Text key={index} style={styles.tag}>{item.key_name}</Text>)}
                        </Flex>
                    </WingBlank>:null}
                </View>:
                    <FlatList style={{backgroundColor: 'white',width:'100%'}}
                              data={this.state.products}
                              extraData={this.state}
                              renderItem={this._renderItem}
                              onEndReached={() => {
                                  if (this.hasDo) {
                                      return false
                                  }
                                  this.loadMoreFun( this.state.pageNum + 1)
                              }}
                              ListFooterComponent={this.renderFooter}//尾巴

                    ></FlatList>
                }
            </View>
        )
    }
}