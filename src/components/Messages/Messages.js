import React, { Component } from "react";

import axios from "axios";
import { setUser} from '../../ducks/userReducer'
import {getChatroomId} from '../../ducks/chatReducer'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import './Messages.css'

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: null,
      loggedInUserId: null,
      chatrooms: [],
      chatroomsLength: null,
      currentFriendUserId: null,
      chatroomId: null,
    };
  }

  componentDidMount = () => {
    axios.get("/auth/user").then(res => {
      this.props.setUser(res.data);
      if (res.data){
          this.setState({
              loggedInUser: res.data, 
              loggedInUserId: res.data.id  
          })
          axios.get(`/api/chatrooms/${res.data.id}`).then(res => {
            this.setState({
              chatrooms: res.data,
              chatroomsLength: res.data.length
            })
          })
      }
    })
    
  };

  setChatRoom = (currentFriendUserId) => {
    console.log(currentFriendUserId)
    const {loggedInUserId} = this.state
    

    // axios.get(`/api/chatroom/${loggedInUserId}?user_2_id=${currentFriendUserId}`).then(res => {
    //     console.log(res)
    //     this.setState({
    //         chatroom: res.data
    //     })
    // })
    this.props.getChatroomId(loggedInUserId, currentFriendUserId)
    this.goToChatRoom()
    // this.props.history.push('/chatroom')

}

goToChatRoom =()=>{
  this.props.history.push('/chatroom')
}

  render() {
      console.log('THIS STATE IN MESSAGES COMPONENT', this.state)
      console.log(this.props.chatroomId)
    // let roomContainerStyle = {
    //   display: "flex",
    //   flexDirection: "column",
    //   color: "black",
    //   alignItems: "flex-start",
    //   justifyContent: "flex-start",
    //   textDecoration: "none",
    // };

    // let messageStyle = {
    //   color: "black",
    //   textDecoration: "none",
    //   padding: "5px"
    // };
    // const mappedSenderRooms = this.state.sender_rooms.map(room => {
    //   return (
    //     <Link
    //       style={messageStyle}
    //       onClick={() => {
    //         this.props.get_room_name(room.room_name);
    //         this.props.update_listing_id(room.listing_id);
    //       }}
    //       to={`/messages/${room.room_name}`}
    //     >
    //       {room.user2_name} - {room.listing_name}
    //     </Link>
    //   );
    // });
    // const mappedRecipientRooms = this.state.recipient_rooms.map(room => {
    //   return (
    //     <Link
    //       style={messageStyle}
    //       onClick={() => {
    //         this.props.get_room_name(room.room_name);
    //         this.props.update_listing_id(room.listing_id);
    //       }}
    //       to={`/messages/${room.room_name}`}
    //     >
    //       {room.user1_name.split(' ')[0].split('@')[0]} - {room.listing_name}
    //     </Link>
    //   );
    // });
    
    const {chatrooms} = this.state
    console.log(chatrooms)

   
      const mappedChatrooms = chatrooms.map(chatroom => {
        return (
          <div key={chatrooms.chatroom_id} className='go'>
            <h3>Messages from {chatroom.user_name}</h3>
            <button className='go' onClick={(e)=>this.setChatRoom(chatroom.user_id)}>GO</button>
            {/* <Link onClick={(e)=>this.setChatRoom(chatroom.user_id)} to ={'/chatroom'}>Go</Link> */}
          </div>
        )
      })
    
    

    
    // const chatroomLength = chatrooms.length
    
    return (
      <div className='chatrooms-container'>
        <div className='title-container'>
            <h1 className='title'>Messages <i class="material-icons">pets</i></h1>
        </div>
        <div className='chat-rooms-display'>
          <h3>You currently have  {this.state.chatroomsLength} chatrooms
          </h3>
          {mappedChatrooms}
          
          
            
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
    return {
      user: reduxState.user,
      chatroomId: reduxState.chatroomId
    };
  };
  
  const mapDispatchToProps = {
    setUser: setUser,
    getChatroomId: getChatroomId
    
  };

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
