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