
import {createStore, applyMiddleware, combineReducers} from 'redux'

import promiseMiddleware from 'redux-promise-middleware'
import profilesReducer from './profilesReducer'
import userReducer from './userReducer'
import friendsReducer from './friendsReducer'

const rootReducer = combineReducers({
    profiles:  profilesReducer,
    user: userReducer,
    friends: friendsReducer
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));