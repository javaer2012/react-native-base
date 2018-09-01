import React,{Component} from 'react';
import {Button, List} from "antd-mobile-rn";
import {ScrollView, Text, View, TextInput, StyleSheet,ImageBackground,Image} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    priceTag:{
        color:'#888888',
        fontSize:14,
        width:82,
        height:15,
        textAlign: "center",
        marginRight: 15
    },
    priceRow:{
        display:'flex',
        flexDirection:'row'
    },
    priceInput:{
        width:82,
        height:25,
        backgroundColor:'#EAEEEF',
        borderRadius:3,
        textAlign: 'center'
    },
    priceOption:{
        display:'flex',
        flexDirection:'row'
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

const PriceInput =()=>{
    return(
        <View>
            <List.Item>
                <Text>价格</Text>
            </List.Item>
            <List>
                <List.Item style={styles.priceRow}>

                    <View style={styles.priceOption}>
                        <Text style={styles.priceTag}>价格区间(元)</Text>
                        <TextInput type={"number"} style={styles.priceInput} placeholder={'最低价'}/>
                        <Text>  -  </Text>
                        <TextInput type={"number"} style={styles.priceInput} placeholder={'最高价'}/>
                    </View>
                </List.Item>
            </List>
        </View>
    )
}

const renderContent = (name)=>{

    let component = null;
    switch (name){
        case "小米":
            component = <ImageBackground style={styles.option} source={require('../../assets/phone/mi.png')}>
                <Button style={styles.option}/>
            </ImageBackground>
            break;
        case "华为":
            component = <Image style={styles.option}  source={require('./../../assets/phone/huawei.png')}/>
            break;
        case "酷派":
            component = <Image source={require('../../assets/phone/coolpad.png')}/>
            break;
        case "三星":
            component = <Image source={require('../../assets/phone/sanxin.png')}/>
            break;
        case "iphone":
            component = <Image style={styles.option} source={require('../../assets/phone/iphone.png')}/>
            break;
        case "360":
            component = <Image source={require('../../assets/phone/360.png')}/>
            break;
        case "荣耀":
            component = <Image source={require('../../assets/phone/honer.png')}/>
            break;
        case "锤子":
            component = <Image source={require('../../assets/phone/chuizi.png')}/>
            break;
        case "VIVO":
            component = <Image source={require('../../assets/phone/vivo.png')}/>
            break;
        case "OPPO":
            component = <Image source={require('../../assets/phone/oppo.png')}/>
            break;
        case "Sony":
            component = <Image source={require('../../assets/phone/sony.png')}/>
            break;
        case "联想":
            component = <Image source={require('../../assets/phone/lenovo.png')}/>
            break;
        case "诺基亚":
            component = <Image source={require('../../assets/phone/nokia.png')}/>
            break;
        case "中兴":
            component = <Image source={require('../../assets/phone/zte.png')}/>
            break;
        case "魅族":
            component = <Image source={require('../../assets/phone/meizu.png')}/>
            break;
        case "美图":
            component = <Image source={require('../../assets/phone/meitu.png')}/>
            break;
        default:
            component = <Text style={{fontSize:14}}>{
                name
            }</Text>
    };
    return component
}

//categories
const CateContent = (props)=>{
   const list = props.source.map((category,index)=>{
    const subContent = category.subCateList.map((subCate,subIndex)=>{
        return (
            <Button key={subIndex + subCate.subCateId}
                    style={category.cateId === "8044413bbd154e7e89522c8cca0262ea"?styles.longOption:styles.option}>
                {renderContent(subCate.subCateName)}
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
   return (
       <View>
           <PriceInput/>
           {list}
       </View>
   )
}





export default class Sidebar extends Component{


    render(){

        const {onReset,onConfirm,onSelect,source} = this.props

        return (
            <ScrollView style={[styles.container]}>
                <List>
                    <CateContent source={source}/>
                </List>
                <View style={{display:'flex',flexDirection:'row',justifyContent:'flex-start'}}>
                    <Button style={{width:166,height:50,backgroundColor:'#FFE4E4'}} onClick={onReset}>
                        <Text style={{color:'#F5475F',fontSize: 15}}>重置</Text>
                    </Button>
                    <Button style={{width:164,height:50,backgroundColor:'#F5475F'}} onClick={onConfirm}>
                        <Text style={{color:'white',fontSize:15}}>完成</Text>
                    </Button>
                </View>
            </ScrollView>
        )
    }
}