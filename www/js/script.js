// This is a JavaScript file
/**
 * script.js
 * 画面遷移に必要な動き
 */

console.log('script.js is ready!')

document.addEventListener('init', (e) => {
  var page = e.target;

  if (page.matches('#top-page')) {
    // トップページの処理
    // アカウントを持っているか確認
    checkLogin()
    // ルームリストを取得する
    getRoomList()

    $('#logout').on('click', () => {
      localStorage.removeItem('accountInfo');
      console.log('logout');
      document.querySelector('#navigator').popPage();
    })
  } else if (page.matches('#login-page')) {
    $('#login').on('click', () => {
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
          userId:id,
          userName: userName,
          password: password,
          // birthday:birthday,
        }
        localStorage.setItem('accountInfo', JSON.stringify(accountInfoList))
        console.log('Save new account at local.');
        // Topページに戻る
        document.querySelector('#navigator').pushPage('top.html')
      } else {
        ons.notification.alert('すべての項目を入力してください。');
      }
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