import { Text, View, StyleSheet, Image, TouchableHighlight } from 'react-native'
import { Button, Carousel, List, Flex } from 'antd-mobile-rn';
import Color from '../styles/var'
import React, { Component } from 'react'

export default ({ data, goToPay }) => {
  return (
    <Flex justify="between" style={{paddingLeft: 20, backgroundColor: '#fff'}}>
      <Text style={{ color: Color.mainPink}}>
        您仅需支付<Text style={{ fontWeight: '600', color: Color.mainPink}}>{data}元</Text>
      </Text>
      <TouchableHighlight 
        onPress={goToPay}
        style={styles.payIcon}>
        <Text style={{color: '#fff'}}> 下一步 </Text>
      </TouchableHighlight>
      
    </Flex>
  )
}

const styles = StyleSheet.create({
  payIcon: {
    padding: 20,
    backgroundColor: Color.mainPink
  }
})