import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    DeviceEventEmitter,
    ImageBackground,
    Platform,
    AsyncStorage, Dimensions
} from 'react-native';
import { List, WingBlank, WhiteSpace, Flex, Toast } from 'antd-mobile-rn';
import Button from "../components/common/Button";
import Canvas from 'react-native-canvas';
import api from "../service/api";
import RentApp from "../components/RentApp";
import { canvasScore } from '../utils/canvas'
import { connect } from 'react-redux'

const { WIDTH, HEIGHT } = Dimensions.get('window')


const styles = StyleSheet.create({
    topBackground: {
        width: WIDTH,
        height: 300,
        resizeMode: 'stretch'
    },
    topBackground1: {
        width: WIDTH,
        height: 220,
        resizeMode: 'stretch'
    },
    topBackground2: {
        width: WIDTH,
        height: 240,
        resizeMode: 'stretch'
    },
    image: {
        width: WIDTH,
        height: 140,
        resizeMode: 'stretch'
    },
    canvasContent: {
        paddingTop: 10,
        paddingLeft: Platform.OS === 'android' ? 55 : 35,
        width: 375
    },
    userIcon: {
        width: 126,
        height: 126
    }
})


class My extends RentApp {
    static navigationOptions = {
        title: "我的"
    }


    constructor(props) {
        super(props)
    }

    componentDidMount() {

        this.props.dispatch({ type: 'MYPAGE_INIT' })
    }

    handleCanvas = (canvas) => {
        if (!canvas) return
        if (canvas) {
            canvas.height = 230;
        }
        const ctx = canvas.getContext('2d');

        const { userInfo } = this.props
        canvasScore(ctx, parseInt(userInfo.userScore), userInfo.lastScoreTime)
    }

    navigateWithLogin(pageName) {
        if (this.props.isLoggedIn === '0' || this.props.isLoggedIn === null) {
            Toast.info("请先登录", 1)
        } else {
            this.props.navigation.navigate(pageName)
        }
    }

    logout = async () => {
        try {
            this.props.dispatch({
                type: 'LOGOUT'
            })
            // DeviceEventEmitter.emit('refreshDataHome')           
            this.props.navigation.replace('MyPage')
        } catch (e) {

        }
    }

