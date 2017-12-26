/**
 * Created by Administrator on 2017/11/20.
 */
import React, { Component } from 'react';
import { ListView ,FlatList,View,Dimensions,Image,InteractionManager,TouchableOpacity,DeviceEventEmitter,PanResponder} from 'react-native';
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
const {width, height} = Dimensions.get('window');
let _pageNo = 1;
const _pageSize = Config.pageCount;
const aa=["1"];
let dy=0;
let dx=0;
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
                setTimeout(()=>{
                    dx=dy
                },200);

                console.log("开始滑动",dx)

            },
            onPanResponderMove: (evt, gestureState) => {
                //console.log("最近一次的移动距离",gestureState.dy)
                // 最近一次的移动距离为gestureState.move{X,Y}
                //  console.log("最近一次的移动距离e",evt.nativeEvent)
                // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
            },
            onPanResponderEnd: (e, gestureState) => {
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

       // this.getRefresh = DeviceEventEmitter.addListener("getRefresh",this._onRefresh);
        InteractionManager.runAfterInteractions(() => {
            this. _onRefresh();

            this._getData(_pageNo);
        });
    }

    componentWillUnmount() {
        //this.getRefresh.remove();
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

    _onRefresh=()=> {

        this.setState({
            refreshing:true,
        });
       // _pageNo = 1;

        this._getMainVideo();

    };

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

        //     if(this.props.url==""||null||"undefined"){
        //         console.log("视频列表");
        //     parpam="thetype=1015&pagesize=10&page="+_pageNo+'&searchstr='+this.props.classify;
        // }else{
        //         console.log("留言列表");
        //         parpam=this.props.url;
        //     }
        Request(thetype,parpam)
            .then((responseJson) => {
                if(responseJson.data.pagemsg.sumpage=="1"){
                    this.setState({
                        isshowfooter:false,
                    })
                }

                let b=new Array();

                if(responseJson.data.pagemsg.sumpage=='undefined'){
                    console.log('pagemsgpagemsgpagemsgpagemsg')
                    return
                }

                if(this.props.item=="video"){

                    if(responseJson.data.pagemsg.allcount%2==0){

                        if(this.state.refreshing){
                            b=responseJson.data.list
                        }else{
                            b=this.state.datas.concat(responseJson.data.list);
                        }
                    }else{
                        if(responseJson.data.pagemsg.sumpage==responseJson.data.pagemsg.nowpage){

                            if(this.state.refreshing){
                                b=responseJson.data.list.concat(aa);

                            }else {

                                b=this.state.datas.concat(responseJson.data.list.concat(aa));
                            }
                        }else{

                            if(this.state.refreshing){
                                b=responseJson.data.list
                            }else{
                                b=this.state.datas.concat(responseJson.data.list);
                            }
                        }

                    }
                }else{
                    if(this.state.refreshing){
                        b=responseJson.data.list
                    }else{
                        b=this.state.datas.concat(responseJson.data.list);
                    }
                }


                this.setState({
                    datas:b,
                    refreshing:false,
                    isLoadingMore:false,
                    totalCount:responseJson.data.pagemsg.allcount,
                });
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

    _renderItem = ({item}) => {
        if(this.props.item=="comment"){
            console.log("commentcommentcommentcomment");
            return(
                <CommentItem key={item.id}
                             id={item.id}
                    // onPressItem={this._onPressItem}
                             title={item}
                />
            )
        }else if(this.props.item=="video"){
           // console.log("videovideovideovideovideo");
            return(
                <VideoItem key={item.id}
                           id={item.id}
                    // onPressItem={this._onPressItem}
                           title={item}
                />
            )
        }else if(this.props.item=="contribute"){
            return(
                <ContributeItem key={item.id}
                                id={this.props.nowid}
                    // onPressItem={this._onPressItem}
                                data={item} callBack={()=>this._onRefresh()}
                />
            )
        }else if(this.props.item=="message"){
            return(
                <MessageItem key={item.id}
                             id={item.nowid}
                    // onPressItem={this._onPressItem}
                             title={item}
                />
            )
        }else{
            console.log("elseelseelseelseelseelse");
            return(
                <VideoItem key={item.id}
                           id={item.id}
                    // onPressItem={this._onPressItem}
                           title={item}
                />
            )
        }

    };

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
    _onScrollEnd=(e)=>{
        dy=e.nativeEvent.contentOffset.y;
        console.log("dy:",dy,"dx:",dx);




        if(dy>=width){

            // Config.tabBarHight=dy-dx;
            // console.log("该执行导航栏沉浸式了该执行导航栏沉浸式了")
            DeviceEventEmitter.emit("zanting","隐藏header")


        }else if (0<dy<width){
            // Config.tabBarHight=dx-dy;
            // //  DeviceEventEmitter.emit("changeTab","隐藏tab")
            // // alert("该执行导航栏沉浸式了")
            DeviceEventEmitter.emit("startvideo","隐藏header")
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

    render() {
        return (
            <View

                style={{flex:1,backgroundColor:'#fafafa'}}>

                <FlatList
                    scrollEventThrottle={1}
                     onScroll={(e)=>this._onScrollEnd(e)}
                    ref={(FlatList)=>this.FlatList=FlatList}
                    // columnWrapperStyle={{width:width/2}}
                    numColumns={this.state.numcolumns}
                    showsVerticalScrollIndicator={false}
                    data={this.state.datas}
                    initialNumToRender={4}
                    //extraData={this.state}
                    keyExtractor={this.state.datas.id}
                    renderItem={this._renderItem}
                    ListHeaderComponent={this._header}
                    ListFooterComponent={this._renderFooter()}
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh}
                    onEndReachedThreshold={0.1}
                    onEndReached={(info) => {
                            this._toEnd()
                        } }
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
        this.startvideo= DeviceEventEmitter.addListener("startvideo",this.startVideo);
        this.mute= DeviceEventEmitter.addListener("mute",this._mute);
        console.log(this.props.num)
    };
    componentWillUnmount() {
        console.log('componentWillUnmountcomponentWillUnmountcomponentWillUnmounts视频废了',)
        this.zanting.remove();
        this.startvideo.remove();
        this.mute.remove();
        this.video.pause();
  }
    _onParse=()=>{
        console.log('zantingle暂停了：','this.video.pause();')
        this.video.pause();
    }


    render() {
        return (
            <View style={{flex:1,alignItems:'center'}}>

                <PLVideoView
                    // ref={PLVideoView}
                    ref={(video)=>{this.video = video}}
                    style={{width:width-25,height:width-25,marginBottom:10,}}
                    source={
                             {
                                 url:this.props.data.videourl,//this.props.data.videourl,
                                 looping:true,
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
                <TouchableOpacity onPress={()=>this._onPress()} activeOpacity={1}  style={{position:'absolute',width:width,height:width}}>

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