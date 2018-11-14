# 项目说明

## 技术框架

主要技术框架如下：
- react-native
- redux:数据流管理
- redux-saga:异步redux
- react-navigation:导航组件
- antd-mobile-rn:组件库

如果React不熟悉，或者redux不熟悉，请参考官方文档。saga是我们使用的熟悉的中间件（用于数据流管理，可不使用），可以根据喜好替换成thunk之类的。
其余功能性框架，如react-native-smart-barcode, react-native-canvas 等，都是由于RN原生缺少相应的功能组件或api，依赖第三方包可查看package.json文件。
lodash, moment, axois 之类的基础库是功能性支撑库。各个组件的官方文档都还比较详细，建议去看一下。


## 目录结构
- ios ios项目文件夹
- andriod 安卓项目文件夹
- scripts 预编译脚本，主要功能是修改antd主题
- src 前端源文件，其中
  - antdStly 复写Tab 和Card的样式
  - assets 和images 部分图片资源
  - components 拆分出来的组件
  - containers 页面
  - mock mock，可以忽略
  - reducer reducer
  - router 路由定义
  - sagas saga
  - store store
  - styles 公用的样式
  - utils 项目需要的功能支撑
  - config.js appkey，appsecret, 目前没有使用
  - App.js 项目组件入口
  - index.js 项目入口
  - hotApp.js 热更新测试文件，可忽略
  - theme.js antd自定义主题
  - update.json 热更新配置

  ## 开发流程

  ### ios

  - 脚本启动

  根目录下跑 yarn devI 或者npm run devI 会起一个metro的后台提供jsbundle,并默认启动iphone 6的虚拟机

  - Xcode启动

  打开ios目录下的myboy.xcodeproj, 后续操作跟原生app启动方式一致。

  ### android

  - 脚本启动

  需要先启动虚拟机或者插上真机，然后根目录运行 yarn devA 或者npm run devA

  - Android Studio启动

  打开android 文件夹，后续操作跟原生app一致 如果启动有报aapt的错，需要将 **gradle.properties** 中29行注释掉即可。


  ### npm命令说明

 1. devA 安卓启动
 2. devI IOS启动
 3. bundle:ios ios打包生成main.jsbundle，供后续打包生成ipa使用
 4. build:a 打包生成apk
 5. clean:a 清理安卓项目
 6. push:ios 推送ios热更新
 7. push:a 推送安卓热更新

 以上命令为个人添加，可自行删除或增加，不影响功能。

 ## 代码结构
 


 ## 打包

 ### IOS
 - 先运行 yarn bundle:ios 或者直接跑ios打包命令，生成main.jsbundle
 - 在xcode myboy项目中，引入生成的main.jsbundle和assets
 - AppDelegate.m中，注释22行，并放出23行（22行用metro的jsbundle, 23行指定用项目local的jsbundle）
 - 后续操作跟原生操作一样
 详细步骤，可以参看ReactNative官网，我自己也是一步一步看官网来的。

 ### Android
 项目直接跑yarn build:a就行，会在output中生成apk

 ## 热更新

 热更新使用pushy提供的server, 需要去注册账号，并将信息填在update.json中，具体的首次配置请参看
 https://update.reactnative.cn/home

 后续如修改了js的代码，只需要运行yarn push:ios/ yarn push:a 即可推送热更新代码

 ## 注意事项

 ### 导航
 - React Native 的导航跟web不一样，页面切换时不会触发react生命周期，这里的做法是需要使用生命周期时，需要使用 **NavigationEvents** 来触发，可以参考 **Find.js** 中的代码。
 - RN 导航结构也与web的react-router不同，具体细节请参考文档。目前的导航结构是，把所有可能有关联的页面都放在同一个tab中，每一个tab是一个独立的stack, 当stack长度大于1时，隐藏tabBar

 ## react-native-smart-barcode
 - 这个库直接install下来无法使用，需要修改源码
 - yarn prop-types,然后做如下修改

    ```javascript
import React, {
    Component,
} from 'react'
import {
    View,
    requireNativeComponent,
    NativeModules,
    AppState,
    Platform,
} from 'react-native'

import PropTypes from 'prop-types'
```

 - RCTCapturePackage.java 注释掉 41行
 详情可以去这个库的github看。

 ## antd 
- 组件库会涉及到样式覆盖（项目中src/antdStyle文件用于样式覆盖，theme文件用于定制主题颜色） 参考
    - https://github.com/ant-design/antd-mobile-samples/tree/master/rn-custom-ui#antd-mobile-with-rn-custom-ui
    - https://github.com/ant-design/ant-design-mobile/pull/1629

### RentApp 

- RentApp 是在react Component上包了一层，增加部分全局方法。


### redux 中数据含义(reducer通常按照页面名称划分)
- app
    - OPEN_ID_USER_ID // 将 openId, userId存入redux
    - SET_LOCATION //  设置全局地址信息
    - IS_OPEN_ASYNC // 判断城市是否开放
    - CHANGE_LOADING // 改变loading状态
    - APP_STATUS
- 首页
    - SET_SEARCH_KEYWORD // 设置筛选商品(首页、商品列表顶部搜索栏)的关键字
    - HOME_GET_HOME_PRODUCTS //获取首页热销商品
    - HOME_GET_BANNER_AND_NAV // 获取导航条和滚动banner数据
- 搜索页
    - ADD_HISTORY_KEYS // 设置搜索历史
    - SET_SEARCH_KEYWORD // 设置搜索关键字
- 发现页
    - QUERY_FIND_LIST // 获取发现页面数据


## 注意事项

- 由于部分原因，前期部分数据没走redux，而是走的缓存传递数据，搜关键字 AsyncStorage，即可查到，后期建议统一走redux。
- 地址部分，现在逻辑：首页选择地址：从city1014中拿出按照**市**排序好的城市信息，选中一个去 city1.json 中拿到对应的crm地址信息。
- 选择学校： 从 utils/areaSchool 中拿出按照**省**排序好的城市信息，选中一个去utils/school的schoolObjs中找到对应的学校