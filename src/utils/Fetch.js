/**
 * Created by Administrator on 2017/10/11.
 */
/**
 * Created by aj on 2016/12/7.
 */
// import Storage from '../utils/Storage';

import {Platform} from "react-native";
import MD5 from "react-native-md5";
import Toast from '@remobile/react-native-toast'
import NetWorkTool from "../utils/NetWorkTool";
import Config from './Config';
let  system=Platform.OS.toUpperCase()


// let url="http://114.215.222.75:8005/sixty/interface/sixtyinit.php";  // 正式


export default function request(thetype,param = "") {
    return new Promise((resolve, reject) => {
        let timestamp = Math.floor(Date.parse(new Date())/1000);
        let md5 = MD5.hex_md5('100'+system+'100'+""+thetype+timestamp + Config.md5key);
        let temParam= 'version=100&sysversion=100&system='+system+"&md5key="+md5+"&nowtime="+timestamp+'&usertype='+Config.usertype+'&userid='+Config.userid+'&userkey='+Config.userkey;
        let params=temParam+'&'+param;
        let url=Config.BaseURL+"sixty/interface/sixtyinit.php";
        console.log(url+'?'+params);
        NetWorkTool.checkNetworkState((isConnected)=>{
            fetch(url,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },body: encodeURI(params),
            })
                .then((response) => {
                    console.log("response11111111111111",response);
                    return response.json();
                })
                .then((jsonData) => {
                    console.log("jsonData",jsonData);
                    if(jsonData.code=="100"){

                        resolve(jsonData);
                    }else{
                        reject(jsonData.msg);
                    }
                })
                .catch((error) => {
                    reject(error.toString());
                });
            if(!isConnected){
                Toast.show(NetWorkTool.NOT_NETWORK);
            }
        });

    })
}



