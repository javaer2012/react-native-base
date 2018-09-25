import React, {Component} from 'react';
import {ScrollView, Text, TouchableOpacity, StyleSheet, Image,Dimensions} from 'react-native';
import {WhiteSpace, Flex, Toast} from 'antd-mobile-rn';
import Button from '../components/common/Button'
import ImagePicker from "react-native-image-picker";
import axios from 'axios'
import api from "../service/api";

import {getToken} from '../service/api'

const {WIDTH,HEIGHT} = Dimensions.get('window')


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

    state = {
        main: null,
        back: null
    }


    selectPhotoTapped(id) {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = {uri: response.uri};

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    [id]: source
                });
            }
        });
    }

    image(){
        getToken(token=>{

        })
    }

    uploadImages = async () => {

        const {main, back} = this.state;
        if (main === null) {
            Toast.info("请选择驾照正面照", 2);
            return
        }
        if (back === null) {
            Toast.info("请选择驾照背面照", 2)
            return
        }

        const formData = new FormData(),
            mainImage = {uri: main.uri, type: 'multipart/form-data', name: '驾照正面.png'},
            backImage = {uri: back.uri, type: 'multipart/form-data', name: '驾照背面.png'}

        formData.append("files", mainImage)
        formData.append("files", backImage)

        const rsp = await api.uploadImage(formData);
        console.log(rsp)

        // const a = axios.post('uploadImg',null,{
        //     baseURL:"https://mobile2.lychee-info.cn/cps-rest",
        //     header:{
        //         'Content-Type':'application/x-www-form-urlencoded',
        //         'Authorization':"Bearer eyJhbGciOiJIUzUxMiJ9.eyJyYW5kb21LZXkiOiI0bXp1YmIiLCJzdWIiOiJQSzl0b1hsSWRiTG9KTHE3IiwiZXhwIjoxNTM3NzEzOTEyLCJpYXQiOjE1Mzc2Mjc1MTJ9.BJ3x8NOwSU3joDwfIy0d3n-W8nHSS2DdDaHlv7SLQLWn8NNNWFz6ZdeLfuCC9sUP4_EwhbyBAAlRA7zR7IVyBA"
        //     }
        // })
        //
        // console.log(a)


    }

    render() {
        const {navigation} = this.props
        return (
            <ScrollView>

                <Flex direction={"column"} align={"center"}>
                    <WhiteSpace size={"xl"}/>
                    <Text style={{textAlign: 'center'}}>请拍摄驾驶证主页与副页，并录入信息</Text>
                    <WhiteSpace size={"xl"}/>
                    <TouchableOpacity onPress={() => this.selectPhotoTapped('main')}>
                        {this.state.main ?
                            <Image style={{width: 300, height: 200}}
                                   source={this.state.main}/> :
                            <Image style={{width: 300, height: 200}}
                                   source={require('../images/imageNew/one/card1.png')}/>}

                    </TouchableOpacity>
                    <WhiteSpace size={"xl"}/>

                    <TouchableOpacity onPress={() => this.selectPhotoTapped('back')}>
                        {this.state.back ?
                            <Image style={{width: 300, height: 200}}
                                   source={this.state.back}/> :
                            <Image style={{width: 300, height: 200}}
                                   source={require('../images/imageNew/one/card2.png')}/>
                        }

                    </TouchableOpacity>
                </Flex>

                <WhiteSpace size={"lg"}/>

                <Flex direction={"row"} justify={"center"}>
                    <Button style={{backgroundColor: "#06C1AE", width: 355, height: 36, lineHeight: 36, color: "white"}}
                            onClick={() => this.uploadImages()}
                    >完成</Button>
                </Flex>

            </ScrollView>
        )
    }
}