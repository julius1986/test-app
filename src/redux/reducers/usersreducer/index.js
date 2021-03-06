import * as constatns from "./const";

const initialState = [];

export default function UsersReducer(state=initialState, action){
    switch (action.type) {
        case constatns.ADD_USER:
            return [...state, action.payload]
            break;
        case constatns.FETCH_USERS:
            return [...action.payload]
            break;
        case constatns.DELETE_USER:
            return state.filter(el => el.id!==action.payload)
            break;
        case constatns.UPDATE_USER:
            let index = state.findIndex((el)=>{return el.id===action.payload.id })
            if(index===-1){
                return state;
            }
            state[index] = action.payload
            return [...state]
            break;
        case constatns.ADD_USERS:
            return [...state, ...action.payload]
            break;
        default:
            return state
            break;
    }
}