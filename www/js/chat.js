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

addRoom = (id, name, member) => {
	roomList.set("userId", id).set('name', name).set('member', member)
		.save()
		.then((result) => {
			console.log('success')
			console.log(result)
		}).catch((error) => {
			console.error('Cannot save room data!\n' + error);
		})
}
getRoomData = (id) => {
	// RoomList.equalTo("userId", id)
	// 	.fetchAll()
	// 	.then((results) => {
	// 		console.table(results)
	// 		for(let i=0;i<results.length;i++){
	// 			let list;
	// 			list+=results[i]["name"]
	// 			$("#room_list").append(list)
	// 		}
	// 	})

	let content = "<ons-list-item modifier='chevron' class='room' tappable>test</ons-list-item>"
	$("#room_list").append(content)
}

saveNiftyTalkData = (userId, name, roomId, text) => {
	chat.set('userId', userId)
		.set('name', name)
		.set('roomId', roomId)
		.set('text', text)
		.save()
		.then((result) => {
			console.log("success")
		}).catch((error) => {
			console.error('Cannnot save TalkData\n' + error)
		})
}
