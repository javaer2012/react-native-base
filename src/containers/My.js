import React, {Component} from 'react';
import {
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    ImageBackground,
    Platform,
    AsyncStorage,Dimensions
} from 'react-native';
import {List, WingBlank, WhiteSpace, Flex,Toast} from 'antd-mobile-rn';
import Button from "../components/common/Button";
import Canvas from 'react-native-canvas';
import api from "../service/api";
import RentApp from "../components/RentApp";
import Spinner from 'react-native-loading-spinner-overlay'

const {WIDTH,HEIGHT} = Dimensions.get('window')


const styles = StyleSheet.create({
    topBackground: {
        width: WIDTH,
        height: 300,
        resizeMode: 'stretch'
    },
    topBackground1:{
        width:WIDTH,
        height:220,
        resizeMode:'stretch'
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

function canvasScore(ctx, getScore, getTime) {
    //初始化-预定义
    var creditTxt = '', mathVal = '';
    var colTxt = "#fff", colLig = '#fff', colBg = '#fff';
    //根据分类来确定每一个需要的颜色、文字和位置
    //其实位置阶梯过度值(mathVal)：140--168--216--264--312--360间隔48,将分比例计算出来需要当前分类的位置（各个阶段值总分差不一样需要注意）
    if (getScore <= 350) {
        creditTxt = "较差";
        mathVal = 120;
    } else if (getScore > 350 && getScore < 550) {
        // colTxt = "#fff";
        // colLig = "#fff";
        // colBg = "#fff";
        creditTxt = "较差";
        mathVal = 140 + (getScore - 350) / 200 * 48;
    } else if (getScore >= 550 && getScore < 600) {
        // colTxt = "#fff";
        // colLig = "#fff";
        // colBg = "#fff";
        creditTxt = "中等";
        mathVal = 168 + (getScore - 550) / 50 * 48;
    } else if (getScore >= 600 && getScore < 650) {
        // colTxt = "#fff";
        // colLig = "#fff";
        // colBg = "#fff";
        creditTxt = "良好";
        mathVal = 216 + (getScore - 600) / 50 * 48;
    } else if (getScore >= 650 && getScore < 700) {
        // colTxt = "#fff";
        // colLig = "#fff";
        // colBg = "#fff";
        creditTxt = "优秀";
        mathVal = 264 + (getScore - 650) / 50 * 48;
    } else if (getScore >= 700 && getScore < 950) {
        // colTxt = "#fff";
        // colLig = "#fff";
        // colBg = "#fff";
        creditTxt = "极好";
        mathVal = 312 + (getScore - 700) / 250 * 48;
    } else if (getScore >= 950) {
        creditTxt = "极好";
        mathVal = 312 + (250) / 250 * 48;
    } else {
        console.log('分数不在正常范围内');
    }
    //画外环
    ctx.beginPath();
    // ctx.lineCap="round";
    ctx.lineWidth = 1;
    ctx.arc(150, 140, 70, 0.84 * Math.PI, 0.16 * Math.PI);
    ctx.strokeStyle = colBg;
    ctx.stroke();
    //画外环
    ctx.beginPath();
    // ctx.lineCap="round";
    ctx.lineWidth = 1;
    ctx.arc(150, 140, 90, 0.84 * Math.PI, 0.16 * Math.PI);
    ctx.strokeStyle = colBg;
    ctx.stroke();
    //画内环
    ctx.beginPath();
    // ctx.lineCap="round";
    ctx.lineWidth = 15;
    ctx.arc(150, 140, 120, 0.835 * Math.PI, 0.165 * Math.PI);
    ctx.stroke();
    //文字-刻度-line
    // ctx.strokeStyle = '#fff';
    // ctx.lineWidth = 1;
    // ctx.beginPath();
    // ctx.moveTo(25,160);
    // ctx.lineTo(150,150);
    // ctx.lineTo(140,35);
    // ctx.moveTo(310,35);
    // ctx.lineTo(150,150);
    // ctx.lineTo(425,160);
    // ctx.stroke();
    //文字-信用度
    ctx.textAlign = "center";
    // ctx.textBaseline = 'hanging'
    ctx.font = "400 14px Arial";
    ctx.fillStyle = colTxt;
    ctx.fillText('信用' + creditTxt, 150, 190);
    //文字-信用数
    ctx.font = "600 35px Arial";
    ctx.fillText(getScore, 150, 150);
    //文字-查询时间
    ctx.font = "200 14px Arial";
    ctx.fillStyle = colLig;
    ctx.fillText('评估时间:' + getTime, 150, 220);

    //文字-刻度
    ctx.font = "200 12px Arial";
    ctx.translate(150, 140);
    ctx.textBaseline = "top";
    var gradText = ['350', '较差', '550', '中等', '600', '良好', '650', '优秀', '700', '极好', '950'];
    for (var i = 0; i < gradText.length; i++) {
        //第一次旋转值是绝对位置(相较原始顶点位置)，第二次旋转相对位置(相较上一次)
        if (i == 0) {
            ctx.rotate(240 * Math.PI / 180);
        } else {
            ctx.rotate(24 * Math.PI / 180);
        }
        //判断奇偶数，颜色有区别
        if (i % 2 == 0) {
            ctx.fillStyle = colTxt;
        } else {
            ctx.fillStyle = colLig;
        }
        //进行填值 半径185
        ctx.fillText(gradText[i], 0, -110);
    }
    //标识当前位置
    ctx.beginPath();
    ctx.fillStyle = colTxt;
    ctx.shadowBlur = 7;
    ctx.shadowColor = colTxt;
    ctx.rotate(mathVal * Math.PI / 180);
    ctx.arc(0, -90, 5, 0, 2 * Math.PI);
    ctx.fill();
};
//canvasScore('Canvas', 200, '2018-08-09');

export default class My extends RentApp {
    static navigationOptions = {
        title: "我的"
    }
    state = {
        loading: false,
        isLoggedIn: '0',
    }

    _state = {...this.state}

    constructor(props) {
        super(props)

        console.log("Page My")

        props.navigation.popToTop()

    }

    async initalState() {

         this.setState({
            loading:true
        })
        try {
            const isLoggedIn =  await AsyncStorage.getItem('isLoggedIn')
            await this.getOpenIdAndUserId()

            await api.unbindBankCard({
                userId:this.userId,
                openId:this.openId,
                cityCode:this.cityCode,
                provCode:this.provinceCode,
                phoneNo:'18501760527',
                verifyCode:'111111'
            })
            console.log(isLoggedIn)

            // const a = await api.unbindBankCard({
            //     openId:this.openId,
            //     userId: this.userId,
            //     provCode:this.provinceCode,
            //     cityCode:this.cityCode,
            //     phoneNo:18501760527,
            //     verifyCode:111111
            // })

            const userId = this.userId,
                openId = this.openId

            const params = {
                userId,
                openId,
                cityCode: this.cityCode,
                provinceCode: this.provinceCode,
            }

            const rsp = await api.getUserInfo(params)

            const {data} = rsp

            console.log(data)

            if (data.errcode === 1) {

                const newState = {
                    isLoggedIn,
                    ...data.userInfo
                }

                console.log(newState)

                this.setState(newState, async () => {
                    console.log("setState")
                    await AsyncStorage.multiSet([['openId', openId], ['userId', userId],['userInfo',JSON.stringify(newState)]])
                })
            }

            console.log(rsp)
        } catch (e) {

        } finally {
             this.setState({
                loading:false
            })
        }
    }

    componentDidMount(){
        setTimeout(()=>this.initalState(),0)
    }

    handleCanvas(canvas) {
        if(!canvas) return
        if (canvas) {
            canvas.height = 230;
        }
        const ctx = canvas.getContext('2d');
        canvasScore(ctx, parseInt(this._state.userScore), this._state.lastScoreTime)
    }

    navigateWithLogin(pageName){
        if(this._state.isLoggedIn === '0' || this._state.isLoggedIn === null){
            Toast.info("请先登录",1)
        } else {
            this.props.navigation.navigate(pageName)
        }
    }

    render() {

        console.log(this.state)

        const {navigation} = this.props

        const a = navigation.getParam('useNavParams'),
            params = navigation.getParam('userInfo',{}),
            paramsFromLogin = navigation.getParam('isLoggedIn',this.state.isLoggedIn),
             _state = {...this._state}
        if(a) {
            Object.assign(_state,{...this.state,...params})
        } else {
            Object.assign(_state,{...this.state})
        }
        this._state = _state

        return (
            <ScrollView>
                <Flex direction={"row"}>
                    <Flex.Item>
                        <ImageBackground style={  _state.isLoggedIn !== '0' && _state.isCredited !== '0'?styles.topBackground:styles.topBackground1} source={require('../images/my/background.png')}>
                            {_state.isLoggedIn !== "1" &&  _state.isLoggedIn !== 1?
                                <Flex direction={"column"} justify={"center"} align={"center"}>
                                    <Image style={styles.userIcon}
                                           source={require('../images/imageNew/one/userIcon.png')}/>
                                    <WhiteSpace size={"xl"}/>
                                    <Flex direction={"row"} justify={"around"}>
                                        <Button style={{backgroundColor:null}} onClick={() => navigation.navigate('LoginPage')}>登录</Button>
                                    </Flex>
                                </Flex> :
                                <React.Fragment>
                                    {_state.isCredited === 1?
                                        <Flex direction={"column"} align={"center"} justify={"center"}>
                                        <Canvas ref={this.handleCanvas.bind(this)}/>
                                        <Flex direction={"row"}>
                                            <Flex.Item>
                                                <Flex direction={"row"} justify={"center"} align={"center"}>
                                                    <Button style={{height: 27, lineHeight: 27, fontSize: 12,backgroundColor:null}}
                                                            onClick={() => navigation.navigate('ScorePage',{
                                                                score:_state.userScore ? _state.userScore : 0
                                                            })}>晒晒我的信用分</Button>
                                                </Flex>
                                            </Flex.Item>

                                            <Flex.Item>
                                                <Flex direction={"row"} justify={"center"} align={"center"}>
                                                    <Button style={{height: 27, lineHeight: 27, fontSize: 12,backgroundColor:null}}
                                                            onClick={() => navigation.navigate('KnowScorePage', {
                                                                score: _state.userScore ? _state.userScore : 0
                                                            })}>了解我的信用分</Button>
                                                </Flex>
                                            </Flex.Item>
                                        </Flex>
                                    </Flex>:
                                        <Flex direction={"column"} justify={"center"} align={"center"}>
                                            <Image style={styles.userIcon}
                                                   source={require('../images/imageNew/one/userIcon.png')}/>
                                            <WhiteSpace size={"xl"}/>
                                            <Flex direction={"row"} justify={"around"}>
                                                <Button onClick={() => navigation.navigate('AuthApplyPage')}>立即激活</Button>


                                            </Flex>
                                        </Flex>
                                    }
                                </React.Fragment>

                            }
                        </ImageBackground>
                    </Flex.Item>
                </Flex>


                <Flex direction={'row'} style={{backgroundColor: 'white'}}>

                    <Flex.Item style={{width: 128, height: 65, paddingTop: 15}}>
                       <TouchableOpacity onPress={()=>this.navigateWithLogin("MyCollectionsPage")}>
                           <Flex direction={'row'} justify={"center"} align={"center"}>
                               <WingBlank size={"sm"}>
                                   <Image style={{height: 40, width: 40}}
                                          source={require('../images/my/favorite.png')}/>

                               </WingBlank>
                               <View >
                                   <Text style={{fontSize: 12, marginBottom: 5}}>我的收藏</Text>
                                   <Text style={{fontSize: 10, color: '#989898'}}>点击查看您收藏的宝贝</Text>
                               </View>
                           </Flex>
                       </TouchableOpacity>
                    </Flex.Item>
                    <Flex.Item
                        style={{width: 127, height: 65, paddingTop: 15, borderLeftWidth: 1,borderTop:5,borderBottom:5, borderLeftColor: '#989898'}}>
                       <TouchableOpacity onPress={()=>this.navigateWithLogin("AuthRecordPage")}>
                           <Flex direction={'row'} justify={"center"}>
                               <WingBlank size={"sm"}>
                                   <Image
                                       style={{height: 40, width: 40}}
                                       source={require('../images/my/authHistory.png')}/>
                               </WingBlank>

                               <View >
                                   <WhiteSpace size={"xs"}/>
                                   <Text style={{fontSize: 12, marginBottom: 5}}>信用历史</Text>
                                   <Text style={{fontSize: 10, color: '#989898'}}>点击查看您的信用历史</Text>
                               </View>
                           </Flex>
                       </TouchableOpacity>
                    </Flex.Item>
                </Flex>

                <WhiteSpace size={'lg'}/>

                <View style={{backgroundColor: 'white'}}>
                    <WingBlank size={"sm"}>
                        <WhiteSpace size={'lg'}/>
                        <Flex direction={'row'}>
                            <View style={{width: 2, height: 12, backgroundColor: '#06C1AE', marginRight: 5}}></View>
                            <Text style={{color: '#989898', fontSize: 14}}>信用管理</Text>
                        </Flex>
                        <WhiteSpace size={'sm'}/>
                        <Flex direction={'row'} justify={"end"} align={"start"}>
                            <Flex.Item>
                                <TouchableOpacity onPress={() =>this.navigateWithLogin("PersonalInfoPage")}>
                                    <Flex direction={"column"} justify={"start"} >
                                        <WhiteSpace size={"sm"}/>
                                        <Image style={{width: 30, height: 30}}
                                               source={require('../images/my/personalInfo.png')}/>
                                        <WhiteSpace size={"sm"}/>
                                        <Text>个人信息</Text>
                                        <WhiteSpace size={"sm"}/>
                                    </Flex>
                                </TouchableOpacity>
                            </Flex.Item>

                            <Flex.Item>
                                <TouchableOpacity onPress={() => this.navigateWithLogin("NegativeRecord")}>
                                    <Flex direction={"column"} justify={"start"} >
                                        <WhiteSpace size={"sm"}/>
                                        <Image style={{width: 30, height: 30}}
                                               source={require('../images/my/bad.png')}/>
                                        <WhiteSpace size={"sm"}/>
                                        <Text>负面记录</Text>
                                        <WhiteSpace size={"sm"}/>
                                        {
                                            _state.negativeCount !== undefined && this.state.isCredited === 1 && <Text style={{color:'#07C1AE'}}>{`(${this.state.negativeCount }个)`}</Text>
                                        }
                                        </Flex>
                                </TouchableOpacity>
                            </Flex.Item>

                            <Flex.Item>
                                <TouchableOpacity onPress={() => Toast.info("敬请期待",1)}>
                                    <Flex direction={"column"}>
                                        <WhiteSpace size={"sm"}/>
                                        <Image style={{width: 30, height: 30}}
                                               source={require('../images/my/authCheck.png')}/>
                                        <WhiteSpace size={"sm"}/>
                                        <Text>信用互查</Text>
                                        <WhiteSpace size={"sm"}/>
                                    </Flex>
                                </TouchableOpacity>
                            </Flex.Item>

                            <Flex.Item>
                                <TouchableOpacity onPress={() => this.navigateWithLogin("MyOrderPage")}>
                                    <Flex direction={"column"}>
                                        <WhiteSpace size={"sm"}/>
                                        <Image style={{width: 30, height: 30}}
                                               source={require('../images/my/order.png')}/>
                                        <WhiteSpace size={"sm"}/>
                                        <Text>我的订单</Text>
                                        <WhiteSpace size={"sm"}/>
                                    </Flex>
                                </TouchableOpacity>
                            </Flex.Item>

                            {_state.isCreditCard === 1?  <Flex.Item>
                                <TouchableOpacity onPress={() => this.navigateWithLogin("BackCardPage")}>
                                    <Flex direction={"column"}>
                                        <WhiteSpace size={"sm"}/>
                                        <Image style={{width: 30, height: 30}}
                                               source={require('../images/myCard.png')}/>
                                        <WhiteSpace size={"sm"}/>
                                        <Text>我的银行卡</Text>
                                        <WhiteSpace size={"sm"}/>
                                    </Flex>
                                </TouchableOpacity>
                            </Flex.Item>:null}
                        </Flex>
                        <WhiteSpace size={"sm"}/>

                    </WingBlank>
                </View>
                <WhiteSpace size={"sm"}/>

                <List style={{backgroundColor: 'white'}} renderHeader={
                    <TouchableOpacity onPress={()=>this.navigateWithLogin('ProductListPage')}>
                        <WhiteSpace size={"sm"}/>
                        <Flex direction={"row"}>
                            <View style={{width: 2, height: 12, backgroundColor: '#06C1AE', marginRight: 5}}/>
                            <Text style={{color: '#989898', fontSize: 14}}>信用生活</Text>
                        </Flex>
                        <WhiteSpace size={"sm"}/>
                        <WingBlank size={"md"}>
                            <Image style={styles.image} source={require('../images/my/takePhone.png')}/>
                        </WingBlank>

                        <WhiteSpace size={"md"}/>
                             <Flex direction={"row"} justify={"center"}>
                                <Text style={{color: '#06C1AE', fontSize: 14, textAlign: 'center'}}>立即查看</Text>
                            </Flex>
                        <WhiteSpace size={"md"}/>

                    </TouchableOpacity>
                }></List>

                <WhiteSpace size={"sm"}/>

                {this.state.isStaff === 1 ? <List style={{backgroundColor: 'white'}} renderHeader={
                    <TouchableOpacity onPress={() => this.navigateWithLogin('WorkerEnter')}>
                            <WhiteSpace size={"sm"}/>
                            <Flex direction={"row"}>
                                <View style={{width: 2, height: 12, backgroundColor: '#06C1AE', marginRight: 5}}/>
                                <Text style={{color: '#989898', fontSize: 14}}>营业员入口</Text>
                            </Flex>
                            <WhiteSpace size={"sm"}/>
                            <WingBlank size={"md"}>
                                <Image style={styles.image} source={require('../images/my/moreClient.png')}/>
                            </WingBlank>
                            <WhiteSpace size={"md"}/>
                            <TouchableOpacity>
                                <Flex direction={"row"} justify={"center"}>
                                    <Text style={{color: '#06C1AE', fontSize: 14, textAlign: 'center'}}>立即查看</Text>
                                </Flex>
                            </TouchableOpacity>
                            <WhiteSpace size={"md"}/>

                    </TouchableOpacity>
                    }></List> :
                    null
                }


            </ScrollView>

        )
    }

}