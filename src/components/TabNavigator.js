import React, { Component } from 'react'
import { View, Image, Text } from 'react-native'
import { createBottomTabNavigator, TabBarBottom } from 'react-navigation';
// import Home from '../containers/Home/index'
import My from '../containers/My'
import Find from "../containers/Find";
import Home from '../containers/Home/index'
import Color from '../styles/var'


const tab = createBottomTabNavigator(
    {
        "Home": Home,
        "FindPage": Find,
        "MyPage": My,
    },
    {
        tabBarOptions: {
            activeTintColor: Color.mainGreen,
            inactiveTintColor: 'gray',
        },
    }
);
tab.navigationOptions =  ({ navigation }) => {
    const { routeName } = navigation.state.routes ?
        navigation.state.routes[navigation.state.index]:
        navigation.state;
    let headerTitle = "信用租机"

    if(routeName === "FindPage") headerTitle = "发现"
    if(routeName === "MyPage") headerTitle = "我的"

    // You can do whatever you like here to pick the title based on the route name


    return {
        headerTitle,
        tabBarIcon: ({ focused, tintColor }) => {
            const { routeName } = navigation.state;
            //console.log("Haha, I'm back")
            let iconName;
            if (routeName === 'Home') {
                // iconName = `ios-information-circle${focused ? '' : '-outline'}`;
                iconName =( !focused
                        ? <Image style={{ width: 20, height: 20 }} source={require('../images/home.png')} />
                        : <Image style={{ width: 20, height: 20 }} source={require('../images/homeActive.png')} />
                )
            } else if (routeName === 'FindPage') {
                iconName =( !focused
                    ? <Image style={{ width: 22, height: 22 }} source={require('../images/find.png')} />
                    : <Image style={{ width: 22, height: 22 }} source={require('../images/findActive.png')} />)
            } else if (routeName === 'MyPage') {
                iconName =( !focused
                    ? <Image style={{ width: 20, height: 20 }} source={require('../images/my.png')} />
                    : <Image style={{ width: 20, height: 20 }} source={require('../images/myActive.png')} />)
            }

            // You can return any component that you like here! We usually use an
            // icon component from react-native-vector-icons
            // return <Ionicons name={iconName} size={25} color={tintColor} />;
            return iconName
        }

    }
}

tab.navigationOptions.tabBarIcon = ({ focused, tintColor }) => {
    const { routeName } = navigation.state;
    //console.log("Haha, I'm back")
    let iconName;
    if (routeName === 'Home') {
        // iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        iconName =( !focused
                ? <Image style={{ width: 20, height: 20 }} source={require('../images/home.png')} />
                : <Image style={{ width: 20, height: 20 }} source={require('../images/homeActive.png')} />
        )
    } else if (routeName === 'FindPage') {
        iconName =( !focused
            ? <Image style={{ width: 22, height: 22 }} source={require('../images/find.png')} />
            : <Image style={{ width: 22, height: 22 }} source={require('../images/findActive.png')} />)
    } else if (routeName === 'MyPage') {
        iconName =( !focused
            ? <Image style={{ width: 20, height: 20 }} source={require('../images/my.png')} />
            : <Image style={{ width: 20, height: 20 }} source={require('../images/myActive.png')} />)
    }

    // You can return any component that you like here! We usually use an
    // icon component from react-native-vector-icons
    // return <Ionicons name={iconName} size={25} color={tintColor} />;
    return iconName
}


export default tab