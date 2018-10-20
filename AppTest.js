import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import React, { Component } from 'react';
import { 
    Image,
    Platform,
    StyleSheet,
    Button,
    AppRegistry,
    Text,
    View
 } from 'react-native';

class MinePage extends Component {

    static navigationOptions = {
        title: 'Settings',
        // header: {
        //     right: <Button title="Edit" />,
        // },
        // tabBar: {
        //     label: 'Settings',
        //     icon: () => (
        //         <Icon color={colors.primary} name='settings' size={26} />
        //     ),
        // },
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'pink' }}>
                <Text onPress={this._skip.bind(this)}>MinePage</Text>
            </View>
        );
    }

    /**
     * 跳转
     */
    _skip() {
        this.props.navigation.goBack();
    }
}
const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
    },
});


class HomePage extends Component {

    // static navigationOptions = {
    //     title: '首页',
    // };

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'yellow' }}>
                <Text onPress={this._skip.bind(this)}>点击跳转</Text>
            </View>
        );
    }

    _skip() {
        this.props.navigation.navigate("Mine");
    }
}
class TabBarItem extends Component {

    render() {
        return (
            <Image 
                // source={this.props.focused ? this.props.selectedImage : this.props.normalImage}
                style={{ tintColor: this.props.tintColor, width: 25, height: 25 }}
            />
        )
    }

}

const Tab = TabNavigator({
    Home: {
        screen: HomePage,
        navigationOptions: ({ navigation }) => ({
            title:'2222222',
            tabBarLabel: '首页',
            tabBarIcon: ({ focused, tintColor }) => (
                <TabBarItem
                    tintColor={tintColor}
                    focused={focused}
                    // normalImage={require('./imgs/ic_like_sel.png')}
                    // selectedImage={require('./imgs/ic_mine_sel.png')}
                />
            )
        }),
    },

    Mine: {
        screen: MinePage,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: '我',
            tabBarIcon: ({ focused, tintColor }) => (
                <TabBarItem
                    tintColor={tintColor}
                    focused={focused}
                    // normalImage={require('./imgs/ic_like_sel.png')}
                    // selectedImage={require('./imgs/ic_like_sel.png')}
                />
            )
        }),
    },
},
{
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    lazy: true,
    tabBarOptions: {
        activeTintColor: '#06c1ae',
        inactiveTintColor: '#979797',
        style: { backgroundColor: '#ffffff', },
        labelStyle: {
            fontSize: 20, // 文字大小
        },
    }
});
console.log(Tab,"TabTabTabTab")
const Navigator = StackNavigator(
    {
        Tab: { 
            screen: Tab,
            navigationOptions: {
                title:'首页111',
            }
         },
    },

    {
        navigationOptions: {
            // title:'首页',
            headerBackTitle: null,
            headerTintColor: '#333333',
            showIcon: true,
            swipeEnabled: false,
            animationEnabled: false,
        },

        mode: 'card',
    });


export default class App extends Component {
    render() {
        return (
            <Navigator />
        );
    }
}