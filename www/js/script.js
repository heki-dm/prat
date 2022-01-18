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
		let localData = localStorage.getItem("userInfo")
		if (localData) {
			localData = JSON.parse(localData)
			if (localData) {
				// ログイン済み
				login()
				document.querySelector("#navigator").pushPage("top.html")
			}
		} else {
			$('#login').on('click', () => {
				let userName = $('#userName').val()
				let password = $('#password').val()
				createUser(userName, password)
				document.querySelector("#navigator").pushPage("top.html")
			})
		}
	} else if (page.matches('#top-page')) {
		// トップページの処理
		let data=getLocal()
		getRoomData(data.id)
		// 友達追加
		$("#qr_code").on("click", () => {
			document.querySelector("#navigator").pushPage("addFriend.html")
		})
		// ログアウト
		$('#logout_logo').on('click', () => {
			console.log("logout");
			logout()
			document.querySelector("#navigator").popPage()
		})

		$('#addRoom_logo').on('click', () => {
			console.log('click');
			document.querySelector('#navigator').pushPage('addRoom.html')
		})

	} else if (page.matches("#addFriend-page")) {
		let data = getLocal()
		let uid=data.id
		makeQr(data.id)
		// QRコード表示
		$("#readQr").on("click", () => {
			console.log("clicked");
			let qr = scan()
			console.log(qr)
			addFriend(qr)
			let friendData=getUserData(qr)
			let name=friendData.name
			let fid=friendData.id
			addRoom(uid,name,fid)
		})
	} else if (page.matches("#createRoom-page")) {
		$("#createRoom").on("click", () => {
			let roomName = $("#roomName").val()
			addRoom(roomName)
		})
	} else if (page.matches('#chat-page')) {
		// チャット画面の処理
		page.querySelector('ons-toolbar .center').innerHTML = page.data.roomName

		let data = getLocal()
		let userId = data.id
		let userName = data.name
		let roomId = getRoomId()
		// 送信クリック
		$('#send').on('click', () => {
			let text = $('#message').val();
			let contents = "<div class='myTalked'><span class='myTalked_text text'>" + text + "</span><br></div>"
			$('#talk_log').append(contents)
			$('#message').val('')
			saveNiftyTalkData(roomId, userId, userName, text)
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