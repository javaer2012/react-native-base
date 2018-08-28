import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Button, Carousel } from 'antd-mobile-rn';
import { CalendarList, LocaleConfig } from '../../components/calendar';
LocaleConfig.locales['fr'] = {
  monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
  monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
  dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
  dayNamesShort: ['日','一','二','三','四','五','六']
};

LocaleConfig.defaultLocale = 'fr';






export default class Home extends Component {
  state = {
    list: [1,2,3]
  }

  checkFestival = (data) => {
    const festivalConfig = [
      {"2017-01-01": "元旦"},
      {"2018-01-01": "元旦"},
      {"2017-01-28": "春节"},
      {"2017-02-14": "情人节"},
      {"2018-02-14": "情人节"},
      {"2017-02-11": "元宵"},
      {"2017-04-04": "清明"},
      {"2017-05-01": "劳动节"},
      {"2018-05-01": "劳动节"},
      {"2017-06-01": "儿童节"},
      {"2018-06-01": "儿童节"},
      {"2017-05-30": "端午"},
      {"2017-09-10": "教师节"},
      {"2018-09-10": "教师节"},
      {"2017-10-01": "国庆"},
      {"2017-10-04": "中秋节"},
      {"2018-10-01": "国庆"},
      {"2017-12-25": "圣诞"},
      {"2018-12-25": "圣诞}"}
    ]
    festivalConfig.map((item, index) => {
      if(item){}
      // return (<View>

      // </View>)
    })
  }

  render() {
    const { list } = this.state
    return (
      <View>
        <Carousel
          style={styles.wrapper}
          selectedIndex={2}
          autoplay
          infinite
          afterChange={this.onHorizontalSelectedIndexChange}
        >
          {this.renderBanner(list)}
        </Carousel>
        <CalendarList
          monthFormat={'yyyy MM'}
          // 当滚动视图中可见的月份发生变化时执行的回调. Default = undefined
          onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
          // 允许滚动到过去的最大月份. Default = 50
          pastScrollRange={1}
          // 允许滚动到未来的最大月份. Default = 50
          futureScrollRange={1}
          // 启用或禁用日历列表滚动
          scrollEnabled={true}
          // 启用或禁用垂直滚动指示器. Default = false
          showScrollIndicator={true}
          // ...calendarParams
          dayComponent={({date, state}) => {
            let otherMsg = ''
            this.checkFestival(date)
            return (
            <View style={{flex: 1}}>
              <Text>{date.day}</Text>
              { !!otherMsg && <Text>{otherMsg}</Text> }
            </View>);
          }}
        />
      </View>
    )
  }

  renderBanner = (list) => {
    return list.map((item, index) => (
    <View 
      key={index} 
      style={[styles.containerHorizontal, { backgroundColor: 'yellow' }]}
    >
      <Text>item</Text>
    </View>))
  }
}


const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
  },
  containerHorizontal: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
  },
  containerVertical: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
  },
  text: {
    color: '#fff',
    fontSize: 36,
  },
});
