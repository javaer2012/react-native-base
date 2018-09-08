import React from 'react';
import {View,Text} from 'react-native';
import {Flex,WingBlank,WhiteSpace} from 'antd-mobile-rn';

const AuthInfo = props =>{
    const {time,type,lastScore,currentScore} = props;

    return (
       <WingBlank size={"lg"}>
           <WhiteSpace size={"xl"}/>
           <Flex direction={"column"} align={"start"}>
               <Text>信用分更新了</Text>
               <WhiteSpace size={"sm"}/>

               <Text>20170412</Text>
               <WhiteSpace size={"sm"}/>

               <Text>信用申请</Text>
               <WhiteSpace size={"sm"}/>

               <View>
                   <Flex direction={"row"}>
                       <Text>上次评分：0</Text>
                       <Text>本次评分：100</Text>
                   </Flex>
               </View>
           </Flex>
           <WhiteSpace size={"xl"}/>
       </WingBlank>
    )
}

export default AuthInfo