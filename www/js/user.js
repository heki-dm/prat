/**
 * user.js
 */
console.log('user.js is ready!');

class User{
	constructor(userName, password) {
		// NCMB初期化
		this.APPKEY = 'f0e44ccb004cf57d62815c9c90b3ec503f1d2b8320a001fc36956368ead57581'
		this.CLIENTKEY = '4fc1b2b336e3edbd6d39f308008bea45066c89b4d02b00242bf9118d4e195faa'
		this.NCMB = new NCMB(this.APPKEY, this.CLIENTKEY)
		this.userName = userName
		this.password = password
	}

	// アカウント有無の確認
	checkLogin = () => {
		/**
		 * return:userId
		 */
		let userInfo = JSON.parse(localStorage.getItem("UserInfo"))
		if (userInfo == null) {
			// アカウント未登録の場合
			console.log('Create new account!');
			// ログインページに遷移
			document.querySelector("#navigator").pushPage('login.html')
		} else {
			// アカウント登録済みの場合
			// 何もしない
		}
	}

	// ログイン
	login = () => {
		let userName = $('#userName').val()
		let password = $('#password').val()

		if (userName != null && password != null) {
			// 正しく入力されている場合
			// ニフクラに保存
			saveNiftyAccountInfo(userName, password, 1)
			// ニフクラからidを取ってくる
			let id = getUserId(userName, password)

			// ローカルストレージに保存
			let accountInfoList = {
				userId: id,
				userName: userName,
				password: password,
				// birthday:birthday,
			}
			localStorage.setItem('accountInfo', JSON.stringify(accountInfoList))
			console.log('Save new account at local.');
			// Topページに戻る
			document.querySelector('#navigator').popPage()
		} else {
			ons.notification.alert('すべての項目を入力してください。');
		}
	}

	// ログアウト
	logout = () => {
		console.log('logout');
		localStorage.removeItem('accountInfo');
		// ニフクラにログアウトを記録

		
		document.querySelector('#navigator').pushPage('login.html');
	}

	// ニフクラにアカウント情報を登録
	saveNiftyAccountInfo = (userName, pass, status) => {
		// データストアのUserクラスを利用
		const UserInformation = ncmb.DataStore('User')
		// インスタンスを生成
		const userInfo = new UserInformation()
		// 登録
		// ユーザ名
		// パスワード
		// ログイン状況	0:ログアウト, 1:ログイン
		userInfo.set('userName', userName).set('password', pass).set('status', status)
			.save()
			.then(() => {
				console.log('Saved at nifcloud');
			}).catch((error) => {
				console.log('failed\n' + error);
			})
	}

	// ユーザIDをニフクラから取得する
	getUserId = (name) => {
		/**
		 * ユーザ名からユーザIDを返す
		 * return userId
		 */
		const USER = this.NCMB.DataStore('User')
		const user = new USER()

		user.equalTo('userName', name)
			.fechAll()
			.then((result) => {
				console.log('success');
				console.log(result)
				return result
			}).catch((err) => {
				console.log(err);
			})

	}
}