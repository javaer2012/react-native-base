import React,{Component} from 'react';
import {Button, List} from "antd-mobile-rn";
import {ScrollView, Text, View, TextInput, StyleSheet,ImageBackground,Image,TouchableOpacity} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position:'relative',
        backgroundColor:'white'
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
        justifyContent: 'flex-start',
    },
    option:{
        width:88,
        height:33,
        borderRadius:3,
        marginTop: 11,
        marginRight: 11,
        backgroundColor:'#EAEEEF',
    },
    imgOp:{
        width:88,
        height:33,
        borderRadius:3,
        marginTop: 11,
        marginRight: 11,
        backgroundColor:'#EAEEEF'
    },
    selected:{
        width:88,
        height:33,
        borderRadius:3,
        marginTop: 11,
        marginRight: 11,
        backgroundColor:'pink',
        position:'absolute',
        opacity: 0.8,
        zIndex: 10,
        color:'pink'
    },
    longOption:{
        width:115,
        height:33,
        backgroundColor:'#EAEEEF',
        borderRadius:3,
        marginTop: 11
    }
});

//price input
const PriceInput =()=>{
    return(
        <View>
            <List.Item>
                <Text style={{color:'#888888'}}>价格</Text>
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

const SelectItem =(cateId,onSelect,id,selected,subName) =>{
    const targetSelected =  selected.includes(id)

    return (
        <TouchableOpacity key={id} style={{position:'relative'}} onPress={()=>onSelect(id)}>
            <View
                  style={cateId === ""?styles.longOption:styles.option}>
                <Text
                    style={{backgroundColor:targetSelected?'#FFE4E4':'#EAEEEF',textAlign:'center',height:33,lineHeight:33,fontSize:14 ,color:targetSelected?'#DD2727':'black'}}>
                    {subName}</Text>
            </View>
        </TouchableOpacity>
    )
}

//category item
const renderSubContent = (cateId,subId,subName,selected,onSelect) =>{

    let component = null;
    switch(subName){
        // case "小米":
        //     component = (
        //        SelectItem( <ImageBackground style={styles.imgOp} source={require('../../images/imageNew/one/brand/mi.png')}>
        //        </ImageBackground>,onSelect,subId,selected)
        //     );
        //     break;
        // case "华为":
        //     component = (
        //         SelectItem(<ImageBackground style={styles.imgOp} source={require('../../images/imageNew/one/brand/huawei.png')}>
        //         </ImageBackground>,onSelect,subId,selected)
        //     );
        //     break;
        // case "酷派":
        //     component = (
        //        SelectItem(<ImageBackground style={styles.imgOp} source={require('../../images/imageNew/one/brand/coolpad.png')}>
        //        </ImageBackground>,onSelect,subId,selected)
        //     );
        //     break;
        // case "三星":
        //     component = (
        //         SelectItem(<ImageBackground style={styles.imgOp} source={require('../../images/imageNew/one/brand/samsung.png')}>
        //         </ImageBackground>,onSelect,subId,selected)
        //     );
        //     break;
        // case "iphone":
        //     component = (
        //         SelectItem( <ImageBackground style={styles.imgOp} source={require('../../images/imageNew/one/brand/iphone.png')}>
        //         </ImageBackground>,onSelect,subId,selected)
        //     );
        //     break;
        // case "360":
        //     component = (
        //         SelectItem(<ImageBackground style={styles.imgOp} source={require('../../images/imageNew/one/brand/360.png')}>
        //
        //         </ImageBackground>,onSelect,subId,selected)
        //     );
        //     break;
        // case "荣耀":
        //     component = (
        //        SelectItem(<ImageBackground style={styles.imgOp} source={require('../../images/imageNew/one/brand/honor.png')}>
        //
        //        </ImageBackground>,onSelect,subId,selected)
        //     );
        //     break;
        // case "锤子":
        //     component = (
        //        SelectItem( <ImageBackground style={styles.imgOp} source={require('../../images/imageNew/one/brand/T.png')}>
        //
        //        </ImageBackground>,onSelect,subId,selected)
        //     );            break;
        // case "VIVO":
        //     component = (
        //        SelectItem(<ImageBackground style={styles.imgOp} source={require('../../images/imageNew/one/brand/vivo.png')}>
        //
        //        </ImageBackground>,onSelect,subId,selected)
        //     );            break;
        // case "OPPO":
        //     component = (
        //        SelectItem( <ImageBackground style={styles.imgOp} source={require('../../images/imageNew/one/brand/OPPO.png')}>
        //
        //        </ImageBackground>,onSelect,subId,selected)
        //     );            break;
        // case "Sony":
        //     component = (
        //         SelectItem(<ImageBackground style={styles.imgOp} source={require('../../images/imageNew/one/brand/sony.png')}>
        //
        //         </ImageBackground>,onSelect,subId,selected)
        //     );            break;
        // case "联想":
        //     component = (
        //        SelectItem( <ImageBackground style={styles.imgOp} source={require('../../images/imageNew/one/brand/lenovo.png')}>
        //
        //        </ImageBackground>,onSelect,subId,selected)
        //     );            break;
        // case "诺基亚":
        //     component = (
        //         SelectItem(<ImageBackground style={styles.imgOp} source={require('../../images/imageNew/one/brand/nokia.png')}>
        //
        //         </ImageBackground>,onSelect,subId,selected)
        //     );            break;
        // case "中兴":
        //     component = (
        //         SelectItem(<ImageBackground style={styles.imgOp} source={require('../../images/imageNew/one/brand/zte.png')}>
        //
        //         </ImageBackground>,onSelect,subId,selected)
        //     );            break;
        // case "魅族":
        //     component = (
        //         SelectItem(<ImageBackground style={styles.imgOp} source={require('../../images/imageNew/one/brand/meizu.png')}>
        //
        //         </ImageBackground>,onSelect,subId,selected)
        //     );            break;
        // case "美图":
        //     component = (
        //         SelectItem(<ImageBackground style={styles.imgOp} source={require('../../images/imageNew/one/brand/meitu.png')}>
        //
        //         </ImageBackground>,onSelect,subId,selected)
        //     );            break; 8044413bbd154e7e89522c8cca0262ea
        default:
            component = (
               SelectItem(cateId, onSelect,subId,selected,subName)
            )
    }
    return component;
}

//categories
const CateContent = (props)=>{
    const {source,selected,onSelect} = props;
    console.log(source,"!!!!")

   const list = source.map((category,index)=>{
    const subContent = category.subCateList.map((subCate,subIndex)=>{
        return  renderSubContent(category.cateId,subCate.subCateId,subCate.subCateName,selected,onSelect)
    })
    return (
        <View key={index}>
            <List.Item key={category.cateId}>
                <Text style={{color: '#888888'}}>{category.cateName}</Text>
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

        const {onReset,onConfirm,onSelect,selected,source} = this.props

        return (
            <View style={[styles.container]}>
                <ScrollView>
                    <List>
                        <CateContent source={source} selected={selected} onSelect={onSelect}/>
                    </List>
                </ScrollView>
                <View style={{position:'absolute',bottom:0, display:'flex',flexDirection:'row',justifyContent:'flex-start'}}>
                    <Button style={{width:166,height:50,backgroundColor:'#FFE4E4'}} onClick={onReset}>
                        <Text style={{color:'#F5475F',fontSize: 15}}>重置</Text>
                    </Button>
                    <Button style={{width:164,height:50,backgroundColor:'#F5475F'}} onClick={onConfirm}>
                        <Text style={{color:'white',fontSize:15}}>完成</Text>
                    </Button>
                </View>
            </View>
        )
    }
}