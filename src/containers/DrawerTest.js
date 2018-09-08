import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Drawer, List, WhiteSpace } from 'antd-mobile-rn';
import api from "../service/api";
import Sidebar from "../components/common/SlideBar";

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
        selected:[]
    }

    constructor(props){
        super(props)

        this.onSelect = this.onSelect.bind(this)
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

    onSelect(id){
        const idIndex = this.state.selected.indexOf(id),
            selected = Array.from(this.state.selected);
        if(idIndex !== -1){
            selected.splice(idIndex,1);
        } else {
            selected.push(id)
        }
        this.setState({
            ...this.state,
            selected
        })
    }


    render() {

        const {cateList,selected} = this.state;
        if(!cateList) return null
        const sidebar = ()=> <Sidebar source={cateList} selected={selected} onSelect={this.onSelect}/>

        return (

            <Drawer
                sidebar={sidebar()}
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