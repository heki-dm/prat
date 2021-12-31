/**
 * user.js
 */
console.log('user.js is ready!');


class User {
	constructor(userName, password) {
		this.id
		this.name = userName
		this.password = password
		// NCMB初期化
		var APPKEY = 'f0e44ccb004cf57d62815c9c90b3ec503f1d2b8320a001fc36956368ead57581'
		var CLIENTKEY = '4fc1b2b336e3edbd6d39f308008bea45066c89b4d02b00242bf9118d4e195faa'
		let ncmb = new NCMB(APPKEY, CLIENTKEY)
		var User_ncmb = ncmb.DataStore('User')
		var user_ncmb = User_ncmb()
	}

	/**
	 * getUserId
	 * 引数：name
	 * 返り値：id
	 * ニフクラからidを取得する
	 */
	getUserId = (name, pass) => {
		user_ncmb.equalTo('user', name)
			.equalTo('password', pass)
			.fetchById('userName')
			.then((data) => {
				console.log('success\n' + data);
				this.id = data
				// return data
			}).catch((error) => {
				console.error('error! Cannnot get userId.\n' + error);
			})
	}

	/**
	 * login
	 */
	login = () => {
		user_ncmb.set('name',this.name)
			.set('password', this.password)
			.save()
			.then(() => {
				console.log('success')
			}).catch((error) => {
				console.error('Cannnot save user infomation!\n' + error);
			})
		let id = this.getUserId(this.name, this.password)
		let userInfo = {
			id: this.id,
			name: this.name,
			password: this.password
		}
	}
	/**
	 * saveLocal
	 */
	saveLocal = () => {

	}
}