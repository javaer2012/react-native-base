import React from 'react'
import {View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, ActivityIndicator} from 'react-native'
import ImagePicker from "react-native-image-picker";
import {Flex, WhiteSpace, WingBlank} from 'antd-mobile-rn'
import RentApp from "../components/RentApp";
import Button from '../components/common/Button'
import Spinner from 'react-native-loading-spinner-overlay'
import api from "../service/api";


const styles = StyleSheet.create({
    circle: {width: 36, height: 36, borderRadius: 18, backgroundColor: '#3487FF'},
    text: {textAlign: 'center', height: 36, lineHeight: 36, fontSize: 20, color: 'white'},
    line: {width: 100, height: 2, backgroundColor: '#3487FF', marginHorizontal: 5},
    camera: {width: 35, height: 35}
})

export default class CrmPage_2 extends RentApp {

    static navigationOptons = {
        title: 'crm信息回填'
    }

    state = {}

    confirm = async ()=> {
        this.setState({
            loading: true
        })

        const {
            id_filePath,
            id_back_filePath,
            id_person_filePath,
            ter_pho_filePath,
            ternimal_filePath,
            contract_filePath
        } = this.state

        console.log(this.state)

        setTimeout(()=>this.setState({loading:false}),3000)
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

        ImagePicker.showImagePicker(options, async (response) => {
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
                this.setState({
                    [`${id}loading`]: true
                })

                let source = {uri: response.uri};

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                let formData = new FormData(),
                    photo = {uri: response.uri, type: 'image/png', name: '驾照正面.png'};

                formData.append('file', photo)

                try {
                    const upload = await api.uploadImage(formData, "crm");

                    console.log(upload)

                    const {data} = upload;

                    if (data.errcode === 1) {
                        this.setState({
                            [id]: source,
                            [`${id}_filePath`]: data.filePath
                        });
                    }
                } catch (e) {
                    Toast.info("上传图片失败", 1)
                } finally {
                    this.setState({
                        [`${id}loading`]: false
                    })
                }


            }
        });
    }


    render() {
        return (
            <View size={"md"} style={{backgroundColor: 'white', height: '100%'}}>
                <Spinner visible={this.state.loading}/>
                <WhiteSpace size={"xl"}/>
                <Flex direction={"column"} justify={"start"} align={"center"}>
                    <Flex direction={"row"} align={"center"} justify={"center"}>

                        <View style={styles.circle}>
                            <Text style={styles.text}>1</Text>
                        </View>

                        <View style={styles.line}></View>

                        <View style={styles.circle}>
                            <Text style={styles.text}>2</Text>
                        </View>

                    </Flex>
                    <WhiteSpace size={"md"}/>


                    <Flex direction={"row"} justify={"around"} style={{width: '100%'}}>
                        <TouchableOpacity onPress={() => this.selectPhotoTapped("id")}>
                            {this.state.idloading === true ?
                                <Flex justify={"center"} align={"center"} style={{width: 170, height: 134}}>
                                    <ActivityIndicator animating={true} size="large"/>
                                </Flex> : this.state.id ?
                                    <Image style={{width: 170, height: 134}} source={this.state.id}/> :
                                    <ImageBackground style={{width: 170, height: 134}}
                                                     source={require('../images/crm_back/id.png')}>
                                        <Flex justify={"center"} align={"center"} style={{height: 110}}>
                                            <Image style={styles.camera}
                                                   source={require('../images/crm_back/camera.png')}/>

                                        </Flex>
                                        <Text style={{textAlign: 'center', marginTop: 5}}>上传身份证正面照</Text>
                                    </ImageBackground>}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.selectPhotoTapped("id_back")}>
                            {this.state.id_backloading === true ?
                                <Flex justify={"center"} align={"center"} style={{width: 170, height: 134}}>
                                    <ActivityIndicator animating={true} size="large"/>
                                </Flex> : this.state.id_back ?
                                    <Image style={{width: 170, height: 134}} source={this.state.id_back}/> :
                                    <ImageBackground style={{width: 170, height: 134}}
                                                     source={require('../images/crm_back/id_back.png')}>
                                        <Flex justify={"center"} align={"center"} style={{height: 110}}>
                                            <Image style={styles.camera}
                                                   source={require('../images/crm_back/camera.png')}/>

                                        </Flex>
                                        <Text style={{textAlign: 'center', marginTop: 5}}>上传身份证反面照</Text>
                                    </ImageBackground>}
                        </TouchableOpacity>

                    </Flex>
                    <WhiteSpace size={"md"}/>


                    <Flex direction={"row"} justify={"around"} style={{width: '100%'}}>
                        <TouchableOpacity onPress={() => this.selectPhotoTapped("id_person")}>
                            {this.state.id_personloading === true ?
                                <Flex justify={"center"} align={"center"} style={{width: 170, height: 134}}>
                                    <ActivityIndicator animating={true} size="large"/>
                                </Flex> : this.state.id_person ?
                                    <Image style={{width: 170, height: 134}} source={this.state.id_person}/> :
                                    <ImageBackground style={{width: 170, height: 134}}
                                                     source={require('../images/crm_back/id_person.png')}>
                                        <Flex justify={"center"} align={"center"} style={{height: 110}}>
                                            <Image style={styles.camera}
                                                   source={require('../images/crm_back/camera.png')}/>

                                        </Flex>
                                        <Text style={{textAlign: 'center', marginTop: 5}}>上传手持身份证照</Text>
                                    </ImageBackground>}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.selectPhotoTapped("ter_pho")}>
                            {this.state.ter_pholoading === true ?
                                <Flex justify={"center"} align={"center"} style={{width: 170, height: 134}}>
                                    <ActivityIndicator animating={true} size="large"/>
                                </Flex> : this.state.ter_pho ?
                                    <Image style={{width: 170, height: 134}} source={this.state.ter_pho}/> :
                                    <ImageBackground style={{width: 170, height: 134}}
                                                     source={require('../images/crm_back/ter_pho.png')}>
                                        <Flex justify={"center"} align={"center"} style={{height: 110}}>
                                            <Image style={styles.camera}
                                                   source={require('../images/crm_back/camera.png')}/>

                                        </Flex>
                                        <Text style={{textAlign: 'center', marginTop: 5}}>上传手持终端证照</Text>
                                    </ImageBackground>}
                        </TouchableOpacity>

                    </Flex>
                    <WhiteSpace size={"md"}/>

                    <Flex direction={"row"} justify={"around"} style={{width: '100%'}}>
                        <TouchableOpacity onPress={() => this.selectPhotoTapped("ternimal")}>
                            {this.state.ternimalloading === true ?
                                <Flex justify={"center"} align={"center"} style={{width: 170, height: 134}}>
                                    <ActivityIndicator animating={true} size="large"/>
                                </Flex> : this.state.ternimal ?
                                    <Image style={{width: 170, height: 134}} source={this.state.ternimal}/> :
                                    <ImageBackground style={{width: 170, height: 134}}
                                                     source={require('../images/crm_back/terminal.png')}>
                                        <Flex justify={"center"} align={"center"} style={{height: 110}}>
                                            <Image style={styles.camera}
                                                   source={require('../images/crm_back/camera.png')}/>

                                        </Flex>
                                        <Text style={{textAlign: 'center', marginTop: 5}}>上传终端协议证照</Text>
                                    </ImageBackground>}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.selectPhotoTapped("contract")}>
                            {this.state.contractloading === true ?
                                <Flex justify={"center"} align={"center"} style={{width: 170, height: 134}}>
                                    <ActivityIndicator animating={true} size="large"/>
                                </Flex> : this.state.contract ?
                                    <Image style={{width: 170, height: 134}} source={this.state.contract}/> :
                                    <ImageBackground style={{width: 170, height: 134}}
                                                     source={require('../images/crm_back/contract.png')}>
                                        <Flex justify={"center"} align={"center"} style={{height: 110}}>
                                            <Image style={styles.camera}
                                                   source={require('../images/crm_back/camera.png')}/>

                                        </Flex>
                                        <Text style={{textAlign: 'center', marginTop: 5}}>上传合约协议证照</Text>
                                    </ImageBackground>}
                        </TouchableOpacity>

                    </Flex>

                </Flex>
                <WhiteSpace size={"xl"}/>
                <View>

                    <Text style={{marginHorizontal: 20, color: '#F5475F', fontSize: 10}}>签署协议</Text>
                </View>
                <WhiteSpace size={"xl"}/>


                <Flex direction={"row"} justify={"center"}>
                    <Button style={{
                        width: 355,
                        height: 45,
                        backgroundColor: '#F5475F',
                        color: 'white',
                        lineHeight: 45,
                        fontSize: 20,
                        borderRadius: 5
                    }} onClick={this.confirm}>完成</Button>

                </Flex>
            </View>
        )
    }
}