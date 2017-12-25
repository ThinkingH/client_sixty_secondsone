export default class HttpHelp{
    static login(parpam,callback){
        //let parpam="thetype=1002"+'&phone='+this.state.phone+'&vcode='+this.state.code;
        Request('1002',parpam)
            .then((responseJson) => {
                callback.ok(responseJson);

            })
            .catch((error) => {
                // Toast.show(error.toString());
            });
    }


    //忘了  ?=什么意思了。。。。
    static getVerify(parpam?=null,callback){
        //let parpam="thetype=1001"+'&phone='+this.state.phone;
        Request('1001',parpam)
            .then((responseJson) => {
                callback.ok(responseJson);
            })
            .catch((error) => {
                Toast.show("网络请求失败");
            });
    }

    static getVerify(parpam,callback){
        //let parpam="thetype=1001"+'&phone='+this.state.phone;
        Request('1001',parpam)
            .then((responseJson) => {
                callback.ok(responseJson);
            })
            .catch((error) => {
                Toast.show("网络请求失败");
            });
    }
}