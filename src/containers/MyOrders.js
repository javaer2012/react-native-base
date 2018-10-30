import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, Image, ImageBackground, AsyncStorage } from 'react-native';
import { List, InputItem, Toast, WingBlank, WhiteSpace, Flex } from 'antd-mobile-rn';
import api, { HTTP_IMG } from "../service/api";
import RentApp from "../components/RentApp";
import { connect } from 'react-redux'
import { newCardStyle } from '../antdStyle'

const Item = List.Item

class MyOrders extends RentApp {
    static navigationOptions = {
        title: "我的订单"
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'QUERY_ORDER_LIST'
        })
    }

    state = {
        orderList: []
    }

    async initData() {
        try {

            this.setState({
                loading: true
            })
            const user = await AsyncStorage.multiGet(['userId', 'openId', 'isBinding', 'addressInfos'])

            const params = {
                userId: this.userId,
                openId: this.openId,
                cityCode: this.cityCode,
                provinceCode: this.provinceCode
            }
            console.log(params)
            const rsp = await api.myOrderList(params)

            console.log(rsp)

            const { data } = rsp
            if (data.errcode === 1) {
                this.setState({
                    orderList: data.orderList
                })
            }
        } catch (e) {

        } finally {
            this.setState({
                loading: false
            })
        }
    }

    onFootClick = (item) => {
        console.log(JSON.stringify(item), '=======> 订单信息')

        // Toast.info(item.goodsName,1)
        const { navigate } = this.props.navigation
        navigate('MyInstallmentPage', {
            orderId: item.orderId,
            orderSn: item.orderSn,
            activeId: item.activeId
        })
    }

    renderItem(item) {

        if (item.csStatus === 3) return null

        const goosSku = JSON.parse(item.goodsSkus)

        let payText = "",
            ordertext = ""

        switch (item.payStatus) {
            case 1:
                payText = "待支付"
                break

            case 2:
                payText = "已支付"
                break

            case 3:
                payText = "已退款"
                break
        }

        switch (item.orderStatus) {
            case 1:
                ordertext = "已下单"
                break
            case 11:
                ordertext = '营业员扫码办理中'
                break
            default:
                ordertext = '已办理'
        }
        return <List
            key={item.orderId}
            renderHeader={() => <Text style={{ color:'#282828',height: 46, lineHeight: 46, fontSize: 15, paddingHorizontal: 15 }}>{`订单流水号:${item.orderSn}`}</Text>}
            style={{ backgroundColor: 'white', borderRadius: 4, marginBottom: 15 }}>
            <Item underlayColor="#FFF">
                <TouchableOpacity 
                    underlayColor="#FFF"
                    onPress={() => this.props.navigation.navigate('OrderInfo', {
                    orderId: item.orderId,
                    orderSn: item.orderSn
                })}>
                    <Flex direction={"row"} align={"start"}>
                        <ImageBackground style={{ backgroundColor: '#F4F3F4', width: 81, height: 100 }}>
                            <Flex justify={"center"} align={"center"} style={{ height: 100 }}>
                                <Image style={{ width: 68, height: 78 }} source={{ uri: `${HTTP_IMG}${item.goodsImage}` }} />

                            </Flex>
                        </ImageBackground>

                        <WingBlank size={"md"}>
                            <Flex direction={"column"} justify={"start"} align={"start"}>
                                <WhiteSpace size={"sm"} />
                                <Text numberOfLines={2} style={{ width: 241,fontSize:18 }}>{`${item.goodsName}`}</Text>
                                <WhiteSpace size={"sm"} />

                                {goosSku.skuJson.map((item, index) => {
                                    let color = {color:'#989898'};
                                   return <Text style={color} key={index}>{`${item.pSkuName}:${item.cSkuName}`}</Text>}
                                )}
                                <WhiteSpace size={"sm"} />

                                <Text style={{color:"#E75B89"}}>{`价格:￥${item.goodsPrice}`}</Text>
                                <WhiteSpace size={"sm"} />

                                <View style={{ borderBottomWidth: 1, borderBottomColor: '#E9E8E8', width: '100%' }}></View>

                                <WhiteSpace size={"sm"} />

                                <Text>{`首付总金额:￥${item.totalFirstAmount}`}</Text>
                                <WhiteSpace size={"sm"} />


                                <Text>{`分期利率:${item.stageMonthRate}`}</Text>
                                <WhiteSpace size={"sm"} />



                                <Text>{`分期金额:￥${item.eachStageAmount}x${item.stagePeriods}`}</Text>
                                <WhiteSpace size={"sm"} />

                                <Text>{`应还款总金额:￥${item.totalStageAmount}`}</Text>
                                <WhiteSpace size={"sm"} />

                                <Flex direction={"row"}>
                                    <Text>支付状态:</Text>
                                    <Text style={{ color: '#E75B89' }}>{`${payText}`}</Text>
                                </Flex>
                                <WhiteSpace size={"sm"} />

                                <Flex direction={"row"}>
                                    <Text>订单状态:</Text>
                                    <Text style={{ color: '#E75B89' }}>{`${ordertext}`}</Text>

                                </Flex>


                            </Flex>
                        </WingBlank>

                    </Flex>
                </TouchableOpacity>

            </Item>
            {item.payStatus === 1 ? <Item arrow={"horizontal"} onClick={() => this.onFootClick(item)}>
                立即支付
            </Item> : null}

            {item.payStatus === 2 ? <Item style={{color:'#E9E8E8',fontSize:12}} arrow={"horizontal"} onClick={() => this.onFootClick(item)}>
                    <Text style={{color:'#989898',fontSize:12}}>查看我的分期</Text>
            </Item> : null}


        </List>
    }

    render() {

        const { orderList } = this.props

        return (
            <ScrollView>
                <WhiteSpace size={"lg"} />

                {orderList.length > 0 ?
                    <WingBlank size={"md"}>
                        {orderList.map((item, index) => this.renderItem(item))}
                    </WingBlank>
                    : <Flex direction={"column"} justify={"center"} align={"center"} style={{ marginTop: 73 }}>
                        <Image style={{ width: 153, height: 160 }} source={require('../images/noCollect.png')} />
                        <WhiteSpace size={"md"} />
                        <Text>订单记录里没有商品是件很悲伤的事情</Text>
                        <WhiteSpace size={"md"} />

                    </Flex>}
            </ScrollView>
        )
    }
}

const stateToProps = state => ({
    orderList: state.order.order
})

export default connect(stateToProps)(MyOrders)