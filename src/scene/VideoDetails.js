/**
 * Created by Administrator on 2017/10/13.
 */
import React, { Component } from 'react';
import {
    ScrollView, StyleSheet, FlatList, View, Text, Dimensions, InteractionManager, Image, TouchableOpacity, Slider,
    Alert, DeviceEventEmitter, Platform,StatusBar
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
// const data = [
//     {"name" : "三黄鸡鸡腿", quantity: "2个",id:1},
//     {"name" : "土豆", quantity: "2个",id:2},
//     {"name" : "青椒", quantity: "3个",id:3},
//     {"name" : "生抽", quantity: "1勺",id:4},
//     {"name" : "老抽", quantity: "半勺",id:5},
//     {"name" : "蚝油", quantity: "一勺",id:6},
//     {"name" : "老姜", quantity: "两片",id:7},
//     {"name" : "八角", quantity: "三颗",id:8},
//     {"name" : "葱", quantity: "半根",id:9},
//     {"name" : "盐", quantity: "20g",id:10},
//     {"name" : "料酒", quantity: "一勺",id:11},
//     {"name" : "白糖", quantity: "20g",id:12},
// ];
// const datas = [
//     {"name" : "1、提前准备所有食材，鸡肉剁成块叨叨叨制作正宗黄焖鸡选用的是新鲜三黄鸡的鸡腿这样做出来的鸡肉才能鲜嫩透味但我更喜欢带骨的鸡块所以选用的半只三黄鸡", age: 21,id:1},
//     {"name" : "2.将土豆洗净切成滚刀块叨叨叨：黄焖鸡中的配料没有固定的标准，土豆块、金针菇、香菇都可以，按照大家喜欢的口味就可以", age: 22,id:2},
//     {"name" : "3.锅内倒水煮沸，将切好的鸡块放入沸水中焯烫然后捞出沥干水分", age: 22,id:3},
//     {"name" : "4.将老姜切片；葱切成段；青椒切成片待用", age: 22,id:4},
//     {"name" : "5.锅内倒油烧热后将鸡块倒入锅中翻炒煸炒出香味，然后加入料酒叨叨叨：加入料酒可以去除鸡块中的腥味和异味", age: 22,id:5},
//     {"name" : "6.倒入老抽、生抽、蚝油翻炒均匀", age: 22,id:6},
//     {"name" : "7.再将姜片、葱段、八角下锅", age: 22,id:7},
//     {"name" : "8.放入准备好的土豆块和适量清水，加入适量盐和白糖调味，大火烧开转为小火焖30分钟左右至汤汁收紧", age: 22,id:8},
//     {"name" : "9.待汤汁收紧时，下青椒块翻炒均匀即可关火", age: 22,id:9},
//     {"name" : "10.出锅后撒上葱花即可食用叨叨叨：其实收汁时最好食用砂锅，但是考虑到家庭制作时比较麻烦，就一次性在锅中解决了这个问题，一点也不影响成菜的口感", age: 22,id:10},
//
// ];
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
        backgroundColor:"#C5B361",
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



let num=null;
class MyListItem extends React.PureComponent {

    render() {
        return (
            <View style={{width:width/2,height:300}}>
                <Image style={{width:width/2,height:width/2}}  source={require('../img/noob.png')} />
                <Image style={{width:50,height:50}}  source={require('../img/noob.png')} />
                <Text note>Doing what you like will always keep you happy . .</Text>
                <Text note>Doing what you like will always keep you happy . .</Text>
            </View>
        )
    }
}
export default class VideoDetails extends Component {
    constructor(props) {
        super(props);
        this.state={
            data:[],
            datas:[],
            dataa:[],
            iscollect:this.props.isfromcollect==true?true:false,
            videourl:null,
            time:0,
            totalTime:null,
            isvideo:false,
            value:0,
            isplay:false,
            ismute:false,
            pingluncount:0,
            cailiaoarr:[],
            buzhouarr:[],
            //collectdisable:false,
            isshowloop:false,
            duration:0,
            viewopacity:'transparent',
            navibaropacity:0,
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
        //  this.onCompletion.remove();
        NetWorkTool.removeEventListener(NetWorkTool.TAG_NETWORK_CHANGE,this.handleMethod);
    }

    componentDidMount () {

        // this.onCompletion = DeviceEventEmitter.addListener("onCompletion",this._onCompletion);
        InteractionManager.runAfterInteractions(() => {
            this._getData();

        });

    }
    componentWillReceiveProps(nextProps){
        if(nextProps.iscontribute==true){
            this._getData();
        }
        if(nextProps.startdetailsvideo==true){
            //this._playStart();
            this._getData();
        }
    }

    _share=()=>{
        this.setState({

            isplay:false
        });
        this.videos.pause();
        let list = [0,2,3];
        ShareUtile.shareboard("分享描述",
            this.state.data.showimg,
            'http://www.baidu.com/',
            this.props.title,
            list,(code,message) =>{
                console.log('wwwwwwwwwwwwwwwwwwwwwwww',message,code)
                Toast.show(message);
                this.setState({
                    isplay:true,

                });

               // this.videos.start();
            });
    }

    _getData=()=>{
        let parpam="thetype=1016&imgwidth=800&imgheight=800&nowid="+this.props.nowid+"";
        Request('1016',parpam)
            .then((responseJson) => {
                this.setState({
                    data:responseJson.data,
                    pingluncount:responseJson.data.pingluncount,
                    dataa:responseJson.data.picpinglunlist,
                    cailiaoarr:responseJson.data.cailiaoarr,
                    buzhouarr:responseJson.data.buzhouarr,
                    iscollect:responseJson.data.shoucangflag=="1"?true:false,
                })


            })
            .catch((error) => {

                Toast.show(error.toString());
            });
    }

    _getCollect=(isCollect)=>{
        let typeid=null;

        if(isCollect){

            typeid="1"
        }else{

            typeid="2"
        }
        let parpam="thetype=1023&nowid="+this.props.nowid+"&typeid="+typeid;
        Request('1023',parpam)
            .then((responseJson) => {
                //如果请求成功就走下面的方法
                DeviceEventEmitter.emit('getCollect','点击收藏时候刷新');
                DeviceEventEmitter.emit('getRefresh','点击收藏时候刷新');

                this.setState({
                    iscollect:isCollect,
                    //collectdisable:false,
                });
                Toast.show(responseJson.msg)
            })
            .catch((error) => {
                this.setState({
                    //  collectdisable:false
                })
                Toast.show(error.toString());
            });
    };

    _collect=()=>{
        // this.setState({
        //     collectdisable:true
        // })
        if(Config.usertype=="1"){
            if(this.state.iscollect){
                this._getCollect(false);
            }else {
                this._getCollect(true);
            }
        }else{
            // this.setState({
            //     collectdisable:false
            // })
            this.videos.pause();
            Actions.login2();
        }
    }

    _mute=()=>{
        if(this.state.ismute){
            this.setState({
                ismute:false
            });
            this.videos.unmute();
        }else{
            this.setState({
                ismute:true
            });
            this.videos.mute();
        }
    };

    _playStart=()=>{
        if(this.state.isshowloop){
            return
        }
        if(this.state.isplay){
            this.setState({
                isshowloop:false,
                isplay:false
            });
            this.videos.pause();
        }else{
            this.setState({
                isplay:true,
                isshowloop:false,
            });

            this.videos.start();
        }
    };

    _replay=()=>{
        // this.videos.setVideoPath(this.state.data.videourl,this.state.data.showimg);this.setState({
        //     isshowloop:false,
        //     isplay:true,
        //     value:0
        // });
        //

        this.videos.setVideoPath(this.state.data.videourl,this.state.data.showimg);
        this.setState({
            isshowloop:false,
            isplay:true,
            value:0
        });
        // this.videos.start();
    }

    _onPressSeekTo=(value)=>{
        // let millSecond = this.state.totalTime*(value/60);
        //这个60 应该是 进度条的最大值  this.state.duration 实际视频的长度
        let newpoint=Math.floor(value/60*this.state.duration);
        console.log("_onPressSeekTo"+newpoint,this.state.totalTime,this.state.duration);
        this.setState({
            time:Math.floor(value/60*this.state.totalTime)
        });
        this.videos.seekTo(newpoint);
    }

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

    _listItemPress=(num)=>{
        this.videos.pause();
        this.setState({
            isplay:false
        });

        if(Config.usertype=="1"){
            // this.videos.pause();
            if(num==1){
                Actions.contribute({dataid:this.state.data.id});
            }else{
                Actions.contributelist({nowid:this.state.data.id});
            }
        }else{
            Actions.login2();
        }
    };

    _comment=()=>{
        this.videos.pause();
        this.setState({
            isplay:false
        })
        if(Config.usertype=="1"){
            Actions.comment({title:"留言",nowid:this.state.data.id})
        }else{
            Actions.comment({title:"留言",nowid:this.state.data.id})
        }
    };

    _renderContributeList=()=>{
        return(
            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} >
                {this.state.dataa.map((item,i)=>
                    <View onPress={()=>this._listItemPress(2)} style={{width:width/2,marginLeft:15}}  key={item.id}>
                        <TouchableOpacity activeOpacity={1}
                                          style={{flex:1}}
                                          onPress={()=>this._listItemPress(2)}
                        >
                            <Image square style={{width:width/2,height:width/2}} source={{uri:item.showimg}} />
                            <View style={{flexDirection:'row',marginTop:10}}>
                                <Thumbnail  style={{width:50,height:50}} source={{uri:item.touxiang}} />
                                <View style={{marginLeft:10,marginTop:10,justifyContent:'center'}}>
                                    <Text numberOfLines={1} style={{color:'#000'}}>{item.nickname}</Text>
                                    <Text style={{color:'#595959',fontSize:14}}>9:25</Text>
                                </View>
                            </View>
                            <Text numberOfLines={2} style={{marginTop:10,color:'#000',fontSize:14}}>{item.content}</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        )
    }

    _renderViderDetails=()=>{
        return(
            <View>
                <Text numberOfLines={2} style={{margin:15,fontSize:18,color:'#212121',marginTop:20}}>{this.props.title}</Text>
                <Row style={{marginLeft:15,alignItems:'center'}}>
                    <Thumbnail square style={{width:14,height:14}} source={require('../img/icon_videodetails_time.png')} />
                    <Text style={[styles.texts,{marginLeft:5}]}>制作时间：{this.state.data.maketime}</Text>
                </Row>

                <Body>
                <View style={{width:width-20,backgroundColor:'#eee',height:1,marginTop:20}}>
                </View>
                </Body>
                <Body>
                <Text note style={[styles.texts,{marginLeft:15,marginRight:10,lineHeight:20,marginTop:20,color:'#000'}]}>{this.state.data.jieshao}</Text>
                </Body>
                <View style={{width:width,height:1,backgroundColor:'#cdcdcd',marginTop:20}}>
                </View>
                <View style={{width:width,height:20,backgroundColor:'#fafafa'}}>
                </View>
                <View style={{width:width,height:1,backgroundColor:'#cdcdcd'}}>
                </View>
            </View>
        )
    }

    _onScrollEnd=(e)=>{
        if(e.nativeEvent.contentOffset.y<=width/2){
            this.viewopacity.setNativeProps({
                style: {backgroundColor:'rgba(197,179,97,'+e.nativeEvent.contentOffset.y/(width/2)+')'}
            });
        }

        if(e.nativeEvent.contentOffset.y<=width/2){
            this.navibar.setNativeProps({
                style: {opacity:e.nativeEvent.contentOffset.y/(width/2)}
            });
        }

        if(this.state.isplay){
            let dy=e.nativeEvent.contentOffset.y;

            if(dy>=width){
                this.videos.pause();
            }else if (0<dy<width){
                this.videos.start();
            }else{
                console.log(e.nativeEvent.contentOffset.y)
            }
        }

        // console.log("e.nativeEvent.contentOffset",e.nativeEvent.contentOffset)
        // console.log("e.nativeEventt",e.nativeEvent)

    }

    _renderVideo=()=>{
        return(
            <View  style={{backgroundColor:'#FFFFFF',width:width,alignItems:'center'}}>
                <PLVideoView
                    // ref={PLVideoView}
                    ref={(video)=>{this.videos = video}}
                    style={{width:width,height:width}}
                    source={
                            {
                                 url: this.state.data.videourl,
                                 looping:false,
                                 autoplay:false,
                                 coverurl:this.state.data.showimg,
                                 bufferurl:this.state.data.showimg,
                            }
                            }
                    onPrepared={(duration)=>{
                                this.setState({
                                    isvideo:true,
                                    totalTime:Math.floor(duration/1000),
                                    isplay:true,
                                    duration:duration,
                                });
                             console.log("JS duration"+duration);
                            }}
                    onCompletion={()=>{
                             console.log("JS onCompletion");
                             this.setState({
                                  isplay:false,
                                  isshowloop:true,
                             });
                             this.videos.pause();

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
                {this.state.isshowloop?(
                        <View style={{width:width,height:width,position:'absolute',alignItems:'center',justifyContent:'center'}}>
                            <TouchableOpacity activeOpacity={1} onPress={()=> {this._replay()}}>
                                <Thumbnail square style={{width:60,height:60}} source={require('../img/icon_videodetailsloop.png')} />
                            </TouchableOpacity>
                        </View>
                    ):(null)}
                <View style={{justifyContent:'center'}}>
                    <ListItem itemDivider={true} style={{backgroundColor:'#fff'}} >
                        <TouchableOpacity activeOpacity={1} onPress={()=>this._playStart()}>
                            <Thumbnail square style={{width:25,height:25}} source={this.state.isplay?require('../img/icon_videodetails_play.png'):require('../img/icon_videodetails_parse.png')} />
                        </TouchableOpacity>
                        <View>
                            <Slider
                                style={{width:width/1.35,marginTop:15}}
                                //thumbImage={require('../img/slider_handler.png')}
                                /*minimumTrackImage={require('../img/slider_left.png')}
                                 maximumTrackImage={require('../img/slider_right.png')}*/
                                maximumValue={60}
                                minimumValue={0}
                                value={this.state.value}
                                minimumTrackTintColor ="#C5B361"
                                maximumTrackTintColor ="#C5B361"
                                thumbTintColor="#C5B361"
                                // maximumTrackImage={require('../img/btn_backcolor.png')}
                                //   minimumTrackImage={require('../img/top_background.png')}
                                onSlidingComplete={(value)=>{
                                      let t=Math.floor(value);
                                      this.setState({
                                          value:t,
                                          isplay:true
                                      });
                                      //let time=Math.floor(value/60*this.state.totalTime);
                                      //这里直接把比值传过去
                                      this._onPressSeekTo(value)}}
                            />
                            <View style={{flexDirection:'row'}}>
                                <Text style={{fontSize:12,marginLeft:10}}>{this._timeToStr(this.state.time)}</Text>
                                <View style={{flex:1}}></View>
                                <Text style={{fontSize:12,marginRight:15}}>{this._timeToStr(this.state.totalTime)}</Text>
                            </View>
                        </View>

                        <TouchableOpacity activeOpacity={1} onPress={()=>this._mute()}>
                            <Thumbnail square style={{width:25,height:25}} source={this.state.ismute?require('../img/icon_videodetails_mute.png'):require('../img/icon_videodetails_unmute.png')} />
                        </TouchableOpacity>
                    </ListItem>
                </View>
                <View style={{width:width-60,height:1,backgroundColor:'#eee'}}></View>
            </View>

        )
    };



    render() {
        return (
            <Container style={{backgroundColor:'#fff'}}>
                <StatusBar backgroundColor="transparent"
                           barStyle="light-content"
                           translucent={true}
                           hidden={false}/>

                <Content onScroll={(e)=>this._onScrollEnd(e)} showsVerticalScrollIndicator={false}>
                    {this._renderVideo()}

                    {this._renderViderDetails()}
                    <ListItem style={{backgroundColor:'#fff',marginTop:10}} itemDivider>
                        <Text style={[styles.textb,{color:'#000'}]}>材料<Text style={[styles.texts,{color:'#000'}]}>（两人份）</Text></Text>
                    </ListItem>
                    {this.state.cailiaoarr.map((item,i)=>
                        <Item key={item.id} style={{marginLeft:15,marginRight:15,paddingBottom:10,paddingTop:10}}>
                            <Text note style={[styles.texts,{color:'#000'}]}>{item.name}</Text>
                            <View style={{flex:1}}>
                            </View>
                            <Text   style={[styles.texts,{color:'#000'}]}>{item.yongliang}</Text>
                        </Item>
                    )}
                    <ListItem style={{backgroundColor:'#fff',marginTop:10}} itemDivider>
                        <Text style={[styles.textb,{color:'#000'}]}>操作步骤</Text>
                    </ListItem>
                    {this.state.buzhouarr.map((item,i)=>
                        <Item style={{marginLeft:15,marginRight:15,paddingBottom:15,paddingTop:15}} key={item.id}>
                            <View style={{flex:1,flexDirection:'row'}}>
                                <Text style={{flex:1.5,color:'#000',fontWeight:'800'}}>{item.buzhouid}.</Text>


                                <View style={{flex:20,}}>
                                    <Text note style={[styles.texts,{color:'#000'}]}>{item.buzhoucontent}</Text>
                                </View>
                            </View>


                        </Item>
                    )}
                    <ListItem style={{backgroundColor:'#fff',marginTop:10}} itemDivider>
                        <Text style={[styles.textb,{color:'#000'}]}>提示</Text>
                    </ListItem>
                    <Item style={{backgroundColor:'#fff',marginLeft:17,marginRight:17,paddingBottom:15}} >
                        <Text note style={[styles.texts,{color:'#000'}]}>{this.state.data.tishishuoming}</Text>
                    </Item>
                    <Button onPress={()=>this._comment()} style={{height:45,marginBottom:10,marginTop:10}} transparent={true} full iconLeft >
                        <Image style={[styles.imagelogo]} source={require('../img/icon_videodetails_comment_s.png')} />
                        <Text style={{color:'#c5b361',marginLeft:5}}>留言评论</Text>
                    </Button>
                    <View style={{width:width,height:1,backgroundColor:'#cdcdcd'}}>
                    </View>
                    <View style={{width:width,height:10,backgroundColor:'#fafafa'}}>
                    </View>
                    <View style={{width:width,height:1,backgroundColor:'#cdcdcd'}}>
                    </View>
                    {this.state.data.picpingluncount=="0"?(null):(
                            <View>
                                <ListItem style={{backgroundColor:'#fff'}} itemDivider>
                                    <Text style={[styles.textb,{color:'#272727'}]}>成品展示</Text>
                                    <View style={{flex:1}}>
                                    </View>
                                    {this.state.data.picpingluncount>5?(
                                            <Text onPress={()=>this._listItemPress(2)} style={{color:'#c5b361'}}>查看更多</Text>
                                        ):(null)}

                                </ListItem>
                                {this._renderContributeList()}

                                <View style={{width:width,height:1,backgroundColor:'#dfdfdf',marginTop:15}}>
                                </View>
                                <Button onPress={()=>this._listItemPress(1)} style={{height:45,marginBottom:10,marginTop:10}} transparent={true} full iconLeft >
                                    <Image style={[styles.imagelogo]} source={require('../img/icon_videodetails_contribute_s.png')} />
                                    <Text style={{color:'#c5b361',marginLeft:5}}>我要投稿</Text>
                                </Button>
                                <View style={{width:width,height:1,backgroundColor:'#dfdfdf'}}>
                                </View>
                                <View style={{width:width,height:10,backgroundColor:'#f3f3f3'}}>
                                </View>
                                <View style={{width:width,height:1,backgroundColor:'#dfdfdf'}}>
                                </View>
                            </View>
                        )}


                </Content>

                <Footer style={{backgroundColor:'#fff'}}>
                    <FooterTab style={{backgroundColor:'#fff'}}>
                        <Button transparent={true}
                            //disabled={this.state.collectdisable}
                                onPress={()=>this._collect()}  vertical>
                            <Image style={[styles.imagelogo]} source={this.state.iscollect?require('../img/icon_videodetails_collect_s.png'):require('../img/icon_videodetails_collect_n.png')} />
                            <Text style={[styles.texts,{fontSize:12}]}>收藏</Text>
                        </Button>
                        <Button badge onPress={()=>this._comment()} vertical>
                            {this.state.pingluncount==0?(null):(
                                    <View style={[styles.order_num]}>
                                        <Text style={{color:'#fff',fontSize:10,marginBottom:1}}>{this.state.data.pingluncount}</Text>
                                    </View>
                                )}

                            <Image  style={[styles.imagelogo]} source={require('../img/icon_videodetails_comment_n.png')} >

                            </Image>
                            <Text style={[styles.texts,{fontSize:12}]}>留言</Text>
                        </Button>
                        <Button onPress={()=>this._listItemPress(1)}   vertical >
                            <Image style={[styles.imagelogo]} source={require('../img/icon_videodetails_contribute_n.png')} />
                            <Text style={[styles.texts,{fontSize:12}]}>投稿</Text>
                        </Button>
                        {/*<Button  badge vertical>*/}
                        {/*<Badge style={{backgroundColor:'#C5B361'}} ><Text>{this.state.data.pingluncount}</Text></Badge>*/}
                        {/*<Icon  name="navigate" />*/}
                        {/*<Text style={[styles.texts]}>留言</Text>*/}
                        {/*</Button>*/}
                    </FooterTab>
                </Footer>

                <View ref={(viewopacity)=>this.viewopacity=viewopacity}
                      style={{position:'absolute',top:0,width:width,height:StatusBar.currentHeight,backgroundColor:this.state.viewopacity}}>

                </View>
                <View ref={(navibar)=>this.navibar=navibar}
                      style={{position:'absolute',top:StatusBar.currentHeight,width:width,height:50,opacity:this.state.navibaropacity,justifyContent:'center',alignItems:'center',backgroundColor:'rgba(0,0,0,0.5)'}}>
                       <Text style={{fontSize:16,color:'#fff'}}>断开连接回复克鲁斯的给你礼物</Text>
                </View>
                <Image  style={{position:'absolute',left:10,top:StatusBar.currentHeight+15,width:20,height:20}} source={require('../img/icon_videodetails_comment_n.png')} />
                <Image  style={{position:'absolute',right:10,top:StatusBar.currentHeight+15,width:20,height:20}} source={require('../img/icon_videodetails_comment_n.png')} />
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