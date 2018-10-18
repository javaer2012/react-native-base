export const find = (state = { data: [], pageNum: 1, pageSize: 10 }, action) => {
    switch (action.type) {
        case "SET_FIND_LIST":
            return Object.assign({}, {
                ...state,
                data: action.payload,
                pageNum: action.payload.length < 10 ? state.pageNum : state.pageNum + 1
            })
        default:
            return state
    }
}