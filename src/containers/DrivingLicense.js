import React, {Component} from 'react';
import {View, ScrollView, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {List, InputItem, WingBlank, WhiteSpace, Flex} from 'antd-mobile-rn';
import Button from '../components/common/Button'
import {RNCamera} from 'react-native-camera';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20
    }
});

export default class DrivingLicense extends Component {
    static navigationOptions = {
        title: "驾驶证"
    }

    takePicture = async function() {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options)
            console.log(data.uri);
        }
    };

    render() {
        return (
            <View>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style = {styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
                />
                <Flex direction={"column"} align={"center"}>
                    <WhiteSpace size={"xl"}/>
                    <Text style={{textAlign:'center'}}>请拍摄驾驶证主页与副页，并录入信息</Text>
                    <WhiteSpace size={"xl"}/>
                    <TouchableOpacity onPress={this.takePicture.bind(this)}>
                        <Image style={{width:300,height:200}} source={require('../images/imageNew/one/card1.png')}/>

                    </TouchableOpacity>
                    <WhiteSpace size={"xl"}/>
                    <Image style={{width:300,height:200}} source={require('../images/imageNew/one/card2.png')}/>
                </Flex>

                <WhiteSpace size={"lg"}/>

                <Flex direction={"row"} justify={"center"}>
                    <Button style={{backgroundColor:"#06C1AE",width:355,height:36,lineHeight:36,color:"white"}}>完成</Button>
                </Flex>

            </View>
        )
    }
}