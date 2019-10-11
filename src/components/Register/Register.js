import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import './Register.css'
import {connect} from 'react-redux'
import {setUser} from './../../ducks/userReducer'

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
          user_name: '',
          email: '',
          password: '',
          displayForm: true,
          loggedInUser: null,

          registeredUser: []
        };
      }
    
      componentDidMount(){
        axios.get('/auth/user').then(res => {
          this.props.setUser(res.data)
          this.setState({
            loggedInUser: res.data
          })
        })
      }
    
      submit() {
        let { user_name, email, password } = this.state
        axios.post('/auth/register', {user_name, email, password}).then(res => {
          this.props.setUser(res.data)
          this.setState({
            loggedInUser: res.data,
            displayForm: false
          })
        })
      }
    
      logout() {
        axios.get('/auth/logout').then(() => {
          this.props.setUser(null)
          this.setState({
            loggedInUser: {}
          })
        })
      }
      render() {
        console.log(this.state.loggedInUser)
        let { loggedInUser, email, password, user_name, displayForm} = this.state;
        const {user} = this.props.user
        return (
          
        <div className="registration-container-1">
          <div className="registration-container">
            {displayForm ? (
            <div>
              <div className="registration-form">
                <h1 className='welcome-icons'><i class="material-icons">
                  pets
                  </i>Welcome in, Fur Parent!<i class="material-icons">
                  pets
                  </i></h1>
                <div className='form'>
                  <div className='label-input'>
                    <label><h4>Name:</h4> </label>
                    <input
                        value={user_name}
                        onChange={e => this.setState({ user_name: e.target.value })}
                        type="text"
                        placeholder="Name"
                      />
                  </div>
                  <div className='label-input'>
                    <label><h4>Email:</h4> </label>
                    <input
                      
                      value={email}
                      onChange={e => this.setState({ email: e.target.value })}
                      type="text"
                      placeholder="Email"
                    />
                  </div>
                  <div className='label-input'>
                    <label><h4>Password:</h4> </label>
                    <input
                      value={password}
                      type="password"
                      onChange={e => this.setState({ password: e.target.value })}
                      placeholder="password"
                    />
                  </div>
                </div>
                <div className='label-input'>
                      <button onClick={() => this.submit()}>Register</button>
                    </div>
              </div>
            </div>
            ):(
              <div className="registration-form">
                <h1>Welcome {loggedInUser.user_name},</h1>
                <p>You are now registered and ready to begin your FurBook experience.</p>
                <Link to='/new' ><button>Add Pet</button></Link>
                
              </div>
            )}
    

    
           
          </div>
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
    
    export default connect(mapStateToProps, mapDispatchToProps)(Register);