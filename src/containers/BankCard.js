import React from 'react'
import {View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, AsyncStorage} from 'react-native'
import {Flex, WhiteSpace, WingBlank,Toast} from 'antd-mobile-rn'
import RentApp from "../components/RentApp";
import api from "../service/api";
import { connect } from "react-redux";


const styles = StyleSheet.create({
    img: {
        width: 157,
        height: 118
    },
    unbind: {
        textAlign: 'center',
        borderColor: 'white',
        borderWidth: 1,
        backgroundColor: null,
        color: 'white',
        width: 85,
        height: 21,
        lineHeight: 21,
        fontSize: 12,
        borderRadius: 12
    }
})

class BankCard extends RentApp {

    static navigationOptions = {
        title:'我的银行卡'
    }

    state = {
        loading: false
    }

    constructor(props) {
        super(props)

        this.activeId = props.navigation.getParam('activeId', "")
        this.productId = props.navigation.getParam('productId', "")
    }

    componentDidMount() {

        this.props.dispatch({
            type:'INIT_BANK_CARD'
        })

    }

    render() {

        const {cardInfo} = this.props
        if (!cardInfo) return null
        return (
            <View>
                <WhiteSpace size={"lg"}/>
                {Object.keys(cardInfo).length > 0 ?
                    <View>
                        <ImageBackground style={{width: '100%', height: 190, borderRadius: 6}}
                                         source={require('../images/bank/back.png')}>
                            <WingBlank size={"lg"}>
                                <Flex direction={"column"} align={"start"}>
                                    <WhiteSpace size={"xl"}/>
                                    <Flex direction={"row"} justify={"between"} style={{width: '100%'}}>
                                        <Text style={{
                                            color: '#FFFFFF',
                                            height: 14,
                                            lineHeight: 14,
                                            fontSize: 14,
                                            opacity: 0.9
                                        }}>发卡银行</Text>
                                       <TouchableOpacity onPress={()=>this.props.navigation.navigate('ChangePSWPage')}>
                                           <Text style={styles.unbind}>解除绑定</Text>
                                       </TouchableOpacity>

                                    </Flex>
                                    <WhiteSpace size={"xl"}/>

                                    <Text style={{
                                        color: '#FFFFFF',
                                        fontSize: 22,
                                        height: 22,
                                        lineHeight: 22
                                    }}>{cardInfo.bankName}</Text>
                                    <WhiteSpace size={"xl"}/>

                                    <Text style={{
                                        color: '#FFFFFF',
                                        height: 14,
                                        lineHeight: 14,
                                        fontSize: 14,
                                        opacity: 0.9
                                    }}>银行卡号</Text>
                                    <WhiteSpace size={"xl"}/>

                                    <Text
                                        style={{color: '#FFFFFF', fontSize: 18, height: 18, lineHeight: 18}}>
                                        {`**** **** **** ${cardInfo && cardInfo.cardNumber && cardInfo.cardNumber.substring(12, 16)}`}</Text>
                                    <WhiteSpace size={"xl"}/>

                                </Flex>
                            </WingBlank>
                        </ImageBackground>
                        <WhiteSpace size={"md"}/>

                        <ImageBackground style={{width: '100%', height: 47, borderRadius: 6, resizeMode: 'contain'}}
                                         source={require('../images/bank/border.png')}>
                            <WingBlank size={"lg"}>
                                <TouchableOpacity onPress={()=>this.props.navigation.navigate("AddBankCardPage")}>
                                    <Flex direction={"row"} justify={"center"} align={"center"}>
                                        <Image style={{width: 30, height: 30}}
                                               source={require('../images/bank/add.png')}/>
                                        <Text>添加银行卡</Text>
                                    </Flex>
                                </TouchableOpacity>
                            </WingBlank>
                        </ImageBackground>
                    </View> :
                    <Flex direction={"column"} justify={"start"} align={"center"}>
                        <Image style={styles.img} source={require('../images/backCard/card.png')}/>

                        <WhiteSpace size={"md"}/>

                        <Text>您未绑定银行卡，快去绑定吧</Text>

                        <WhiteSpace size={"lg"}/>

                        <ImageBackground style={{width: 320, height: 47, paddingTop: 8}}
                                         source={require('../images/backCard/dot.png')}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("AddBankCardPage", {
                                activeId: this.activeId,
                                productId: this.productId
                            })}>
                                <Flex direction={"row"} justify={"center"} align={"center"}>
                                    <Image style={{width: 30, height: 30}}
                                           source={require('../images/backCard/add.png')}/>
                                    <Text>添加银行卡</Text>
                                </Flex>
                            </TouchableOpacity>
                        </ImageBackground>
                    </Flex>}
            </View>
        )
    }
}

const stateToProps =(state)=>{
    console.log(state)
    return {
        provinceCode: state.locationReducer.locationInfos.provinceCode,
        cityCode: state.locationReducer.locationInfos.cityCode,
        openId: state.app.openId,
        userId: state.app.userId,
        cardInfo:state.bankCard.cardInfo
    }
}

export default connect(stateToProps)(BankCard)