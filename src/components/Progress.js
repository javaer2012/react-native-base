import { Text, View, StyleSheet, Image } from 'react-native'
import React, { Component } from 'react'
import { Flex } from 'antd-mobile-rn';
import Color from '../styles/var'

const { mainGreen } = Color

export default ({ data }) => {
  const list = data.map((item, index) => {
    return (
      <Flex justify="center" key={index} style={{ flex: 1, height: 4, position: 'relative', top: 15, backgroundColor: item.active ? mainGreen : '#ccc'}}>
        <Text style={{ textAlign: 'center', color: '#fff', color: '#fff', borderRadius: 15, overflow: 'hidden', lineHeight: 30, width: 30, height: 30, position: 'absolute', backgroundColor: item.active ? mainGreen : '#ccc' }}>{index}</Text>
        <Text style={{ position: 'absolute', top: 30}}>{item.text}</Text>
      </Flex>
    )
  })
  return (
    <Flex >
      {list}
    </Flex>
  )
}

const styles = StyleSheet.create({
  container: {

  }
})