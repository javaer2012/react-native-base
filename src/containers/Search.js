import React from 'react';
import { View, Text, FlatList, Image, AsyncStorage, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Flex, WhiteSpace, WingBlank, SearchBar, InputItem } from 'antd-mobile-rn';
import api from "../service/api";
import ProudcuItem from "../components/ProudcuItem";
import RentApp from "../components/RentApp";
import { connect } from 'react-redux'
import CSearch from '../components/common/CTextInput'


const styles = StyleSheet.create({
    tag: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        backgroundColor: '#F4F4F4',
        borderRadius: 4,
        marginVertical: 5,
        marginHorizontal: 5
    },
    input: {
        borderRadius: 5,
        backgroundColor: 'white',
        borderColor: '#E8E8ED',
        borderWidth: 0.5,
        height: 28,
        fontSize: 14,
        paddingLeft: 5,
        paddingRight: 35,
        marginVertical: 6
    }
})

class Search extends RentApp {
    static navigationOptions = {
        title: "搜索"
    }

    state = {
        value: '',
        products: [],
        keywords: [],
        latest: [],
        pageNum: 1,
        pageSize: 10,
        refreshing: false,
        loadMore: ''
    }


    async componentDidMount() {
        await this.getOpenIdAndUserId()
        this.getHotKeywords()
        this.getLatestKeyword()
    }

    getLatestKeyword = async () => {
        try {

            const rsp = await AsyncStorage.getItem("latestKeywords")
            if (rsp !== null) {
                this.setState({
                    latest: JSON.parse(rsp)
                })
            }
            console.log(rsp)
        } catch (e) {

        }
    }

    getHotKeywords = async () => {
        try {
            //await AsyncStorage.removeItem('latestKeywords')

            const params = {
                cityCode: this.cityCode,
                provinceCode: this.provinceCode
            }

            const rsp = await api.getHotWord(params)

            console.log(rsp)

            const { data } = rsp;

            if (data.errcode === 1) {
                this.setState({
                    keywords: data.hotWordList
                })
            }

        } catch (e) {

        }
    }

    queryGoodsByKeyWords = async (clean) => {
        try {
            await this.setState({
                refreshing: true,
            })

            const params = {
                cityCode: this.cityCode,
                provinceCode: this.provinceCode,
                keyWord: this.state.value,
                pageNum: clean ? 1 : this.state.pageNum,
                pageSize: this.state.pageSize
            }

            const rsp = await api.queryGoodsByKeyWord(params)
            //await AsyncStorage.removeItem('latestKeywords')

            console.log(rsp)
            const latestString = await AsyncStorage.getItem('latestKeywords')
            const latest = JSON.parse(latestString) || []

            let dupplicate = false;
            latest.forEach(item => {
                if (item.name === this.state.value) dupplicate = true
            })
            if (!dupplicate)
                latest.push({
                    name: this.state.value
                })
            // console.log(latest,"@@@@@@22")
            await AsyncStorage.setItem('latestKeywords', JSON.stringify(latest))

            const { data: { errcode, goodsList, totalPage } } = rsp || {}
            if (errcode === 1) {
                const loadMore = goodsList.length > 0 ? 'loadMore' : 'loadMoreEmpty';

                const newGoods = clean ? [...goodsList] : [...this.state.products, ...goodsList]
                this.setState({
                    products: newGoods,
                    totalPage,
                    loadMore
                })
            } else {
                // throw('出错')
            }



        } catch (e) {

        } finally {
            await this.setState({
                refreshing: false
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
                onPress={() => this.props.navigation.navigate('ProductListPage', {})}
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

    searchGoodsFun = async (key) => {

        const latestString = await AsyncStorage.getItem('latestKeywords')
        const latest = JSON.parse(latestString) || []

        let dupplicate = false;
        latest.forEach(item => {
            if (item.name === this.state.value) dupplicate = true
        })
        if (this.state.value) {
            this.props.dispatch({
                type: "ADD_HISTORY_KEYS",
                payload: this.state.value
            })
        }

        //await AsyncStorage.setItem('latestKeywords',JSON.stringify(latest))

        const keyWord = this.state.value
        const { navigate, state } = this.props.navigation;

        this.props.dispatch({
            type: 'SET_SEARCH_KEYWORD',
            payload: keyWord
        })
        navigate('ProductListPage', { keyWord })
        //state.params && state.params.callback && state.params.callback(key);
    }


    searchTag = async tag =>{

        console.log(tag)
        this.props.dispatch({
            type: 'SET_SEARCH_KEYWORD',
            payload: tag
        })

        this.props.navigation.navigate('ProductListPage')
    }


    render() {

        console.log("Search", this.props)
        return (
            <View style={{ width: '100%', backgroundColor: 'white' }}>

                <CSearch style={{ width: '100%', backgroundColor: 'white', color: 'black', borderColor: '#E8E8ED', marginVertical: 6 }}
                    cancelText="搜索"
                    value={this.state.value}
                    onChange={(value) => this.setState({ value })}
                    onSubmit={() => this.searchGoodsFun(this.state.value)}
                    onCancel={() => this.searchGoodsFun(this.state.value)} />

                {this.state.products.length === 0 ? <View>
                    {this.props.historyKeys.length > 0 ? <WingBlank size={"md"} style={{ backgroundColor: 'white' }}>
                        <WhiteSpace size={"xl"} />
                        <Text>历史搜索</Text>
                        <WhiteSpace size={"md"} />

                        <Flex direction={"row"} justify={"start"} wrap={"wrap"}>
                            {Array.from(this.props.historyKeys).reverse().map((item, index) =>
                                <TouchableOpacity key={index} onPress={() => this.searchTag(item)}>
                                    <Text key={index} style={styles.tag}>{item}</Text>
                                </TouchableOpacity>
                            )}

                        </Flex>
                    </WingBlank> : null}

                    <WhiteSpace size={"xl"} />

                    {this.state.keywords.length > 0 ? <WingBlank size={"md"} style={{ backgroundColor: 'white' }}>
                        <WhiteSpace size={"xl"} />
                        <Text>热门搜索</Text>
                        <WhiteSpace size={"md"} />

                        <Flex direction={"row"} justify={"start"} wrap={"wrap"}>
                            {this.state.keywords.map((item, index) =>
                                <TouchableOpacity key={index} onPress={() => this.searchTag(item.key_name)}>
                                    <Text key={index} style={styles.tag}>{item.key_name}</Text>
                                </TouchableOpacity>
                            )}
                        </Flex>
                    </WingBlank> : null}
                </View> :
                    <FlatList style={{ backgroundColor: 'white', width: '100%' }}
                        data={this.state.products}
                        extraData={this.state}
                        renderItem={this._renderItem}
                        onEndReached={() => {
                            if (this.hasDo) {
                                return false
                            }
                            this.loadMoreFun(this.state.pageNum + 1)
                        }}
                        ListFooterComponent={this.renderFooter}//尾巴

                    ></FlatList>
                }
            </View>
        )
    }
}

const stateToProps = state => ({
    historyKeys: state.historyKey.keys
})

export default connect(stateToProps)(Search)