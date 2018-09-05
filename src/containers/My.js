import React, {Component} from 'react';
import {
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    RefreshControl,
    ImageBackground,
    Platform,
    TabBarIOS
} from 'react-native';
import {List, InputItem, WingBlank, WhiteSpace, Flex,TabBar} from 'antd-mobile-rn';
import Button from "../components/common/Button";
import Canvas from 'react-native-canvas';

const TabItem = TabBar.Item;
const IOSItem = TabBarIOS.Item;

const styles = StyleSheet.create({
    topBackground: {
        width: 750,
        height: 300
    },
    content: {
        display: "flex",
        flexDirection: "column",
        justifyContent: 'center',
        alignContent: 'center'
    },
    canvasContent:{
        paddingTop:10,
        paddingLeft:Platform.OS === 'android'? 55 :35,
        width:375
    },
    userIcon: {
        width: 126,
        height: 126,
        marginLeft: 128
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

export default class My extends Component {

    state = {
        refreshing: false,
        isLogin: false,
    }

    constructor(props) {
        super(props)

        this.onRefresh = this.onRefresh.bind(this)
    }

    onRefresh = () => {
        this.setState({refreshing: true});
        setTimeout(() => this.setState({refreshing: false}), 2000)
    }

    handleCanvas(canvas) {
        if (canvas) {
            canvas.height = 230;
            canvas.width = 600
        }
        const ctx = canvas.getContext('2d');
        canvasScore(ctx, 600, '2018-09-12')
    }

    render() {

        const {navigation} = this.props
        return (
            <View>
                <ScrollView
                    style={{marginBottom:49}}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh}
                        />
                    }>


                    <ImageBackground style={styles.topBackground} source={require('../images/my/background.png')}>
                        {this.state.isLogin ?
                            <View style={styles.content}>
                                <Image style={styles.userIcon} source={require('../images/imageNew/one/userIcon.png')}/>
                                <WhiteSpace size={"xl"}/>
                                <Flex direction={"row"} justify={"around"}>
                                    <Button onClick={() => navigation.navigate('LoginPage')}>登录</Button>

                                    <Button onClick={() => navigation.navigate('LoginPage')}>立即激活</Button>


                                </Flex>
                            </View> :
                            <View style={styles.canvasContent}>
                                <Canvas ref={this.handleCanvas}/>
                                <Flex direction={"row"} style={{marginLeft:Platform.OS === 'andriod'?15:0}}>
                                    <Flex.Item>
                                        <Button style={{height:27,lineHeight:27,fontSize:12}}>晒晒我的信用分</Button>
                                    </Flex.Item>

                                    <Flex.Item>
                                        <Button style={{height:27,lineHeight:27,fontSize:12}}>了解我的信用分</Button>
                                    </Flex.Item>
                                </Flex>
                            </View>}
                    </ImageBackground>


                    <Flex direction={'row'} style={{backgroundColor: 'white'}}>

                        <Flex.Item style={{width: 128, height: 65, paddingTop: 15}}>
                            <Flex direction={'row'}>
                                <WingBlank size={"sm"}>
                                    <Image style={{height: 40, width: 40}}
                                           source={require('../images/my/favorite.png')}/>

                                </WingBlank>
                                <View>
                                    <Text style={{fontSize:12,marginBottom:5}}>我的收藏</Text>
                                    <Text style={{fontSize:10,color:'#989898'}}>点击查看您收藏的宝贝</Text>
                                </View>
                            </Flex>
                        </Flex.Item>
                        <Flex.Item style={{width: 127, height: 65, borderLeftWidth: 1, borderLeftColor: 'black'}}>
                            <Flex direction={'row'}>
                                <WingBlank size={"sm"}>
                                    <Image
                                        style={{height: 40, width: 40}}
                                        source={require('../images/my/authHistory.png')}/>
                                </WingBlank>

                                <Flex.Item style={{width: 128, height: 65, paddingTop: 15}}>
                                    <View>
                                        <WhiteSpace size={"xs"}/>
                                        <Text style={{fontSize:12,marginBottom: 5}}>收藏历史</Text>
                                        <Text style={{fontSize:10,color:'#989898'}}>点击查看您的收藏历史</Text>
                                    </View>
                                </Flex.Item>
                            </Flex>
                        </Flex.Item>
                    </Flex>

                    <WhiteSpace size={'lg'}/>

                    <View style={{backgroundColor: 'white'}}>
                        <WingBlank size={"sm"}>
                            <WhiteSpace size={'lg'}/>
                            <Flex direction={'row'}>
                                <View style={{width:2,height:12,backgroundColor:'#06C1AE',marginRight:5}}></View>
                                <Text style={{color:'#989898',fontSize:14}}>信用管理</Text>
                            </Flex>
                            <WhiteSpace size={'sm'}/>
                            <Flex direction={'row'} justify={"end"}>
                                <Flex.Item>
                                    <TouchableOpacity onPress={() => navigation.navigate("PersonalInfoPage")}>
                                        <Flex direction={"column"}>
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
                                    <TouchableOpacity onPress={() => navigation.navigate("BadRecordPage")}>
                                        <Flex direction={"column"}>
                                            <WhiteSpace size={"sm"}/>
                                            <Image style={{width: 30, height: 30}}
                                                   source={require('../images/my/bad.png')}/>
                                            <WhiteSpace size={"sm"}/>
                                            <Text>负面记录</Text>
                                            <WhiteSpace size={"sm"}/>
                                        </Flex>
                                    </TouchableOpacity>
                                </Flex.Item>

                                <Flex.Item>
                                    <TouchableOpacity onPress={() => navigation.navigate("AuthRecordPage")}>
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
                                    <TouchableOpacity onPress={() => navigation.navigate("MyOrderPage")}>
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
                            </Flex>
                            <WhiteSpace size={"sm"}/>

                        </WingBlank>
                    </View>
                    <WhiteSpace size={"sm"}/>

                    <List style={{backgroundColor:'white'}} renderHeader={
                        <View>
                            <WhiteSpace size={"sm"}/>
                            <Flex direction={"row"}>
                                <View style={{width:2,height:12,backgroundColor:'#06C1AE',marginRight:5}}/>
                                <Text style={{color:'#989898',fontSize:14}}>信用生活</Text>
                            </Flex>
                            <WhiteSpace size={"sm"}/>
                            <WingBlank size={"md"}>
                                <Image style={{width:355,height:140}} source={require('../images/my/takePhone.png')}/>
                            </WingBlank>

                            <WhiteSpace size={"md"}/>
                            <TouchableOpacity>
                                <Flex direction={"row"} justify={"center"}>
                                    <Text style={{color:'#06C1AE',fontSize:14,textAlign:'center'}}>立即查看</Text>
                                </Flex>
                            </TouchableOpacity>
                            <WhiteSpace size={"md"}/>

                        </View>
                    }></List>

                    <WhiteSpace size={"sm"}/>

                    <List style={{backgroundColor:'white'}} renderHeader={
                        <View>
                            <WhiteSpace size={"sm"}/>
                            <Flex direction={"row"}>
                                <View style={{width:2,height:12,backgroundColor:'#06C1AE',marginRight:5}}/>
                                <Text style={{color:'#989898',fontSize:14}}>营业员入口</Text>
                            </Flex>
                            <WhiteSpace size={"sm"}/>
                            <WingBlank size={"md"}>
                                <Image style={{width:355,height:140}} source={require('../images/my/moreClient.png')}/>
                            </WingBlank>
                            <WhiteSpace size={"md"}/>

                        </View>
                    }></List>


                </ScrollView>


                {Platform.OS === 'android'?
                    <TabBar style={{width:375,height:60}}>
                        <TabItem iconStyle={{width:17,height:17 }} icon={require('../images/my/home1.png')} selectedIcon={require('../images/my/home.png')}>
                            <Text>首页</Text>
                        </TabItem>
                        <TabItem icon={require('../images/my/find.png')} selectedIcon={require('../images/my/home.png')}>
                            <Text>发现</Text>
                        </TabItem>
                        <TabItem icon={require('../images/my/my1.png')} selectedIcon={require('../images/my/my.png')}>
                            <Text>我的</Text>
                        </TabItem>
                    </TabBar> :
                    <TabBarIOS style={{width:375,height:49}} >
                        <IOSItem title={"首页"} style={{width:17,height:17 ,fontSize:10}} icon={require('../images/my/home.png')} selectedIcon={require('../images/my/home1.png')}>
                        </IOSItem>
                        <IOSItem title={"发现"} selected={true} icon={require('../images/my/find.png')} selectedIcon={require('../images/my/home.png')}>
                            <Text>发现</Text>
                        </IOSItem>
                        <IOSItem title={"我的"} icon={require('../images/my/my1.png')} selectedIcon={require('../images/my/my.png')}>
                            <Text>我的</Text>
                        </IOSItem>
                    </TabBarIOS>
                }
            </View>

        )
    }

}