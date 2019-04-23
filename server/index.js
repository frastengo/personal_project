require('dotenv').config()
const express = require('express')
const app = express()
const massive = require('massive')
const session = require('express-session')
const uC = require('./controllers/userController')
const pC = require('./controllers/profilesController')

const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env
app.use(express.json())

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        //miliseconds - seconds - minutes - hours - week
        maxAge: 1000 * 60 * 60 * 24 * 14
    }
}))


massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    // Run init once
    // db.init();
    console.log('Connected to db')
}).catch(err => console.log('cannot connect to db', err))


//auth

app.route('/auth/register').post(uC.register);
app.route('/auth/login').post(uC.login);
// app.route('/logout').get(uC.logout)
// app.route('/session').get(uC.getSession)

//profiles

//get all profiles
app.get('/api/profiles', pC.getAllProfiles)
//get profile by id
app.get('/api/profile/:id', pC.getProfile)
//get profile/s by user-id
app.get('/api/profiles/:id', pC.getProfilesByUserId)
//update profile by id
app.put('/api/profile/:id', pC.updateProfile)
//delete profile by id
app.delete('/api/profile/:id', pC.deleteProfile)

app.listen(SERVER_PORT, () => console.log(`Listening on server port: ${SERVER_PORT}`))

