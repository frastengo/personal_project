require('dotenv').config()
const express = require('express')
const app = express()
const massive = require('massive')
const session = require('express-session')
const uC = require('./controllers/userController')

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
    app.init();
    console.log('Connected to db')
})


//auth

app.route('/register').post(uC.register)
app.route('/login').post(uC.login)
app.route('/logout').get(uC.logout)
app.route('/session').get(uC.getSession)

app.listen(SERVER_PORT, () => console.log(`Listening on server port: ${SERVER_PORT}`))

