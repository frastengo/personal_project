import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import './Register.css'

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: '',
          email: '',
          password: '',
          displayForm: true,

          registeredUser: []
        };
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
    
      submit() {
        let { name, email, password } = this.state
        axios.post('/auth/register', {name, email, password}).then(res => {
          this.setState({
            registeredUser: res.data,
            displayForm: false
          })
        })
      }
    
      logout() {
        axios.get('/auth/logout').then(() => {
          this.setState({
            loggedInUser: {}
          })
        })
      }
    
      render() {
        console.log(this.state.registeredUser)
        let { registeredUser, email, password, name, displayForm} = this.state;
        return (
          
          
          <div className="registration-container">
            {displayForm ? (
            <div>
              <div className="registration-form">
                <h1>Welcome To FURBook</h1>
                <div className='form'>
                  <div className='label-input'>
                    <label>Name: </label>
                    <input
                        value={name}
                        onChange={e => this.setState({ name: e.target.value })}
                        type="text"
                        placeholder="Name"
                      />
                  </div>
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
                </div>
                
                {/* {loggedInUser.email ? (
                  <button onClick={() => this.logout()}>Logout</button>
                ) : (
                  <button onClick={() => this.login()}>Login</button>
                )} */}
                <button onClick={() => this.submit()}>Submit</button>
              </div>
            </div>
            ):(
              <div className="registration-form">
                <h1>Welcome {registeredUser.name},</h1>
                <p>You are now registered and ready to begin your FurBook experience.</p>
                <Link to='/new' ><button>Create New FURRY Profile</button></Link>
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