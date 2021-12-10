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
	let accountInfo=JSON.parse(localStorage.getItem("accountInfo"))
	if(accountInfo==null){
		// アカウント未登録の場合
		console.log('Create new account!');
		document.querySelector("#navigator").pushPage('login.html')
	}
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