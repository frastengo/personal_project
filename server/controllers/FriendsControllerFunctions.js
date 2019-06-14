module.exports = {
    getFriends: (db) => {
        return db.query('select * from friends join profiles on profiles.profile_id = friends.profile_id where friends.logged_id = 1')

    }
}