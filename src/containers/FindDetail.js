import React from 'react';
import {WebView,View,Text} from 'react-native'

export default class FindDetail extends React.Component{

    static navigationOptions = {
        title:"发现详情"
    }

    constructor(props){
        super(props)

        const detailInfo = props.navigation.getParam('detail')

        this.state = {
            detailInfo
        }
        console.log(detailInfo)
    }

    render(){
        const {detailInfo} = this.state
        if(!detailInfo) return null


        console.log(this.state.detailInfo.content)

        return(
            <WebView
                     originWhitelist={['*']}
                     source={{ html: detailInfo.content ,baseUrl:''}}
            />
        )
    }
}