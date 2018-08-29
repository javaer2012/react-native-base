import React, { Component } from 'react';
import { ScrollView, Text,TouchableOpacity } from 'react-native';
import {List,InputItem,Button,WingBlank,WhiteSpace,Flex} from 'antd-mobile-rn';


export default class ChangePSW extends Component{
    static navigationOptions = {
        title:"修改密码"
    }
    state={
        oPSW:"",
        nPSW:""
    }

    constructor(props){
        super(props)
    }


    render(){

        const {oPSW,nPSW} = this.state;
        const {navigation} = this.props;

        return(
            <ScrollView>
                <WingBlank size="md">
                    <List renderHeader={()=>""} >
                        <InputItem type="text" value={oPSW}
                                   onChange={(oPSW)=>this.setState({oPSW})}
                                   placeholder={"请输入旧密码"}> 旧密码 </InputItem>
                        <InputItem type="password" value={nPSW}
                                   onChange={(nPSW)=>this.setState({nPSW})}
                                   placeholder={"请输入新密码"}> 新密码 </InputItem>

                    </List>
                    <WhiteSpace size={"xl"}/>
                    <Button onClick={()=>navigation.navigate("LoginPage")}>完成</Button>

                </WingBlank>
            </ScrollView>
        )
    }
}