
import {createStore, applyMiddleware, combineReducers} from 'redux'

import promiseMiddleware from 'redux-promise-middleware'
import profilesReducer from './profilesReducer'
import userReducer from './userReducer'

const rootReducer = combineReducers({
    profiles:  profilesReducer,
    user: userReducer
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));