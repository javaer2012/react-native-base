import React, { Component } from 'react'
import { View, Image, Text } from 'react-native'
import { createBottomTabNavigator, TabBarBottom } from 'react-navigation';
// import Home from '../containers/Home/index'
import My from '../containers/My'
import Find from "../containers/Find";
import Home from '../containers/Home/index'
import Color from '../styles/var'


export default createBottomTabNavigator(
  {
    "首页": { screen: Home },
    "发现": { screen: Find },
    "MyPage": { screen: My },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        //console.log("Haha, I'm back")
        let iconName;
        if (routeName === '首页') {
          // iconName = `ios-information-circle${focused ? '' : '-outline'}`;
          iconName =( !focused 
            ? <Image style={{ width: 20, height: 20 }} source={require('../images/home.png')} />
            : <Image style={{ width: 20, height: 20 }} source={require('../images/homeActive.png')} />
        )
        } else if (routeName === '发现') {
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
      },
    }),
    tabBarOptions: {
      activeTintColor: Color.mainGreen,
      inactiveTintColor: 'gray',
    },
  }
);