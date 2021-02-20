import * as constatns from "./const";

export function fetchUsers(){
        return async (dispatch) => {
            let users = await (await fetch("https://jsonplaceholder.typicode.com/users?_limit=33")).json()
            dispatch({type:constatns.ADD_USERS, payload:users})
        }
}

export function addUser(user){
    return {type:constatns.ADD_USER, payload:user}
}

export function deleteUserById(id){
    return {type:constatns.DELETE_USER, payload:id}
}

export function updateUser(user){
    return {type:constatns.ADD_USER, payload:user}
}