    render() {

        const { navigation } = this.props

        console.log(this.props)

        const { userInfo, isLoggedIn } = this.props
        if (!userInfo) return null

        return (
            <ScrollView>
                <Flex direction={"row"}>
                    <Flex.Item>
                        <ImageBackground
                            style={isLoggedIn === '1' ? (userInfo.isCredited ? styles.topBackground : styles.topBackground2) : styles.topBackground1}
                            source={require('../images/my/background.png')}>
                            {isLoggedIn !== "1" && isLoggedIn !== 1 ?
                                <Flex direction={"column"} style={{ width: '100%' }} justify={"center"} align={"center"}>
                                    <Image style={styles.userIcon}
                                        source={require('../images/imageNew/one/userIcon.png')} />
                                    <WhiteSpace size={"xl"} />
                                    <Flex direction={"row"} justify={"around"} style={{ width: 126, height: 45 }}>
                                        <Button
                                            style={{ backgroundColor: null, borderWidth: 1, borderColor: 'white', }}
                                            onClick={() => navigation.navigate('LoginPage')}>登录</Button>
                                    </Flex>
                                </Flex> :
                                <React.Fragment>
                                    {userInfo.isCredited === 1 ?
                                        <Flex direction={"column"} align={"center"} justify={"center"}>
                                            <Flex direction={"row"}
                                                justify={"end"}>
                                                <Flex.Item />
                                                <Flex.Item />

                                                <Flex.Item />

                                                <Flex.Item>
                                                    <WhiteSpace size={"sm"} />
                                                    <Button
                                                        style={{
                                                            width: 50,
                                                            height: 27,
                                                            lineHeight: 27,
                                                            fontSize: 12,
                                                            backgroundColor: null,
                                                            borderColor: 'white',
                                                            borderWidth: 1
                                                        }}
                                                        onClick={() => this.logout()}>
                                                        注销
                                                    </Button>
                                                </Flex.Item>
                                            </Flex>
                                            <Canvas ref={this.handleCanvas.bind(this)} />
                                            <Flex direction={"row"}>
                                                <Flex.Item>
                                                    <Flex direction={"row"} justify={"center"} align={"center"}>
                                                        <Button style={{
                                                            width: 126,
                                                            height: 27,
                                                            lineHeight: 27,
                                                            fontSize: 12,
                                                            backgroundColor: null, borderColor: 'white',
                                                            borderWidth: 1
                                                        }}
                                                            onClick={() => navigation.navigate('ScorePage', {
                                                                score: userInfo.userScore ? userInfo.userScore : 0
                                                            })}>晒晒我的信用分</Button>
                                                    </Flex>
                                                </Flex.Item>

                                                <Flex.Item>
                                                    <Flex direction={"row"} justify={"center"} align={"center"}>
                                                        <Button style={{
                                                            height: 27,
                                                            lineHeight: 27,
                                                            fontSize: 12,
                                                            backgroundColor: null,
                                                            borderColor: 'white',
                                                            borderWidth: 1
                                                        }}
                                                            onClick={() => navigation.navigate('KnowScorePage', {
                                                                score: userInfo.userScore ? userInfo.userScore : 0
                                                            })}>了解我的信用分</Button>
                                                    </Flex>
                                                </Flex.Item>
                                            </Flex>
                                        </Flex> :
                                        <Flex direction={"column"} justify={"center"} align={"center"}>
                                            <Flex direction={"row"}
                                                justify={"end"}>
                                                <Flex.Item />
                                                <Flex.Item />

                                                <Flex.Item />

                                                <Flex.Item>
                                                    <WhiteSpace size={"sm"} />
                                                    <Button
                                                        style={{
                                                            width: 50,
                                                            height: 27,
                                                            lineHeight: 27,
                                                            fontSize: 12,
                                                            backgroundColor: null,
                                                            borderColor: 'white',
                                                            borderWidth: 1
                                                        }}
                                                        onClick={() => this.logout()}>
                                                        注销
                                                    </Button>
                                                </Flex.Item>
                                            </Flex>
                                            <Image style={styles.userIcon}
                                                source={require('../images/imageNew/one/userIcon.png')} />
                                            <WhiteSpace size={"xl"} />
                                            <Flex direction={"row"} justify={"around"}>
                                                <Button
                                                    style={{
                                                        backgroundColor: null,
                                                        borderColor: 'white',
                                                        borderWidth: 1
                                                    }}
                                                    onClick={() => navigation.navigate('AuthApplyPage')}
                                                >立即激活</Button>


                                            </Flex>
                                        </Flex>
                                    }
                                </React.Fragment>

                            }
                        </ImageBackground>
                    </Flex.Item>
                </Flex>


                <Flex direction={'row'} style={{ backgroundColor: 'white' }}>

                    <Flex.Item style={{ width: 128, height: 65, paddingTop: 15 }}>
                        <TouchableOpacity onPress={() => this.navigateWithLogin("MyCollectionsPage")}>
                            <Flex direction={'row'} justify={"center"} align={"center"}>
                                <WingBlank size={"sm"}>
                                    <Image style={{ height: 40, width: 40 }}
                                        source={require('../images/my/favorite.png')} />

                                </WingBlank>
                                <View>
                                    <Text style={{ fontSize: 12, marginBottom: 5 }}>我的收藏</Text>
                                    <Text style={{ fontSize: 10, color: '#989898' }}>点击查看您收藏的宝贝</Text>
                                </View>
                            </Flex>
                        </TouchableOpacity>
                    </Flex.Item>
                    <Flex.Item
                        style={{
                            width: 127,
                            height: 65,
                            paddingTop: 15,
                            borderLeftWidth: 0,
                            borderTop: 5,
                            borderBottom: 5,
                            borderLeftColor: '#989898'
                        }}>
                        <TouchableOpacity onPress={() => this.navigateWithLogin("AuthRecordPage")}>
                            <Flex direction={'row'} justify={"center"}>
                                <WingBlank size={"sm"}>
                                    <Image
                                        style={{ height: 40, width: 40 }}
                                        source={require('../images/my/authHistory.png')} />
                                </WingBlank>

                                <View>
                                    <WhiteSpace size={"xs"} />
                                    <Text style={{ fontSize: 12, marginBottom: 5 }}>信用历史</Text>
                                    <Text style={{ fontSize: 10, color: '#989898' }}>点击查看您的信用历史</Text>
                                </View>
                            </Flex>
                        </TouchableOpacity>
                    </Flex.Item>
                </Flex>

                <WhiteSpace size={'md'} />

                <View style={{ backgroundColor: 'white' }}>
                    <WingBlank size={"sm"}>
                        <WhiteSpace size={'lg'} />
                        <Flex direction={'row'}>
                            <View style={{ width: 2, height: 12, backgroundColor: '#06C1AE', marginRight: 5 }}></View>
                            <Text style={{ color: '#989898', fontSize: 14 }}>信用管理</Text>
                        </Flex>
                        <WhiteSpace size={'sm'} />
                        <Flex direction={'row'} justify={"end"} align={"start"}>
                            <Flex.Item>
                                <TouchableOpacity onPress={() => this.navigateWithLogin("PersonalInfoPage")}>
                                    <Flex direction={"column"} justify={"start"}>
                                        <WhiteSpace size={"sm"} />
                                        <Image style={{ width: 30, height: 30 }}
                                            source={require('../images/my/personalInfo.png')} />
                                        <WhiteSpace size={"sm"} />
                                        <Text style={{ color: "#282828" }}>个人信息</Text>
                                        <WhiteSpace size={"sm"} />
                                    </Flex>
                                </TouchableOpacity>
                            </Flex.Item>

                            <Flex.Item>
                                <TouchableOpacity onPress={() => this.navigateWithLogin("NegativeRecord")}>
                                    <Flex direction={"column"} justify={"start"}>
                                        <WhiteSpace size={"sm"} />
                                        <Image style={{ width: 30, height: 30 }}
                                            source={require('../images/my/bad.png')} />
                                        <WhiteSpace size={"sm"} />
                                        <Text style={{ color: "#282828" }}>负面记录</Text>
                                        <WhiteSpace size={"sm"} />
                                        {
                                            isLoggedIn === '0' && isLoggedIn === null && userInfo.negativeCount !== undefined && userInfo.isCredited === 1 &&
                                            <Text style={{ color: '#07C1AE' }}>{`(${userInfo.negativeCount}个)`}</Text>
                                        }
                                    </Flex>
                                </TouchableOpacity>
                            </Flex.Item>

                            <Flex.Item>
                                <TouchableOpacity onPress={() => Toast.info("敬请期待", 1)}>
                                    <Flex direction={"column"}>
                                        <WhiteSpace size={"sm"} />
                                        <Image style={{ width: 30, height: 30 }}
                                            source={require('../images/my/authCheck.png')} />
                                        <WhiteSpace size={"sm"} />
                                        <Text style={{ color: "#282828" }}>信用互查</Text>
                                        <WhiteSpace size={"sm"} />
                                    </Flex>
                                </TouchableOpacity>
                            </Flex.Item>

                            <Flex.Item>
                                <TouchableOpacity onPress={() => this.navigateWithLogin("MyOrderPage")}>
                                    <Flex direction={"column"}>
                                        <WhiteSpace size={"sm"} />
                                        <Image style={{ width: 30, height: 30 }}
                                            source={require('../images/my/order.png')} />
                                        <WhiteSpace size={"sm"} />
                                        <Text style={{ color: "#282828" }}>我的订单</Text>
                                        <WhiteSpace size={"sm"} />
                                    </Flex>
                                </TouchableOpacity>
                            </Flex.Item>

                            {userInfo.isCreditCard === 1 && isLoggedIn === "1" ? <Flex.Item>
                                <TouchableOpacity onPress={() => this.navigateWithLogin("BackCardPage")}>
                                    <Flex direction={"column"}>
                                        <WhiteSpace size={"sm"} />
                                        <Image style={{ width: 30, height: 30 }}
                                            source={require('../images/myCard.png')} />
                                        <WhiteSpace size={"sm"} />
                                        <Text style={{ color: "#282828" }}>我的银行卡</Text>
                                        <WhiteSpace size={"sm"} />
                                    </Flex>
                                </TouchableOpacity>
                            </Flex.Item> : null}
                        </Flex>
                        <WhiteSpace size={"sm"} />

                    </WingBlank>
                </View>
                <WhiteSpace size={"md"} />

                <List style={{ backgroundColor: 'white' }} renderHeader={
                    <TouchableOpacity onPress={() => this.navigateWithLogin('ProductListPage')}>
                        <WhiteSpace size={"sm"} />
                        <Flex direction={"row"}>
                            <View style={{ width: 2, height: 12, backgroundColor: '#06C1AE', marginRight: 5 }} />
                            <Text style={{ color: '#989898', fontSize: 14 }}>信用生活</Text>
                        </Flex>
                        <WhiteSpace size={"sm"} />
                        <WingBlank size={"md"}>
                            <Image style={styles.image} source={require('../images/my/takePhone.png')} />
                        </WingBlank>

                        <WhiteSpace size={"md"} />
                        <Flex direction={"row"} justify={"center"}>
                            <Text style={{ color: '#06C1AE', fontSize: 14, textAlign: 'center' }}>立即查看</Text>
                        </Flex>
                        <WhiteSpace size={"md"} />

                    </TouchableOpacity>
                }></List>

                <WhiteSpace size={"md"} />

                {userInfo.isStaff === 1 ? <List style={{ backgroundColor: 'white' }} renderHeader={
                    <TouchableOpacity onPress={() => this.navigateWithLogin('WorkerEnter')}>
                        <WhiteSpace size={"sm"} />
                        <Flex direction={"row"}>
                            <View style={{ width: 2, height: 12, backgroundColor: '#06C1AE', marginRight: 5 }} />
                            <Text style={{ color: '#989898', fontSize: 14 }}>营业员入口</Text>
                        </Flex>
                        <WhiteSpace size={"sm"} />
                        <WingBlank size={"md"}>
                            <Image style={styles.image} source={require('../images/my/moreClient.png')} />
                        </WingBlank>
                        <WhiteSpace size={"md"} />
                        <TouchableOpacity>
                            <Flex direction={"row"} justify={"center"}>
                                <Text style={{ color: '#06C1AE', fontSize: 14, textAlign: 'center' }}>立即查看</Text>
                            </Flex>
                        </TouchableOpacity>
                        <WhiteSpace size={"md"} />

                    </TouchableOpacity>
                }></List> :
                    null
                }


            </ScrollView>

        )
    }

}

const stateToProps = (state) => {
    console.log(state)
    return {
        isLoggedIn: state.app.isLoggedIn,
        userInfo: state.my.userInfo,
        provinceCode: state.locationReducer.locationInfos.provinceCode,
        cityCode: state.locationReducer.locationInfos.cityCode,
        openId: state.app.openId,
        userId: state.app.userId
    }
}

export default connect(stateToProps)(My)