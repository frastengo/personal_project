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
            loggedInUserId: null,
            friends: [],
            currentFriend: [],
            currentFriendId: null
          
        }
    }

    getUserAndUserFriends =()=>{
        axios.get("/auth/user").then(res => {
            this.props.setUser(res.data);
            if (res.data){
                this.setState({
                    loggedInUser: res.data, 
                    loggedInUserId: res.data.id  
                })
                this.props.getFriends(res.data.id)

                // this.props.getFriends(res.data.id)
               
                // axios.get(`/api/friends/${res.data.id}`).then(res => {
                //     console.log('FRIENDS HERE AT COMPONENT DID MOUNT RES.DATA', res.data)
                //     this.props.getFriends(res.data.id)
                //     this.setState({
                //         friends: res.data
                //     })
                // })
            }
          
        });
    }

    componentDidMount() {
        this.getUserAndUserFriends()
    }

    display = (profile) => {
        let displayedProfile = [...this.state.currentFriend, profile]
        console.log(displayedProfile[0])
        this.setState({
          currentFriend: [profile]
        })
      }

    delete = (profileId) => {
        const {loggedInUserId} = this.state

        axios.delete(`/api/friend/${loggedInUserId}?id=${profileId}`).then(res => {
            this.getUserAndUserFriends()
            // this.props.getFriends(loggedInUserId)
            this.setState({
                // friends: res.data,
                currentFriend: [],
            })
        })
    }

  
   

    render(){

        console.log('THIS STATE IN FRIENDS', this.state)
        console.log('THIS STATE FRIENDS FROM REDUX', this.props.friends.friends)
        const {friends} = this.props.friends
        console.log('FRIENDS FROM REDUX AT FRIENDS', friends)
        // console.log('THIS.PROPS FROM REDUX', this.props)
        // console.log('CURRENT FRIEND AT FRIENDS COMPONENT', this.state.currentFriend)
        // console.log('logged in user in friends component', this.state.loggedInUser)
        // console.log('user in component friends',this.props.user)
        const {user} = this.props.user

        // console.log('state FRIENDS BY USER ID IN FRIENDS COMPONENT', this.state.friends)
        // console.log('props FRIENDS BY USER ID IN FRIENDS COMPONENT', this.props.friends)
        
        const mappedFriends = friends.map((dog, index) => 
            {
               return <FriendsProfile  display={this.display} key={index} dog={dog} profileId={dog.profile_id}/>
            })
        const mappedCurrentFriend = this.state.currentFriend.map(dog => {
            return <FriendProfile profileId={dog.profile_id} delete={this.delete}dog={dog} key={dog.image}/>
        })

        return (
            <div className='friends'>
                <div className='title-container'>
                <h1 className='title'>My Friends</h1></div>
                {friends.length ? (
                    <div className='mapped-friends'>{mappedFriends}</div>
                ):
                    <div className='no-friends'>
                    <div className='no-friends-container'><Link className='no-friends-link' to = '/profiles'>Find Friends</Link></div></div>
                }
                {this.state.currentFriend.length ? (
                   <div className='mapped-current-friend'>{mappedCurrentFriend}</div>
                ):(
                    <div>Click on a friend to display</div>
                )}
                
            </div>
            
        )
    }
}

const mapStateToProps = reduxState => {
    return {
      user: reduxState.user,
      friends: reduxState.friends
    };
  };
  
  const mapDispatchToProps = {
    setUser: setUser,
    getFriends: getFriends
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Friends);
