export const appReducer = (state = { isLoggedIn: '0' }, action) => {
    switch (action.type) {
        case "LOGGEDIN":
            return Object.assign({}, { ...state }, { isLoggedIn: "1" ,...action.payload})
        case "ANONIMOUS":
            return Object.assign({}, { ...state }, { isLoggedIn: "0" })
        case "OPEN_ID_USER_ID":
            return Object.assign({}, { ...state }, { ...action.payload })
        case "CLEAR_LOGGEDIN":
            return Object.assign({}, { ...state, isLoggedIn: '0' })
        default:
            return state

    }
}