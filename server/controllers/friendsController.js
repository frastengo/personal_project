module.exports = {
    getFriends: (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        db.get_friends_by_logged_id([id]).then(profiles => {
            res.status(200).send(profiles)
        }).catch(err => console.log(err.detail))
    },

    addFriend: (req, res) => {
        const db = req.app.get('db')
        db.add_friend([req.params.id, req.query.id]).then(profiles =>{
            res.status(200).send(profiles)
        }).catch(err => console.log(err.detail))
    },

    removeFriend: (req, res) => {
        console.log(req.query)
        console.log(req.params)
        const db = req.app.get('db')
        db.remove_friend([req.params.id, req.query.id]).then(profiles => {
            res.status(200).send(profiles)
        }).catch(err => console.log(err.detail))
    }
}