module.exports = {

    getChatroomAsSender: (req, res, db) => {
        const {user_id} = req.params
        req.app.get('db').get_chatroom_as_sender([user_id]).then(rooms => {
            res.status(200).json(rooms)
        }).catch(err => console.log('Get room as sender ERROR', err))
    },
  getChatroomAsRecipient: (req, res) => {
    const {user_id} = req.params
    req.app.get('db').get_chatroom_as_recipient([user_id]).then(rooms => {
      res.status(200).json(rooms)
    }).catch(err => console.log('Get room as recipient ERROR', err))
  },
  getChatroomByRoomName: (req, res) => {
    const {room_name} = req.params
    req.app.get('db').get_chatroom_by_room_name([room_name]).then(room => {
      res.status(200).json(room)
    }).catch(err => console.log('Get room by name ERROR', err))
  },
  getRoomData: (req, res) => {
    const {room_name} = req.params
    req.app.get('db').get_room_data([room_name]).then(roomData => {
      console.log(roomData)
      res.status(200).json(roomData)
    }).catch(err => console.log('Get room data ERROR', err))
  }
}