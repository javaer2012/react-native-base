import { Text, View, StyleSheet, Modal } from 'react-native'
import React, { Component } from 'react'

export default ({ text, visible, toPage, navigate }) => {
  const footerButtons = [
    { text: 'Cancel', onPress: () => cancelFun() },
    { text: 'Ok', onPress: () => {
      navigate(toPage)
    }},
  ];
  return (
    <Modal
      title="提示"
      transparent
      // onClose={this.bindCardFun}
      maskClosable
      visible={visible}
      closable
      footer={footerButtons}
    >
      <View style={{ paddingVertical: 20 }}>
        <Text style={{ textAlign: 'center' }}>{text}</Text>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {

  }
})