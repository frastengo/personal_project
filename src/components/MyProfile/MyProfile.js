import React, {Component} from 'react'
import './MyProfile.css'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {setUser} from './../../ducks/userReducer'
import axios from 'axios'
import UserProfile from './../UserProfile/UserProfile'
import AddPetForm from './../AddPetForm/AddPetForm'
class MyProfile extends Component {

    constructor(props){
        super(props)

        this.state = {
            loggedInUser: null,
            loggedInUserId: null,
            userProfiles: [],
            friends: null,
            showForm: true,
        }
    }

    componentDidMount() {
        axios.get("/auth/user").then(res => {
            this.props.setUser(res.data);
            if (res.data){
                this.setState({
                    loggedInUser: res.data,
                    loggedInUserId: res.data.id
                })

                axios.get(`/api/profiles/${res.data.id}`).then(res => {
                    this.setState({
                    userProfiles: res.data
                    })
                })
            }
          
        })
        // console.log(this.state.loggedInUserId)
        // this.getUserProfiles(this.state.loggedInUserId);

    }

    // getUserProfiles = (id) => {
    //     const { loggedInUserId} = this.state
    //     console.log('LOGGED IN USER ID IN FUNCTION GET USER PROFILES', loggedInUserId)
    //     axios.get(`/api/profiles/${loggedInUserId}`).then(res => {
    //         this.setState({
    //         userProfiles: res.data
    //         })
    //     })
    // }
   

    displayFormToAdd =()=>{
        this.setState({
            showForm: !this.state.showForm
        })
    }

    render(){
        console.log('logged in user in MYPROFILE component', this.state.loggedInUser)
        console.log('USERID IN MYPROFILE COMPONENT', this.state.loggedInUserId)
        console.log('USER PROFILES', this.state.userProfiles)
        console.log('user in component MYPROFILE',this.props.user)
        
        

        const mappedPetProfiles = this.state.userProfiles.map(dog => {
           return <UserProfile dog={dog}/>
        })

        const {user} = this.props.user
      

        return (
            <div className='home'>
                {user ? (
                <div>
                    <div className="user-info">
                        <h1>My Information: </h1>
                        <h2>{user.name}</h2>
                        <h2>{user.email}</h2>
                        <button>EDIT</button>
                    </div>
                    <div className="user-pet-profiles">
                        {this.state.userProfiles.length > 0 ? (
                            <h1 className='title'>My Pets</h1>
                        ):(
                            <h1 className='title'>My Pet</h1> 
                        )}
                        {!this.state.showForm ? (
                            <Link to='/new'><button onClick={this.displayFormToAdd}>ADD NEW</button></Link>
                        ):(
                            <button onClick={this.displayFormToAdd}>CANCEL</button>
                        )}
                    </div>
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
      user: reduxState.user
    };
  };
  
  const mapDispatchToProps = {
    setUser: setUser
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
