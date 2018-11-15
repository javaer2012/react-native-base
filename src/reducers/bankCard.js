export const bankCard = (state = {cardInfo:{}}, action) => {
    switch (action.type) {
        case "SET_BANK_CARD": // 设置银行卡数据
            return Object.assign({}, { ...state, cardInfo: { ...action.payload } })
        case "CLEAR_BANK_CARD": // 清除银行卡数据
            return Object.assign({}, { ...state, cardInfo: {} })
        default:
            return state

    }
}