module.exports = {
    getAllProfiles: (req, res) => {
        const db = req.app.get('db')
        const {gender, breed} = req.query
        if(gender && breed){
            console.log(breed)
            // let splittedbreed= breed.split(' ')
            // let mapped = splittedbreed.map(letter => ((letter.chartAt(0).toUpperCase())+(letter.splice(1)))).join('')
            // console.log(splittedbreed)
            // console.log(mapped)
            db.get_profiles_by_gender_and_breed([gender, breed]).then(profiles => {
                res.status(200).send(profiles)
            }).catch(err => console.log(err.detail))
        } 
        else if(gender){
            db.get_profiles_by_gender([gender]).then(profiles => {
                res.status(200).send(profiles)
            }).catch(err => console.log(err.detail))
        } 
        else if(breed){
            db.get_profiles_by_breed([breed]).then(profiles => {
                res.status(200).send(profiles)
            }).catch(err => console.log(err.detail))
        }
        else {
            db.get_profiles().then(profiles => {
                res.status(200).send(profiles)
            }).catch(err => console.log(err.detail))       
        }

        
        
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
        console.log('REQ BODY AT UPDATE PROFILE', req.body)
        const db = req.app.get('db')
        console.log('REQ PARAMS AT UPDATE PROFILE', req.params)
        const {id} = req.params
        const {loggedInUserId, name, breed, gender, image, age, favorites, country, city, state, zipcode} = req.body
        db.edit_profile([+id, name, breed, gender, age, favorites, image, country, city, state, zipcode, loggedInUserId]).then(profiles => {
            console.log(profiles)
            res.status(200).send(profiles)
        }).catch(err => console.log(err.detail))
    },

    deleteProfile: (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        db.delete_profile([id]).then(profiles => {
            res.status(200).send(profiles)
        }).catch(err => console.log(err.detail))
    },

    createProfile: (req, res) => {
        const db = req.app.get('db')
        console.log('REQBODY CREATE PROFILE', req.body)
        console.log('REQPARAMS CREATE PROFILE', req.params)
        const { id } = req.params
        const { name, breed, gender, age, favorites, image, country, city, state, zipcode } = req.body
        db.create_new_profile([id, name, breed, gender, age, favorites, image, country, city, state, zipcode]).then(profile => {
            res.status(200).send(profile)
        }).catch(err => console.log(err))
    },

    getFilteredProfiles: (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        db.get_filtered_profiles([id]).then(profiles => {
            res.status(200).send(profiles)
        }).catch(err => console.log(err.detail))
    },

}