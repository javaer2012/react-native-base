export const historyKey = (state={keys:[]},action)=>{

    switch(action.type){
        case "INIT_HISTORY_KEYS":
            return Object.assign({},{keys:action.payload})
        default:
            return {...state}
    }
}