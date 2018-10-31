import React, {Component} from 'react';
import {Platform, TextInput} from 'react-native';
import {SearchBar} from 'antd-mobile-rn'


export default class CSearch extends Component {

    shouldComponentUpdate (nextProps){
        return Platform.OS !== 'ios'
            || (this.props.value === nextProps.value && (nextProps.defaultValue == undefined || nextProps.defaultValue == '' ))
            || (this.props.defaultValue === nextProps.defaultValue && (nextProps.value == undefined || nextProps.value == '' ));
    }


            render() {
        return <SearchBar {...this.props} />;
    }
};