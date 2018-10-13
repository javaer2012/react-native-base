import React from 'react';
import {TouchableOpacity,Text} from 'react-native';

const Button = props =>{

    const click = props.onClick || null;
    const defaultStyle = {width:126,height:45,
        borderRadius:3,borderWidth: 1,lineHeight:45,borderColor:'white', backgroundColor: '#06C1AE',
        textAlign: "center",color:'white'},
        cusStyle = props.style || {};

    return (
        <TouchableOpacity onPress={click} style={{width:'100%'}}>
            <Text style={{...defaultStyle,...cusStyle}}>
                {props.children}
            </Text>
        </TouchableOpacity>
    )
}

export default Button