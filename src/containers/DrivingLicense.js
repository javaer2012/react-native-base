import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { WhiteSpace, Flex} from 'antd-mobile-rn';
import Button from '../components/common/Button'
import ImagePicker from "react-native-image-picker";


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
        main:null,
        back:null
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
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    [id]: source
                });
            }
        });
    }

    render() {
        const {navigation} = this.props
        return (
            <View>

                <Flex direction={"column"} align={"center"}>
                    <WhiteSpace size={"xl"}/>
                    <Text style={{textAlign:'center'}}>请拍摄驾驶证主页与副页，并录入信息</Text>
                    <WhiteSpace size={"xl"}/>
                    <TouchableOpacity onPress={()=>this.selectPhotoTapped('main')}>
                        {this.state.main?
                            <Image style={{width:300,height:200}}
                                   source={this.state.main}/>:
                            <Image style={{width:300,height:200}}
                                   source={require('../images/imageNew/one/card1.png')}/>}

                    </TouchableOpacity>
                    <WhiteSpace size={"xl"}/>

                    <TouchableOpacity onPress={()=>this.selectPhotoTapped('back')}>
                        {this.state.back?
                            <Image style={{width:300,height:200}}
                                   source={this.state.back}/>:
                            <Image style={{width:300,height:200}}
                                   source={require('../images/imageNew/one/card2.png')}/>
                        }

                    </TouchableOpacity>
                </Flex>

                <WhiteSpace size={"lg"}/>

                <Flex direction={"row"} justify={"center"}>
                    <Button style={{backgroundColor:"#06C1AE",width:355,height:36,lineHeight:36,color:"white"}}>完成</Button>
                </Flex>

            </View>
        )
    }
}