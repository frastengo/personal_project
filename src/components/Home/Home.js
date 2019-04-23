import React, {Component} from 'react'
import './Home.css'
import logo from './resources/whitefurlogo.png'
import {Link} from 'react-router-dom'

export default class Home extends Component {
    constructor(){
        super()
        
    }

   

    render(){
        return (
            <div className='home'>
                <div className='welcome'>
                    <div className='opacity-container1'>
                        <h2>Welcome to FURbook</h2>
                    </div>
                </div>
                <div className='register'>
                    <div className='opacity-container2'>
                        <Link to='/register' className='link'><h2>Register</h2></Link><h2>|</h2><h2> Login</h2>
                    </div>
                </div>
                <div className='find-friends'>
                    <div className='opacity-container3'>
                        <h2>Find Friends</h2>
                    </div>
                </div>
            </div>
            
        )
    }
}