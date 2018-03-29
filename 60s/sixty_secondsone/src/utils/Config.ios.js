/**
 * Created by aj on 2016/12/18.
 */
import {
    View, StyleSheet, ListView, Image, TouchableOpacity, BackAndroid, PixelRatio, Platform, StatusBar,
    Dimensions
} from "react-native";
import MD5 from "react-native-md5";
import Request from "./Fetch";
import JPushModule from "jpush-react-native/index";

const {width, height} = Dimensions.get('window');
const isiPhoneX = width == 375 && height == 812 ? true : false;

const styles = StyleSheet.create({
    horizontal_layout:{
        flex:1,
        flexDirection:"row",
    },
    container: {
        flex: 1,
        backgroundColor: '#efeff4',
    },
});

export default class Config{
     static versionName="V1.1.6";
     static version=116;
     static ISHIDE=false;
     static loadingTxtStyle={color:"#757575",fontSize:14,};
     static loadingTxt="正在加载中...";
     static md5key="fd5112f036eea77f23bac0bbbadbe592";
     static icons=[require('./../img/nav_home_n.png'),require('./../img/nav_seach_n.png'),require('./../img/nav_fav_n.png'),require('./../img/nav_account_n.png')];
     static icons_s=[require('./../img/nav_home_s.png'),require('./../img/nav_seach_s.png'),require('./../img/nav_fav_s.png'),require('./../img/nav_account_s.png')];
     static navs_txt=["首页","搜索","收藏","我的"]
     static pageCount=10;
     static tabBarHight=0;
     static StatusBarColor='#f5c61e';
     static IECEIVESOCKET=2;
     static ISCOLLECT=1;
    static ISSHOWL=1;
     static ISJPUSH=true;
    static ISPLAYLL='';//是否为流量状态
     // static STATUSBARHEIGHT=Platform.OS == 'ios' ? 20 : StatusBar.currentHeight;
     static STATUSBARHEIGHT = isiPhoneX ? 44 : 20;
     static BaseURL = "http://api.60video.net/";
     static isDebug = "2";//初始值为2，2为隐藏（屏蔽），其余为显示
     static initJpush=()=>{
         // JPushModule.initPush();
         // JPushModule.debug=false;
        }

    static createJiGuangId=()=>{
        let timestamp = Math.floor(Date.parse(new Date())/1000);
        let system=Platform.OS.toUpperCase();
        let md5 = MD5.hex_md5('100'+system+'100'+""+'1010'+timestamp + Config.md5key);
        //let md5=MD5.hex_md5(Config.userid+Config.userkey+Config.md5key);
        //注册别名
        console.log(md5);
        JPushModule.setAlias(md5,()=>{},()=>{});
        let parpam="thetype=1003&jiguangid="+md5;
        Request('1003',parpam)
            .then((responseJson) => {
                console.log('12346442324354665432',responseJson)
            })
            .catch((error) => {
                Toast.show(error.toString());
            });
    };
    static AAAAAA='1';
}


