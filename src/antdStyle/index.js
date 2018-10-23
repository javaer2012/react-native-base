import TabsStyle from 'antd-mobile-rn/lib/tabs/style/index.native';
import CardStyle from 'antd-mobile-rn/lib/card/style/index.native';


// const Tabs = { ...bottomTabBarSplitLine }
const newTabsStyle = TabsStyle
newTabsStyle.Tabs.topTabBarSplitLine = {
  borderWidth: 0
}

let newCardStyle = {...CardStyle};
newCardStyle.card = { ...newCardStyle.card, borderColor: '#e9e8e8' }
// debugger
export {
  newTabsStyle,
  newCardStyle
}