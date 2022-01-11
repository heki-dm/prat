/**
 * chat.js
 */
console.log('chat.js is ready!')

// NCMB初期化
var Chat = ncmb.DataStore('User')
var chat = new Chat()

getRoomId=()=>{
	
}

addRoom = (name, member) => {
	chat.set('name', name).set('member', member)
		.save()
		.then((result) => {
			console.log('success')
		}).catch((error) => {
			console.error('Cannot save room data!\n' + error);
		})
}

saveNiftyTalkData=(id,name,text)=>{
	chat.set('userId',id).set('name',name).set('text',text)
	.save()
	.then((result)=>{
		console.log("success")
	}).catch((error)=>{
		console.error('Cannnot save TalkData')
	})
}