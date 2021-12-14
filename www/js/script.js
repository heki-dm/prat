// This is a JavaScript file
/**
 * script.js
 * 画面遷移に必要な動き
 */

console.log('script.js is ready!')

document.addEventListener('init', (e) => {
  var page = e.target;

  if (page.matches('#top-page')) {
    // アカウントを持っているか確認
    checkLogin()
    let image = ""
    let roomName = "Classroom"
    // トップページの処理
    let roomNameList = `<ons-list-item modifier="chevron" tappable onclick="pushTalkPage('${roomName}')">`
    roomNameList += `<img src="${image}" style="width:3em; height:3em;margin-right:1em;">${roomName}</ons-list-item>`
    $('#room_list').append(roomNameList)
  } else if (page.matches('#chat-page')) {
    // チャット画面の処理
    page.querySelector('ons-toolbar .center').innerHTML = page.data.roomName

    // 送信クリック
    $('#send').on('click', () => {
      let text = $('#message').val();
      text += '<br>'
      $('#talk_log').append(text)
      $('#message').val('')
    })
  } else if (page.matches('#login-page')) {
    $('#login').on('click', () => {
      let userName = $('#userName').val()
      let password = $('#password').val()
      // let birthday=$('birthday').val()
      console.table(userName,password);
      if (userName != null && password != null) {
        // 正しく入力されている場合
        let accountInfoList = {
          userName: userName,
          password: password,
          // birthday:birthday,
        }
        localStorage.setItem('accountInfo', JSON.stringify(accountInfoList))
        console.log('Save new account at local.');
        document.querySelector('#navigator').pushPage('top.html')
        saveAccountInfo(userName,password)
      }else{
        ons.notification.alert('すべての項目を入力してください。');
      }
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