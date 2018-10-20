import React, {Component} from 'react';
import {View, Text, AsyncStorage} from 'react-native';
import {List, Picker, WingBlank, WhiteSpace, Flex,Toast} from 'antd-mobile-rn';
import Button from "../components/common/Button";
import {cityObj} from '../utils/areaSchool'
import api from "../service/api";
import RentApp from "../components/RentApp";

const STATUS = [
    {
        label:"在读",
        value:"在读"
    },
    {
        label:"毕业",
        value:"毕业"
    },
]

export default class Education extends RentApp {
    static navigationOptions = {
        title: "学籍学历"
    }
    state = {
        cityId: ''
    }

    componentDidMount(){
        setTimeout(()=>this.initData(),0)
    }

    async initData(){
        try{


            const user = await AsyncStorage.multiGet(['userId', 'openId', 'isBinding', 'addressInfos'])

            const params = {
                userId:this.userId,
                openId:this.openId,
                cityCode: this.cityCode,
                provinceCode: this.provinceCode
            }
            console.log(params)
            const rsp = await api.userInfo(params)

            console.log(rsp)

            const {data} = rsp
            if(data.errcode === 1){

                let item = null

                const rsp = {}

                rsp.cateList = data.cateList


                if(data.userItemList.length > 0){
                    data.userItemList.forEach(i=>{
                        if(i.itemCode === 'edu'){
                            i.subItemList.forEach(sI=>{
                                if(sI.subItemValue){
                                    if(sI.subItemCode === 'school_name'){
                                        rsp.school = sI.subItemValue

                                    } else if(sI.subItemCode === 'area'){
                                        rsp.cityName = sI.subItemValue

                                    } else if(sI.subItemCode === 'status'){
                                        rsp.pickerValue = [sI.subItemValue]

                                    }
                                }
                            })
                        }
                    })

                }

                this.setState({
                    ...rsp
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    submit = async () => {

        const {cateList,cityName,school,pickerValue} = this.state

        if(!cityName) {
            Toast.info("请选择城市",1)
            return
        }

        if(!school) {
            Toast.info("请选择学校",1)
            return
        }

        if(!pickerValue) {
            Toast.info("请选择当前状态",1)
            return
        }


        if(!cateList) {
            Toast.info("网络状况不佳，请稍后再试",1)
            return
        }

        cateList.forEach(item=>{
            if(item.cateCode === 'base_info'){
                item.creditItemList.forEach(creditItem=>{
                    if(creditItem.itemCode === 'edu'){
                        //拿到驾照item 响应的 id
                        this.itemInfo = creditItem
                    }
                })
            }
        })

        console.log(this.itemInfo)

        this.itemInfo.subItemList[0].subItemValue = cityName
        this.itemInfo.subItemList[1].subItemValue = school
        this.itemInfo.subItemList[2].subItemValue = pickerValue[0]

        try{
            const userInfoJson = JSON.stringify({...this.itemInfo}).toString()

            const userParams = {
                openId:this.openId,
                userId:this.userId,
                cityCode: this.cityCode,
                provinceCode: this.provinceCode,
                userInfoJson
            }

            const setUser = await api.submitUserInfo(userParams)

            if(setUser.data.errcode === 1){
                Toast.info("用户信息提交成功",1)
                setTimeout(()=> {this.props.navigation.replace('PersonalInfoPage')},2000)
            } else {
                Toast.info(setUser.data.errmsg,1)
            }
            //
            console.log(setUser)
        } catch (e) {
            Toast.info("网络出现问题，请稍后重试",1)
        }
    }

    setCityIdFun = (data) => {
        console.log("School:", data)
        cityObj.forEach(element => {
            if (data.crmProvName.indexOf(element.province) !== -1) {
                console.log(element)
                this.setState({
                    cityId: element.id,
                    cityName: data.city
                })
            }
        });
    }

    setSchoolFun = (data) => {

        const schoolObj = JSON.parse(data.selectedSchool)
        this.setState({
            school: schoolObj.schoolName
        })
        // console.log(data,"!!!")

    }

    selectSchool = ()=>{
        if(!this.state.cityId){
            Toast.info("请先选择城市",1.5)
            return
        }
        this.props.navigation.navigate("SchoolSearchPage", {
            cityId: this.state.cityId,
            callback: (data) => this.setSchoolFun(data)
        })
    }

    render() {

        const Item = List.Item;
        const {navigation} = this.props;

        console.log(this.state)
        return (
            <View>
                <Flex direction={"row"} justify={"center"}
                      style={{backgroundColor: 'white', height: 80, paddingLeft: 15}}>
                    <WhiteSpace size={"lg"}/>
                    <Text>信息保护中</Text>
                    <WhiteSpace size={"lg"}/>
                </Flex>
                <WhiteSpace size={"lg"}/>
                <List>
                    <Item arrow={"horizontal"} onClick={
                        () => navigation.navigate('LocationPage', {
                            callback: (data) => this.setCityIdFun(data)
                        })}

                          extra={this.state.cityName ? <Text>{this.state.cityName}</Text> : null}
                    >地区
                    </Item>
                    <Item arrow={"horizontal"} onClick={() => this.selectSchool()}
                          extra={this.state.school ? <Text>{this.state.school}</Text> : null}
                    >院校名称</Item>

                    <Picker
                        data={STATUS}
                        cols={1}
                        value={this.state.pickerValue}
                        onChange={(v) => this.setState({pickerValue: v})}
                        onPickerChange={(v) => this.setState({pickerValue: v})}
                        onOk={(v) => this.setState({pickerValue: v})}
                    >
                        <Item arrow={"horizontal"}>当前状态</Item>
                    </Picker>


                </List>

                <WhiteSpace size={"xl"}/>
                <WingBlank size={"md"}>
                    <Flex direction={"column"} justify={"start"} align={"center"}>
                        <Text style={{textAlign: 'center'}}>请确认您的个人信息真实有效</Text>
                        <Text style={{textAlign: 'center'}}>上传虚假信息将对你的信用产生负面影响</Text>
                    </Flex>

                </WingBlank>
                <WhiteSpace size={"md"}/>

                <Flex direction={"row"} justify={"center"}>
                    <Button style={{
                        backgroundColor: "#06C1AE",
                        width: 355,
                        height: 36,
                        lineHeight: 36,
                        color: "white"
                    }}
                            onClick={this.submit}
                    >完成</Button>
                </Flex>
            </View>
        )
    }
}