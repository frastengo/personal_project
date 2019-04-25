import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import './Login.css'
import {connect} from 'react-redux'
import {setUser} from './../../ducks/userReducer'


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: '',
          email: '',
          password: '',
          loggedInUser: ''


        };
      }

      componentDidMount() {
        axios.get("/auth/user").then(res => {
          // this.props.setUser(res.data);
          if(res.data){
            this.setState({
              loggedInUser: res.data,
              displayFrom: false
            })
          }
        });
      }
    
      // componentDidMount(){
      //   axios.get('/auth/user').then(res => {
      //     this.setState({
      //       loggedInUser: res.data
      //     })
      //   })
      // }
    
      // login() {
      //   let { email, password } = this.state
      //   axios.post('/login', {email, password}).then(res => {
      //     this.setState({
      //       loggedInUser: res.data,
      //       email: '',
      //       password: ''
      //     })
      //   })
      // }
    
      login = (e) => {
        e.preventDefault()
        let {email, password} = this.state
        axios.post('/auth/login', {email, password}).then(res => {
          this.props.setUser(res.data);
          this.setState({
            loggedInUser: res.data,
          })
          // window.location.reload()
          // this.props.history.push('/login')
        })
      }

  
    

    
      render() {
        console.log('logged in user in login component', this.state.loggedInUser)
        console.log('user in component login',this.props.user)
        const {user} = this.props.user
        let { loggedInUser, email, password, name, displayForm} = this.state;
        return (
          
          
          <div className="login-container">
            {!user ? (
            <div>
              <div className="login-form">
                <h1>Welcome back FUR Parent, login to continue...</h1>
                <form className='form'>
                  <div className='label-input'>
                    <label>Email: </label>
                    <input
                      value={email}
                      onChange={e => this.setState({ email: e.target.value })}
                      type="text"
                      placeholder="Email"
                    />
                  </div>
                  <div className='label-input'>
                    <label>Password: </label>
                    <input
                      value={password}
                      type="password"
                      onChange={e => this.setState({ password: e.target.value })}
                      placeholder="password"
                    />
                  </div>
                  <div className='label-input'>
                    <button type='submit' onClick={this.login}>Login</button>
                  </div>
                </form>
                
                {/* {loggedInUser.email ? (
                  <button onClick={() => this.logout()}>Logout</button>
                ) : (
                  <button onClick={() => this.login()}>Login</button>
                )} */}
              </div>
            </div>
            ):(
              <div className="login-form">
                <h1>Welcome back {loggedInUser.name} </h1>
                <p>You are now logged-in and ready to continue your FurBook experience. Where do you want to go next?</p>
                <div className='next'>
                    <Link to='/profile' ><button>My Profile</button></Link>
                    <Link to='/profiles' ><button>Find Friends</button></Link>
                    <Link to='/friends' ><button>My Friends</button></Link>
                </div>
                {/* <h2>You are now registered and ready to create your dog profiles.</h2> */}
              </div>
            )}
    

    
            {/* <h4>Status: {loggedInUser.email ? 'Logged In' : 'Logged Out'}</h4> */}
            {/* <h4>User Data:</h4> */}
            {/* <p> {loggedInUser.email ? JSON.stringify(loggedInUser) : 'No User'} </p> */}
          </div>
        );
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
    
    export default connect(mapStateToProps, mapDispatchToProps)(Login);