import React ,{Component} from 'react';
import { StyleSheet, Text, View,DeviceEventEmitter,Platform ,LayoutAnimation,AppState,BackHandler,NativeAppEventEmitter} from 'react-native';
import Launch from './components/Launch';
import Login3 from './components/Login3';

import Login2 from './components/Login2';
import Storage  from './utils/Storage';
import {
    Scene,
    Router,
    Actions,
    Reducer,
    ActionConst,
    Overlay,
    Tabs,
    Modal,
    Drawer,
    Stack,
    Lightbox,
} from 'react-native-router-flux';


import TabView from './components/TabView';
import TabIcon from './components/TabIcon';
import Toast from '@remobile/react-native-toast'
import HomeScene from './scene/HomeScene';
import Account from './scene/Account';
import ListScence from './scene/ListScene';
import AccountInfo from './scene/AccountInfo';
import Main from './scene/Main';
import Setting from './scene/Setting';
import Contribute from './scene/Contribute';
import Comment from './scene/Comment';
import VideoDetails from './scene/VideoDetails';
import ContributeList from './scene/ContributeList';
import AssortmentSearch from './scene/AssortmentSearch';
import AssortmentOne from './scene/AssortmentOne';
import AssortmentTwo from './scene/AssortmentTwo';
import AssortmentThree from './scene/AssortmentThree';
import GetInfo from './scene/GetInfo';
import SearchVideo from './scene/SearchVideo';
import BaseScene from './scene/BaseScene';
import SofitelList from './scene/SofitelList';
import FeedBack from './scene/FeedBack';
import Message from './scene/Message';
import {NavigationComponent} from 'react-native-material-bottom-navigation'
import Config from './utils/Config';
import UMSocialUtils from "./utils/UMSocialUtils";
import JPushModule from 'jpush-react-native';
import ContributeDetails from  './scene/ContributeDetails'
import MainScene from './scene/MainScene'
import Testa from './scene/Testa';
import Law from './scene/Law';
import DietaryContribute from './scene/DietaryContribute';
import ContributeByUser from './scene/ContributeByUser';
import InputTitle from './scene/InputTitle';
import InputDesc from './scene/InputDesc';
import InputTime from './scene/InputTime';
import InputPoint from './scene/InputPoint';
import InputMaterials from './scene/InputMaterials';
import DeleteMater from './scene/DeleteMater';
import InputStep from './scene/InputStep';
import TipView from './scene/TipView';
import TipAll from './scene/TipAll';
import TipDetails from './scene/TipDetails';
import SearchMain from './scene/SearchMain';
import Intro from './scene/Intro';
import MessageBox from './scene/MessageBox';
import VideoDeta from './scene/VideoDeta';
import Request from "./utils/Fetch";

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: 'transparent', justifyContent: 'center',
        alignItems: 'center',
    },
    tabBarStyle: {
        backgroundColor: '#eee',
    },
    tabBarSelectedItemStyle: {
        backgroundColor: '#ddd',
    },
    titleStyle: {
        fontWeight:'normal',
        fontSize:18
    },
    navigationBarStyle:{
        backgroundColor:Platform.OS === 'ios' ? '#fff' : '#efefef',
    }
});
let isExit=0;
let down=0;
const reducerCreate = params => {
    const defaultReducer = new Reducer(params);
    return (state, action) => {

        if(action.type=='REACT_NATIVE_ROUTER_FLUX_BLUR'){
          //  console.log("ACTIONBLUR",action.routeName);
            if(action.routeName=='homescene'){
                isExit=2;
             //   console.log('isExit:',isExit);
                //  BackHandler.exitApp();
            }
        }
        if(isExit==1){
            //console.log('isExit:',isExit);
            if(action.type=='Navigation/BACK'){
              //  BackAndroid.addEventListener('hardwareBackPress', Config.onBackAndroid);
                if (down && down + 2000 >= Date.now()) {
                    //最近2秒内按过back键，可以退出应用。
                   // console.log("app退出了");
                    BackHandler.exitApp();
                }
                    down = Date.now();
                    Toast.show('再按一次退出应用');
                    //console.log('isExit:',isExit)
            }
           // console.log("app快要退出了")
        }
        if(action.type=='REACT_NATIVE_ROUTER_FLUX_FOCUS'){
           // console.log("ACTIONFOCUS",action);
            if(action.routeName=='homescene'){
                isExit=1;
               // console.log('isExit:',isExit);
                 // BackHandler.exitApp();
            }
        }


        return defaultReducer(state, action);
    };
};

