import React, {Component} from 'react'
import logo from './../Home/resources/whitefurlogo.png'
import './Header.css'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {setUser} from './../../ducks/userReducer'
import axios from 'axios'


class Header extends Component {
    constructor(props){
        super(props)

        this.state = {
            loggedInUser: null
        }
    }

    componentDidMount() {
        axios.get("/auth/user").then(res => {
            // this.props.setUser(res.data);
            if (res.data){
                this.setState({
                    loggedInUser: res.data,
                })
            }
          
        });
    }

    logout = () => {
        axios.get("/auth/logout").then(() => {
          this.props.setUser(null)
          this.setState({
            loggedInUser: null
          })
        });

    };


    render(){
        console.log('logged in user in header component', this.state.loggedInUser)
        console.log('user in component header',this.props.user)
        const {user} = this.props.user


        return (
    
        
            <header>
                <div className='logo-container'>
                    <img className='logo' alt ='FURBook' src={logo}/>
                    <nav>
                        {!user ? (
                            <div className='nav'>
                                <Link className='link' to='/register'>Register |</Link>
                                <Link className='link' to='/login'> Login</Link>
                                <Link className='link' to = '/'> | Home</Link>
                              
                            </div>
                        ) : (
                            <div className='nav'>
                                <h1 className='link'>{user.name} logged in</h1>
                                <Link className='link' to = '/'> Home |</Link>
                                <Link className='link' to = '/new'>       New</Link>
                                <Link className='link' onClick={this.logout} >| Logout</Link>
                                <Link to='/friends' className='link' > | My Friends </Link>
                                <Link className='link' to = '/profile'> | My Pets</Link>
                                <Link className='link' to = '/profiles'> | Find Friends</Link>
                            </div>
                        )}
                    </nav>
                </div>
            </header> 
            
        )
    }
}

const mapStateToProps = reduxState => {
    return {
      user: reduxState.user
    };
  };
  
  const mapDispatchToProps = {
    setUser: setUser
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Header);

  