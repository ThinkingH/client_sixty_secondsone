/**
 * Created by Administrator on 2017/11/20.
 */
import React, { Component } from 'react';
import { ListView ,Platform,FlatList,View,Dimensions,Image,Easing,Animated,InteractionManager,TouchableOpacity,DeviceEventEmitter,PanResponder} from 'react-native';
import {Actions} from "react-native-router-flux";
import { Container, Header, Content, Button, Icon, List, Thumbnail ,ListItem, Text,Left,Body,Right,Switch ,Card, CardItem,} from 'native-base';
import PLVideoView from "../widget/PLVideoView";
import Request from '../utils/Fetch';
import Toast from '@remobile/react-native-toast'
import LoadMoreFooter from './LoadMoreFooter';
//import UMSocialUtils from "../utils/UMSocialUtils";
import ListVideoItem from '../components/ListVideoItem';
import Config from '../utils/Config';
import ContributeItem from '../components/ContributeItem'
import VideoItem from '../components/VideoItem';
import MessageItem from '../components/MessageItem';
import CommentItem from '../components/CommentItme';

import {LineDotsLoader,PulseLoader,DotsLoader,TextLoader,BubblesLoader,CirclesLoader,BreathingLoader,RippleLoader,LinesLoader,MusicBarLoader,EatBeanLoader
,DoubleCircleLoader,RotationCircleLoader,RotationHoleLoader,CirclesRotationScaleLoader,NineCubesLoader  ,ColorDotsLoader} from 'react-native-indicator';
import { UltimateListView, UltimateRefreshView } from 'react-native-ultimate-listview'
const {width, height} = Dimensions.get('window');
let _pageNo = 1;
const _pageSize = Config.pageCount;
const aa=["1"];
let dy=0;
let dx=0;
const scrollY = new Animated.Value(0);
const scrollY2 = new Animated.Value(0);
const AnimatedFlatList = Animated.createAnimatedComponent(UltimateListView);
export default class MainScene extends Component {
    constructor(props) {
        super(props);
        this.state={
            numcolumns:this.props.item=="video"?2:1,
            datas:[],
            refreshing: false,
            isLoadingMore:false,
            classify:this.props.classify,
            isshowfooter:true,
            mainvideo:[],
            hideTabBar: false,
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
        }
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            // 要求成为响应者：
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,

            onPanResponderGrant: (evt, gestureState) => {
                // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！

                // gestureState.{x,y} 现在会被设置为0
            },
            onPanResponderStart: (e, gestureState) => {
                // setTimeout(()=>{
                //  dx=dy
                // },100);

                console.log("开始滑动",dx)

            },
            onPanResponderMove: (evt, gestureState) => {
                //console.log("最近一次的移动距离",gestureState.dy)
                // 最近一次的移动距离为gestureState.move{X,Y}
                //  console.log("最近一次的移动距离e",evt.nativeEvent)
                // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
            },
            onPanResponderEnd: (e, gestureState) => {
                dx=dy
                console.log("滑动结束",dx)
                // console.log("移动结束后",gestureState)
                //  console.log("移动结束后e",e.nativeEvent.locationY)
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                //console.log("用户放开了所有的触摸点",evt.nativeEvent.locationY)
                // console.log("用户放开了所有的触摸点",gestureState)
                // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
                // 一般来说这意味着一个手势操作已经成功完成。
            },
            onPanResponderTerminate: (evt, gestureState) => {
               // console.log("另一个组件已经成为了新的响应者，所以当前手势将被取消。",gestureState)
                //return true;

            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
                // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
                // 默认返回true。目前暂时只支持android。
                return true;
            }
        });
    }

    componentDidMount() {

        this.getMainRefresh = DeviceEventEmitter.addListener("getMainRefresh",this._getDatamain);
        this.getMainvideoRefresh = DeviceEventEmitter.addListener("getMainvideoRefresh",this._getMainVideo);
        InteractionManager.runAfterInteractions(() => {
          //  this._onRefresh();
            this._getMainVideo();
           // this._getData(_pageNo);
        });
    }

    componentWillUnmount() {
        this.getMainRefresh.remove();
        this.getMainvideoRefresh.remove();
    }

    _getDatamain=()=>{
        console.log('s5s5s55s5s555555555555555555555555555555555555555')
        this.listView.refresh();

    }

    componentWillUpdate () {

    }

    _getMainVideo=()=>{
        let parpam="thetype=1028&imgwidth=800&imgheight=800";
        Request('1028',parpam)
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    mainvideo:responseJson.data,
                });
                this.setState({
                    refreshing:false,
                });
            })
            .catch((error) => {
                this.setState({
                    refreshing:false,
                });
                Toast.show(error.toString());
            });

    }


    _loadMoreData=()=> {

        this.setState({
            isLoadingMore:true,
        });
        _pageNo = _pageNo+1;
        this._getData(_pageNo);

    };



    _getData=(_pageNo)=>{
        console.log("this.props.url",this.props.url);
        let parpam=null;
        parpam=this.props.url+"&pagesize=10&page="+_pageNo;
        let thetype=this.props.thetype;
        Request(thetype,parpam)
            .then((responseJson) => {
                console.log("this.props.urlthis.props.urlthis.props.url",responseJson);

                let rowData =responseJson.data.list;

               
            })
            .catch((error) => {

                console.log(error.toString())
                // Toast.show(error.toString());
            });
    };

    _header = () => {
        if(this.props.header=="header"){
            return(<MyListHeader  data={this.state.mainvideo}/>);
        }else if (this.props.header=="sheader"){
            return( <SListHeader datas={this.props.sdata}/>);
        }
        else{
            return null;
        }
    };

    renderItem = (item, index, separator) => {
        if (this.props.item === 'video') {
            return (
                <VideoItem selected={item.coll} item={item} index={index} />
            )
        }
    }

    _toEnd=()=> {

        if (this.state.isLoadingMore || this.state.datas.length >= this.state.totalCount || this.state.refreshing) {
            return;
        }
        InteractionManager.runAfterInteractions(() => {
            this._loadMoreData();
        });
    };

    _renderFooter=()=> {
        if(this.state.isshowfooter){
            //通过当前product数量和刷新状态（是否正在下拉刷新）来判断footer的显示
            if (this.state.datas.length < 1 || this.state.isRefreshing) {
                return null
            }
            if (this.state.datas.length < this.state.totalCount) {
                //还有更多，默认显示‘正在加载更多...’
                return <LoadMoreFooter />
            }else{
                // 加载全部
                return <LoadMoreFooter isLoadAll={true}/>
            }
        }else{
            return null;
        }

    };


    _onScrollEnd(e){
        dy=e.nativeEvent.contentOffset.y;
        // 回调
        if (this.props.onScroll) {
            this.props.onScroll(e)
        }
  //       dy=e.nativeEvent.contentOffset.y;
  //       console.log("dy:",dy,"dx:",dx);
  //       console.log('this.FlatListthis.FlatListthis.FlatListthis.FlatList',this.listView);
  //          if(dy-dx>10){
  //              DeviceEventEmitter.emit("changeHeaderu","隐藏")
  //          }else if(dx-dy>10){
  //              DeviceEventEmitter.emit("changeHeaderd","显示")
  //          }
  // setTimeout(()=>{
  //     dx=dy;
  //     console.log("dy111:",dy,"dx11111:",dx);
  // },1000)
         /*if(dy>dx) {
             if (dx - dy > -60) {
                 Config.tabBarHight = dx - dy;
             } else {
                 Config.tabBarHight = -60
             }
         }*/
       // Config.tabBarHight=dy;
        //DeviceEventEmitter.emit("changeHeaderu","暂停视频")
        //
        //
        //     // console.log("该执行导航栏沉浸式了该执行导航栏沉浸式了")
        //     DeviceEventEmitter.emit("changeHeaderu","暂停视频")
        //
        //
        // }
        //
        // if(dx>dy){
        //     if(dy-dx>-60){
        //         Config.tabBarHight=-60;
        //     }else{
        //         Config.tabBarHight=dy-dx
        //     }
        //
        //     // console.log("该执行导航栏沉浸式了该执行导航栏沉浸式了")
        //     DeviceEventEmitter.emit("changeHeaderd","暂停视频")
        //
        //
        // }

        if(dy>=width){
            // Config.tabBarHight=dy-dx;
            // console.log("该执行导航栏沉浸式了该执行导航栏沉浸式了")
            DeviceEventEmitter.emit("zanting","暂停视频")
        }else if (0<dy<width){
            // Config.tabBarHight=dx-dy;
            // //  DeviceEventEmitter.emit("changeTab","隐藏tab")
            // // alert("该执行导航栏沉浸式了")
            DeviceEventEmitter.emit("startvideo","开始播放视频")
            //console.log("该执行tab沉浸式了该执行tab沉浸式了")
            // alert("该执行tab沉浸式了")
            //  Config.tabBarHight=-56;
        }else{
            console.log(e.nativeEvent.contentOffset.y)
        }
        // console.log("e.nativeEvent.contentOffset",e.nativeEvent.contentOffset)
        // console.log("e.nativeEventt",e.nativeEvent)

    }

    _onScrollEnda=(e)=>{
        dy=e.nativeEvent.contentOffset.y;
        console.log("dy:",dy,"dx:",dx)
        if(dy-dx>5){

            Config.tabBarHight=dy-dx;
            console.log("该执行导航栏沉浸式了该执行导航栏沉浸式了")
            DeviceEventEmitter.emit("changeHeaderu","隐藏header")

        }else if (dx-dy>5){
            Config.tabBarHight=dx-dy;
            //  DeviceEventEmitter.emit("changeTab","隐藏tab")
            // alert("该执行导航栏沉浸式了")
            DeviceEventEmitter.emit("changeHeaderd","隐藏header")
            console.log("该执行tab沉浸式了该执行tab沉浸式了")
            // alert("该执行tab沉浸式了")
            //  Config.tabBarHight=-56;
        }else{
            console.log(e.nativeEvent.contentOffset.y)
        }
        // console.log("e.nativeEvent.contentOffset",e.nativeEvent.contentOffset)
        // console.log("e.nativeEventt",e.nativeEvent)

    }

    _renderPaginationFetchingView=()=> {
       return(
           <View style={{width:width, justifyContent: 'center', alignItems: 'center', height: 90,backgroundColor:'#f8f8f8'}}>
               <Text style={{color:'#666',fontSize:18}}>6 0 S e c
               </Text>
               {this._renderLoading()}
               {/*<Image ref={(c) => {this.txtPulling = c;}} source={require('../../src/img/icon_account_warn.png')} style={[styles.hide,{width:40,height:40}]}></Image>*/}
               {/*<Image ref={(c) => {this.txtPullok = c;}} source={require('../../src/img/icon_header.png')} style={[styles.hide,{width:40,height:40}]}></Image>*/}
               {/*<Image ref={(c) => {this.txtPullrelease = c;}} source={require('../../src/img/icon_search_result.png')} style={[styles.hide,{width:40,height:40}]}></Image>*/}
           </View>
       )
    }

    _renderLoading=()=>{
            return(
                <LineDotsLoader color={'#F5C61E'} />
            )
    }
        onFetch = async(_pageNo, startFetch, abortFetch) => {
            this._getMainVideo();
                let parpam=null;
                parpam=this.props.url+"&pagesize=10&page="+_pageNo;
            console.log("_pageNo_pageNo_pageNo_pageNo_pageNo_pageNo_pageNo",_pageNo);
                let thetype=this.props.thetype;
                Request(thetype,parpam)
                    .then((responseJson) => {
                        console.log("this.props.urlthis.props.urlthis.props.url",responseJson);
                        let rowData =responseJson.data.list;
                            startFetch(rowData, 6)
                    })
                    .catch((error) => {
                        abortFetch()
                        console.log(error.toString())
                        // Toast.show(error.toString());
                    });
        };

    _renderPagination=()=>{
        return(
            <View style={{width:width,height:50,alignItems:'center',justifyContent:'center'}}>
                <Text>正在加载中...</Text>
            </View>
        )
    }

    renderEmptyView=()=>{
        return(
            <View style={{width:width,height:height/2,alignItems:'center',justifyContent:'flex-end',backgroundColor:'#fff'}}>
                <Thumbnail square style={{width:width/2,height:width/2}} source={require('../img/icon_replaceimg.png')} />
            </View>
        )
    }

    _renderPagin=()=>{
        return(
            <View style={{width:width,height:50,alignItems:'center',justifyContent:'center'}}>

            </View>
        )
    }
    render() {
        let Y=this.state.scrollY
        return (
            <View
               // {...this._panResponder.panHandlers}
                style={{flex:1,backgroundColor:'#fff',alignItems:'center'}}>
                <AnimatedFlatList
                    scrollEventThrottle={1}

                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: Y } } }],
                        { listener: this._onScrollEnd.bind(this) }
                        //{ useNativeDriver: true }
                    )}
                    // columnWrapperStyle={{width:width/2}}
                    showsVerticalScrollIndicator={false}
                    //data={this.state.datas}
                    initialNumToRender={4}
                    extraData={this.state}
                   // keyExtractor={this.state.datas.id}
                   // renderItem={this._renderItem}
                   // ListHeaderComponent={this._header}
                    //ListFooterComponent={this._renderFooter()}
                    // refreshing={this.state.refreshing}
                    // onRefresh={this._onRefresh}
                   // onEndReachedThreshold={50}
                   // onEndReached={(info) => {
                   //         this._toEnd()
                    //    } }
                    paginationBtnText={'正在载入1'}
                    waitingSpinnerText={'正在载入2'}
                    ref={ref => this.listView = ref}
                    key={this.state.layout} // this is important to distinguish different FlatList, default is numColumns
                    onFetch={this.onFetch}
                    keyExtractor={(item, index) => `${index} - ${item}`} // this is required when you are using FlatList
                    refreshableMode="advanced" // basic or advanced
                    item={this.renderItem} // this takes three params (item, index, separator)
                    numColumns={2} // to use grid layout, simply set gridColumn > 1
                   // customRefreshView={this._renderPaginationFetchingView()}
                    customRefreshView={()=>this._renderPaginationFetchingView()}
                    // ----Extra Config----
                   // pagination={true}
                    autoPagination={true}
                    header={this._header}
                    paginationFetchingView={this._renderPagination}
                    // sectionHeaderView={this.renderSectionHeaderView}   //not supported on FlatList
                     //paginationFetchingView={this._renderPaginationFetchingView}
                     paginationAllLoadedView={this._renderPagin}
                     paginationWaitingView={this._renderPagination}
                     emptyView={this.renderEmptyView}
                    // separator={this.renderSeparatorView}
                    // new props on v3.2.0
                   // arrowImageStyle={{ width: 20, height: 20, resizeMode: 'contain' }}
                    dateStyle={{ color: 'lightgray' }}
                    refreshViewStyle={Platform.OS === 'ios' ? { height: 90, top: -90 } : { height: 90 }}
                    refreshViewHeight={90}
                />
            </View>
        );
    }
}

