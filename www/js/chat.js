/**
 * chat.js
 */
console.log('chat.js is ready!')

// NCMB初期化
var Chat = ncmb.DataStore('Chat')
var chat = new Chat()
var RoomList = ncmb.DataStore('RoomList')
var roomList = new RoomList()
getRoomId = () => {
	// roomIdを取得する
	RoomList.fetch()
		.then((status) => {
			console.log(status)
		}).catch((error) => {
			console.error("Cannnot get room id.\n" + error);
		})
}

addRoom = (name, member) => {
	chat.set('name', name).set('member', member)
		.save()
		.then((result) => {
			console.log('success')
			console.log(result)
		}).catch((error) => {
			console.error('Cannot save room data!\n' + error);
		})
}

saveNiftyTalkData = (userId, name, roomId, text) => {
	chat.set('userId', userId).set('name', name).set('roomId', roomId).set('text', text)
		.save()
		.then((result) => {
			console.log("success")
		}).catch((error) => {
			console.error('Cannnot save TalkData')
		})
}