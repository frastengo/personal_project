import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home/Home'
import Profile from './components/Header/Header'
import Register from './components/Register/Register'


export default (
    <Switch>
        <Route exact path = '/' component={Home}/>
        <Route path = '/profile' component={Profile}/>
        <Route path = '/register' component={Register}/>
        <Route path = '/friends'/>
    </Switch>

)