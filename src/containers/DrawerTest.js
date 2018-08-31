import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Drawer, List, WhiteSpace } from 'antd-mobile-rn';
import api from "../service/api";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContainer:{
        minHeight: 603
    },
    opContainer:{
        display: 'flex',
        flexDirection: 'row',
        flexWrap:'wrap',
        justifyContent: 'flex-start',
    },
    opContainerLong:{
        display: 'flex',
        flexDirection: 'row',
        flexWrap:'wrap',
        justifyContent: 'space-evenly',
    },
    option:{
        width:88,
        height:33,
        backgroundColor:'#EAEEEF',
        borderRadius:3,
        marginTop: 11,
        marginRight: 11
    },
    longOption:{
        width:115,
        height:33,
        backgroundColor:'#EAEEEF',
        borderRadius:3,
        marginTop: 11,


    }
});

export default class DrawerTest extends React.Component {
    drawer;
    state = {
        cateList:null,
    }

    constructor(props){
        super(props)
    }

    onOpenChange = (isOpen) => {
        /* tslint:disable: no-console */
        console.log('是否打开了 Drawer', isOpen.toString());
    }

    componentDidMount(){
        console.log("Did mount")
        this.getCateList()
    }

    async getCateList(){
        try{
            console.log("Call api of List")
            const listRsp = await api.queryConditionList({
                "provinceCode":"324523",
                "cityCode": "156440100",
                "category":'1'
            });
            console.log(listRsp)
            if(listRsp.data.errcode === 1) {
                this.setState({
                    cateList:listRsp.data.cateList
                })
            }
        } catch (e){
            console.log(e)
        }
    }


    render() {

        const {cateList} = this.state;
        if(!cateList) return null

        const cateContent = cateList.map((category,index)=>{
            const subContent = category.subCateList.map((subCate,subIndex)=>{
                return (
                    <Button key={subIndex + subCate.subCateId}
                            style={category.cateId === "8044413bbd154e7e89522c8cca0262ea"?styles.longOption:styles.option}>
                        <Text style={{fontSize:14}}>{
                        subCate.subCateName
                        }</Text>
                    </Button>
                )
            })
            return (
                <View>
                    <List.Item key={index}>
                        <Text>{category.cateName}</Text>
                    </List.Item>
                    <List>
                        <List.Item>
                           <View
                               style={category.cateId === "8044413bbd154e7e89522c8cca0262ea"?styles.opContainerLong:styles.opContainer}>
                               {subContent}
                           </View>
                        </List.Item>
                    </List>
                </View>
            )
        })
        const itemArr = Array.apply(null, Array(20))
            .map(function(_,i) {
                return i;
            })
            .map((_i, index) => {
                return (
                    <List.Item
                        key={index}
                        thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
                    >
                        <Text>Categories - {index}</Text>
                    </List.Item>
                );
            });

        // Todo: https://github.com/DefinitelyTyped/DefinitelyTyped
        const sidebar = (
            <ScrollView style={[styles.container]}>
                <List>{cateContent}</List>
                <View style={{display:'flex',flexDirection:'row',justifyContent:'flex-start'}}>
                    <Button style={{width:166,height:50,backgroundColor:'#FFE4E4'}}>
                        <Text style={{color:'#F5475F',fontSize: 15}}>重置</Text>
                    </Button>
                    <Button style={{width:164,height:50,backgroundColor:'#F5475F'}}>
                        <Text style={{color:'white',fontSize:15}}>完成</Text>
                    </Button>
                </View>
            </ScrollView>
        );

        return (

            <Drawer
                sidebar={sidebar}
                position="right"
                open={false}
                drawerRef={(el) => (this.drawer = el)}
                onOpenChange={this.onOpenChange}
                drawerBackgroundColor="#ccc"
                drawerWidth={328}
            >
                <View style={{ flex: 1, marginTop: 114, padding: 8,minHeight: 603 }}>
                    <Button onClick={() => this.drawer && this.drawer.openDrawer()}>
                        Open drawer
                    </Button>
                    <WhiteSpace />
                </View>
            </Drawer>
        );
    }
}