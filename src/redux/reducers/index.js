import {combineReducers} from 'redux';
import users from "./usersreducer"

const rootReducer = combineReducers({users}); 
export default rootReducer;