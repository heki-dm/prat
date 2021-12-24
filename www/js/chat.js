/**
 * chat.js
 */
console.log('chat.js is ready!')

class Chat{
	constructor() {
		// NCMB初期化
		this.APPKEY = 'f0e44ccb004cf57d62815c9c90b3ec503f1d2b8320a001fc36956368ead57581'
		this.CLIENTKEY = '4fc1b2b336e3edbd6d39f308008bea45066c89b4d02b00242bf9118d4e195faa'
		this.NCMB = new NCMB(this.APPKEY, this.CLIENTKEY)
	}

	// ニフクラからトークルーム情報を取得する
	getRoomList = () => {
		const RoomList = ncmb.DataStore('RoomList')
		const roomList = new RoomList()

		roomList.order('createDate', true)//保存日時の降順
			.fetchAll()
			.then((results) => {
				console.log("データ件数:" + results.length + "件");
				setData('全件検索', results, '#dataList')
			})
			.catch(e => {
				console.log('データなし');
			});
	}

	// トークルームを追加
	addRoom = () => {

		document.querySelector('#navigator').pushPage('addRoom.html')
		$('#addRomm').on('click', () => {

		})
	}

	// トーク履歴を取得する
	getTalkHistory = (roomId) => {

	}
}