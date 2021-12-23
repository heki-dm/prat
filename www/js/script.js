// This is a JavaScript file
/**
 * script.js
 * 画面遷移に必要な動き
 */

console.log('script.js is ready!')

document.addEventListener('init', (e) => {
  var page = e.target;
  var user = new User()

  if (page.matches('#top-page')) {
    var chat=new Chat();
    // トップページの処理
    user.checkLogin()  // アカウントを持っているか確認
    chat.getRoomList() // ルームリストを取得する

    // ログアウト
    $('#logout').on('click', () => {
      logout()
    })
    $('#addRoom').on('click',()=>{
      addRoom()
    })
  } else if (page.matches('#login-page')) {
    $('#login').on('click', () => {
      login()
    })
  } else if (page.matches('#chat-page')) {
    // チャット画面の処理
    page.querySelector('ons-toolbar .center').innerHTML = page.data.roomName

    // roomIdを取得

    // userNameまたはuserIdを取得

    // 送信クリック
    $('#send').on('click', () => {
      let text = $('#message').val();
      $('#talk_log').append(text + '<br>')
      $('#message').val('')
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