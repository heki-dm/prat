/**
 * user.js
 */
console.log('user.js is ready!');

let ncmb = new NCMB(APPKEY, CLIENTKEY)
var User = ncmb.DataStore('User')
var user = new User()

/**
 * getUserId
 * 引数：name
 * 返り値：id
 * ニフクラからidを取得する
 */
getUserId = (name, pass) => {
	User.equalTo('user', name)
		.equalTo('password', pass)
		.fetchById('userName')
		.then((data) => {
			console.log('success\n' + data);
			let id = data
			return id
		}).catch((error) => {
			console.error('error! Cannnot get userId.\n' + error);
		})
}

/**
 * login
 */
var userInfo
login = (name, pass) => {
	// ニフクラにnameとpasswordを保存する
	user.set('userName', name)
		.set('password', pass)
		.save()
		.then(() => {
			console.log('success')
		}).catch((error) => {
			console.error('Cannnot save user infomation!\n' + error);
		})

	// ニフクラからuserIdを取得する
	let id = getUserId(name, pass)

	userInfo = {
		id: id,
		name: name,
		password: pass
	}
	saveLocal(userInfo)
}

logout=()=>{
	localStorage.removeItem()
}
/**
 * saveLocal
 * ローカルストレージにデータを保存する
 */
saveLocal = (info) => {
	localStorage.setItem('userInfo', JSON.stringify(userInfo))
	console.log('success')
}

getUserId=()=>{

}
getUserName=()=>{

}
