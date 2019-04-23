import React, {Component} from 'react'
import logo from './../Home/resources/whitefurlogo.png'
import './Header.css'
import {Link} from 'react-router-dom'
import Home from '../Home/Home'

export default class Header extends Component {
    render(){
        return (
        
            <header>
                <div className='logo-container'>
                    <img className='logo' alt ='FURBook' src={logo}/>
                    <nav>
                        <Link className='link' to='/register'>Register |</Link><Link className='link' to='/login'> Login</Link>
                        <Link className='link' to = '/'> | Home</Link>
                    </nav>
                </div>
            </header> 
            
        )
    }
}