class MyListHeader extends React.PureComponent {
    constructor(props){
        super(props);
        //this.video=null;
    }
    _onPress = () => {
        this.video.pause();
        Actions.videodetails({title:this.props.data.biaoti,nowid:this.props.data.vid})
    };

    startVideo=()=>{
        console.log('开始了：','this.video.start();')
        this.video.start();
    }
    _mute=()=>{
        console.log('静音了：','this.video.unmute();')
        this.video.mute();
    }
    // componentWillUnmount() {
    //     // this.video.visible=false;
    //     console.log("是不是让视频暂停了？？？？？")
    //     this.video.pause();
    // }
    componentDidMount(){
        this.zanting= DeviceEventEmitter.addListener("zanting",this._onParse);
       // this.replay= DeviceEventEmitter.addListener("replay",this._onParse);
        this.startvideo= DeviceEventEmitter.addListener("startvideo",this.startVideo);
        this.mute= DeviceEventEmitter.addListener("mute",this._mute);
        console.log(this.props.num)

    };
    componentWillUnmount() {
        console.log('componentWillUnmountcomponentWillUnmountcomponentWillUnmounts视频废了',)
        this.zanting.remove();
        this.startvideo.remove();
        this.mute.remove();
        //this.video.pause();
      //  this.replay.remove();
  }
    _onParse=()=>{
        console.log('销毁首页视频：','this.video.relese();')
        this.video.pause();
    }
    _replay=()=>{
        console.log('重播首页视频：','this.video._replay();')
        //this.video.setVideoPath(this.props.data.videourl,this.props.data.showimg);
        // this.setState({
        //     isshowloop:false,
        //     isplay:true,
        //     value:0
        // });
        // this.videos.start();
    };

