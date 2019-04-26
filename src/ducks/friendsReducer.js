import axios from 'axios'


const initialState = {
    friends: null
}


const GET_FRIENDS = 'GET_FRIENDS'

export default function reducer(state = initialState, action){
    switch(action.type){
        case GET_FRIENDS:
            return {...state, friends: action.payload}
        default: 
            return state
    }
}

export function getFriends(profileId){
    let friends = axios.get(`/api/friends/:id`).then(res => res.data)
    return {
        type: GET_FRIENDS,
        payload: friends
    }
}

