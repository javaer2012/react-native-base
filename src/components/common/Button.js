import React from 'react';
import {TouchableOpacity,Text} from 'react-native';
import {Flex} from 'antd-mobile-rn'

const Button = props =>{

    const click = props.onClick || null;
    const defaultStyle = {
        width:126,height:45,
        borderRadius:5,lineHeight:45, backgroundColor: '#06C1AE',
        textAlign: "center",color:'white'},
        cusStyle = props.style || {};

    return (
        <TouchableOpacity onPress={click} style={{width:'100%'}}>
           <Flex direction={"row"} justify={"center"}>
               <Text style={{...defaultStyle,...cusStyle}}>
                   {props.children}
               </Text>
           </Flex>
        </TouchableOpacity>
    )
}

export default Button