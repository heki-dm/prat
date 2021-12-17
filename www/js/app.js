// This is a JavaScript file

console.log('app.js is ready!')

// NCMB初期化
const applicationKey = 'f0e44ccb004cf57d62815c9c90b3ec503f1d2b8320a001fc36956368ead57581'
const clientKey = '4fc1b2b336e3edbd6d39f308008bea45066c89b4d02b00242bf9118d4e195faa'
const ncmb = new NCMB(applicationKey, clientKey)

// 新規アカウント登録
registerNewAccount=()=>{

}

// アカウント有無の確認
checkLogin=()=>{
	/**
	 * return:userId
	 */
	let accountInfo=JSON.parse(localStorage.getItem("accountInfo"))
	if(accountInfo==null){
		// アカウント未登録の場合
		console.log('Create new account!');
		document.querySelector("#navigator").pushPage('login.html')
	}else{
		
	}
}

// ユーザIDをニフクラから取得する
getUserId=()=>{

}

// ログイン
login=()=>{
	let userName = $('#userName').val()
	let password = $('#password').val()

	if (userName != null && password != null) {
	// 正しく入力されている場合
	// ニフクラに保存
	saveNiftyAccountInfo(userName, password)
	// ニフクラからidを取ってくる
	let id = getUserId()

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
logout=()=>{
	localStorage.removeItem('accountInfo');
    console.log('logout');
    document.querySelector('#navigator').pushPage('login.html');
}

// ニフクラからトークルーム情報を取得する
getRoomList=()=>{
	const roomList=ncmb.DataStore('RoomList')
	const roomList=new roomList()

	roomList .order('createDate', true)//保存日時の降順
	.fetchAll()
	.then((results) => {
		console.log("データ件数:" + results.length + "件");
		setData('全件検索', results, '#dataList')
	})
	.catch(e => {
		console.log('データなし');
	});
}

// ニフクラにアカウント情報を登録
saveNiftyAccountInfo=(userName,pass)=>{
	// データストアのUserクラスを利用
	const UserInfo=ncmb.DataStore('User')
	// インスタンスを生成
	const userInfo=new UserInfo()
	// 登録
	userInfo.set('userName',userName).set('password',pass)
	.save()
	.then(()=>{
		console.log('Saved at nifcloud');
	}).catch((error)=>{
		console.log('failed\n'+error);
	})
}
// 
// async function saveToNCMB(message) {
// 	// データストアのChatクラスを利用
// 	const Chat = ncmb.DataStore('Chat')
// 	// インスタンスを作成
// 	const chat = new Chat()
// 	// ログインユーザを取得
// 	const user = ncmb.User.getCurrentUser()
// 	// ACLを準備
// 	const acl = new ncmb.Acl()
// 	acl
// 		.setPublicReadAccess(true) // 誰でも読み込み可能
// 		.setUserWriteAccess(user, true) // 書き込みは本人のみ
// 	// データをセットして保存処理を実行
// 	await chat.set('user', user.get('displayName')).set('message', message).set('acl', acl).save()
// }