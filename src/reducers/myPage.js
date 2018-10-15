export const myPageReducer = (state={userInfo:{}},action)=>{
    switch (action.type) {
        default:
            return {...state,userInfo: {name:"test"}}
    }
}