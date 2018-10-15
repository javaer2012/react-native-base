export const appReducer = (state={isLoggedIn:'0'},action)=>{
    switch(action.type){
        case "LOGGEDIN":
            return Object.assign({},{...state},{isLoggedIn: "1"})
        case "ANONIMOUS":
            return Object.assign({},{...state},{isLoggedIn: "0"})
        default:
            return state

    }
}