import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home/Home'
// import Profile from './components/Header/Header'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import Profiles from './components/Profiles/Profiles'
import MyProfile from './components/MyProfile/MyProfile'
import AddPetForm from './components/AddPetForm/AddPetForm'
import Friends from './components/Friends/Friends'
import Messages from './components/Messages/Messages'
import Chatroom from './components/Chatroom/Chatroom'


export default (
    <Switch>
        <Route exact path = '/' component={Home}/>
        <Route path = '/profile' component={MyProfile}/>
        <Route path = '/register' component={Register}/>
        <Route path = '/login' component={Login}/>

        <Route path = '/new' component={AddPetForm}/>
        <Route path = '/profiles' component={Profiles}/>
        <Route path = '/friends' component={Friends}/>
        <Route path = '/messages' component={Messages}/>
        <Route path = '/chatroom' component={Chatroom}/>
    </Switch>

)