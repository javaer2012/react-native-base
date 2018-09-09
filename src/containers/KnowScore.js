import React from 'react';
import {View, ScrollView, StyleSheet, Platform, ImageBackground, Text} from 'react-native';
import {Flex, WhiteSpace} from 'antd-mobile-rn';
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
})


export default class KnowScore extends React.Component {

    static navigationOptions = {
        title: "了解信用分"
    }

    renderActiveTag(content){
        return (
            <ImageBackground style={{width:37,height:21}} source={require('../images/score.png')}>
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

        if(350 < score && score < 550 ){
            tagList[0] = this.renderActiveTag( <Text style={styles.linerTextW}>较差</Text>)
        } else if(550 <= score && score <600){
            tagList[1] = this.renderActiveTag(<Text style={styles.linerTextW}>中等</Text>)
        }
        else if(600 <= score && score <650){
            tagList[2] = this.renderActiveTag(<Text style={styles.linerTextW}>良好</Text>)
        }
        else if(650 <= score && score<700){
            tagList[3] = this.renderActiveTag(<Text style={styles.linerTextW}>优秀</Text>)
        }
        else if(score >= 700){
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
                        <Text style={{color: 'white', fontSize: 25}}>730</Text>
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
                            {this.renderTagsByScore(560)}
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

            </ScrollView>
        )
    }
}