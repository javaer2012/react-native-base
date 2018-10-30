import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
    Alert
} from 'react-native';
import Barcode from 'react-native-smart-barcode'
import {NavigationEvents} from 'react-navigation'
import {Toast} from 'antd-mobile-rn'
export default class BarTest extends Component {

    static navigationOptions = {
        title:"扫描二维码"
    }
    //构造方法
    constructor(props) {
        super(props);
        this.state = {
            viewAppear: false,
        };
    }
    componentDidMount() {
        //启动定时器
        // this.timer = setTimeout(
        //     () => this.setState({viewAppear: true}),
        //     250
        // );
    }
    //组件销毁生命周期
    componentWillUnmount() {
        //清楚定时器
        //this.timer && clearTimeout(this.timer);
    }

    _onBarCodeRead = (e) => {
        // console.log(`e.nativeEvent.data.type = ${e.nativeEvent.data.type}, e.nativeEvent.data.code = ${e.nativeEvent.data.code}`)
        this._stopScan();

       try{
        console.log(e.nativeEvent.data.code)

        const {orderId,orderSn} = JSON.parse(e.nativeEvent.data.code)

        if(!orderId || !orderSn) {
            Alert.alert("二维码", "二维码信息错误", [
                {text: '确认', onPress: () => this._startScan()},
            ])
        } else {
            this.props.navigation.navigate("OrderDetail",{orderId,orderSn})
        }
       } catch(e){
           Toast.info("二维码错误，请重试",1.5)
       }
        
    };

    _startScan = (e) => {
        this._barCode.startScan()
    };

    _stopScan = (e) => {
        this._barCode.stopScan()
    }
    render() {
        return (
            <View style={{flex: 1}}>
            <NavigationEvents
                    onWillFocus={payload => {
                        console.log("will focus")
                        this.timer = setTimeout(
                            () => this.setState({viewAppear: true}),
                            250
                        );
                    }}
                    onDidFocus={payload => console.log('did focus', payload)}
                    onWillBlur={payload => {
                        console.log('will blur', payload)
                        this.timer && clearTimeout(this.timer);
                    }}
                    onDidBlur={payload => console.log('did blur', payload)}
                />
                {this.state.viewAppear ?
                    <Barcode style={{flex: 1,}} ref={component => this._barCode = component}
                             onBarCodeRead={this._onBarCodeRead}/>
                    : null
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});