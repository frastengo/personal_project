import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import './Profiles.css'
import Profile from './../Profile/Profile'

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loggedInUser: [],
          profiles: []
        };
      }
    
      componentDidMount(){
        axios.get('/api/profiles').then(res => {
          this.setState({
            profiles: res.data
          })
        })
      }
    
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
    
    
      render() {
        console.log(this.state.profiles)
        let { loggedInUser, profiles} = this.state;
        const mappedProfiles = profiles.map(dog => {
            return <Profile dog={dog}/>
        })
        return (
          <div>
              <div>
                <h1>Find Friends</h1>
                {mappedProfiles}   
              </div>
          </div>
        );
      }
    }