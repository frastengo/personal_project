import React, {Component} from 'react'
import logo from './../Home/resources/whitefurlogo.png'
import './Header.css'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {setUser} from './../../ducks/userReducer'
import axios from 'axios'
import { StickyContainer, Sticky } from 'react-sticky';


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
            <StickyContainer>
            {/* Other elements can be in between `StickyContainer` and `Sticky`,
            but certain styles can break the positioning logic used. */}
            <Sticky>
              {({
                style,
     
                // the following are also available but unused in this example
                isSticky,
                wasSticky,
                distanceFromTop,
                distanceFromBottom,
                calculatedHeight
              }) => (
                <header style={style}>
                <div className='logo-container'>
                    <img className='logo' alt ='FURBook' src={logo}/>
                    <nav>
                        {!user ? (
                            <div className='nav'>
                                <Link className='link' to='/register'>Register </Link>
                                <Link className='link' to='/login'> Login</Link>
                                <Link className='link' to = '/'>Home</Link>
                              
                            </div>
                        ) : (
                            <div className='nav'
                            >
                                <h1 className='link'>{user.user_name} logged in</h1>
                                <Link className='link' to = '/'> Home</Link>
                                <Link className='link' to = '/new'>       New</Link>
                                <Link className='link' onClick={this.logout} > Logout</Link>
                                <Link to='/friends' className='link' >Friends </Link>
                                <Link className='link' to = '/profile'> Pets</Link>
                                <Link className='link' to = '/profiles'> FindFriends</Link>
                            </div>
                        )}
                    </nav>
                </div>
                <div className="nav-down-container" className='nav-down'>
                    <div className='nav-down'
                                >
                                    
                                    <Link className='link' to = '/'> Home</Link>
                                    <Link className='link' to = '/new'>       New</Link>
                                    <Link className='link' onClick={this.logout} >Logout</Link>
                                    <Link to='/friends' className='link' >Friends</Link>
                                    <Link className='link' to = '/profile'>My Pets</Link>
                                    <Link className='link' to = '/profiles'>Find Friends</Link>
                                </div>
                            </div>
                {/* <div className='header-nav-trial'>
                    <h1>HEllo</h1>
                    <div className='nav'>
                                <h1 className='link'> logged in</h1>
                                <Link className='link' to = '/'> Home |</Link>
                                <Link className='link' to = '/new'>       New</Link>
                                <Link className='link' onClick={this.logout} >| Logout</Link>
                                <Link to='/friends' className='link' > | My Friends </Link>
                                <Link className='link' to = '/profile'> | My Pets</Link>
                                <Link className='link' to = '/profiles'> | Find Friends</Link>
                            </div> */}
                {/* </div> */}
            </header>
              )}
            </Sticky>
            {/* ... */}
          </StickyContainer>
            
    
        
             
            
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

  