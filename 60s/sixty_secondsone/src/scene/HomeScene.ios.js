import React from 'react';
import {Actions} from "react-native-router-flux";
import BaseScene from "./BaseScene";
import ListScene from "./ListScene";
import Sofitel from './Sofitel';
import MainScene from './MainScene'
import Request from '../utils/Fetch';
import Toast from '@remobile/react-native-toast'
import { Container, Header, Title, Content,Thumbnail, Footer, FooterTab, Button, Left, Right, Body, Icon, Text ,Tab, Tabs,ScrollableTab,Item, Input,Row  } from 'native-base';
import {
    StyleSheet, Image, Dimensions, View, Alert, ScrollView, DeviceEventEmitter, TouchableOpacity,
    TouchableNativeFeedback, Animated, StatusBar, Platform,Easing,ImageBackground
} from "react-native";
import Config from "../utils/Config";
import Storage  from '../utils/Storage';
import TabBar from '../components/TabBar';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import NetWorkTool from "../utils/NetWorkTool";

const {width, height} = Dimensions.get('window');
let imgurla=[];
let imgurl=[];
let img=[require('../../src/img/icon_message.png'),require('../../src/img/icon_qq.png'),
    require('../../src/img/icon_videodetails_collect_s.png'),require('../../src/img/icon_videodetails_comment_s.png'),
    require('../../src/img/icon_wb.png'),require('../../src/img/icon_message.png'),
    require('../../src/img/icon_message.png'),require('../../src/img/icon_wx.png'),]
