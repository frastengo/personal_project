require('dotenv').config()
const express = require('express')
const app = express()
const massive = require('massive')
const session = require('express-session')
const uC = require('./controllers/userController')
const pC = require('./controllers/profilesController')
const fC = require('./controllers/friendsController')
const cC = require('./controllers/chatController')
const bodyParser = require('body-parser')
const cloudinary = require('cloudinary')
const socket = require("socket.io");





const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env
app.use(bodyParser.json())

// const port = SERVER_PORT




// io.on('connection', (socket) => {
//     console.log(socket.id);
// });


app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        //miliseconds - seconds - minutes - hours - week
        maxAge: 1000 * 60 * 60 * 24 * 14
    }
}))

function sessionCheck(req, res, next){
    if (req.session.user){
        next()
    } else {
        res.status(401).send('you must login!')
    }
}

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    // Run init once
    // app.init();
    console.log('Connected to db')
}).catch(err => console.log('cannot connect to db', err))


//auth

app.route('/auth/register').post(uC.register);
app.route('/auth/login').post(uC.login);

app.route('/auth/logout').get(uC.logout);
// app.use(sessionCheck)

// app.use(sessionCheck)

app.get('/auth/user', (req, res) => {
    res.status(200).send(req.session.user)
})

app.put('/auth/user/:id', uC.edit)
// app.route('/session').get(uC.getSession)

//profiles

//get all profiles
app.get('/api/profiles', pC.getAllProfiles)
//get profile by id
app.get('/api/profile/:id', pC.getProfile)
//get profile/s by user-id
app.get('/api/profiles/:id', pC.getProfilesByUserId)
//update profile by id
//use query to find properties/gender
// app.get('/api/profilesbyproperty', )

app.get('/api/filteredprofiles/:id', pC.getFilteredProfiles)

app.put('/api/profile/:id', pC.updateProfile)
//delete profile by id
app.delete('/api/profile/:id', pC.deleteProfile)

//creat profile by user id
app.post('/api/profiles/:id', pC.createProfile)



//get friends by user id 
app.get('/api/friends/:id', fC.getFriends)
//add friend by user id
app.post('/api/friend/:id', fC.addFriend)
//delete friend by logged in id (user_id)
app.delete(`/api/friend/:id`, fC.removeFriend)




//chat endpoints
app.get("/api/get_chatrooms_as_sender/:user_id", cC.getChatroomAsSender);
app.get("/api/get_chatrooms_as_recipient/:user_id", cC.getChatroomAsRecipient);
app.get("/api/get_chatroom_by_room_name/:room_name", cC.getChatroomByRoomName);
app.get("/api/get_room_data/:room_name", cC.getRoomData);




app.get('/api/upload', (req, res) => {

    const timestamp = Math.round((new Date()).getTime() / 1000);
    
    const api_secret  = process.env.CLOUDINARY_SECRET_API;

    const signature = cloudinary.utils.api_sign_request({ timestamp: timestamp }, api_secret);

    const payload = {
        signature: signature,
        timestamp: timestamp
    };
    res.json(payload);

})



const server = app.listen(SERVER_PORT, () => console.log(`Listening on server port: ${SERVER_PORT}`))





//sockets

const io = socket(server);
//SOCKETS START
io.on("connection", function(socket) {
  console.log("USER CONNECTED", socket.id);

  socket.on("CONNECT_USERS", data => {
      console.log(data)
    const db = app.get("db");
    // let uniqueRoom = `${data.listing_name} - ${data.user2_profileName}`;
    db.check_chatroom_exist([data.user_1_id, data.user_2_id]).then(
      chatroom => {
          console.log(chatroom)
        if (!chatroom.length) {
          db.create_chatroom([data.user_1_id, data.user_2_id])
        }
      }
    );
  });

  socket.on("PM_MESSAGE", messageData => {
    const db = app.get("db");
    io.in(messageData.room_name).emit("PM_MESSAGE", {
      message: messageData.message,
      sender: messageData.sender
    });
    db.create_room_data([
      messageData.room_name,
      messageData.sender,
      messageData.recipient,
      messageData.message
    ])
  });

  socket.on('JOIN_ROOM', roomName => {
    socket.join(roomName.room_name)
  });

  socket.on('LEAVE_ROOM', roomName => {
    socket.leave(roomName.room_name)
    console.log('User has left the room')
  });
});

const path = require('path')
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '../build/index.html'));
})


