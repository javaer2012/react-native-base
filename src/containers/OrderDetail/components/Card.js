import { Text, View, StyleSheet, Image } from 'react-native'
import { Flex } from 'antd-mobile-rn';
import React, { Component } from 'react'

export default ({ title, data, children }) => {
  return (
    <Flex justify="start" align="stretch" direction="column" style={{
      backgroundColor: '#fff',
      flex: 1,
      marginBottom: 10,
    }}>
      <Flex style={{
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: '#f2f2f2',
        flexGrow: 1
      }}>
        <Text style={{ fontSize: 15, fontWeight: '600' }}>{title}</Text>
      </Flex>
      <Flex style={{ padding: 20 }}>
        {children}
      </Flex>
    </Flex>
  )
}

const styles = StyleSheet.create({
  container: {

  }
})