let wordarr=[];
let keywordarr=[];
let aaa=['dvdf','dvdf','dvdf','dvdf','dvdf','dvdf','dvdf','dvdf'];
let inf='';
const scrollY = new Animated.Value(0);
const scrollY2 = new Animated.Value(0);
const AnimatedListComponent = Animated.createAnimatedComponent(MainScene);
const AnimatedListMain = Animated.createAnimatedComponent(Sofitel);
const AnimatedListLS = Animated.createAnimatedComponent(ListScene);
class HomeScene extends BaseScene {
    constructor(props) {
        super(props);

        this.state={
            //  numpage:this.props.num?this.props.num:0
             data:[],

            numpage:this.props.num?this.props.num:0,
            // data:[],
            lock:true,
            imgurlarr:imgurl,
            isshowstopll:false,//是否显示流量播放视频的提示
            isshowtab:true,
            tabheight:0,
            scrollY,
            scrollY2, // 加这个是为了让每个List持有自己的偏移量
            translateY: Animated.diffClamp(
                Animated.add(
                    scrollY.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                        extrapolateLeft: 'clamp',
                    }),
                    scrollY2,
                ),
                0,
                1,
            ),
            timingTranslateY: new Animated.Value(0),

        }
        NetWorkTool.getNetInfo((info)=>{
            Config.ISPLAYLL=info.type;
            if(info.type=='cellular'){
                this.setState({
                    isshowstopll:true
                })
            }
            inf=info
        });
    }

    handleMethodios=(isConnected)=>{
        NetWorkTool.getNetInfo((info)=>{

            Config.ISPLAYLL=info.type;
            if(info.type=="wifi"){
                DeviceEventEmitter.emit('getMainvideoRefresh')
            }else if(info.type=="cellular"){

                this.setState({
                    isshowstopll:true
                })
            }

        });
        console.log('test', (isConnected ? 'online' : 'offline'));
    }

    componentDidMount(){

        this.changeHeaderd= DeviceEventEmitter.addListener("changeHeaderd",this._changeHeaderd);
        this.changeHeaderu= DeviceEventEmitter.addListener("changeHeaderu",this._changeHeaderu);
        console.log(this.props.num);
        this._getDataa();
        if(Platform.OS==='ios'){
            NetWorkTool.addEventListener(NetWorkTool.TAG_NETWORK_CHANGE,this.handleMethodios);
        }else{
            NetWorkTool.addEventListener(NetWorkTool.TAG_NETWORK_CHANGE,this.handleMethod);
        }

        const toValue = this.state.translateY.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -width/1.28/850*130/3-70],
            extrapolateLeft: 'clamp',
        })
        console.log(toValue)
        Animated.timing(this.state.timingTranslateY, {
            toValue: toValue,
            duration: 25,
            easing: Easing.linear,
            // useNativeDriver: true
        }).start();
    };


    componentWillUnmount() {
        this.changeHeaderu.remove();
        this.changeHeaderd.remove();
    }

    _deleteAll=()=>{
        let parpam="thetype=1032&typec=2";
        Request('1032',parpam)
            .then((responseJson) => {
                Toast.show(responseJson.msg);
                this._goT();
            })
            .catch((error) => {
                Toast.show(error.toString());
            });
    };


    _getDataa=()=>{
        let parpam="thetype=1040&imgwidth=100&imgheight=100";
        Request('1040',parpam)
            .then((responseJson) => {
                console.log('aaaaaaaaaaaaaaaaaaaaaaaaaa',responseJson)
                for(let i=0;i<responseJson.data.length;i++){
                    imgurla.push(responseJson.data[i].showimg);
                    wordarr.push(responseJson.data[i].word);
                    keywordarr.push(responseJson.data[i].keyword);
                }
                // for(let i=0;i<responseJson.data.length;i++){
                //     wordarr.push(responseJson.data[i].word);
                // }
                // for(let i=0;i<responseJson.data.length;i++){
                //     keywordarr.push(responseJson.data[i].keyword);
                // }
                console.log('aaaaaaaaaa',imgurla);
                this.setState({
                    data:responseJson.data,
                    imgurlarr:imgurla,
                    isshowtab:true
                });
            })
            .catch((error) => {
                Toast.show(error.toString());
            });
    };

    _onChangeTab=(index)=>{
        if(index.i==0){
            DeviceEventEmitter.emit("startvideo","播放视频")
        }else{
            DeviceEventEmitter.emit("zanting","暂停视频")
        }
    }

    _goT=()=>{

        Storage.saveWithKeyValue("timevalue",'');
        Storage.saveWithKeyValue("titlevalue",'');
        Storage.saveWithKeyValue("matervalue",'');
        Storage.saveWithKeyValue("payvalue",'');
        Storage.saveWithKeyValue("valuedesc",'');
        Storage.saveWithKeyValue("steps",'');
        Storage.saveWithKeyValue("several",'');
        Storage.saveWithKeyValue("valuepoint",'');
        Actions.contributebyuser();
    }
    _goContribute=()=>{
        Alert.alert(
            '',
            "您想继续编写吗",
            [
                {text: '清空',
                    onPress: () => {
                        this._deleteAll();

                    }},
                {text: '继续',
                    onPress: () => {

                        Actions.contributebyuser();
                    }},
                {text: '取消',
                    onPress: () => {

                    }},
            ]
        );
    }

    renderTabBar=()=>{
        return(
            <TabBar ref={(tabbar)=>this.tabbar=tabbar} // tabStyle={{paddingLeft:0,paddingRight:0}}
                    imgurl={this.state.imgurlarr} //网络图
                    imgurla={img}       //本地图
                    imageStyle={{width:25,height:25}}
                    textva={aaa}
                    activeTextColor={"#f5c61e"}
                    backgroundColor={"#FFFFFF"}
                    textStyle={{fontSize:12,fontWeight:'normal',marginTop:7}}
                    inactiveTextColor={"#313131"}
                    underlineStyle={{backgroundColor:"#f5c61e",height:2}}
            />
        )
    };

    _onScroll(info) {
        //console.log(info.nativeEvent.contentOffset.y)
    }

    _goOnPlay=()=>{
        Config.ISSHOWL=2
        this.setState({isshowstopll:false});
        DeviceEventEmitter.emit('getMainvideoRefresh')
    }

    _stopPlay=(info)=>{

        if(info==='cellular'){
            this.setState({isshowstopll:true});
        }


    }


    render(){
        let scrollY = this.state.scrollY
        const translateY = this.state.timingTranslateY
        const content = this.state.data.length > 0 ?(<ScrollableTabView ref={(ScrollableTabView)=>this.ScrollableTabView=ScrollableTabView}
                                                                        initialPage={0}
                                                                        onChangeTab={(obj) => {this._onChangeTab(obj)}}
                                                                        scrollWithoutAnimation={true}
                                                                        style={{marginTop:17}}
                                                                        renderTabBar={() =>this.renderTabBar()}>
            {this.state.data.map((item,i)=>{
                if(i==0){
                    return(
                        <AnimatedListComponent load={this.props.load}  header={"header"} key={i}
                                               isShowLL={this._stopPlay}
                                               onScroll={Animated.event(
                                                   [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                                                   { listener: this._onScroll.bind(this) },
                                               )}     url={"thetype=1034&searchstr="+item.keyword} tabLabel={item.word}   thetype="1034" item={"video"} />
                           )
                }else if(i==1){
                    return(
                        <AnimatedListMain key={i}  onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                            { listener: this._onScroll.bind(this) },
                            // { useNativeDriver: true },
                        )} tabLabel={item.word}  />
                    )
                }else if(i>1&&i<this.state.data.length){
                    return(
                        <AnimatedListLS load={this.props.load}
                                   key={i}
                                   onScroll={Animated.event(
                                       [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                                       { listener: this._onScroll.bind(this) },
                                       // { useNativeDriver: true },
                                   )}
                                   url={"thetype=1034&classify2="+item.keyword}
                                   tabLabel={item.word}
                                   thetype="1034" item={"video"}
                                   />
                    )
                }
            })}
        </ScrollableTabView>) : <View/>;

        return (
            <Container style={{marginBottom:-84}}>
                <StatusBar backgroundColor="transparent"
                           barStyle="light-content"
                           translucent={false}
                           hidden={false}/>
                    <Animated.View ref="header" style={{height:80,marginTop:20,backgroundColor:'#fff',alignItems:'center',transform: [{ translateY}]}}>
                        <ImageBackground   style={{position:'absolute',top:0,width:width,height:50,flexDirection:'row'}} source={require('../img/icon_homebg.png')}>
                            <View style={{width:width,height:50,position:'absolute',alignItems:'center',justifyContent:'center',backgroundColor:'transparent'}}>
                                <Text style={{color:'#fff',fontSize:18,backgroundColor:'transparent',marginBottom:width/1.28/850*130/6}}>60Sec</Text>
                            </View>
                        </ImageBackground>
                        <TouchableOpacity style={{position:'absolute',top:width/472*65-width/1.28/850*130/3}} activeOpacity={1}
                                          onPress={()=>Actions.TabView()}>
                            <Image  style={{width:width/1.28,height:width/1.28/850*130}} source={require('../img/newicon_seachbar.png')} />
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View style={{flex:1,marginBottom:0,transform: [{ translateY}]}}>
                    {content}
                    </Animated.View>
                {this.state.isshowstopll?(
                    <View style={{position:'absolute',width:width,height:height,alignItems:'center',justifyContent:'center',backgroundColor:'rgba(0,0,0,0.5)'}}>
                        <View style={{width:width/1.3,height:200,backgroundColor:'#fff'}}>
                            <View style={{flex:2.5,padding:20,alignItems:'center',justifyContent:'center'}}>
                                <Text style={{lineHeight:30,}}>当前为非WIFI环境，是否用</Text>
                                <Text style={{lineHeight:30,}}>流量观看视频?</Text>
                            </View>
                            <View style={{flex:1,flexDirection:'row'}}>
                                <TouchableOpacity activeOpacity={1}
                                                  style={{flex:1,alignItems:'center',justifyContent:'center'}}
                                                  onPress={()=>{this.setState({isshowstopll:false})}}
                                >
                                    <Text>暂停播放</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={1}
                                                  style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'#f5c61e'}}
                                                  onPress={()=>{this._goOnPlay()}}
                                >
                                    <Text>继续观看</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ):(
                    null
                )}
                <View style={{width:width,height:Config.STATUSBARHEIGHT,position:'absolute',top:0,backgroundColor:Config.StatusBarColor}} />
            </Container>
        )
        // return (
        //     <Container>
        //         <StatusBar backgroundColor="transparent"
        //                    barStyle="light-content"
        //                    translucent={true}
        //                    hidden={false}/>
        //         <View style={{width:width,height:Config.STATUSBARHEIGHT,backgroundColor:Config.StatusBarColor}}>
        //
        //         </View>
        //
        //         {/*<Image style={{width:125,height:125}} source={require('../img/icon_loading.gif')} />*/}
        //
        //         <View  style={{flex:1,backgroundColor:'#fff',marginTop:Config.SCROLLY}} >
        //             <View  //androidStatusBarColor='#f00'
        //                 style={{height:80,backgroundColor:'#fff',alignItems:'center'
        //                 }}>
        //                 <ImageBackground   style={{position:'absolute',top:0,width:width,height:50,flexDirection:'row'}} source={require('../img/icon_homebg.png')} >
        //
        //                     <TouchableOpacity style={{position:'absolute',top:12.5,right:12.5}} activeOpacity={1}
        //                                       onPress={()=>Actions.TabView()}>
        //                         <Thumbnail square={true} style={{width:25,height:25}} source={require('../img/icon_header.png')} />
        //                     </TouchableOpacity>
        //                     <View style={{width:width,height:50,position:'absolute',alignItems:'center',justifyContent:'center',backgroundColor:'transparent'}}>
        //                         <Text style={{color:'#fff',backgroundColor:'transparent'}}>60sec</Text>
        //                     </View>
        //                 </ImageBackground>
        //                 <TouchableOpacity style={{position:'absolute',top:width/472*65-width/1.28/850*130/3}} activeOpacity={1}
        //                                   onPress={()=>Actions.TabView()}>
        //                     <Image  style={{width:width/1.28,height:width/1.28/850*130}} source={require('../img/newicon_seachbar.png')} />
        //                 </TouchableOpacity>
        //             </View>
        //
        //             {this.state.isshowtab?(
        //                 <ScrollableTabView ref={(ScrollableTabView)=>this.ScrollableTabView=ScrollableTabView}
        //                                                       initialPage={this.state.numpage}
        //                                                       onChangeTab={(obj) => {this._onChangeTab(obj)}}
        //                                                       scrollWithoutAnimation={true}
        //                                                       style={{flex:1,width:width,marginTop:10}}
        //                                                       renderTabBar={() =>this.renderTabBar()}>
        //                 {this.state.data.map((item,i)=>{
        //                     if(i==0){
        //                         return(
        //                             <MainScene load={this.props.load}  header={"header"} key={i}  url={"thetype=1034&searchstr="+item.keyword} tabLabel={item.word}   thetype="1034" item={"video"} />
        //                         )
        //                     }else if(i==1){
        //                         return(
        //                             <Sofitel key={i}  tabLabel={item.word}  />
        //                         )
        //                     }else if(i>1&&i<this.state.data.length){
        //                         return(
        //                             <ListScene load={this.props.load} key={i}  url={"thetype=1034&classify2="+item.keyword} tabLabel={item.word}   thetype="1034" item={"video"} />
        //                         )
        //                     }
        //
        //                 })}
        //                 </ScrollableTabView>
        //             ):(
        //                 <View style={{flex:1,}}>
        //                     {/*{this._renderTab()}*/}
        //                     <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'rgba(0,0,0,0.2)'}}>
        //                         <ActivityIndicator size = 'small' />
        //                     </View>
        //                 </View>
        //             )}
        //
        //
        //
        //
        //         </View>
        //
        //     </Container>
        // );
    }
}

module.exports = HomeScene;
