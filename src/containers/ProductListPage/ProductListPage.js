import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Button } from 'antd-mobile-rn';
import { bannerNav_mock, productList_mock } from '../../mock/home'
import { flexRow } from '../../styles/common'
import ProudcuItem from '../../components/ProudcuItem'



export default class ProductListPage extends Component {
  state = {
    products:[]
  }

  componentDidMount(){
    const { navList } = bannerNav_mock
    const { hotPhoneList } = productList_mock

    this.setState({
      navList,
      products: hotPhoneList
    })
  }
  renderList = (data) => {
    const { navigate } = this.props.navigation;
    if (!data || !(data instanceof Array)) return false
    return data.map((item, index) => {
      return (
        <TouchableOpacity
          onPress={() => navigate('ProductDetailPage', {})}
        >
          <ProudcuItem data={item}>
            {/* <Button style={{ width: 80, backgroundColor: Color.mainPink }} size='small'>
              <Text style={{ color: '#fff' }}>去购买</Text>
            </Button> */}
          </ProudcuItem>
        </TouchableOpacity>
      )
    })
  }

  render() {
    const { navList, products } = this.state
    return (
      <View stlye={{marginTop: 50}}>
        <View style={styles.productListBox}>
          {this.renderList(products) }
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({

});
