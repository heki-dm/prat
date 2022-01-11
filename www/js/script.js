// This is a JavaScript file
/**
 * script.js
 * 画面遷移に必要な動き
 */

console.log('script.js is ready!')

const APPKEY = 'f0e44ccb004cf57d62815c9c90b3ec503f1d2b8320a001fc36956368ead57581'
const CLIENTKEY = '4fc1b2b336e3edbd6d39f308008bea45066c89b4d02b00242bf9118d4e195faa'

document.addEventListener('init', (e) => {
	var page = e.target;

	if (page.matches('#login-page')) {
		// ログインページ
		$('#login').on('click', () => {
			let userName = $('#userName').val()
			let password = $('#password').val()
			login(userName, password)
		})
	} else if (page.matches('#top-page')) {
		// トップページの処理
		// checkLogin()  // アカウントを持っているか確認
		// getRoomList() // ルームリストを取得する

		// ログアウト
		$('#logout').on('click', () => {
			logout()
		})
		$('#addRoom').on('click', () => {
			document.querySelector('#navigator').pushPage('addRoom.html')
			addRoom()
		})
	} else if (page.matches('#chat-page')) {
		// チャット画面の処理
		page.querySelector('ons-toolbar .center').innerHTML = page.data.roomName

		// 送信クリック
		$('#send').on('click', () => {
			let text = $('#message').val();
			let contents = "<div class='myTalked'><span class='myTalked_text text'>" + text + "</span><br></div>"
			$('#talk_log').append(contents)
			$('#message').val('')
			let roomId = getRoomId()
			let userName = getUserName()
			saveNiftyTalkData(roomId, userName, text)
		})
	}
})

/**
 * ルーム名選択
 * ルーム名を渡す
 */
function pushTalkPage(roomName) {
	console.log('pushed')
	document.querySelector('#navigator').pushPage('chat.html', { data: { roomName: roomName } })
}