const getSceneStyle = ( ) => {


    const style = {
        flex: 1,
        backgroundColor: '#FFFFFF',
        shadowColor: null,
        shadowOffset: null,
        shadowOpacity: null,
        shadowRadius: null,
    };
//iso  64 android 40
// if (computedProps.isActive) {
//
//     style.marginTop = computedProps.hideNavBar ? 0 : (Platform.OS === 'android' ? 54 : 64);
//     style.marginBottom = computedProps.hideTabBar ? 0 : 50;
// }
return style;
};
// const getSceneStyle = (/* NavigationSceneRendererProps */ props, computedProps) => {
//     const style = {
//         flex: 1,
//         backgroundColor: '#fff',
//         shadowColor: null,
//         shadowOffset: null,
//         shadowOpacity: null,
//         shadowRadius: null,
//     };
//     if (computedProps.isActive) {
//         style.marginTop = computedProps.hideNavBar ? (Platform.OS==='android'?0:20) : (Platform.OS==='android'?54:64);
//         style.marginBottom = computedProps.hideTabBar ? 0 : 50;
//     }
//     return style;
// };

export default class apps extends Component {
    constructor(props) {
        super(props);
           this.state={
               tabBarHight:0,
               ishide:false,
               isshare:true,
           };
       Config.initJpush();
    }
    componentWillMount() {


    }
    componentDidMount(){
        Storage.getValueForKey("jpush").then((value) => {
            console.log('valuevaluevaluevaluevalue111111111:',value)
            if(value==true||value==null){
                this.initPush();
                Config.ISJPUSH=1;
                JPushModule.resumePush();
            }else{
                Config.ISJPUSH=2;
                JPushModule.stopPush();
            }
        });
        this.isshare = DeviceEventEmitter.addListener("isshare",this._isshare);
        this.changeTab = DeviceEventEmitter.addListener("changeTab",this._changeTab);
         if(Platform.OS==='ios'){
             this._getConfigInfo();
         }
    }
    componentWillUnmount() {
        this.changeTab.remove();
        this.isshare.remove();
        this.unInitPush();

    }
    //获取一些配置信息，如iOS上线时隐藏第三方登录、分享功能等
    _getConfigInfo=()=>{
        let parpam="thetype=1047";
        Request('1047',parpam)
            .then((responseJson) => {
                Config.isDebug = responseJson.data[0].flag;
            })
            .catch((error) => {
                Toast.show(error.toString());
            });
    };

    _isshare=()=>{
        this.setState({
            isshare:!this.state.isshare,
        })
    }

    _changeTab=()=>{
        LayoutAnimation.spring();
        this.setState({
            tabBarHight:this.state.tabBarHight-56,
        })
    };

    _init=()=>{
        UMSocialUtils.init("59ec974af43e4842bc00024c");
    };



    initPush=()=>{

        JPushModule.notifyJSDidLoad((resultCode) => {
                if (resultCode === 0) {}
              });
        JPushModule.addReceiveCustomMsgListener((message) => {
           // this.setState({pushMsg: message});
        });
        JPushModule.addReceiveNotificationListener((message) => {

            Config.IECEIVESOCKET=1;

            console.log("receive notification: " + message.toString());
        });

        JPushModule.addReceiveOpenNotificationListener((map) => {
            // alert(JSON.parse(map))
            console.log('map.................................',map);
            if(Platform.OS=='ios'){
                this._getActiveIos(map);
            }else{
                this._getActiveAndroid(map);
            }
        })
    };
    _getActiveAndroid=(map)=>{
        console.log(map);
        let data='';
        if(JSON.parse(map.extras).action=="shouye"){
            //shouye 代表推送到首页列表   classify 代表推送到哪个分类  对应0 1 2 3....等索引
            Actions.tabbar({num:JSON.parse(map.extras).classify});
        }
        else if(JSON.parse(map.extras).action=="details"){
            //details 代表推送到视频详情页
            data=JSON.parse(map.extras).value;
            Actions.videodetails({title:data.vtitle,nowid:data.vid});
        }else if(JSON.parse(map.extras).action=="sofitellist"){
            //sofitellist 代表推送到特辑列表二级页面  sid为特辑列表id    data为特辑数据
            data=JSON.parse(map.extras).value;
            Actions.sofitellist({id:data.sid,datas:data.data});
        }else if(JSON.parse(map.extras).action=="message"){
            //message 代表推送到消息列表
            Actions.message();
        }else if(JSON.parse(map.extras).action=="messagebox"){
            //messagebox 代表推送到留言箱
            Actions.messagebox();
        }
        Config.IECEIVESOCKET=2;
    };

