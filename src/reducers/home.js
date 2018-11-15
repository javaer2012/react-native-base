
// 地址相关reducer
export function locationReducer(state = {}, action) {
    switch (action.type) {
        case 'SET_LOCATION':  //  设置全局地址数据
            return Object.assign({}, state, {
                locationInfos: action.locationInfos, //  全局地址信息
                loading: false
            })
        case 'IS_OPEN': //  城市是否开通
            return Object.assign({}, state, {
                isOpen: action.playload.isOpen
            })
        default:
            return state
    }
}

// export function (state = {}, action) {
//     switch (action.type) {
//         case 'SET_LOCATION':
//             return Object.assign({}, state, {
//                 locationInfos: action.locationInfos
//             })
//         default:
//             return state
//     }
// }


export function homeDataReducer(state = {}, action) {
    switch (action.type) {
        case 'GET_HOT_PRODUCTS_SUCCESS': // 获取商品数据成功
            const  { hotMealList, hotPhoneList }  = action.response
            return Object.assign({}, state, {
                hotMealList, // 首页套餐列表
                hotPhoneList, // 热销商品列表
                loading: false
            })
        case 'GET_BANNER_AND_NAV_SUCCESS': // 
            const { navList, bannerList } = action.response
            return Object.assign({}, state, {
                bannerList,
                navList,
                loading: false
            })
        default:
            
            return state
    }
}