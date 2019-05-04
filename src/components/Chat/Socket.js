// import React, { Component } from 'react';
// import socketIOClient from 'socket.io-client';

// const socket = socketIOClient("http://192.168.1.57:4000/");

// class Socket extends Component {
//   constructor(){
//     super()
//     this.state = {
//       message: '',
//       fromServer:[]
//     }
//     socket.on('messageFromServer', message => {
//       let update = [...this.state.fromServer, message]
//       this.setState({
//         fromServer: update
//       })
//     })
//   }

//   sendMessage = () => {
//     socket.emit('message', this.state.message);
//   }


//   render() {

//     const myMessages = this.state.fromServer.map(message => {
//       return <p>{message}</p>
//     })

//     return (
//       <div className="App">
//         {myMessages}
//         <input onChange={(e) => this.setState({message: e.target.value})} />
//         <button onClick={this.sendMessage}>submit </button>
//       </div>
//     );
//   }
// }

// export default Socket;