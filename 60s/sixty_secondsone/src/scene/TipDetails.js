/**
 * Created by Administrator on 2018/1/2.
 */
/**
 * Created by Administrator on 2017/10/13.
 */
import React, { Component } from 'react';
import {
    ScrollView, StyleSheet, FlatList, View, Text, Dimensions, InteractionManager, Image, TouchableOpacity, Slider,
    Alert, DeviceEventEmitter, Platform,StatusBar,ART,LayoutAnimation,UIManager,Animated,
} from 'react-native';
import {Actions} from "react-native-router-flux";
import PLVideoView from "../widget/PLVideoView";
import Request from '../utils/Fetch';
import Config from '../utils/Config';
import Toast from '@remobile/react-native-toast'
import { Container, Header, Content, Button,Form,Item, Icon, List,Badge,Col,
    Thumbnail ,ListItem, Left,Body,Right,Switch ,Card, CardItem,Row,FooterTab,Footer} from 'native-base';

import NetWorkTool from "../utils/NetWorkTool";
import ShareUtile from '../utils/ShareUtil'
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,backgroundColor: '#efeff4',
    },
    texts :{
        color:'#595959',
        fontSize:14
    },
    textb :{
        color:'#555',
        fontSize:18
    },
    imagelogo:{
        width:25,height:25
    },order_num:{
        backgroundColor:"#f5c61e",
        width:17,
        height:17,
        top:2,
        right:width/8-15,
        position:'absolute',
        borderRadius:17,
        justifyContent:'center',
        alignItems:'center',
    }
});
const {Surface, Shape, Path} = ART;
const path = Path()
    .moveTo(0,1)
    .lineTo(width-20,1);

