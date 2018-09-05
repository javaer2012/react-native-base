import React from 'react';
import {ScrollView, StyleSheet, View, Text,TouchableOpacity} from 'react-native';
import {WingBlank, WhiteSpace, Flex, InputItem, List,Checkbox} from 'antd-mobile-rn';

const styles = StyleSheet.create({
    topText: {
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        height: 75
    },
    text: {
        textAlign: 'center',
        lineHeight: 20,
        fontSize: 15
    }
})

export default class Term extends React.Component {
    static navigationOptions = {
        title:'立趣信用购'
    }
    state = {

    }

    render() {

        const {navigation} = this.props

        return (
            <ScrollView style={{backgroundColor: 'white'}}>
              <Flex direction={"row"} justify={"center"}>
                  <WhiteSpace size={"xl"}/>
                  <Text style={{fontSize: 18,textAlign: 'center',height: 44,lineHeight: 24,paddingTop: 10,paddingBottom: 10}}>
                      隐私条款和数据授权协议
                  </Text>
              </Flex>

                <Flex direction={"column"} align={"start"}>
                    <Text>
                        以下是中国电信信用租机业务、业务平台及业务相关的企业（以下合称“本业务”）约定的隐私条款和数据授权协议（以下统称“该协议”）：
                    </Text>
                    <Text>
                        1.该协议的同意及履约说明
                    </Text>
                    <Text>
                        凡同意申请、参与或办理本业务的自然人（以下统称“用户”），即视为同意并履约该协议的所有约定。
                    </Text>
                    <Text>
                        2.用户身份限制
                    </Text>
                    <Text>
                        本业务仅支持成年人（年龄18周岁及以上人士）参与和使用。
                    </Text>
                    <Text>
                        3.涉及的个人资料
                    </Text>
                    <Text>
                        只要同意该协议的用户，即视为授权并同意中国电信向本业务提供其本人身份信息、缴费行为等相关内容信息，同时，同意并授权本业务收集和使用与本业务相关的个人资料信息，包括但不仅限于从中国电信、其他外部金融信用信息基础数据库、NFCS网络金融征信系统数据库、第三方大数据服务机构、行业自律机构、社会第三方合作机构等依法设立的机构查询、使用用户的个人资料信息。
                    </Text>
                    <Text>
                        4.对资料披露的权利
                    </Text>
                    <Text>
                        用户理解并同意，本业务有权将用户正常履约及违约信息报中国电信、由其向国家金融信用信息基础数据库或中国人民银行指定的其他机构进行报送。                    </Text>
                </Flex>
            </ScrollView>
        )
    }
}