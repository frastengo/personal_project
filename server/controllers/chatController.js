module.exports = {

    getChatroomId: (req, res ) => {
        console.log('req.params in get chat room id', req.params)
        const {id} = req.params
        console.log('reqbody in get chat room id', req.query)
        const {user_2_id} = req.query
        console.log(user_2_id)
        // const {user_1_id} = req.params
        // console.log('id after destructuring', id)
        // const {user_2} = req.query
        // console.log('user-id body req after destructuring', user_2)
        req.app.get('db').get_chatroom_id([id, user_2_id]).then(chatroom => {
            console.log('chatroom after db', chatroom)
            res.status(200).send(chatroom)
        }).catch(err => console.log('ERROR', err))
    },

    getMessagesByChatRoomId: (req, res) => {
        console.log('REQPARAMS AT GET MESSAGES BY CHATROOM ID', req.params)
        const {id} = req.params
        const db = req.app.get('db')
        db.get_messages_by_chatroom_id([id]).then(messages => {
            res.status(200).send(messages)
        }).catch(err => console.log('ERROR', err))
    },

    getMessagesBySenderId: (req, res) => {
        const {id} = req.query
        const db = req.app.get('db')
        db.get_messages_by_sender_id([id]).then(messages => {
            res.status(200).send(messages)
        }).catch(err => console.log('ERROR', err))
    },

    getUserChatRooms: (req, res) => {
        const {id} = req.params
        const db = req.app.get('db')
        db.get_all_chatrooms_by_user_id([id]).then(chatrooms => {
            res.status(200).send(chatrooms)
        }).catch(err => console.log('ERROR', err))
    }

}