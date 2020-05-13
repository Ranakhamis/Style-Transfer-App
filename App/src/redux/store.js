import { createStore,combineReducers, applyMiddleware } from "redux"
// import logger from "redux-logger"
import reduxThunk from "redux-thunk"

import {authReducer} from "./reducer"

export default store = createStore(
    combineReducers({
        auth: authReducer
    }),
    applyMiddleware(
        reduxThunk, 
        // logger
    )
)