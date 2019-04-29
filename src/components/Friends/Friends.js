import React, {Component} from 'react'
import './Friends.css'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {setUser} from '../../ducks/userReducer'
import axios from 'axios'
import { getFriends } from '../../ducks/friendsReducer'
import FriendsProfile from './FriendsProfile'
import FriendProfile from './FriendProfile'

class Friends extends Component {

    constructor(props){
        super(props)

        this.state = {
            loggedInUser: null,
            friends: [],
            currentFriend: []
          
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

                // this.props.getFriends(res.data.id)
               
                axios.get(`/api/friends/${res.data.id}`).then(res => {
                    this.props.getFriends(res.data.id)
                    this.setState({
                        friends: res.data
                    })
                })
            }
          
        });
    }

    display = (profile) => {
        let displayedProfile = [...this.state.currentFriend, profile]
        console.log(displayedProfile[0])
        this.setState({
          currentFriend: [profile]
        })
      }

  
   

    render(){
        console.log('CURRENT FRIEND AT FRIENDS COMPONENT', this.state.currentFriend)
        console.log('logged in user in friends component', this.state.loggedInUser)
        console.log('user in component friends',this.props.user)
        const {user} = this.props.user

        console.log('state FRIENDS BY USER ID IN FRIENDS COMPONENT', this.state.friends)
        console.log('props FRIENDS BY USER ID IN FRIENDS COMPONENT', this.props.friends)
        
        const mappedFriends = this.state.friends.map((dog, index) => 
            {
               return <FriendsProfile  display={this.display} key={index} dog={dog} profileId={dog.profile_id}/>
            })
        const mappedCurrentFriend = this.state.currentFriend.map(dog => {
            return <FriendProfile dog={dog} key={dog.image}/>
        })

        return (
            <div className='friends'>
                <div className='title-container'>
                <h1 className='title'>My Friends</h1></div>
                {this.state.friends.length ? (
                    <div className='mapped-friends'>{mappedFriends}</div>
                ):
                    <div>No friends</div>}
                {this.state.currentFriend.length ? (
                   <div className='mapped-current-friend'>{mappedCurrentFriend}</div>
                ):(
                    <div></div>
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
    setUser: setUser,
    getFriends: getFriends
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Friends);
