export const search = (state = { keyword: '' }, action) => {
    switch (action.type) {
        case "SET_SEARCH_KEYWORD":
            return Object.assign({}, { ...state }, { keyword: action.payload })
        default:
            return state
    }
} 