let videoarr=[];
let num=0;
export default class TipDetails extends Component {
    constructor(props) {
        super(props);
        this.state={
            data:[],
            isshow:true,
            value:0,
            isshownextvideo:true,
            movevalue:0,
            ismute:false,
            isplay:false,
            duration:0,
            vurl:this.props.data.videourl,
            imageurl:this.props.data.showimg,
            vimage:this.props.data.showimg,
            biaoti:this.props.data.biaoti,
            class:this.props.data.class,
            time:0,
            vid:this.props.data.vid,
            totalTime:null,
            isshowreplay:false,

        };

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true)
        }
        NetWorkTool.checkNetworkState((isConnected)=>{
            console.log(isConnected);
            if(!isConnected){
                Toast.show(NetWorkTool.NOT_NETWORK);
            }
        });
    }

    handleMethod=(isConnected)=>{
        NetWorkTool.getNetInfo((info)=>{
            if(info=="WIFE"){
                this.videos.start();
            }else if(info=="MOBILE"){
                this.videos.pause();
                Alert.alert(
                    '',
                    "已切换为手机流量，是否继续播放",
                    [
                        {text: '否', onPress: () => {
                            this.videos.pause();
                        }},
                        {text: '是', onPress: () => {
                            this.videos.start();
                        }},
                    ],
                    // { cancelable: false }
                );

            }
            console.log(info);
        });
        console.log('test', (isConnected ? 'online' : 'offline'));
    };

    componentWillMount () {
        NetWorkTool.addEventListener(NetWorkTool.TAG_NETWORK_CHANGE,this.handleMethod);

    }

    componentWillUnmount () {
        console.log("VideoDetails ====>componentWillUnmount")
        this.videos.relese();
        num=0
        //  this.onCompletion.remove();
        NetWorkTool.removeEventListener(NetWorkTool.TAG_NETWORK_CHANGE,this.handleMethod);
    }

    componentDidMount () {

        this._autoHide();
        this._getData();

    }

    componentWillUpdate() {
      //  LayoutAnimation.easeInEaseOut();
        LayoutAnimation.spring();
    }





    _getData=()=>{
        let parpam="thetype=1036&typex=3&imgwidth=800&imgheight=800&dataid="+this.state.vid+'&searchstr='+this.state.class;
        Request('1036',parpam)
            .then((responseJson) => {
                // this.setState({
                //     data:responseJson.data,
                // })
                console.log('ssssssssssssssssssssss',videoarr)
                videoarr=responseJson.data;
                this.setState({
                    biaoti:videoarr[num].biaoti,
                    imageurl:videoarr[num].showimg,
                });
                console.log('ssssssssssssssssssssss',videoarr)
            })
            .catch((error) => {
                Toast.show(error.toString());
            });
    };








    _replay=()=>{
        this.videos.setVideoPath(videoarr[num-1].videourl,videoarr[num-1].showimg);
        this._autoHide();
        this.setState({
            isshowreplay:false
        })
        if(Platform.OS=='ios'){
            this.setState({
                vurl:videoarr[num-1].videourl,
                vimage:videoarr[num-1].showimg
            })
        }
    };

    _onPressSeekTo=(value)=>{
        // let millSecond = this.state.totalTime*(value/60);
        //这个60 应该是 进度条的最大值  this.state.duration 实际视频的长度
        let newpoint=Math.floor(value/60*this.state.duration);
        console.log("_onPressSeekTo"+newpoint,this.state.totalTime,this.state.duration);
        this.setState({
            time:Math.floor(value/60*this.state.totalTime)
        });
        this.videos.seekTo(newpoint);
    };

    _timeToStr=(time)=> {
        var h = 0,
            m = 0,
            s = 0,
            _h = '00',
            _m = '00',
            _s = '00';
        h = Math.floor(time / 3600);
        time = Math.floor(time % 3600);
        m = Math.floor(time / 60);
        s = Math.floor(time % 60);
        _s = s < 10 ? '0' + s : s + '';
        _m = m < 10 ? '0' + m : m + '';
        _h = h < 10 ? '0' + h : h + '';
        return  _m + ":" + _s;
    };










    _isMute=()=>{
        this._autoHide();
         //执行静音  或者打开音量的操作
        if(this.state.ismute){
            this.setState({
                ismute:false
            });
            this.videos.unmute();
            //打开音量的操作
        }else{
            this.setState({
                ismute:true
            });
            //执行静音的操作
            this.videos.mute();
        }
    };

    _isPlay=()=>{
        this._autoHide();
         if(this.state.isplay){
             this.setState({
                 isplay:false
             });
             //执行暂停操作
             this.videos.pause();
         }else{
             this.setState({
                 isplay:true
             });
             //执行播放操作
             this.videos.start();
         }
    };

    _autoHide=()=>{
        this.timeouta&&clearTimeout(this.timeouta);
        this.timeouta=setTimeout(()=>{
           this.setState({
               isshow:false,
               movevalue:width/2,
           })
       },5000)
    };

    _nextPlay=()=>{
            console.log('numaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:',num,'videoarr:',videoarr.length-1)
        if(num==videoarr.length){
            this.setState({
                isshowreplay:true
            });
            return;
        }
        this.videos.setVideoPath(videoarr[num].videourl,videoarr[num].showimg);

        //⬇️点击下一个视频当前视频不刷新问题iOS
        if (Platform.OS === 'ios'){
            if (num < videoarr.length){
                this.setState({
                    vurl:videoarr[num].videourl,
                    vimage:videoarr[num].showimg,
                });
            }
        }
        //⬆️点击下一个视频当前视频不刷新问题iOS

        if(num<videoarr.length-1){
            this.setState({
                biaoti:videoarr[num+1].biaoti,
                isshow:false,
                movevalue:width/2,
                imageurl:videoarr[num+1].showimg,
            });
        }

        this._autoHide();
        num++;
        if(num==videoarr.length){
            this.setState({
                movevalue:width/2,
            });
            return;
        }
    };

    _isShowSetting=()=>{

        this._autoHide();
        this.setState({
            isshow:!this.state.isshow
        },()=>{
            if(num==videoarr.length){
                this.setState({
                    movevalue:width/2
                });
                return null;
            }else if(this.state.isshow){
                this.setState({
                    movevalue:0
                })
            }else if(!this.state.isshow){
                this.setState({
                    movevalue:width/2
                })
            }
        })
    }

    render() {

        return (
           <Container style={{backgroundColor:'#000'}}>
               <StatusBar backgroundColor="transparent"
                          barStyle="light-content"
                          translucent={true}
                          hidden={true}/>

                   <View  style={{backgroundColor:'#FFFFFF',width:width,marginTop:44+Config.STATUSBARHEIGHT,alignItems:'center'}}>
                       <PLVideoView
                           // ref={PLVideoView}
                           ref={(video)=>{this.videos = video}}
                           style={{width:width,height:width}}
                           source={
                            {
                                 url: this.state.vurl,
                                 looping:false,
                                 autoplay:false,
                                 coverurl:this.state.imgurl,
                                 bufferurl:this.state.imgurl,
                            }
                            }
                           onPrepared={(duration)=>{
                                this.setState({

                                    totalTime:Math.floor(duration/1000),
                                    isplay:true,
                                    duration:duration,
                                });
                             console.log("JS duration"+duration);
                            }}
                           onCompletion={()=>{
                             console.log("JS onCompletion");

                             this._nextPlay();

                             // this.videos.seekTo(0);
                            }}
                           onVideoError={(e)=>{
                             console.log("what="+e.what+" extra="+e.extra);
                            }}
                           onBufferUpdate={(buffer)=>{
                             //console.log("JS buffer = "+buffer);
                            }}
                           onProgress={(progress)=>{
                                this.setState({
                                    time:Math.floor(progress/1000),
                                    value:Math.floor(progress/this.state.totalTime/1000*60),
                                });
                            console.log("JS progress = "+progress+"::time::"+Math.floor(progress/1000));
                            }}
                       />
                   </View>
               <TouchableOpacity activeOpacity={1}
                                 style={{width:width,height:height,position:'absolute'}}
                                 onPress={()=>{this._isShowSetting()}}
               >
                   {this.state.isshow?(
                           <View style={{flex:1}}>
                               <View style={{width:width,height:44,marginTop:Config.STATUSBARHEIGHT,flexDirection:'row',alignItems:'center',paddingLeft:20,paddingRight:20}}>
                                   <TouchableOpacity style={{width:40,height:40,alignItems:'center',justifyContent:'center'}} activeOpacity={0.9} onPress={()=>Actions.pop()}>
                                   <Image style={{width:20,height:20}} source={require('../img/icon_tipclose.png')}/>
                                   </TouchableOpacity>
                                   <View style={{flex:1}}></View>
                                   <TouchableOpacity activeOpacity={0.9} onPress={()=>this._isMute()}>
                                       <Image style={{width:25,height:25}} source={this.state.ismute?require('../img/icon_tipmute.png'):require('../img/icon_tipunmute.png')}/>
                                   </TouchableOpacity>
                               </View>
                               <View style={{width:width,height:width,alignItems:'center',justifyContent:'center'}}>
                                   <TouchableOpacity
                                       activeOpacity={0.9}

                                       onPress={()=>this._isPlay()}>
                                       <Image style={{width:width/7,height:width/7}} source={this.state.isplay?require('../img/icon_tipplay.png'):require('../img/icon_tipstop.png')}/>
                                   </TouchableOpacity>
                               </View>
                               <View style={{flexDirection:'row',alignItems:'center',padding:20,position:'absolute',bottom:0}}>
                                   <Text style={{color:'#f5c61e'}}>{this._timeToStr(this.state.time)}</Text>
                                   <Slider
                                       style={{flex:1}}
                                       maximumValue={60}
                                       minimumValue={0}
                                       value={this.state.value}
                                       minimumTrackTintColor = {Platform.OS === 'ios' ? "#f3c720" : "#696969"}
                                       maximumTrackTintColor = {Platform.OS === 'ios' ? "#696969" : "#f3c720"}
                                       // minimumTrackTintColor = {"#696969"}
                                       // maximumTrackTintColor = {"#f3c720"}
                                       thumbTintColor="#f3c720"
                                       onSlidingComplete={(value)=>{
                                      let t=Math.floor(value);
                                      this.setState({
                                          value:t,
                                          isplay:true
                                      });
                                      this._onPressSeekTo(value)
                                       }}
                                   />
                                   <Text style={{color:'#f5c61e'}}>{this._timeToStr(this.state.totalTime)}</Text>
                               </View>
                           </View>
                       ):(
                           null
                       )}


               </TouchableOpacity>
               <TouchableOpacity activeOpacity={0.9} onPress={()=>{this._nextPlay()}}
                                 style={{position:'absolute',width:width/2,height:60,right:-this.state.movevalue,backgroundColor:'#1f1f1f',bottom:60,borderBottomLeftRadius:10,borderTopLeftRadius:10,flexDirection:'row'}}    >
                   <View style={{width:60,height:60,alignItems:'center',justifyContent:'center'}}>
                       <Image style={{width:50,height:50,borderRadius:10}} source={{uri:this.state.imageurl}}/>
                   </View>
                   <View style={{flex:1,justifyContent:'center'}}>
                       <Text style={{color:'#ccc',fontSize:12,marginLeft:10,marginBottom:3}}>下一个视频</Text>
                       <Text style={{color:'#fff',fontSize:14,marginLeft:10,marginTop:3}}>{this.state.biaoti}</Text>
                   </View>
               </TouchableOpacity>
               {this.state.isshowreplay?(
                       <TouchableOpacity onPress={()=> {this._replay()}} style={{width:width,height:width,position:'absolute',alignItems:'center',justifyContent:'center'}}>
                           <TouchableOpacity activeOpacity={1} onPress={()=> {this._replay()}}>
                               <Thumbnail square style={{width:60,height:60}} source={require('../img/icon_videodetailsloop.png')} />
                           </TouchableOpacity>
                       </TouchableOpacity>
                   ):(null)}
           </Container>
        );
    }
}
// {Platform.OS=='ios'?(null):(
//         <Header style={{marginTop:Platform.OS=='ios'?20:0}}  androidStatusBarColor={Config.StatusBarColor}>
//
//             <View style={{width:width,height:64,backgroundColor:'#fff',position:'absolute',top:0,flexDirection:'row'}}>
//
//                 <TouchableOpacity style={{flex:1,justifyContent:'center',marginLeft:20}} activeOpacity={0.9} onPress={()=>{Actions.pop()}}>
//                     <Image style={{width:21,height:21}} source={require('../img/icon_close.png')}/>
//                 </TouchableOpacity>
//
//
//
//                 <View style={{flex:4,justifyContent:'center'}} >
//                     <Text style={{fontSize:18,color:'#000',fontWeight:'normal',}}>{this.props.title}</Text>
//                 </View>
//
//                 <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems:'flex-end',marginRight:20}} activeOpacity={0.9} onPress={()=>{this._share()}}>
//                     <Image style={{width:19,height:19}} source={require('../img/icon_share.png')}/>
//                 </TouchableOpacity>
//
//             </View>
//         </Header>
//     )}