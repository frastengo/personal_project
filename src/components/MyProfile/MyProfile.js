import React, {Component} from 'react'
import './MyProfile.css'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {setUser} from './../../ducks/userReducer'
import {getAllProfiles, getAllProfilesByUserId} from './../../ducks/profilesReducer'

import UserProfile from './../UserProfile/UserProfile'
import AddPetForm from './../AddPetForm/AddPetForm'


class MyProfile extends Component {

    constructor(props){
        super(props)

        this.state = {
            loggedInUser: null,
            loggedInUserId: null,
            user_name: null,
            email: null,
            userProfiles: this.props.userProfiles,
            friends: null,
            showForm: false,
            showUserEdit: false,
            user_id: null,
            
        }
    }

    componentDidMount() {
        this.getUserAndProfiles()
    }

    getUserAndProfiles = () => {
        axios.get("/auth/user").then(res => {
            console.log(res.data)
            this.props.setUser(res.data);
            if (res.data){
                this.setState({
                    loggedInUser: res.data,
                    loggedInUserId: res.data.id,
                    email: res.data.email,
                    user_name: res.data.user_name
                })
                this.props.getAllProfilesByUserId(res.data.id)
            }
        })
    }
                // console.log(res.data.id)

                // axios.get(`/api/profiles/${res.data.id}`).then(res => {
                //     console.log(res.data)
                //     if (res.data){
                //         console.log('RES.DATA.IN.PROFILES', res.data[0].user_id)
                //         this.props.getAllProfilesByUserId(res.data[0].user_id)
                //         this.setState({
                //             userProfiles: res.data,
                //             user_id: res.data[0].user_id
                //         })
                    // }
                    
                    
                // })
            // }
          
        // })
        // console.log(this.state.loggedInUserId)
        // this.getUserProfiles(this.state.loggedInUserId);

    // }

    // getUserProfiles = (id) => {
    //     const { loggedInUserId} = this.state
    //     console.log('LOGGED IN USER ID IN FUNCTION GET USER PROFILES', loggedInUserId)
    //     axios.get(`/api/profiles/${loggedInUserId}`).then(res => {
    //         this.setState({
    //         userProfiles: res.data
    //         })
    //     })
    // }

    

    submitUserChanges = () => {
        const {user_name, email, loggedInUserId} = this.state

        axios.put(`/auth/user/${loggedInUserId}`, {user_name, email}).then( res=>{
            this.props.setUser(res.data)
            this.setState({
                loggedInUser: res.data,
                loggedInUserId: res.data.id,
                email: res.data.email,
                user_name: res.data.user_name,
                showUserEdit: !this.state.showUserEdit,
            })
        })
    }
   
    showUserEditForm = () => {
        this.setState({
            showUserEdit: !this.state.showUserEdit,
        }) 
    }

    displayFormToAdd =()=>{
        this.setState({
            showForm: !this.state.showForm
        })
    }

    render(){
        console.log('state in MY PROFILE',this.state)
        console.log('logged in user in MYPROFILE component', this.state.loggedInUser)
        console.log('USERID IN MYPROFILE COMPONENT', this.state.loggedInUserId)
        console.log('USER PROFILES', this.state.userProfiles)
        console.log('user in component MYPROFILE',this.props.user)

        
        
        
        const {userProfiles} = this.props.userProfiles
        console.log('USERPROFILES FROM REDUX in MY PROFILE', userProfiles)
        
        const mappedPetProfiles = userProfiles.map(dog => {
           return <UserProfile  getUserAndProfiles={this.getUserAndProfiles} submit={this.submit} loggedInUserId={this.state.loggedInUserId} key={dog.image} dog={dog} profileId={dog.profileId}/>
        })

        const {user} = this.props.user

      console.log(userProfiles.length)
      console.log(this.props.userProfiles)

        return (
            

            <div className='home-my-profile'>
                <div className='title-container'>
                {userProfiles.length > 1 ? (
                    <h1 className='title'>My Pets <i class="material-icons">pets</i> </h1>
                ):(
                    <h1 className='title'>My Pet <i class="material-icons">pets</i> </h1>
                )}
                    
                </div>
                {user ? (
                    <div>  
                        {userProfiles.length == 0 ? (
                            <div className="user-pet-profiles">
                                <h1 className='title'>You currently do not have any pet profiles</h1>
                                <Link to='/new'><button onClick={this.displayFormToAdd}>ADD NEW</button></Link>
                            </div>
                        ): (
                        <div className="user-pet-profiles">
                            {userProfiles.length > 0 ? (
                                <h1 className='title'>You currently have {userProfiles.length} pet profiles.</h1>
                            ):(
                                <h1 className='title'>My Pet</h1> 
                            )}
                            {!this.state.showForm ? (
                                <Link to='/new'><button onClick={this.displayFormToAdd}>ADD NEW</button></Link>
                            ):(
                                <button onClick={this.displayFormToAdd}>CANCEL</button>
                            )}
                        </div>
                        )}
                        {this.state.showForm ? (
                            <div className='add-pet-form'>
                                <AddPetForm />
                            </div>
                        ):( 
                            <div className='user-pet-profiles-display'>
                            {mappedPetProfiles}
                            </div>
                        )}

                    </div>
                ):(  
                    <div>You need to log in!</div>
                )}

            
            </div>
            
        )
    }
}

const mapStateToProps = reduxState => {
    return {
      user: reduxState.user,
      userProfiles: reduxState.userProfiles
      
    };
  };
  
  const mapDispatchToProps = {
    setUser: setUser,
    getAllProfilesByUserId: getAllProfilesByUserId
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
