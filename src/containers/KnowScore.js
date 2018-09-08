import React from 'react';
import {View, ScrollView, StyleSheet, Platform,ImageBackground,Text} from 'react-native';
import {Flex,WhiteSpace} from 'antd-mobile-rn';
import LinearGradient from 'react-native-linear-gradient';

const styles = StyleSheet.create({
    topBackground: {
        width: null,
        height: 300,
        resizeMode:'contain'
    },
    line:{
        backgroundColor: "#06BFC1",
        width:20,
        height:1,
        marginHorizontal: 5
    },
    text:{
        color:'#06BFC1',
        fontSize:15
    },
    image:{
        width: null,
        height: 140,
        resizeMode:'stretch'
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


export default class KnowScore extends React.Component{

    static navigationOptions = {
        title : "了解信用分"
    }

    render(){
        return(
            <ScrollView>
                <ImageBackground style={styles.topBackground}
                                 source={require('../images/imageNew/one/understandingCredit_bg.jpg')}>
                    <Flex style={{height:300}} direction={"row"} justify={"center"} align={"center"}>
                        <Text style={{color:'white',fontSize:25}}>730</Text>
                    </Flex>
                </ImageBackground>
                <View style={{width:'100%',backgroundColor:'white'}}>
                    <WhiteSpace size={"md"}/>
                    <Flex direction={"row"} justify={"center"}>
                        <View style={styles.line}></View>
                        <Text style={styles.text}>我的信用等级</Text>
                        <View style={styles.line}></View>
                    </Flex>
                    <WhiteSpace size={"md"}/>

                </View>
            </ScrollView>
        )
    }
}