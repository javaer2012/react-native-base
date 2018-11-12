import React, { Component } from 'react';
import { Button, List, InputItem, Flex } from "antd-mobile-rn";
import { ScrollView, Text, View, StyleSheet, TextInput, Image, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: 'white'
    },
    priceTag: {
        color: '#888888',
        fontSize: 14,
        width: 82,
        height: 15,
        lineHeight: 15,
        textAlign: "center",
        marginRight: 15
    },
    priceRow: {
        display: 'flex',
        flexDirection: 'row'
    },
    priceInput: {
        width: 82,
        height: 25,
        lineHeight:25,
        padding:0,
        backgroundColor: '#EAEEEF',
        borderRadius: 3,
        textAlign: 'center',
        fontSize: 14
    },
    priceOption: {
        display: 'flex',
        flexDirection: 'row'
    },
    listContainer: {
        minHeight: 603
    },
    option: {
        width: 88,
        height: 33,
        borderRadius: 3,
        marginTop: 11,
        marginRight: 11,
        backgroundColor: '#EAEEEF',
    },
    imgOp: {
        width: 88,
        height: 33,
        borderRadius: 3,
        marginTop: 11,
        marginRight: 11,
        backgroundColor: '#EAEEEF'
    },
    selected: {
        width: 88,
        height: 33,
        borderRadius: 3,
        marginTop: 11,
        marginRight: 11,
        backgroundColor: 'pink',
        position: 'absolute',
        opacity: 0.8,
        zIndex: 10,
        color: 'pink'
    },
    longOption: {
        width: 115,
        height: 33,
        backgroundColor: '#EAEEEF',
        borderRadius: 3,
        marginTop: 11
    },
    header: {
        minHeight: 44,
        paddingLeft: 15,
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 0.5,
        width: '100%'
    },
    content: {
        paddingLeft: 15,
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 0.5,
        width: '100%',
        paddingVertical: 10
    }
});

//price input
const PriceInput = (props) => {
    const { maxPrice, minPrice, onChange } = props

    return (
        <Flex direction={"column"} align={"start"}>
            <Flex direction={"column"} justify={"center"} align={"start"} style={styles.header}>
                <Text style={{ color: '#888888' }}>价格</Text>
            </Flex>
            <Flex direction={"row"} align={"center"} style={styles.content}>
                <Text style={styles.priceTag}>价格区间(元)</Text>
                <TextInput style={styles.priceInput} placeholder="你好" />
                {/* <TextInput
                    type={"number"}
                    style={styles.priceInput}
                    placeholder={'最低价'}
                    value={minPrice}
                    onChangeText={(text) => onChange(text, 'minPrice')}
                /> */}
                <View style={{ width: 10, marginHorizontal: 3, borderWidth: 1, height: 1, borderColor: '#E5E5E5' }}></View>
                <TextInput
                    type={"number"}
                    style={styles.priceInput}
                    placeholder={'最高价'}
                    value={maxPrice}
                    onChangeText={(text) => onChange(text, 'maxPrice')}
                />
            </Flex>
        </Flex>
    )
}

const SelectItem = (cateId, onSelect, id, selected, subName) => {
    const targetSelected = selected.includes(id)

    return (
        <TouchableOpacity key={id} style={{ position: 'relative' }} onPress={() => onSelect(id)}>
            <View
                style={cateId === "" ? styles.longOption : styles.option}>
                <Text
                    style={{
                        backgroundColor: targetSelected ? '#FFE4E4' : '#EAEEEF',
                        textAlign: 'center',
                        height: 33,
                        lineHeight: 33,
                        fontSize: 14,
                        color: targetSelected ? '#DD2727' : '#282828'
                    }}>
                    {subName}</Text>
            </View>
        </TouchableOpacity>
    )
}

//category item
const renderSubContent = (cateId, subId, subName, selected, onSelect) => {

    let component = null;
    switch (subName) {
        default:
            component = (
                SelectItem(cateId, onSelect, subId, selected, subName)
            )
    }
    return component;
}

//categories
const CateContent = (props) => {
    const { source, selected, onSelect, maxPrice, minPrice, onChange } = props;

    const list = source.map((category, index) => {
        const subContent = category.subCateList.map((subCate, subIndex) => {
            return renderSubContent(category.cateId, subCate.subCateId, subCate.subCateName, selected, onSelect)
        })
        return (
            <View key={index}>
                <Flex key={category.cateId} direction={"column"} justify={"center"} align={"start"} style={styles.header}>
                    <Text style={{ color: '#888888' }}>{category.cateName}</Text>
                </Flex>
                <Flex style={{ paddingLeft: 20 }} direction={"row"} justify={"start"} wrap={"wrap"} >
                    {subContent}
                </Flex>
            </View>
        )
    })
    return (
        <View>
            <PriceInput maxPrice={maxPrice} minPrice={minPrice} onChange={onChange} />
            {list}
        </View>
    )
}


export default class Sidebar extends Component {


    render() {

        const { onReset, onConfirm, onSelect, selected, source, maxPrice, minPrice, onChange } = this.props

        return (
            <View style={[styles.container]}>
                <ScrollView>
                    <View style={{ marginBottom: 65 }}>
                        <CateContent
                            source={source}
                            selected={selected}
                            onSelect={onSelect}
                            maxPrice={maxPrice}
                            minPrice={minPrice}
                            onChange={onChange}
                        />
                    </View>
                </ScrollView>
                <View style={{
                    position: 'absolute',
                    bottom: 0,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start'
                }}>
                    <Flex direction={"row"} style={{ width: '100%', height: 50 }}>
                        <Flex.Item>
                            <TouchableOpacity onPress={onReset}>
                                <Text style={{ color: '#F5475F', height: 50, lineHeight: 50, fontSize: 15, textAlign: 'center', backgroundColor: '#FFE4E4' }}>重置</Text>
                            </TouchableOpacity>
                        </Flex.Item>
                        <Flex.Item>
                            <TouchableOpacity onPress={onConfirm}>
                                <Text style={{ color: 'white', height: 50, lineHeight: 50, fontSize: 15, textAlign: 'center', backgroundColor: '#F5475F' }}>完成</Text>
                            </TouchableOpacity>
                        </Flex.Item>
                    </Flex>
                </View>
            </View>
        )
    }
}