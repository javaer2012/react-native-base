import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

var Geolocation = require('Geolocation');
var watchID = null
export default class Test extends Component {
    beginWatch = () => {
        watchID = Geolocation.watchPosition(
            (location) => {
                console.log(location,"!!!!")
            },
            error => {
                alert("获取位置失败：" + error)
            }
        )
    }
    render(){
        return (
            <View>
                <Text style={styles.item} onPress={this.beginWatch} >开始监听</Text>
                <Text style={styles.item}>停止监听</Text>
            </View>
        )
    }
}

//监听定位的id
// var watchID = null

// //默认应用的容器组件
// export default class Test extends Component {
//    //渲染
//   render() {
//       return(
//         <View style={styles.container}>
//          <Text style={styles.item}>开始监听</Text>
//          <Text style={styles.item}>停止监听</Text>
//         </View>
// )
//    }
// }
//    
//  
//    //停止监听位置变化
//    stopWatch() {
//       Geolocation.clearWatch(watchID);
//    }
//  }
//  
//样式定义
const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop:25
    },
    item:{
        margin:15,
        height:30,
        borderWidth:1,
        padding:6,
        borderColor:'#ddd',
        textAlign:'center'
    }
})

// AppRegistry.registerComponent('ReactDemo', () => App);