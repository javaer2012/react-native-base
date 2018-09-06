import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native'
import { Flex, List, ImagePicker, Button } from 'antd-mobile-rn';
// import { orderInfo_mock } from '../../mock/ProductDetailPage'
import Color from '../../styles/var'
import Progress from '../../components/Progress'

const bgf = {
  backgroundColor: '#fff'
}


export default class UploadImg extends Component {
  state = {
    completePay: false,
    files: [
      {
        url: 'https://zos.alipayobjects.com/rmsportal/WCxfiPKoDDHwLBM.png',
        id: '2121',
      },
      {
        url: 'https://zos.alipayobjects.com/rmsportal/WCxfiPKoDDHwLBM.png',
        id: '2122',
      },
      {
        url: 'https://zos.alipayobjects.com/rmsportal/WCxfiPKoDDHwLBM.png',
        id: '2123',
      },
      {
        url: 'https://zos.alipayobjects.com/rmsportal/WCxfiPKoDDHwLBM.png',
        id: '2124',
      },
      {
        url: 'https://zos.alipayobjects.com/rmsportal/WCxfiPKoDDHwLBM.png',
        id: '2125',
      },
      {
        url: 'https://zos.alipayobjects.com/rmsportal/WCxfiPKoDDHwLBM.png',
        id: '2126',
      },
    ],
  }

  // uploadImage() {
  //   let formData = new FormData();
  //   let file = { uri: 'www.baidu.com', type: 'multipart/form-data', name: 'a.jpg' };

  //   formData.append("images", file);

  //   fetch('www.baidu.com', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //     },
  //     body: formData,
  //   })
  //     .then((response) => response.text())
  //     .then((responseData) => {

  //       console.log('responseData', responseData);
  //     })
  //     .catch((error) => { console.error('error', error) });
  // }

  addFun = () => {
    // this.uploadImage()
  }
  handleFileChange = (files) => {
    this.setState({
      files,
    });
  }

  componentDidMount() {
  }

  render() {
    // const { navigate } = this.props.navigation;
    // const { completePay } = this.state
    return (
      <Flex direction="column" style={{ backgroundColor: '#fff', flex: 1 }}>
        {/* <ActivityIndicator /> */}
        <ImagePicker
          onChange={this.handleFileChange}
          files={this.state.files}
          onAddImageClick={this.addFun}
        />
      </Flex>
    )
  }
}


const styles = StyleSheet.create({
});
