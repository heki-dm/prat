// This is a JavaScript file
/**
 * 
 */

console.log('script.js is ready!')

document.addEventListener('init', (e) => {
  var page = e.target;

  if (page.matches('#top-page')) {
    // トップページの処理
    let roomName = '<ons-list-item modifier="chevron" tappable onclick="pushTalkPage()">'
    roomName += '<img src="" style="width:3em; height:3em;margin-right:1em;">classroom</ons-list-item>'
    $('#room_list').append(roomName)
  } else if (page.matches('#chat-page')) {
    // チャット画面の処理
    page.querySelector('ons-toolbar .center').innerHTML = page.data.roomName
  }
})

/**
 * ルーム名選択
 * ルーム名を渡す
 */
function pushTalkPage() {
  console.log('pushed')
  document.querySelector('#navigator').pushPage('chat.html', { data: { roomName: 'name' } })
}