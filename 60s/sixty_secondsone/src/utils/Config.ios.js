/**
 * Created by aj on 2016/12/18.
 */
import {View, StyleSheet, ListView, Image,TouchableOpacity,BackAndroid,PixelRatio,Platform} from "react-native";
import MD5 from "react-native-md5";
import JPushModule from 'jpush-react-native';
import Request from '../utils/Fetch';
const styles = StyleSheet.create({
    horizontal_layout:{
        flex:1,
        flexDirection:"row",
    },container: {
        flex: 1,backgroundColor: '#efeff4',
    },
});

export default class Config{
     static versionName="V1.0.0";
     static version=100;
     static ISHIDE=false;
     static loadingTxtStyle={color:"#757575",fontSize:14,};
     static loadingTxt="正在加载中...";
     static md5key="fd5112f036eea77f23bac0bbbadbe592";
     static icons=[require('./../img/nav_home_n.png'),require('./../img/nav_seach_n.png'),require('./../img/nav_fav_n.png'),require('./../img/nav_account_n.png')];
     static icons_s=[require('./../img/nav_home_s.png'),require('./../img/nav_seach_s.png'),require('./../img/nav_fav_s.png'),require('./../img/nav_account_s.png')];
     static navs_txt=["首页","搜索","收藏","我的"]
     static pageCount=10;
     static tabBarHight=0;
     static StatusBarColor='#8c8c8c';
     static IECEIVESOCKET=2;
     static ISCOLLECT=1;
     static ISJPUSH=true;

     static initJpush=()=>{

        }

    static createJiGuangId=()=>{



    }
}


