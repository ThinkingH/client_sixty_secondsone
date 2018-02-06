import React from 'react';
import { View, Text, StyleSheet, Button,StatusBar,Image,Dimensions,NetInfo,Linking ,Alert,Platform} from 'react-native';
import { Actions,ActionConst } from 'react-native-router-flux';
import Storage  from '../utils/Storage';
import Config from '../utils/Config';
import UMSocialUtils from '../utils/UMSocialUtils';
import Toast from '@remobile/react-native-toast'
import Request from '../utils/Fetch';
import NetWorkTool from "../utils/NetWorkTool";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});
let isfirst=null;
let downapkurl='http://p05sfdtdh.bkt.clouddn.com/60Sec.apk';
const {width, height} = Dimensions.get('window');
class Launch extends React.Component {

    constructor(props) {
        super(props);

        this.init();

        UMSocialUtils.init()
    }

    componentWillMount () {
        NetWorkTool.addEventListener(NetWorkTool.TAG_NETWORK_CHANGE,this.handleMethod);

    }

    componentWillUnmount () {
        NetWorkTool.removeEventListener(NetWorkTool.TAG_NETWORK_CHANGE,this.handleMethod);
    }

    componentDidMount() {

        // setTimeout(() => {
        //     Actions.tabbar({type: ActionConst.RESET});
        // }, 3000);
        // SplashScreen.hide();



    }
    handleMethod = (isConnected) => {
        if (isConnected) {

        } else {
            Toast.show("暂无网络，请检查网络设置！")
        }
        console.log('test', (isConnected ? 'online' : 'offline'));
    };

    init = () => {
        //获取本地存储的用户信息
        Storage.getValueForKey("userid").then((value) => {
            console.log("userid :", value);
            Config.userid = value;
        });

        Storage.getValueForKey("isfirst").then((value) => {
            console.log("userid :", value);
            isfirst=value

        });

        Storage.getValueForKey("userkey").then((value) => {
            console.log("userkey :", value);
            Config.userkey = value;
        });
        Storage.getValueForKey("uptime").then((value) => {
            console.log("uptime :", value);
            if(value!=null){
                Config.uptime = value;
                this._getInterval();
            }else{
                this.checkUpdate();
            }
        });

        Storage.getValueForKey("usertype").then((value) => {
            console.log("获取用户类型usertype :", value);
            if (value === null) {
                //如果没有则注册临时用户
                Config.usertype = 0;
            } else {
                Config.usertype = value;
            }
        }).catch((error) => {
            //this.registerTempUser();
        });
       // Actions.tabbar({type: ActionConst.RESET});

    };

    _update=()=>{
        let appURL = '';
        if (Platform.OS === 'ios'){
            appURL = 'https://itunes.apple.com/us/app/60秒/id1335916922?l=zh&ls=1&mt=8';
        }
        else {
            appURL = 'http://imtt.dd.qq.com/16891/03AD43D6C4EF3BC9E616997EA01C3614.apk';
        }
        Linking.canOpenURL(appURL).then(supported => {
            if (supported) {
                Linking.openURL(appURL);
            } else {
                console.log('无法打开该URI: ' + ttt);
            }
        });
    };

    _getUpdateTime=()=>{
        let uptime=new Date();//获取取消更新的时间
        let timestamp1 = Date.parse(uptime);
        Storage.saveWithKeyValue("uptime",timestamp1);
    };

    _getInterval=()=>{
        console.log('aaaaaaa')
        let intervaltime=new Date();//获取取消更新的时间
        let timestamp2 = Date.parse(intervaltime);
        if((timestamp2-Config.uptime)/3600000>48){
            this.checkUpdate();
        }else{
            Actions.tabbar({type: ActionConst.RESET});
            console.log('ssssss')
        }
    };

    checkUpdate = () => {
        //判断是否有更新
        let parpam="thetype=1009";
        Request('1009',parpam)
            .then((responseJson) => {
                downapkurl=responseJson.data.apk_url;
                //如果请求成功就走下面的方法 n
             if(Config.version==responseJson.data.version){
                 console.log('dddddddddddddddddd')
                 if(isfirst=='1'){
                     Actions.tabbar({type: ActionConst.RESET});
                 }else{
                     Actions.intro({type: ActionConst.RESET});
                 }
             }else if(Config.version<responseJson.data.version){
                 Alert.alert(
                     '',
                     "发现新版本，快去更新吧！",
                     [
                         {text: '去更新', onPress: () => {
                             this._update();
                             Actions.tabbar({type: ActionConst.RESET});
                         }},
                         {text: '取消', onPress: () => {
                             this._getUpdateTime();
                             Actions.tabbar({type: ActionConst.RESET});
                         }},
                     ],
                     // { cancelable: false }
                 );
             }
            })
            .catch((error) => {
                Actions.tabbar({type: ActionConst.RESET});

              Toast.show(error.toString());
            });
    };

  render () {
    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <StatusBar backgroundColor="transparent"
                       barStyle="dark-content"
                       translucent={true}
                       hidden={true}/>
            <Image source={require('./../img/icon_sixtylogo.png')} style={{width:width/2, height:width/2/493*553}}
                  />
        </View>
    );
  }
}

export default Launch;
{/*<View {...this.props} style={styles.container}>*/}
    {/*<Text>Welcome</Text>*/}
    {/*<Button title="Go to Login" onPress={() => Actions.login({ data: 'Custom data', title: 'Custom title' })} />*/}
    {/*<Button title="Go to Register page" onPress={Actions.register} />*/}
    {/*<Button title="Display Error Modal" onPress={Actions.error} />*/}
    {/*<Button title="Display Lightbox" onPress={Actions.main} />*/}
    {/*<Button*/}
        {/*title="MessageBar alert"*/}
        {/*onPress={() => MessageBarManager.showAlert({*/}
            {/*title: 'Your alert title goes here',*/}
            {/*message: 'Your alert message goes here',*/}
            {/*alertType: 'success',*/}
            {/*// See Properties section for full customization*/}
            {/*// Or check `index.ios.js` or `index.android.js` for a complete example*/}
          {/*})}*/}
    {/*/>*/}
    {/*<Button title="Go to TabBar page" onPress={Actions.tabbar} />*/}
{/*</View>*/}