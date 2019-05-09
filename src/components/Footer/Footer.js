import React, {Component} from 'react'
import {Link} from 'react-router-dom'


export default function Footer () {
    return <footer className='footer'>
                <h1 className='footer-title'><i class="material-icons">pets</i></h1>
                <div id='next-test-nav-down-footer'>    
                        <Link to='/friends' className='nav-link' ><button>Friends </button></Link>
                        <Link className='nav-link' to = '/messages'>       <button>Messages</button></Link>
                                
                         <Link className='nav-link' to = '/profile'> <button>Pets</button></Link>
                        <Link className='nav-link' to = '/profiles'><button>Find</button></Link>
                        <Link className='nav-link'  > <button>Logout</button></Link>
                    </div>
             </footer>
}