    render() {
        return (
            <View  style={{width:width,alignItems:'center'}}>
                <PLVideoView
                    // ref={PLVideoView}
                    ref={(video)=>{this.video = video}}
                    style={{width:width-30,height:width-30,}}
                    source={
                             {
                                 url:this.props.data.videourl,//this.props.data.videourl,
                                 looping:false,
                                 headers: {
                                     'refer': 'myRefer'
                                 },
                                 autoplay:true,
                                 coverurl:this.props.data.showimg
                             }
                         }
                    onPrepared={(e)=>{
                        this.video.mute();
                            // console.log("JS"+e.duration);
                         }}
                    onCompletion={()=>{
                             DeviceEventEmitter.emit('getMainvideoRefresh','刷新首页视频')
                             console.log("JS onCompletion");
                         }}
                    onVideoError={(e)=>{
                             console.log("what="+e.what+" extra="+e.extra);
                         }}
                    onBufferUpdate={(buffer)=>{
                             console.log("JS buffer = "+buffer);
                         }}
                    onProgress={(progress)=>{
                             //console.log("JS progress = "+progress);
                         }}/>
                <TouchableOpacity onPress={()=>this._onPress()} activeOpacity={1}  style={{position:'absolute',width:width,height:width,alignItems:'center'}}>
                    <Image   style={{width:width-30,height:width-30}} source={require('../img/icon_bgbgbg.png')} />

                </TouchableOpacity>
            </View>
        )
    }
}

class SListHeader extends React.PureComponent {
    render() {
        return (
            <View style={{elevation:10 ,backgroundColor:'#fff'}}  >
                <Image source={{uri:this.props.datas.showimg}} style={{height: width/16*9, width: width}}/>
                <View  style={{padding:15}}>
                    <Text note>{this.props.datas.create_date}</Text>
                    <Text style={{marginTop:10}}>{this.props.datas.name}</Text>
                    <Text note style={{marginTop:10}}>{this.props.datas.content}</Text>
                </View>
                <View style={{width:width,height:1,backgroundColor:'#ccc'}}></View>
            </View>
        )
    }
}