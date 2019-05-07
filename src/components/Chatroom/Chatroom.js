import React, { Component } from "react";
import io from "socket.io-client";
import axios from "axios";
import {setUser} from '../../ducks/userReducer'
import { getFriends } from '../../ducks/friendsReducer'
import {getChatroomId} from '../../ducks/chatReducer'
import { connect } from "react-redux";
import {Link} from 'react-router-dom'
import './Chatroom.css'


class Chatroom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      messages: [],
      recipient: "",
      room_data: [],
      all_messages: [],
      chatroomId: null,
      chatroom: null,
      user1: null,
      recipient: null,
      loggedInUser: null,
      messagesOfUser: [],
    };

    this.socket = io("localhost:4000");


    this.socket.on("PM_MESSAGE", messageData => {
        console.log('appending message...')
        this.addMessage(messageData);
      });
  }

  componentDidMount = () => {
    axios.get("/auth/user").then(res => {
      if (res.data){
        this.props.setUser(res.data);
          this.setState({
              loggedInUser: res.data, 
              loggedInUserId: res.data.id  
          })
      
    

      const {chatroomId} = this.props.chatroomId
      let user2 = null
      const {chatroom_id, user_2, user_1} = chatroomId[0]
      const {user} = this.props.user
      if (user.id !== user_1){
        user2 = user_1
      } else if (user.id !== user_2){
        user2 = user_2
      } else {
        user2 = null
      }
      
      console.log(chatroom_id)
      console.log(chatroomId[0])
      this.setState({
          chatroom: chatroomId,
          chatroomId: chatroom_id,
          loggedInUser: this.props.user.user,
          user2: user2
      })
      axios.get(`/api/messages/${chatroom_id}`).then(res => {
        this.setState({
          messagesOfUser: res.data
        })
      })

      this.socket.emit('JOIN_ROOM', {
            chatroom_id: chatroom_id
      })

      this.scrollToBottom();
    }

  
})
}
  


      


      
    
  
  

  

  exit = () => {
      const {chatroomId} = this.props.chatroomId
      const {chatroom_id} = chatroomId[0]
      this.socket.emit('LEAVE_ROOM', {
      chatroom_id: chatroom_id
    })

  }

  componentDidUpdate=(prevProps, prevState) =>{
    if (prevState.loggedInUser !== this.state.loggedInUser){
      this.setState({
        loggedInUser: this.state.loggedInUser
      })
    }
    
    this.scrollToBottom();
  }

  scrollToBottom() {
    const scrollHeight = this.messageList.scrollHeight;
    const height = this.messageList.clientHeight;
    const maxScrollTop = scrollHeight - height;
    this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

 

  addMessage = data => {
    this.setState({
        messages: [...this.state.messages, data],
        all_messages: [...this.state.all_messages, data],
        messagesOfUser: [...this.state.messagesOfUser, data],
        message: "" ,
    });
  };

  sendPm = e => {
    e.preventDefault();

    this.socket.emit("PM_MESSAGE", {
      chatroom_id: this.state.chatroomId,
      message: this.state.message,
      sender_id: this.state.loggedInUser.id,
      receiver_id: this.state.user2
    });
    this.setState({ message: "" });
  };

  messageHandler = val => {
    this.setState({ message: val});
  };

  render() {
      console.log(this.props)
      console.log('state at chatroom',this.state)
      const mappedMessages = this.state.messagesOfUser.map(message => {
        if (this.state.loggedInUser.id === message.sender_id) {
          return <p className='sender'>{message.message}</p>;
        } else {
          return <p className='receiver'>{message.message}</p>;
        }
      });

      console.log('MAPPED MESSAGES',mappedMessages)

      // const mappedMessagesOfUser = this.state.messagesOfUser.map(message => {
      //   if (this.state.loggedInUser.id === message.sender_id) {
      //     return <p className='sender'>{message.message}</p>;
      //   } else {
      //     return <p className='receiver'>{message.message}</p>;
      //   }
      // });




const {user} = this.props.user
      
      return (
          <div className='chatroom-container'>
          {user ? (
            <div className='chatroom'>
              <div className='title-container-chatroom'>
                  <h1 className='title'><i class="material-icons">
group
</i>Chatroom<i class="material-icons">
pets
</i>  </h1>
                  <Link to='/friends'><button onClick={this.exit}>Exit</button></Link>
                </div>
                
                <div>User 1 and User 2 info</div>
                <Link to='/friends'><button onClick={this.exit}>Exit</button></Link>
                {this.state.messagesOfUser ? (
                  <div>
                    <div className='messages-container' ref={(div) => {this.messageList = div;}}> messages will display here: {mappedMessages}
                    </div>
                    
                    <form className="message-submit-form">
                      <input
                        placeholder='Your Message'
                        className='message-input'
                        value={this.state.message}
                        onChange={e => this.messageHandler(e.target.value)}
                        id="m"
                        autocomplete="off"
                      />
                      <button className='send-button' onClick={this.sendPm}>Send</button>
                    </form>
                  </div>

                ):(
                  <div className='no-messages'>
                    No messages to display
                    <Link to = '/login'>Log Me In!</Link>
                  </div>
                )}
                

          </div>
          ):(
            <div>You need to log in</div>
          )}
            
        </div>
      )
  }
}
    


const mapStateToProps = reduxState => {
    return {
      user: reduxState.user,
      friends: reduxState.friends,
      chatroomId: reduxState.chatroomId
    };
  };
  
  const mapDispatchToProps = {
    setUser: setUser,
    getFriends: getFriends,
    getChatroomId: getChatroomId
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Chatroom);
