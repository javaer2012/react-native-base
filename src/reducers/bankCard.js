export const bankCard = (state = {cardInfo:{}}, action) => {
    switch (action.type) {
        case "SET_BANK_CARD":
            return Object.assign({}, { ...state, cardInfo: { ...action.payload } })
        case "CLEAR_BANK_CARD":
            return Object.assign({}, { ...state, cardInfo: {} })
        default:
            return state

    }
}