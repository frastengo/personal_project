import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home/Home'
import Profile from './components/Header/Header'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import Profiles from './components/Profiles/Profiles'


export default (
    <Switch>
        <Route exact path = '/' component={Home}/>
        <Route path = '/profile' component={Profile}/>
        <Route path = '/register' component={Register}/>
        <Route path = '/login' component={Login}/>
        {/* <Route path = '/friends' component={Friends}/> */}
        <Route path = '/new'/>
        <Route path = '/profiles' component={Profiles}/>
    </Switch>

)