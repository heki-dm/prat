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
	// User
	User.equalTo('userName', name)
		.equalTo('password', pass)
		// .fetchById()
		.fetchAll()
		.then((data) => {
			let id = data[0]["objectId"]
			console.log(id)
			saveLocal(id, name, pass)
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
		.then((status) => {
			console.log('success\n' + status)
			getUserId(name, pass)
		}).catch((error) => {
			console.error('Cannnot save user infomation!\n' + error);
		})

}

logout = () => {
	localStorage.removeItem()
}
/**
 * saveLocal
 * ローカルストレージにデータを保存する
 */
saveLocal = (id, name, pass) => {
	userInfo = {
		id: id,
		name: name,
		password: pass
	}
	localStorage.setItem('userInfo', JSON.stringify(userInfo))
	console.log('success')
}

getLocal=()=>{
	let data=localStorage.getItem("userInfo")
	console.table(data)
}

getUserName = () => {

}
