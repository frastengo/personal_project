import axios from 'axios'



const initialState = {
    chatroomId: null,
}


const GET_CHATROOM = 'GET_CHATROOM'

export default function reducer(state = initialState, action){
    switch(action.type){
        case GET_CHATROOM + "_FULFILLED":
        console.log(action.payload)
            return {...state, chatroomId: action.payload}
        default: 
            return state
    }
}

export function getChatroomId(loggedInUserId, currentFriendUserId){
    
    let chatroom = axios.get(`/api/chatroom/${loggedInUserId}?user_2_id=${currentFriendUserId}`).then(res => res.data)
    return {
        type: GET_CHATROOM,
        payload: chatroom
    }
}

