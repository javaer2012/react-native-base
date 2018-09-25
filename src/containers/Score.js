import React from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList, ImageBackground, Image, TouchableOpacity} from 'react-native';
import {Flex, WingBlank, WhiteSpace} from 'antd-mobile-rn';
import Button from '../components/common/Button';

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height:'100%'
    }
})

const thumbNail = [
    require('../images/imageNew/one/00.png'),
    require('../images/imageNew/one/01.png'),
    require('../images/imageNew/one/02.png'),
    require('../images/imageNew/one/03.png'),
    require('../images/imageNew/one/04.png'),
    require('../images/imageNew/one/05.png')
];

const pics = [
    require('../images/imageNew/one/00.jpg'),
    require('../images/imageNew/one/01.jpg'),
    require('../images/imageNew/one/02.jpg'),
    require('../images/imageNew/one/03.jpg'),
    require('../images/imageNew/one/04.jpg'),
    require('../images/imageNew/one/05.jpg')
]
export default class Score extends React.Component {

    static navigationOptions = {
        title: '晒晒分'
    }

    state = {
        index: 0
    }

    constructor(props){
        super(props)

        this.score = props.navigation.getParam('score')
    }

    render() {
        const {index} = this.state
        return (
            <View style={styles.container}>
                <WhiteSpace size={"xl"}/>
                <Flex direction={"row"} justify={"center"} >

                    <ImageBackground style={{width:249, height:396,resizeMode:'contain'}} source={pics[index]}>
                        <WhiteSpace size={"lg"}/>
                       <Flex direction={"column"} align={"center"}>
                           <Text style={{color:'white'}}>我的立趣分</Text>
                           <WhiteSpace size={"md"}/>
                           <Text style={{color:'white',fontSize:20}}>{this.score}</Text>
                       </Flex>
                    </ImageBackground>
                </Flex>

                <View style={{position: 'absolute', bottom: 0,backgroundColor:'white'}}>
                    <WhiteSpace size={"md"}/>

                    <Text>请选择想要的主题</Text>
                    <WhiteSpace size={"md"}/>
                    <WingBlank size={"md"}>
                        <FlatList data={thumbNail}
                                  horizontal={true}
                                  ItemSeparatorComponent={() => (<View style={{width: 10}}/>)}
                                  renderItem={({item, index, separators}) => {
                                      return (
                                          <TouchableOpacity onPress={()=>this.setState({index})}>
                                              <ImageBackground key={index} style={{ width: 122, height: 75}}
                                                               source={item}>

                                              </ImageBackground>
                                          </TouchableOpacity>
                                      )
                                  }}>

                        </FlatList>
                    </WingBlank>
                    <WhiteSpace size={"lg"}/>

                    <Flex direction={"row"} justify={"center"}>
                        <Button style={{backgroundColor:"#06C1AE",width:355,height:36,lineHeight:36,color:"white"}}>完成</Button>
                    </Flex>
                    <WhiteSpace size={"xl"}/>

                </View>

            </View>
        )
    }
}