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
let dy=4;
let dx=0;
let isshowsearch=true;
export default class ListScene extends Component {
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
            isshowsearch:true,
        }
    }

    componentWillMount() {
        // this._panResponder = PanResponder.create({
        //     // 要求成为响应者：
        //     onStartShouldSetPanResponder: (evt, gestureState) => true,
        //     onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        //     onMoveShouldSetPanResponder: (evt, gestureState) => true,
        //     onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
        //
        //     onPanResponderGrant: (evt, gestureState) => {
        //         // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
        //
        //         // gestureState.{x,y} 现在会被设置为0
        //     },
        //     onPanResponderStart: (e, gestureState) => {
        //         setTimeout(()=>{
        //             dx=dy
        //         },200);
        //
        //         console.log("开始滑动",dx)
        //
        //     },
        //     onPanResponderMove: (evt, gestureState) => {
        //         //console.log("最近一次的移动距离",gestureState.dy)
        //         // 最近一次的移动距离为gestureState.move{X,Y}
        //         //  console.log("最近一次的移动距离e",evt.nativeEvent)
        //         // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
        //     },
        //     onPanResponderEnd: (e, gestureState) => {
        //         // console.log("移动结束后",gestureState)
        //         //  console.log("移动结束后e",e.nativeEvent.locationY)
        //     },
        //     onPanResponderTerminationRequest: (evt, gestureState) => true,
        //     onPanResponderRelease: (evt, gestureState) => {
        //         //console.log("用户放开了所有的触摸点",evt.nativeEvent.locationY)
        //         // console.log("用户放开了所有的触摸点",gestureState)
        //         // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
        //         // 一般来说这意味着一个手势操作已经成功完成。
        //     },
        //     onPanResponderTerminate: (evt, gestureState) => {
        //         // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
        //     },
        //     onShouldBlockNativeResponder: (evt, gestureState) => {
        //         // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
        //         // 默认返回true。目前暂时只支持android。
        //         return true;
        //     }
        // });
    }

    componentDidMount() {

        this.getRefresh = DeviceEventEmitter.addListener("getRefresh",this._onRefresh);
        InteractionManager.runAfterInteractions(() => {
            this. _onRefresh();

        });
    }

    componentWillUnmount() {
        this.getRefresh.remove();
    }

    _getMainVideo=()=>{
        let parpam="thetype=1028";
        Request('1028',parpam)
            .then((responseJson) => {
                this.setState({
                    mainvideo:responseJson.data,
                })
               this.video.setVideoPath(responseJson.data.videourl,responseJson.data.showimg);

            })
            .catch((error) => {

                Toast.show(error.toString());
            });
    }

    _onRefresh=async()=> {
       await this.setState({
            refreshing:true,
        });
        _pageNo = 1;
         // if(this.props.header=='header'){
         //     this._getMainVideo();
         // }


        this._getData(_pageNo);

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
        Request(thetype,parpam)
            .then((responseJson) => {
                if(responseJson.data.pagemsg.sumpage=="1"){
                    this.setState({
                        isshowfooter:false,
                    })
                }

                let b=new Array();

                if(responseJson.data.pagemsg.sumpage=='undefined'){

                    return
                }

                if(this.props.item=="video"){

                    if(responseJson.data.pagemsg.allcount%2==0){

                        if(this.state.refreshing){
                            console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbbb')
                            b=responseJson.data.list
                        }else{
                            console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
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
            this.setState({
                refreshing:false,
                isLoadingMore:false,
            })
                console.log(error.toString())
                // Toast.show(error.toString());
            });
    };




    _header = () => {
        if(this.props.header=="header"){
            return(<ListVideoItem  data={this.state.mainvideo}/>);
        }else if (this.props.header=="sheader"){
            return( <SListHeader datas={this.props.sdata}/>);
        }
        else if(this.props.header=='search'){
            return(

                isshowsearch?(
                    <Text  style={{marginLeft:6,marginTop:10,marginBottom:5,color:'#555',fontSize:14}}>搜索结果：{this.state.totalCount?this.state.totalCount:0}条</Text>
                ):(
                    null
                )

            )
        }else{
            return null;
        }
    };

    _renderItem = ({item}) => {
        if(this.props.item=="comment"){
          //  console.log("commentcommentcommentcomment");
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
                           sign={this.props.sign}
                    // onPressItem={this._onPressItem}
                         thetype={this.props.thetype}
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
          //  console.log("elseelseelseelseelseelse");
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

    _renderResult=()=>{
        if(this.props.header=='search'){
            if(this.state.datas.length==0){
                isshowsearch=false;
                return(
                    <View style={{width:width,height:height,position:'absolute',backgroundColor:'#fafafa',alignItems:'center',justifyContent:'center'}}>
                        <Thumbnail square style={{width:width/3,height:width/3,marginBottom:50}} source={require('../img/icon_search_result.png')} />
                        <Text style={{fontSize:20,color:'#ccc',marginBottom:50}}>无搜索结果</Text>
                    </View>
                )
            }

        }
    }

    _onScrollEndDrag=()=>{
        dx=dy;
    }

    render() {
        return (
            <View
                //{...this._panResponder.panHandlers}
                style={{flex:1,backgroundColor:'#fafafa'}}>
                 <Header style={{height:0}} androidStatusBarColor='#c5b061'/>
                {this._renderResult()}
                <FlatList
                    scrollEventThrottle={1}
                   // onScroll={(e)=>this._onScrollEnd(e)}
                   // onScrollEndDrag={()=>this._onScrollEndDrag()}
                    ref={(FlatList)=>this.FlatList=FlatList}
                    // columnWrapperStyle={{width:width/2}}
                    numColumns={this.state.numcolumns}
                    showsVerticalScrollIndicator={false}
                    data={this.state.datas}
                    initialNumToRender={4}
                    extraData={this.state}
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


class SListHeader extends React.PureComponent {
    render() {
        return (
            <View style={{elevation:10 ,backgroundColor:'#fff'}}  >
                <Image source={{uri:this.props.datas.showimg}} style={{height: width/16*9, width: width}}/>
                <View  style={{padding:15}}>
                    <Text style={{fontSize:10,color:'#c5b061'}}>{this.props.datas.create_date}</Text>
                    <Text style={{marginTop:10,fontSize:14,color:'#666'}}>{this.props.datas.name}</Text>
                    <Text  note style={{marginTop:10,fontSize:14,color:'#999'}}>{this.props.datas.content}</Text>
                </View>
                <View style={{width:width,height:1,backgroundColor:'#ccc'}}></View>
            </View>
        )
    }
}