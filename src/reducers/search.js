export const search = (state = { keyword: '' }, action) => {
    switch (action.type) {
        case "SET_SEARCH_KEYWORD": // 设置全局搜索条件关键字
            return Object.assign({}, { ...state }, { keyword: action.payload })
        default:
            return state
    }
} 