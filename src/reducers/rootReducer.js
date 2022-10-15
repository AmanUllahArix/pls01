import {combineReducers} from "redux";
import contentStore from './contentStore.js';
import profileReducer from "./profileReducer";


const rootReducer = combineReducers({
        content : contentStore,
        profile : profileReducer
})


export default rootReducer;
