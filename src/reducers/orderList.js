export const orderReducer = (state = { order: [] }, action) => {
    switch (action.type) {
        case "SET_ORDER_LIST":
            return Object.assign({}, { ...state, order: [...action.payload]})
        default:
            return { ...state }
    }
}