/**
 * user.js
 */
console.log("user.js is ready!");

let ncmb = new NCMB(APPKEY, CLIENTKEY)
var User = ncmb.DataStore("User")
var user = new User()

/**
 * getUserId
 * 引数：name
 * 返り値：id
 * ニフクラからidを取得する
 */
getUserId = (name, pass) => {
	// User
	User.equalTo("userName", name)
		.equalTo("password", pass)
		// .fetchById()
		.fetchAll()
		.then((data) => {
			let id = data[0]["objectId"]
			console.log(id)
			saveLocal(id, name, pass)
		}).catch((error) => {
			console.error('error! Cannnot get userId.\n' + error);
		})
}

/**
 * login
 */
var userInfo
login = (name, pass) => {
	// ニフクラにnameとpasswordを保存する
	user.set("userName", name)
		.set("password", pass)
		.set("status",true)
		.save()
		.then((status) => {
			console.log("success\n" + status)
			getUserId(name, pass)
		}).catch((error) => {
			console.error("Cannnot save user infomation!\n" + error);
		})

}

logout = () => {
	localStorage.removeItem()
}
/**
 * saveLocal
 * ローカルストレージにデータを保存する
 */
saveLocal = (id, name, pass) => {
	userInfo = {
		id: id,
		name: name,
		password: pass
	}
	localStorage.setItem("userInfo", JSON.stringify(userInfo))
	console.log("success")
}

getLocal=()=>{
	let data=JSON.parse(localStorage.getItem("userInfo"))
	console.table(data)
	return data
}

makeQr=(id)=>{
	var qrcode = new QRCode(document.getElementById("qrcode"), {
		text: id,
		width: 128,
		height: 128,
		colorDark : "#000000",
		colorLight : "#ffffff",
		correctLevel : QRCode.CorrectLevel.H
	  });
}

readQr=()=>{
	// バーコードスキャン関連のfunction
	let options={
		preferFrontCamera : false, // iOS and Android
		showFlipCameraButton : true, // iOS and Android
		showTorchButton : true, // iOS and Android
		torchOn: false, // Android, launch with the torch switched on (if available)
		saveHistory: true, // Android, save scan history (default false)
		prompt : "Place a barcode inside the scan area", // Android
		resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
		formats : "QR_CODE,EAN_13", // default: all but PDF_417 and RSS_EXPANDED
		orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
		disableAnimations : false, // iOS
		disableSuccessBeep: false // iOS and Android
	  }
	  function onSuccess(result){
		alert("読み取り成功\n" +"結果: " + result.text + "\n" +"フォーマット: " + result.format + "\n" +"中断したか: " + result.cancelled);
	  }
	  function onError(error){
		alert("読み取り失敗: " + error);
	  }
	  function scan(){
		cordova.plugins.barcodeScanner.scan(
		  onSuccess,onError,options
		);
		// alert("Scaned!")
	  }
}