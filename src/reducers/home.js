// const home = (state = {},action)=>{
//     case 'SET_LOCATION'


//     return state;
// }

// export default home;


export function locationReducer(state = {}, action) {
    switch (action.type) {
        case 'SET_LOCATION':
            return Object.assign({}, state, {
                locationInfos: action.locationInfos,
                loading: false
            })
        case 'IS_OPEN': 
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
        case 'GET_HOT_PRODUCTS_SUCCESS':
            const  { hotMealList, hotPhoneList }  = action.response
            return Object.assign({}, state, {
                hotMealList,
                hotPhoneList,
                loading: false
            })
        case 'GET_BANNER_AND_NAV_SUCCESS':
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