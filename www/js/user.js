class User {
    constructor() {
        // NCMB初期化
        const applicationKey = 'f0e44ccb004cf57d62815c9c90b3ec503f1d2b8320a001fc36956368ead57581'
        const clientKey = '4fc1b2b336e3edbd6d39f308008bea45066c89b4d02b00242bf9118d4e195faa'
        const ncmb = new NCMB(applicationKey, clientKey)
    }
    getAppkey(){
        console.log(this.applicationKey);
    }
}