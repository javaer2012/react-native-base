import React, {Component} from 'react';
import {ScrollView, Text, TouchableOpacity, StyleSheet, Image, Dimensions, AsyncStorage,ImageBackground} from 'react-native';
import {WhiteSpace, Flex, Toast} from 'antd-mobile-rn';
import Button from '../components/common/Button'
 import api from "../service/api";
import Spinner from 'react-native-loading-spinner-overlay'
import RentApp from "../components/RentApp";

const {WIDTH,HEIGHT} = Dimensions.get('window')

const submitDrivingLicense = {
    openId:'',
    userId:'',
    cityCode:'',
    provinceCode:'',
    userInfoJson:{
        itemId:'',
        itemCode:'drivingLicence',
        subItemList:[{
            subItemId:'',
            subItemCode:'driver_licence_front',
            subItemName:'驾驶证正面',
            subItemOrderNo:1,
            subItemValue:''//get from rsp
        },
            {
                subItemId:'',
                subItemCode:'driver_licence_follower',
                subItemName:'驾驶证附页',
                subItemOrderNo:2,
                subItemValue:''//get from rsp
            }]

    }
}


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

export default class DrivingLicense extends RentApp {
    static navigationOptions = {
        title: "驾驶证"
    }

    state = {
        main: null,
        back: null
    }

    componentDidMount(){
        setTimeout(()=>this.initData(),0)
    }

    async initData(){
        try{

            await this.setState({
                loading:true
            })
            const user = await AsyncStorage.multiGet(['userId', 'openId', 'isBinding', 'addressInfos'])

            const params = {
                userId:this.userId,
                openId:this.openId,
                cityCode:84401,
                provinceCode:844
            }
            console.log(params)
            const rsp = await api.userInfo(params)

            console.log(rsp)

            const {data} = rsp
            if(data.errcode === 1){
                this.setState({
                    cateList:data.cateList
                })
            }
        } catch (e) {
            console.log(e)
        } finally {
            await this.setState({
                loading:false
            })
        }
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
                    [id]: source,
                    [`${id}base64`]:response.data
                });
            }
        });
    }

    uploadImages = async () => {

        const {main, back,cateList} = this.state;
        if (main === null) {
            Toast.info("请选择驾照正面照", 2);
            return
        }
        if (back === null) {
            Toast.info("请选择驾照背面照", 2)
            return
        }

        this.setState({
            loading:true
        })


        cateList.forEach(item=>{
            if(item.cateCode === 'base_info'){
                item.creditItemList.forEach(creditItem=>{
                    if(creditItem.itemCode === 'drivingLicence'){
                        //拿到驾照item 响应的 id
                        this.itemInfo = creditItem
                    }
                })
            }
        })

        let formData = new FormData(),
            backData = new FormData(),
            mainImage = {uri: main.uri, type: 'image/png', name: '驾照正面.png'},
            backImage = {uri: back.uri, type: 'image/png', name: '驾照背面.png'}

        formData.append("file", mainImage)

        backData.append("file", backImage)

        try{

            const rsp = await  Promise.all([api.uploadImage(formData,'drivingLicense'),api.uploadImage(backData,"drivingLicense")]);

            const [font,back] = rsp;
            console.log(rsp)

            if(font.data.errcode === 0 || back.data.errcode === 0) throw "图片上传失败！"

            console.log(this.itemInfo)

            this.itemInfo.subItemList[0].subItemValue = font.data.filePath
            this.itemInfo.subItemList[1].subItemValue = back.data.filePath
            const userInfoJson = JSON.stringify({...this.itemInfo}).toString()

            const userParams = {
                openId:this.openId,
                userId:this.userId,
                cityCode:84401,
                provinceCode:844,
                userInfoJson
            }


            const setUser = await api.submitUserInfo(userParams)

            if(setUser.data.errcode === 1){
                Toast.info("驾照信息提交成功！",1)
                setTimeout(()=> {this.props.navigation.replace('PersonalInfoPage')},2000)
            } else {
                Toast.info(setUser.data.errmsg,1)
            }
            //
            console.log(setUser)


        } catch (e) {
            Toast.info(e,1)

        } finally {
            this.setState({loading:false})
        }

    }

    render() {
        console.log("Render")
        const {navigation} = this.props

        return (
            <ScrollView>
                <Flex direction={"column"} align={"center"}>
                    <WhiteSpace size={"xl"}/>
                    <Text style={{textAlign: 'center'}}>请拍摄驾驶证主页与副页，并录入信息</Text>
                    <WhiteSpace size={"xl"}/>
                    <TouchableOpacity onPress={() => this.selectPhotoTapped('main')}>
                        {this.state.main ?
                            <Image style={{width: 335, height: 217}}
                                   source={this.state.main}/> :
                            <ImageBackground style={{width: 335, height: 217}}
                                             source={require('../images/driving/font.png')}>
                                <Flex direction={"row"} justify={"center"} align={"center"} style={{height:217}}>
                                    <Image style={{width:88,height:88}} source={require('../images/driving/camera.png')}/>
                                </Flex>
                            </ImageBackground>}

                    </TouchableOpacity>
                    <WhiteSpace size={"xl"}/>

                    <TouchableOpacity onPress={() => this.selectPhotoTapped('back')}>
                        {this.state.back ?
                            <Image style={{width: 335, height: 217}}
                                   source={this.state.back}/> :
                            <ImageBackground style={{width: 335, height: 217}}
                                             source={require('../images/driving/back.png')}>
                                <Flex justify={"center"} align={"center"} style={{height:217}}>
                                    <Image style={{width:88,height:88}} source={require('../images/driving/camera.png')}/>
                                </Flex>
                            </ImageBackground>
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