// const home = (state = {},action)=>{
//     case 'SET_LOCATION'


//     return state;
// }

// export default home;


export function locationReducer(state = {}, action) {
    switch (action.type) {
        case 'SET_LOCATION':
            return Object.assign({}, state, {
                locationInfos: action.locationInfos
            })
        default:
            return state
    }
}


export function homeDataReducer(state = {}, action) {
    switch (action.type) {
        case 'GET_HOT_PRODUCTS_SUCCESS':
            const  { hotMealList, hotPhoneList }  = action.response
            // debugger
            return Object.assign({}, state, {
                hotMealList,
                hotPhoneList
            })
        case 'GET_BANNER_AND_NAV_SUCCESS':
            const { navList, bannerList } = action.response
            // debugger
            return Object.assign({}, state, {
                bannerList,
                navList
            })
        default:
            return state
    }
}