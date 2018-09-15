import React from 'react';
import {View, ScrollView, StyleSheet, Platform, ImageBackground, Text} from 'react-native';
import {Flex, WhiteSpace,WingBlank} from 'antd-mobile-rn';
import LinearGradient from 'react-native-linear-gradient';

const styles = StyleSheet.create({
    topBackground: {
        width: null,
        height: 300,
        resizeMode: 'contain'
    },
    line: {
        backgroundColor: "#06BFC1",
        width: 20,
        height: 1,
        marginHorizontal: 5
    },
    text: {
        color: '#06BFC1',
        fontSize: 15
    },
    image: {
        width: null,
        height: 140,
        resizeMode: 'stretch'
    },
    content: {
        display: "flex",
        flexDirection: "column",
        justifyContent: 'center',
        alignContent: 'center'
    },
    canvasContent: {
        paddingTop: 10,
        paddingLeft: Platform.OS === 'android' ? 55 : 35,
        width: 375
    },
    userIcon: {
        width: 126,
        height: 126,
        marginLeft: 128
    },
    linearGradient: {
        width: 63,
        height: 7
    },
    linerText: {
        // width: 63,
        height: 15,
        lineHeight: 15,
        textAlign: 'center',
        fontSize: 12,
        color: '#656565'

    },
    linerTextW: {
        // width: 63,
        height: 15,
        lineHeight: 15,
        textAlign: 'center',
        fontSize: 12,
        color: 'white'

    },
    linerNumber: {
        color: '#656565',
        fontSize: 12
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
    title:{
        color:'#06BFC1',
        textAlign:'center',
        fontSize:15
    },
    body:{
        color:'#565656',
        fontSize:14
    }
})


export default class KnowScore extends React.Component {

    static navigationOptions = {
        title: "了解信用分"
    }

    constructor(props){
        super(props)
        this.score = props.navigation.getParam('score')
    }

    renderActiveTag(content) {
        return (
            <ImageBackground style={{width: 37, height: 21}} source={require('../images/score.png')}>
                {content}
            </ImageBackground>
        )
    }

    renderTagsByScore(score) {
        const tagList = [
            <Text style={styles.linerText}>较差</Text>,
            <Text style={styles.linerText}>中等</Text>,
            <Text style={styles.linerText}>良好</Text>,
            <Text style={styles.linerText}>优秀</Text>,
            <Text style={styles.linerText}>极好</Text>,
        ];

        if ( score < 550 ) {
            tagList[0] = this.renderActiveTag(<Text style={styles.linerTextW}>较差</Text>)
        } else if (550 <= score && score < 600) {
            tagList[1] = this.renderActiveTag(<Text style={styles.linerTextW}>中等</Text>)
        }
        else if (600 <= score && score < 650) {
            tagList[2] = this.renderActiveTag(<Text style={styles.linerTextW}>良好</Text>)
        }
        else if (650 <= score && score < 700) {
            tagList[3] = this.renderActiveTag(<Text style={styles.linerTextW}>优秀</Text>)
        }
        else if (score >= 700) {
            tagList[4] = this.renderActiveTag(<Text style={styles.linerTextW}>极好</Text>)
        }

        return tagList;
    }

    render() {
        return (
            <ScrollView>
                <ImageBackground style={styles.topBackground}
                                 source={require('../images/imageNew/one/understandingCredit_bg.jpg')}>
                    <Flex style={{height: 300}} direction={"row"} justify={"center"} align={"center"}>
                        <Text style={{color: 'white', fontSize: 25}}>{this.score}</Text>
                    </Flex>
                </ImageBackground>
                <View style={{width: '100%', backgroundColor: 'white'}}>
                    <WhiteSpace size={"md"}/>
                    <Flex direction={"row"} justify={"center"}>
                        <View style={styles.line}></View>
                        <Text style={styles.text}>我的信用等级</Text>
                        <View style={styles.line}></View>
                    </Flex>
                    <WhiteSpace size={"md"}/>

                    <Flex direction={"column"} justify={"center"}>
                        <WhiteSpace size={"xs"}/>
                        <Flex direction={"row"} justify={"around"} style={{width: '80%'}}>
                            {this.renderTagsByScore(this.score)}
                        </Flex>
                        <WhiteSpace size={"md"}/>
                        <Flex direction={"row"} justify={"center"}>
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#F4643C', '#E95155']}
                                            style={styles.linearGradient}>
                            </LinearGradient>

                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#F89B04', '#FF7A1B']}
                                            style={styles.linearGradient}>
                            </LinearGradient>

                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#93D440', '#27B22B']}
                                            style={styles.linearGradient}>
                            </LinearGradient>

                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#02D4AA', '#00B9C0']}
                                            style={styles.linearGradient}>
                            </LinearGradient>

                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#49E4D3', '#029DEA']}
                                            style={styles.linearGradient}>
                            </LinearGradient>
                        </Flex>
                        <WhiteSpace size={"md"}/>
                        <Flex direction={"row"} justify={"around"} style={{width: '100%'}}>
                            <Text style={styles.linerNumber}>350</Text>
                            <Text style={styles.linerNumber}>550</Text>
                            <Text style={styles.linerNumber}>600</Text>
                            <Text style={styles.linerNumber}>650</Text>
                            <Text style={styles.linerNumber}>700</Text>
                            <Text style={styles.linerNumber}>1000</Text>
                        </Flex>
                        <WhiteSpace size={"lg"}/>
                    </Flex>
                </View>

                <WhiteSpace size={"md"}/>

                <Flex direction={"column"} justify={"start"} align={"center"} style={{backgroundColor:'white'}}>
                    <WingBlank size={"lg"}>
                        <WhiteSpace size={"md"}/>
                        <Text style={styles.title}>信用分解读</Text>
                        <WhiteSpace size={"md"}/>

                        <Text style={styles.body}>立趣信用分为通过“身份”、“行为”、“人脉”、“信用历史”和“履约”五个维度综合评估计算所得。我们对你了解越多，评估的分数也将越准确</Text>
                        <WhiteSpace size={"lg"}/>

                    </WingBlank>
                </Flex>
                <WhiteSpace size={"md"}/>


                <Flex direction={"column"} justify={"start"} align={"center"} style={{backgroundColor:'white'}}>
                    <WingBlank size={"lg"}>
                        <WhiteSpace size={"md"}/>
                        <Text style={styles.title}>如何提升“身份特质”评估值</Text>
                        <WhiteSpace size={"md"}/>

                        <Text style={styles.body}>提供真实、完整、丰富的个人信息，有助提升“身份”维度评估值。</Text>
                        <WhiteSpace size={"lg"}/>

                    </WingBlank>
                </Flex>
                <WhiteSpace size={"md"}/>

                <Flex direction={"column"} justify={"start"} align={"center"} style={{backgroundColor:'white'}}>
                    <WingBlank size={"lg"}>
                        <WhiteSpace size={"md"}/>
                        <Text style={styles.title}>如何提升“履约信用”评估值</Text>
                        <WhiteSpace size={"md"}/>

                        <Text style={styles.body}>按时还白条、信用卡，保持良好的购物记录和信用状况，有助提升“履约”维度评估值。</Text>
                        <WhiteSpace size={"lg"}/>

                    </WingBlank>
                </Flex>
                <WhiteSpace size={"md"}/>

                <Flex direction={"column"} justify={"start"} align={"center"} style={{backgroundColor:'white'}}>
                    <WingBlank size={"lg"}>
                        <WhiteSpace size={"md"}/>
                        <Text style={styles.title}>如何提升“行为偏好”评估值</Text>
                        <WhiteSpace size={"md"}/>

                        <Text style={styles.body}>线上线下购物时丰富购买品类，提升消费品质，有助提升“偏好”维度评估值。</Text>
                        <WhiteSpace size={"lg"}/>

                    </WingBlank>
                </Flex>

                <WhiteSpace size={"md"}/>

                <Flex direction={"column"} justify={"start"} align={"center"} style={{backgroundColor:'white'}}>
                    <WingBlank size={"lg"}>
                        <WhiteSpace size={"md"}/>
                        <Text style={styles.title}>如何提升“社交关系”评估值</Text>
                        <WhiteSpace size={"md"}/>

                        <Text style={styles.body}>结交信用良好的朋友，提升人脉影响力，有助提升“关系”维度评估值。</Text>
                        <WhiteSpace size={"lg"}/>

                    </WingBlank>
                </Flex>

                <WhiteSpace size={"md"}/>

                <Flex direction={"column"} justify={"start"} align={"center"} style={{backgroundColor:'white'}}>
                    <WingBlank size={"lg"}>
                        <WhiteSpace size={"md"}/>
                        <Text style={styles.title}>如何提升“信用历史”评估值</Text>
                        <WhiteSpace size={"md"}/>

                        <Text style={styles.body}>结交消费记录，提升消费信用，有助提升“信用”维度评估值。</Text>
                        <WhiteSpace size={"lg"}/>

                    </WingBlank>
                </Flex>
            </ScrollView>
        )
    }
}