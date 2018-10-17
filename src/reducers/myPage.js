export const myPageReducer = (state = { userInfo: null }, action) => {
    switch (action.type) {
        case "SET_USERINFO":
            return Object.assign({}, { ...state, userInfo: { ...action.payload } })
        case "CLEAR_USERINFO":
            return Object.assign({}, { ...state, userInfo: null })
        default:
            return { ...state }
    }
}