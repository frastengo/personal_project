import axios from 'axios'


const initialState = {
    profiles: [],
    loading: false,
}

const GET_ALL_PROFILES = "GET_ALL_PROFILES"




export default function reducer(state = initialState, action){
    switch(action.type){
        case GET_ALL_PROFILES + "_PENDING":
            return {...state, loading: true}
        case GET_ALL_PROFILES + "_FULFILLED":
        //doesnt need to have ...state when making awhole new object
            return {loading: false, profiles: action.payload}
        case GET_ALL_PROFILES + "_REJECTED":
            return {...state, loading: false}
        default:
            return state
    }
    
}
//add async after export if using await


export function getAllProfiles(){
    let profiles = axios.get('/api/profiles').then(res => res.data)
    // let articles = await axios.get('/api/hacker-news')
    return {
        type: GET_ALL_PROFILES,
        payload: profiles
    }
}