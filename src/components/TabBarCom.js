import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { TabBar, SearchBar, Flex } from 'antd-mobile-rn';
import Color from '../styles/var'

const styles = StyleSheet.create({
  box:{
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: Color.mainGreen,
    paddingVertical: 6
  },
  tabbatItem:{
    textAlign: 'center'

  },
  tabbarImg: {
    width: 20,
    height: 20,
    marginBottom: 4
  },
  tabbarText:{
    fontSize: 10,
   
  }
})
export default class TabBarCom extends React.Component {
  state = {
    selected: 'home',
    tabBarData:[
      {
        text: '首页',
        icon: '../images/find.png',
        iconActive: '../images/find.png'
      }, {
        text: '发现',
        icon: '../images/find.png',
        iconActive: '../images/find.png'
      }, {
        text: '我的',
        icon: '../images/find.png',
        iconActive: '../images/find.png'
      }
    ]
  }

  // renderList = (list) => {
  //   if (!list)  return false
  //   const { selected } = this.state
  //   return list.map((item, index) => {
  //     return (
  //       <Flex key={index} direction="column">
  //         {/* <Image style={{width: 50, height: 50}} source={{ uri: selected === item.text ? item.iconActive : item.icon}} /> */}
  //         {selected === item.text ? <Image source={require(item.icon)} /> : <Image source={require(item.icon)} /> }
  //         <Text>{item.text}</Text>
  //       </Flex>
  //     )
  //   })
  // }
  selecteBar = (type) => {
    const { navigate } = this.props
    this.setState({
      selected: type
    })
    navigate(type, {})
  } 

  render(){
    const { selected, tabBarData } = this.state
    console.log(selected,"~~~selected")
    return (
      <Flex justify='around' style={styles.box}>
        <TouchableOpacity onPress={this.selecteBar.bind(this, 'HomePage')}>
          <Flex direction="column" style={styles.tabbatItem}>
            <Image style={styles.tabbarImg} source={selected === 'HomePage' ? require('../images/homeActive.png') : require('../images/home.png')} />
            <Text style={[styles.tabbarText, { color: selected === 'HomePage' ? Color.mainGreen : '#333' }]} >首页</Text>
          </Flex>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={this.selecteBar.bind(this, 'FindPage')}>
          <Flex direction="column" style={styles.tabbatItem}>
            <Image style={styles.tabbarImg} source={selected === 'FindPage' ? require('../images/findActive.png') : require('../images/find.png')} />
            <Text style={[styles.tabbarText, { color: selected === 'FindPage' ? Color.mainGreen : '#333' }]} >发现</Text>
          </Flex>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.selecteBar.bind(this, 'MyPage')}>
          <Flex direction="column" style={styles.tabbatItem}>
            <Image style={styles.tabbarImg} source={selected === 'MyPage' ? require('../images/myActive.png') : require('../images/my.png')} />
            <Text style={[styles.tabbarText, { color: selected === 'MyPage' ? Color.mainGreen : '#333' }]} >我的</Text>
          </Flex>
        </TouchableOpacity>
        {/* <Flex direction="column">
          <Image source={selected === 'find' ? require('../images/findActive.png') : require('../images/find.png')} />
          <Text>发现</Text>
        </Flex>
        <Flex direction="column">
          <Image source={selected === 'my' ? require('../images/find.png') : require('../images/findActive.png')} />
          <Text>我的</Text>
        </Flex> */}
        {/* {this.renderList(tabBarData)} */}
      </Flex>
    )
  }
}

// export default class TabBarCom extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       selectedTab: 'redTab',
//     };
//   }

//   renderContent(pageText) {
//     return (
//       <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
//         <SearchBar placeholder="Search" showCancelButton />
//         <Text style={{ margin: 50 }}>{pageText}</Text>
//       </View>
//     );
//   }

//   onChangeTab(tabName) {
//     debugger
//     this.setState({
//       selectedTab: tabName,
//     });
//   }

//   render() {
//     return (
//       <TabBar
//         unselectedTintColor="#fff"
//         tintColor="#33A3F4"
//         barTintColor="#fff"
//       >
//         <TabBar.Item
//           // iconStyle={{width: 10, height: 10}}
//           style={{width: 30, height: 30}}
//           title="首页"
//           icon={require('../images/home.png')}
//           selectedIcon={require('../images/homeActive.png')}
//           selected={this.state.selectedTab === 'blueTab'}
//           onPress={() => this.onChangeTab('blueTab')}
//         >
//           {this.renderContent('Life Tab')}
//         </TabBar.Item>
//         <TabBar.Item
//           iconStyle={{width: 30, height: 30}}
//           icon={require('../images/find.png')}
//           selectedIcon={require('../images/findActive.png')}
//           title="发现"
//           badge={2}
//           selected={this.state.selectedTab === 'redTab'}
//           onPress={() => this.onChangeTab('redTab')}
//         >
//           {this.renderContent('Koubei Tab')}
//         </TabBar.Item>
//         <TabBar.Item
//           iconStyle={{width: 30, height: 30}}
//           icon={require('../images/my.png')}
//           selectedIcon={require('../images/myActive.png')}
//           title="我的"
//           selected={this.state.selectedTab === 'greenTab'}
//           onPress={() => this.onChangeTab('greenTab')}
//         >
//           {this.renderContent('Friend Tab')}
//         </TabBar.Item>
//       </TabBar>
//     );
//   }
// }