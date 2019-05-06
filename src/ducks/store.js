
import {createStore, applyMiddleware, combineReducers} from 'redux'

import promiseMiddleware from 'redux-promise-middleware'
import profilesReducer from './profilesReducer'
import userReducer from './userReducer'
import friendsReducer from './friendsReducer'
import chatReducer from './chatReducer'

const rootReducer = combineReducers({
    userProfiles:  profilesReducer,
    user: userReducer,
    friends: friendsReducer,
    chatroomId: chatReducer
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));