import { Text, View, StyleSheet } from 'react-native'
import { Button } from 'antd-mobile-rn';
import ProudcuItem from './ProudcuItem'
import React from 'react'
import color from '../styles/var'

export default ({data}) => {
  if (data instanceof Array === false) return false
  return data.map((item, index) => {
      return (
        <View key={index}>
          {/* <ProudcuItem data={item}>
            <Button style={{ width: 80, backgroundColor: Color.mainPink}} size='small'>
              <Text style={{color: '#fff'}}>去购买</Text>
            </Button>
          </ProudcuItem> */}
        </View>
      )
    })
  
}

const styles = StyleSheet.create({
  container:{

  }
})