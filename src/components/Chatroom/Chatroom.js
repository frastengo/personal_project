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
      }
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
  


      


      // axios.get(`/api/messages?id=${this.props.user.user.id}`).then(res => {
      //   this.setState({
      //     messagesOfUser: res.data
      //   })
      // })
    // axios
    //   .get(`/api/get_chatroom_by_room_name/${this.props.room_name}`)
    //   .then(res => {
    //     this.setState({ room_data: res.data });
    //   });
    // axios.get(`/api/get_room_data/${this.props.room_name}`).then(res => {
    //   this.setState({ old_messages: res.data });
    // });
    // axios.get(`/api/listings/${this.props.listing_id}`).then(res => {
    //     this.setState({listing: res.data})
    // });
    
  
  

  // componentDidUpdate= (prevProps) =>{
    
  //   if (this.props.user !== prevProps.user){
  //     const {user} = this.props.user
  //     const {chatroomId} = this.props.chatroomId
  //     let user2 = null
  //     const {chatroom_id, user_2, user_1} = chatroomId[0]
     
  //     if (user.id !== user_1){
  //       user2 = user_1
  //     } else if (user.id !== user_2){
  //       user2 = user_2
  //     } else {
  //       user2 = null
  //     }
      
  //     console.log(chatroom_id)
  //     console.log(chatroomId[0])
  //     this.setState({
  //         chatroom: chatroomId,
  //         chatroomId: chatroom_id,
  //         loggedInUser: this.props.user.user,
  //         user2: user2
  //     })
  //     axios.get(`/api/messages/${chatroom_id}`).then(res => {
  //       this.setState({
  //         messagesOfUser: res.data
  //       })
  //     })
    

  //     this.socket.emit('JOIN_ROOM', {
  //     chatroom_id: chatroom_id
  //     })
  //   }

    
  // }

//   componentDidUpdate = (prevProps, prevState) => {
//     if(prevState.listing !== this.state.listing){
//         this.setState({listing: this.state.listing})
//     }
//   }

  exit = () => {
      const {chatroomId} = this.props.chatroomId
      const {chatroom_id} = chatroomId[0]
      this.socket.emit('LEAVE_ROOM', {
      chatroom_id: chatroom_id
    })

  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    const scrollHeight = this.messageList.scrollHeight;
    const height = this.messageList.clientHeight;
    const maxScrollTop = scrollHeight - height;
    this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  // componentWillUnmount = () => {
  //     const {chatroomId} = this.props.chatroomId
  //     const {chatroom_id} = chatroomId[0]
  //     if (chatroomId) {
  //       this.socket.emit('LEAVE_ROOM', {
  //         chatroom_id: chatroom_id
  //       })
  //     }
  // }

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
              <div className='title-container'>
                <h1 className='title'>Chatroom</h1></div>
                
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
    // let {listing} = this.state  
    // let inputStyle = {
    //     height: 25,
    //     width: 350,
    //     borderBottomRightRadius: 0,
    //     borderTopRightRadius: 0,
    //   };
    //   let buttonStyle = {
    //     height: 25,
    //     fontSize: 10,
    //     borderTopLeftRadius: 0,
    //     borderBottomLeftRadius: 0,
    //     background: '#546D8C',
    //   };
    
    // // const mappedMessages = this.state.messages.map(message => {
    // //   if (this.props.user.profile_name === message.sender) {
    // //     return <p className='myMessages' style={{alignSelf: 'flex-start'}}>{message.message}</p>;
    // //   } else {
    // //     return <p className='theirMessages' style={{ alignSelf: 'flex-end' }}>{message.message}</p>;
    // //   }
    // // // });
    // // const mappedOldMessages = this.state.old_messages.map(oldMessage => {
    // //   if (this.props.user.profile_name === oldMessage.sender) {
    // //     return <p className='myMessages' style={{ alignSelf: 'flex-start' }}>{oldMessage.message}</p>;
    // //   } else {
    // //     return <p className='theirMessages' style={{ alignSelf: 'flex-end' }}>{oldMessage.message}</p>;
    // //   }
    // // });
    // return (
    //   <div style={{display: 'flex', color: 'black'}}>
    //   <div className="messagesContainer" style={{display: 'flex', flexDirection: 'column'}}>
    //     <div style={{display: 'flex', flexDirection: 'column'}} className="messagesContainer__messages">
    //       {/* {mappedOldMessages}
    //       {mappedMessages} */}
          
    //     </div>
    //     <form className="messagesContainer__form">
    //         <input
    //         style={inputStyle}
    //           className='ui input focus'
    //           value={this.state.message}
    //           onChange={e => this.messageHandler(e.target.value)}
    //           id="m"
    //           autocomplete="off"
    //         />
    //         <button className='ui primary button' style={buttonStyle} onClick={this.sendPm}>Send</button>
    //       </form>
     
       
    //     </div>
    //   </div>


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
