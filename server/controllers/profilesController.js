module.exports = {
    getAllProfiles: (req, res) => {
        const db = req.app.get('db')
        db.get_profiles().then(profiles => {
            res.status(200).send(profiles)
        }).catch(err => console.log(err.detail))
    },

    getProfile: (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        db.get_profile([id]).then(profile => {
            res.status(200).send(profile)
        }).catch(err => console.log(err.detail))
    },

    getProfilesByUserId: (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        db.get_profiles_by_user_id([id]).then(profiles => {
            res.status(200).send(profiles)
        }).catch(err => console.log(err.detail))
    },

    updateProfile: (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        const {name, breed, gender, image, favorites, country, city, state, zipcode} = req.body
        db.update_profile([name, breed, gender, image, favorites, country, city, state, zipcode, id]).then(profiles => {
            res.status(200).send(profiles)
        }).catch(err => console.log(err.detail))
    },

    deleteProfile: (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        db.delete_profile([id]).then(profiles => {
            res.status(200).send(profiles)
        }).catch(err => console.log(err.detail))
    }

}