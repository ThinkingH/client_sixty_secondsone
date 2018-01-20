/**
 * Created by wangfei on 17/8/28.
 */
var { NativeModules } = require('react-native');
module.exports = NativeModules.UMShareModule;


//0	QQ  1	SINA  2	微信 3	朋友圈
// let list = [0,1,2,3]
// ShareUtile.shareboard("分享描述",'http://www.ncloud.hk/email-signature-262x100.png','http://www.ncloud.hk/','我的微信分享测试',list,(code,message) =>{
//     Toast.show(message);
//
// });