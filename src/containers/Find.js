import React from 'react';
import { ScrollView, View, Text, FlatList, AsyncStorage, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { Flex, Icon, WhiteSpace, WingBlank, Toast, Carousel } from 'antd-mobile-rn';
import RentApp from "../components/RentApp";
import api from "../service/api";
import { connect } from 'react-redux'
import { NavigationEvents } from 'react-navigation'


const imgUrl = "https://mobile2.lychee-info.cn/cps-rest/showImg?fileName="

class Find extends RentApp {


    static navigationOptions = {
        title: "发现"
    }

    state = {
        data: [],
        pageNum: 1
    }

    constructor(props) {
        super(props)
    }

    getData = async () => {

        const user = await AsyncStorage.getItem('userInfo')
        console.log(JSON.parse(user))
        try {

            const params = {
                openId: this.openId,
                userId: this.userId,
                provinceCode: this.provinceCode,
                cityCode: this.cityCode,
                pageNum: this.state.pageNum,
                pageSize: 10
            }

            const rsp = await api.findItemList(params)

            console.log(rsp)

            const { data } = rsp
            if (data.errcode === 0) {
                Toast.info(data.errmsg, 2)
            } else {
                //set list to state
                this.setState({
                    data: data.findItemList
                })
            }
        }
        catch (e) {
            Toast.info("服务器开小差了，请稍后再试", 1.5)
        }
    }

    getDetail = async (detailId, itemType) => {
        try {

            const params = {
                openId: this.openId,
                userId: this.userId,
                detailId,
                itemType
                // provinceCode: 844,
                // cityCode: 84401,
                // pageNum: this.state.pageNum,
                // pageSize: 10
            }

            const rsp = await api.findItemDetail(params)

            console.log(rsp)

            const { data } = rsp

            if (data.errcode === 1) {
                this.props.navigation.navigate('FindDetailPage', {
                    detail: data.detailInfo
                })
            }

        } catch (e) {

        }
    }

    renderCarousel(item) {

        const { detailList, itemType } = item;

        if (!detailList) return null

        if (detailList.length <= 0) {
            return null
        } else {
            return (
                <React.Fragment>
                    {detailList.length === 1 ? <TouchableOpacity style={{ width: '100%', height: 200 }}
                        onPress={() => this.getDetail(detailList[0].detailId, itemType)}>
                        <Image resizeMode={'stretch'} style={{ width: '100%', height: 190 }}
                            source={{ uri: `${imgUrl}${detailList[0].imagePath}` }} />
                    </TouchableOpacity> :
                        <Carousel selectedIndex={2}
                            autoplay
                            infinite
                            afterChange={this.onHorizontalSelectedIndexChange}
                            style={{ width: '100%', height: 190 }}>
                            {
                                detailList.map((item, index) => {
                                    return (

                                        <TouchableOpacity style={{ width: '100%', height: 200 }}
                                            onPress={() => this.getDetail(item.detailId, itemType)}>
                                            <Image resizeMode={'stretch'} style={{ width: '100%', height: 190 }}
                                                source={{ uri: `${imgUrl}${item.imagePath}` }} />
                                        </TouchableOpacity>
                                    )
                                })

                            }
                        </Carousel>}

                    <WhiteSpace size={"md"} />
                </React.Fragment>
            )
        }
    }

    renderArtical(item) {
        const { detailList, itemType } = item;

        if (detailList.length === 0) return null

        const content = detailList[0]

        return (

            <TouchableOpacity style={{ width: '100%', backgroundColor: 'white', borderBottomColor: '#EAEEEF', borderBottomWidth: 10 }}
                onPress={() => this.getDetail(content.detailId, itemType)}>
                <WhiteSpace size={"md"} />
                <WingBlank size={"md"}>
                    <Flex direction={"row"} justify={"around"}>
                        <Text style={{ width: 216 }}>{content.leftText}</Text>
                        <Image resizeMode={"stretch"} style={{ width: 120, height: 70 }}
                            source={{ uri: `${imgUrl}/${content.imagePath}` }}></Image>
                    </Flex>
                </WingBlank>
                <WhiteSpace size={"md"} />

            </TouchableOpacity>
        )
    }

    renderPictures(item) {
        const { imageList, textList, itemType } = item;

        return (
            <TouchableOpacity style={{ width: '100%', backgroundColor: 'white', borderBottomColor: '#EAEEEF', borderBottomWidth: 10 }}
                onPress={() => this.getDetail(textList[0].detailId, itemType)}>
                <WhiteSpace size={"md"} />
                <WingBlank size={"md"}>
                    <Flex style={{ width: '100%' }} direction={"column"}>
                        <Text style={{ width: '100%', textAlign: 'left' }}>{textList[0].topText}</Text>
                        <WhiteSpace size={"md"} />
                        <Flex style={{ width: '100%' }} direction={"row"} justify={"between"}>
                            {
                                imageList.map((item, index) => {
                                    if (index <= 2) {
                                        if (index === 2) {
                                            return <ImageBackground resizeMode={"contain"}
                                                style={{ width: 115, height: 70, position: 'relative' }}
                                                source={{ uri: `${imgUrl}/${item.imagePath}` }}>
                                                <Text style={{ color: 'white', position: 'absolute', right: 10, bottom: 5 }}>{`${imageList.length} 图`}</Text>
                                            </ImageBackground>
                                        }
                                        return (
                                            <Image resizeMode={"contain"}
                                                style={{ width: 115, height: 70 }}
                                                source={{ uri: `${imgUrl}/${item.imagePath}` }} />
                                        )
                                    }
                                })
                            }
                        </Flex>
                    </Flex>

                </WingBlank>
                <WhiteSpace size={"md"} />

            </TouchableOpacity>
        )
    }

    renderItem(Item) {
        const { item } = Item
        console.log("Item", item)
        if (item.itemType === 1) {
            return this.renderCarousel(item)
        }
        if (item.itemType === 2) {
            return this.renderArtical(item)
        }
        if (item.itemType === 3) {
            return this.renderPictures(item)
        }
    }


    render() {

        const { find } = this.props

        if (this.props.isFocused) {

        }


        return (
            <View style={{ width: '100%' }}>
                <NavigationEvents
                    onWillFocus={payload => this.props.dispatch({
                        type: "QUERY_FIND_LIST"
                    })}
                    onDidFocus={payload => console.log('did focus', payload)}
                    onWillBlur={payload => console.log('will blur', payload)}
                    onDidBlur={payload => console.log('did blur', payload)}
                />
                {find.length === 0 ?
                    <Flex direction={"column"} justify={'center'} align={"center"}>
                        <WhiteSpace size={"lg"} />

                        <Image resizeMode={"stretch"} style={{ width: 153, height: 160 }} source={require('../images/imageNew/one/gift.png')} />
                        <WhiteSpace size={"md"} />
                        <Text style={{ width: 200,color:'gray'}}>该城市暂无发现内容，请切换城市后重试</Text>
                    </Flex> :
                    <FlatList data={find} renderItem={this.renderItem.bind(this)} style={{ width: '100%' }} />
                }
            </View>
        )
    }
}

const stateToProps = state => ({
    find: state.find.data
})

export default connect(stateToProps)(Find)