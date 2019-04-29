module.exports = {
    getFriends: (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        db.get_friends_by_logged_id([id]).then(profiles => {
            res.status(200).send(profiles)
        }).catch(err => console.log(err.detail))
    },

    addFriend: (req, res) => {
        const db 
    }
}