    _getActiveIos=(map)=>{
        console.log(map);
        Config.AAAAAA='232434324242'
        let data='';
        if(map.action=="shouye"){
            //shouye 代表推送到首页列表   classify 代表推送到哪个分类  对应0 1 2 3....等索引
            Actions.tabbar({num:JSON.parse(map).classify});
        }
        else if(map.action=="details"){
            //details 代表推送到视频详情页
            data=map.value;
            Actions.videodetails({title:data.vtitle,nowid:data.vid});
        }else if(map.action=="sofitellist"){
            //sofitellist 代表推送到特辑列表二级页面  sid为特辑列表id    data为特辑数据
            data=map.value;
            Actions.sofitellist({id:data.sid,datas:data.data});
        }else if(map.action=="message"){
            //message 代表推送到消息列表
            Actions.message();
        }else if(map.action=="messagebox"){
            //messagebox 代表推送到留言箱
            Actions.messagebox();
        }
        Config.IECEIVESOCKET=2;
    }

// 退出时 清除所有推送消息  JPushModule.clearAllNotifications();
    unInitPush=()=>{
        JPushModule.removeReceiveCustomMsgListener();
       JPushModule.removeReceiveNotificationListener();
    };

   render(){
        return(
            <Router
                createReducer={reducerCreate}
                getSceneStyle={getSceneStyle}
            >
                            <Scene key="root">
                                <Scene key="launch" hideNavBar component={Launch}  initial />
                                <Scene
                                    key="intro"
                                    hideNavBar={true}
                                    component={Intro}
                                    panHandlers={null}
                                    duration={1}
                                />
                                <Scene
                                    navigationBarStyle={[styles.navigationBarStyle]}
                                    titleStyle={[styles.titleStyle]}
                                    key="comment"
                                    component={Comment}
                                    duration={1}  hideNavBar={false}
                                    backButtonImage={require('./img/icon_yellowclose.png')}
                                    leftButtonIconStyle={{width:20,height:20}}
                                />
                                <Scene
                                    navigationBarStyle={[styles.navigationBarStyle]}
                                    titleStyle={[styles.titleStyle]}
                                    key="contribute"
                                    component={Contribute}
                                    title="投稿"
                                    panHandlers={null}
                                    duration={1}
                                    backButtonImage={require('./img/icon_yellowclose.png')}
                                    leftButtonIconStyle={{width:20,height:20}}
                                />
                                <Scene
                                    navigationBarStyle={[styles.navigationBarStyle]}
                                    titleStyle={[styles.titleStyle]}
                                    key="testa"
                                    hideNavBar={true}
                                    component={Testa}
                                    title="投稿"
                                    panHandlers={null}
                                    duration={1}
                                    backButtonImage={require('./img/icon_yellowclose.png')}
                                    leftButtonIconStyle={{width:20,height:20}}
                                />

                                <Scene
                                    navigationBarStyle={[styles.navigationBarStyle]}
                                    titleStyle={[styles.titleStyle]}
                                    key="login3"
                                    component={Login3}
                                    title="投稿"
                                    panHandlers={null}
                                    duration={1}
                                    backButtonImage={require('./img/icon_yellowclose.png')}
                                    leftButtonIconStyle={{width:20,height:20}}
                                />
                                <Scene
                                    navigationBarStyle={[styles.navigationBarStyle]}
                                    titleStyle={[styles.titleStyle]}
                                    key="law"
                                    hideNavBar={false}
                                    component={Law}
                                    title="法律权益"
                                    panHandlers={null}
                                    duration={1}
                                    backButtonImage={require('./img/icon_yellowclose.png')}
                                    leftButtonIconStyle={{width:20,height:20}}
                                />
                                <Scene
                                    titleStyle={[styles.titleStyle]}
                                    key="setting"
                                    title="设置"
                                    navigationBarStyle={[styles.navigationBarStyle]}
                                    leftButtonIconStyle={{width:20,height:20}}
                                    backButtonImage={require('./img/icon_yellowclose.png')}
                                    component={Setting}
                                    hideNavBar={false}
                                    panHandlers={null}
                                    duration={1}
                                />

                                <Scene
                                    navigationBarStyle={[styles.navigationBarStyle]}
                                    titleStyle={[styles.titleStyle]}
                                    key="contributelist"
                                    title="投稿列表"
                                    backButtonImage={require('./img/icon_yellowclose.png')}
                                    leftButtonIconStyle={{width:20,height:20}}
                                    component={ContributeList}
                                    hideNavBar={false}
                                    panHandlers={null}
                                    duration={1}
                                />
                                <Scene
                                    navigationBarStyle={[styles.navigationBarStyle]}
                                    titleStyle={[styles.titleStyle]}
                                    key="contributedetails"
                                    title="投稿详情页"
                                    backButtonImage={require('./img/icon_yellowclose.png')}
                                    leftButtonIconStyle={{width:20,height:20}}
                                    component={ContributeDetails}
                                    hideNavBar={false}
                                    panHandlers={null}
                                    duration={1}
                                />
                                <Scene
                                    titleStyle={[styles.titleStyle]}
                                    key="basescene"
                                    navigationBarStyle={[styles.navigationBarStyle]}
                                    backButtonImage={require('./img/icon_yellowclose.png')}
                                    leftButtonIconStyle={{width:20,height:20}}
                                    component={BaseScene}
                                    hideNavBar={false}
                                    panHandlers={null}
                                    duration={1}
                                />
                                <Scene
                                    titleStyle={[styles.titleStyle]}
                                    key="feedback"
                                    title="意见反馈"
                                    leftButtonIconStyle={{width:20,height:20}}
                                    navigationBarStyle={[styles.navigationBarStyle]}
                                    component={FeedBack}
                                    hideNavBar={false}
                                    panHandlers={null}
                                    backButtonImage={require('./img/icon_yellowclose.png')}

                                    duration={1}
                                />
                                <Scene
                                    titleStyle={[styles.titleStyle]}
                                    key="sofitellist"
                                    navigationBarStyle={[styles.navigationBarStyle]}
                                    backButtonImage={require('./img/icon_yellowclose.png')}
                                    leftButtonIconStyle={{width:20,height:20}}
                                    component={SofitelList}
                                    hideNavBar={true}
                                    panHandlers={null}
                                    duration={1}
                                />
                                <Scene
                                    key="videodetails"

                                    component={VideoDetails}
                                    hideNavBar={true}
                                    panHandlers={null}
                                    duration={1}
                                />

                                <Scene
                                    key="videodeta"
                                    //  backButtonImage={require('./img/icon_noviceclose.png')}
                                    component={VideoDeta}
                                    hideNavBar={true}
                                    panHandlers={null}
                                    duration={1}
                                />

                                <Scene
                                    titleStyle={[styles.titleStyle]}
                                    key="assortmentsearch"
                                    backButtonImage={require('./img/icon_yellowclose.png')}
                                    leftButtonIconStyle={{width:20,height:20}}
                                    navigationBarStyle={[styles.navigationBarStyle]}
                                    component={AssortmentSearch}
                                    hideNavBar={false}
                                    panHandlers={null}
                                    duration={1}
                                />
                                <Scene
                                    titleStyle={[styles.titleStyle]}
                                    key="assortmentone"
                                    backButtonImage={require('./img/icon_yellowclose.png')}
                                    leftButtonIconStyle={{width:20,height:20}}
                                    navigationBarStyle={[styles.navigationBarStyle]}
                                    component={AssortmentOne}
                                    hideNavBar={false}
                                    panHandlers={null}
                                    duration={1}
                                />
                                <Scene
                                    titleStyle={[styles.titleStyle]}
                                    key="searchvideo"
                                    backButtonImage={require('./img/icon_yellowclose.png')}
                                    leftButtonIconStyle={{width:20,height:20}}
                                    navigationBarStyle={[styles.navigationBarStyle]}
                                    component={SearchVideo}
                                    hideNavBar={true}
                                    panHandlers={null}
                                    duration={1}
                                />
                                <Scene
                                    titleStyle={[styles.titleStyle]}
                                    key="assortmenttwo"
                                    backButtonImage={require('./img/icon_yellowclose.png')}
                                    leftButtonIconStyle={{width:20,height:20}}
                                    navigationBarStyle={[styles.navigationBarStyle]}
                                    component={AssortmentTwo}
                                    hideNavBar={false}
                                    panHandlers={null}
                                    duration={1}
                                />
                                <Scene
                                    titleStyle={[styles.titleStyle]}
                                    key="assortmentthree"
                                    backButtonImage={require('./img/icon_yellowclose.png')}
                                    leftButtonIconStyle={{width:20,height:20}}
                                    navigationBarStyle={[styles.navigationBarStyle]}
                                    component={AssortmentThree}
                                    hideNavBar={false}
                                    panHandlers={null}
                                    duration={1}
                                />
                                <Scene
                                    titleStyle={[styles.titleStyle]}
                                    backButtonImage={require('./img/icon_yellowclose.png')}
                                    leftButtonIconStyle={{width:20,height:20}}
                                    navigationBarStyle={[styles.navigationBarStyle]}
                                    component={MainScene}
                                    hideNavBar={true}
                                    panHandlers={null}
                                    duration={1}
                                />
                                <Scene
                                    titleStyle={[styles.titleStyle]}
                                    key="message"
                                    backButtonImage={require('./img/icon_yellowclose.png')}
                                    leftButtonIconStyle={{width:20,height:20}}
                                    navigationBarStyle={[styles.navigationBarStyle]}
                                    component={Message}
                                    hideNavBar={false}
                                    panHandlers={null}
                                    duration={1}
                                />
                                <Scene
                                    titleStyle={[styles.titleStyle]}
                                    key="messagebox"
                                    backButtonImage={require('./img/icon_yellowclose.png')}
                                    leftButtonIconStyle={{width:20,height:20}}
                                    navigationBarStyle={[styles.navigationBarStyle]}
                                    component={MessageBox}
                                    title="留言箱"
                                    hideNavBar={false}
                                    panHandlers={null}
                                    duration={1}
                                />

                                <Scene
                                    titleStyle={[styles.titleStyle]}
                                    hideNavBar={false}
                                    key="accountinfo"
                                    backButtonImage={require('./img/icon_yellowclose.png')}
                                    leftButtonIconStyle={{width:20,height:20}}
                                    component={AccountInfo}
                                    navigationBarStyle={[styles.navigationBarStyle]}
                                    title="修改资料"
                                    onRight={()=>{
                                      Actions.refresh({save:true});
                                     }}
                                    rightTitle="保存" rightButtonTextStyle={{color:'#ffda2c'}}
                                    panHandlers={null}
                                    duration={1}
                                />
                                <Scene
                                    titleStyle={[styles.titleStyle]}
                                    key="getinfo"
                                    backButtonImage={require('./img/icon_yellowclose.png')}
                                    leftButtonIconStyle={{width:20,height:20}}
                                    navigationBarStyle={[styles.navigationBarStyle]}
                                    component={GetInfo}
                                    title="填写头像信息"
                                    panHandlers={null}
                                    duration={1}
                                />
                                <Scene
                                    titleStyle={[styles.titleStyle]}
                                    key="login2"
                                    backButtonImage={require('./img/icon_yellowclose.png')}
                                    leftButtonIconStyle={{width:20,height:20}}
                                    navigationBarStyle={[styles.navigationBarStyle]}
                                    component={Login2}
                                   // title="登录"
                                    hideNavBar={true}
                                    panHandlers={null}
                                    rightTitle=" "
                                    duration={1}
                                />
                                <Scene
                                    titleStyle={[styles.titleStyle]}
                                    key="tipall"
                                    backButtonImage={require('./img/icon_yellowclose.png')}
                                    leftButtonIconStyle={{width:20,height:20}}
                                    navigationBarStyle={[styles.navigationBarStyle]}
                                    component={TipAll}
                                    // title="登录"
                                    hideNavBar={false}
                                    panHandlers={null}
                                    duration={1}
                                />
                                <Scene
                                    titleStyle={[styles.titleStyle]}
                                    key="tipdetails"
                                    backButtonImage={require('./img/icon_yellowclose.png')}
                                    leftButtonIconStyle={{width:20,height:20}}
                                    navigationBarStyle={[styles.navigationBarStyle]}
                                    component={TipDetails}
                                    // title="登录"
                                    hideNavBar={true}
                                    panHandlers={null}
                                    duration={1}
                                />
                                {/*下部导航开始*/}
                                <Tabs
                                // type={ActionConst.REPLACE}
                                    key="tabbar"
                                    duration={0}
                                    tabBarPosition={"bottom"}
                                    tabBarStyle={{backgroundColor:'#fff'}}
                                   // tabBarComponent={NavigationComponent}
                                    hideNavBar

                                    showLabel={false}
                                    wrap={false}
                                    animationEnabled={false}
                                    tabs={true}

                                    swipeEnabled={false}
                                    lazy={true}
                                >
                                    <Scene
                                        key="homescene"
                                        component={HomeScene}
                                        icon_id={0}
                                        hideNavBar
                                        icon={TabIcon} />
                                    <Scene
                                        key="tipview"
                                        hideNavBar
                                        icon_id={1}
                                        icon={TabIcon}
                                        component={TipView}
                                    />
                                    <Scene
                                        key="searchmain"
                                        icon={TabIcon}
                                        icon_id={2}
                                        component={SearchMain}
                                        hideNavBar={true}
                                    />
                                    <Scene  key="comment"
                                            hideNavBar
                                            icon_id={3}
                                            icon={TabIcon}
                                            component={BaseScene}
                                    />
                                    <Scene  key="account"
                                            hideNavBar
                                            icon_id={4}
                                            icon={TabIcon}
                                            component={Account}
                                    />
                                    {/*<Scene  key="main"*/}
                                            {/*hideNavBar*/}
                                            {/*icon_id={3}*/}
                                            {/*icon={TabIcon}*/}
                                            {/*component={Main}*/}
                                    {/*/>*/}
                                </Tabs>
                                {/*下部导航结束*/}
                                <Scene
                                    titleStyle={[styles.titleStyle]}
                                    key="TabView"
                                    backButtonImage={require('./img/icon_yellowclose.png')}
                                    leftButtonIconStyle={{width:20,height:20}}
                                    navigationBarStyle={[styles.navigationBarStyle]}
                                    component={TabView}
                                    hideNavBar={true}
                                    panHandlers={null}
                                    duration={1}
                                />
                        <Scene
                            navigationBarStyle={[styles.navigationBarStyle]}
                            key="listscence"
                            hideNavBar
                            component={ListScence}
                            backButtonImage={require('./img/icon_yellowclose.png')}
                            leftButtonIconStyle={{width:20,height:20}}
                            title="ListScence"
                            panHandlers={null}
                            duration={1}
                        />
                        <Scene
                            navigationBarStyle={[styles.navigationBarStyle]}
                            key="main"
                            component={Main}
                            backButtonImage={require('./img/icon_yellowclose.png')}
                            leftButtonIconStyle={{width:20,height:20}}
                            hideNavBar={false}
                            panHandlers={null}
                            duration={1}
                        />
                        <Scene
                            titleStyle={[styles.titleStyle]}
                            backButtonImage={require('./img/icon_yellowclose.png')}
                            leftButtonIconStyle={{width:20,height:20}}
                            navigationBarStyle={[styles.navigationBarStyle]}
                            key="dietarycontribute"
                            hideNavBar={false}

                            component={DietaryContribute}
                            panHandlers={null}
                            duration={1}
                        />
                        <Scene
                            titleStyle={[styles.titleStyle]}
                            backButtonImage={require('./img/icon_yellowclose.png')}
                            leftButtonIconStyle={{width:20,height:20}}
                            navigationBarStyle={[styles.navigationBarStyle]}
                            key="contributebyuser"
                            hideNavBar={false}
                            component={ContributeByUser}
                            title="菜谱上传"
                            panHandlers={null}
                            onRight={()=>{
                                      Actions.refresh({save:true});
                                     }}
                            rightTitle="预览" rightButtonTextStyle={{color:'#C5B361'}}
                            duration={1}
                        />
                                <Scene
                                    titleStyle={[styles.titleStyle]}
                                    backButtonImage={require('./img/icon_yellowclose.png')}
                                    leftButtonIconStyle={{width:20,height:20}}
                                    navigationBarStyle={[styles.navigationBarStyle]}
                                    key="inputtitle"
                                    hideNavBar={false}
                                    component={InputTitle}
                                    title="食谱标题（必填）"
                                    panHandlers={null}
                                    duration={1}
                                />
                                <Scene
                                    titleStyle={[styles.titleStyle]}
                                    backButtonImage={require('./img/icon_yellowclose.png')}
                                    leftButtonIconStyle={{width:20,height:20}}
                                    navigationBarStyle={[styles.navigationBarStyle]}
                                    key="inputdesc"
                                    hideNavBar={false}
                                    component={InputDesc}
                                    title="食谱介绍（必填）"
                                    panHandlers={null}
                                    duration={1}
                                />
                                <Scene
                                    titleStyle={[styles.titleStyle]}
                                    backButtonImage={require('./img/icon_yellowclose.png')}
                                    leftButtonIconStyle={{width:20,height:20}}
                                    navigationBarStyle={[styles.navigationBarStyle]}
                                    key="inputtime"
                                    hideNavBar={false}
                                    component={InputTime}
                                    title="调理时间（必填）"
                                    panHandlers={null}
                                    duration={1}
                                />
                                <Scene
                                    titleStyle={[styles.titleStyle]}
                                    backButtonImage={require('./img/icon_yellowclose.png')}
                                    leftButtonIconStyle={{width:20,height:20}}
                                    navigationBarStyle={[styles.navigationBarStyle]}
                                    key="inputpoint"
                                    hideNavBar={false}
                                    component={InputPoint}
                                    title="关键点"
                                    panHandlers={null}
                                    duration={1}
                                />
                                <Scene
                                    titleStyle={[styles.titleStyle]}
                                    backButtonImage={require('./img/icon_yellowclose.png')}
                                    leftButtonIconStyle={{width:20,height:20}}
                                    navigationBarStyle={[styles.navigationBarStyle]}
                                    key="inputmaterials"
                                    hideNavBar={false}
                                    component={InputMaterials}
                                    title="材料（必填）"
                                    panHandlers={null}
                                    duration={1}
                                />
                                <Scene
                                    titleStyle={[styles.titleStyle]}
                                    backButtonImage={require('./img/icon_yellowclose.png')}
                                    leftButtonIconStyle={{width:20,height:20}}
                                    navigationBarStyle={[styles.navigationBarStyle]}
                                    key="deletemater"
                                    hideNavBar={false}
                                    component={DeleteMater}
                                    title="删除步骤"
                                    panHandlers={null}
                                    duration={1}
                                />
                                <Scene
                                    titleStyle={[styles.titleStyle]}
                                    backButtonImage={require('./img/icon_yellowclose.png')}
                                    leftButtonIconStyle={{width:20,height:20}}
                                    navigationBarStyle={[styles.navigationBarStyle]}
                                    key="inputstep"
                                    hideNavBar
                                    component={InputStep}
                                    panHandlers={null}
                                    duration={1}
                                />

                            </Scene>


            </Router>
        )
}
}




