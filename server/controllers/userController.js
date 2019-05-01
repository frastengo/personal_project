const bcrypt = require('bcryptjs');

module.exports = {
    register: (req, res) => {
        const {email, password, user_name} = req.body
        const db = req.app.get('db')
        db.check_user_exists([email]).then(user => {
            if (user.length) {
                res.status(200).send('Email already exists.')
            } else {
                const saltRounds = 12;
                bcrypt.genSalt(saltRounds).then(salt => {
                    bcrypt.hash(password, salt).then((hashedPassword) => {
                        db.create_user([email, hashedPassword, user_name]).then((loggedInUser) => {
                            req.session.user = {id: loggedInUser[0].user_id, email: loggedInUser[0].email, user_name: loggedInUser[0].user_name}
                            res.status(200).send(req.session.user)
                        })

                    })
                })
            }

        }).catch(err => console.log(err.detail))
    },

    login: async (req, res) => {
        const { email, password } = req.body
        const db = req.app.get('db')

        let userFound = await db.check_user_exists(email);
        if (!userFound[0]){
            res.status(200).send("Incorrect email, please try again")
        }
        let result = bcrypt.compare(password, userFound[0].password)
        if (result) {
            console.log(result)
            console.log(userFound)
            req.session.user = { id: userFound[0].user_id, email: userFound[0].email, user_name: userFound[0].user_name }
            res.status(200).send(req.session.user)
            console.log(req.session.user)
        } else {
            res.status(200).send('Incorrect email/password')
        }

    },

    logout: (req,res) => {
        req.session.destroy()
        res.sendStatus(200)
    },

    edit: (req, res) => {
        const { id } = req.params
        const {email, user_name} = req.body
        console.log(req.body)
        const db = req.app.get('db')
        db.edit_user([id, user_name, email]).then((loggedInUser) => {
            console.log(loggedInUser)
            req.session.user = {id: loggedInUser[0].user_id, email: loggedInUser[0].email, user_name: loggedInUser[0].user_name}
            res.status(200).send(req.session.user)
        })
    }

    // getSession: (req, res) => {
    //     if (req.session.user){
    //         res.status(200).send(req.session.user)
    //     } else {
    //         res.status(401).send('Please log in')
    //     }
    // }
}