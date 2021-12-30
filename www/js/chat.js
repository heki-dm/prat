/**
 * chat.js
 */
console.log('chat.js is ready!')

// NCMB初期化
var APPKEY = 'f0e44ccb004cf57d62815c9c90b3ec503f1d2b8320a001fc36956368ead57581'
var CLIENTKEY = '4fc1b2b336e3edbd6d39f308008bea45066c89b4d02b00242bf9118d4e195faa'
const Chat_ncmb = ncmb.DataStore('User')
const chat = Chat_ncmb()

class Chat {
	constructor() {
		this.id
		this.name
		this.member
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
}