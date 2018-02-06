/**
 * Created by Administrator on 2017/12/15.
 */
import React ,{ Component } from 'react';
import {Actions} from "react-native-router-flux";
import BaseScene from "./BaseScene";
import ListScene from "./ListScene";
import Sofitel from './Sofitel';
import MainScene from './MainScene'
import Request from '../utils/Fetch';
import Toast from '@remobile/react-native-toast'
import { Container, Header, Title, Content,Thumbnail,TabHeading, Footer, FooterTab, Button, Left, Right, Body, Icon, Text ,Item, Input,Row  } from 'native-base';
import {
    StyleSheet, Image, Dimensions, View, Alert, ScrollView, DeviceEventEmitter, TouchableOpacity,
    TouchableNativeFeedback, Animated, StatusBar, Platform,ActivityIndicator,ImageBackground
} from "react-native";
import Config from "../utils/Config";
import ScrollableTabView, {DefaultTabBar,ScrollableTabBar} from 'react-native-scrollable-tab-view';
import Storage  from '../utils/Storage';
import TabBar from '../components/TabBar';

const {width, height} = Dimensions.get('window');
let imgurl=[];
// imgurl=['http://p05samtwb.bkt.clouddn.com/20171124115559763495607.jpg?imageView2/1/w/500/h/500&sign=b152d873d60b060a6ef8eabc9a4b0b2e&t=5a33870d',
//     'http://p05samtwb.bkt.clouddn.com/20171124115559763495607.jpg?imageView2/1/w/500/h/500&sign=b152d873d60b060a6ef8eabc9a4b0b2e&t=5a33870d',
//     'http://p05samtwb.bkt.clouddn.com/20171124115559763495607.jpg?imageView2/1/w/500/h/500&sign=b152d873d60b060a6ef8eabc9a4b0b2e&t=5a33870d',
//     'http://p05samtwb.bkt.clouddn.com/20171124115559763495607.jpg?imageView2/1/w/500/h/500&sign=b152d873d60b060a6ef8eabc9a4b0b2e&t=5a33870d',
//     'http://p05samtwb.bkt.clouddn.com/20171124115559763495607.jpg?imageView2/1/w/500/h/500&sign=b152d873d60b060a6ef8eabc9a4b0b2e&t=5a33870d',
//     'http://p05samtwb.bkt.clouddn.com/20171124115559763495607.jpg?imageView2/1/w/500/h/500&sign=b152d873d60b060a6ef8eabc9a4b0b2e&t=5a33870d',
//     'http://p05samtwb.bkt.clouddn.com/20171124181544581752854.jpg?imageView2/1/w/500/h/500&sign=a592f3d37b9085e3e5d52bc0055195b0&t=5a33870d',
//     'http://p05samtwb.bkt.clouddn.com/20171201105821904207488.jpg?imageView2/1/w/500/h/500&sign=d781d94624f0c53bf1dd5e2c5b3cd19c&t=5a33870d'];
let imgurla=[];
let img=[require('../../src/img/icon_message.png'),require('../../src/img/icon_qq.png'),
    require('../../src/img/icon_videodetails_collect_s.png'),require('../../src/img/icon_videodetails_comment_s.png'),
    require('../../src/img/icon_wb.png'),require('../../src/img/icon_message.png'),
    require('../../src/img/icon_message.png')]
let wordarr=[];
let keywordarr=[];
let aaa=['dvdf','dvdf','dvdf','dvdf','dvdf','dvdf','dvdf','dvdf'];
class HomeScene extends Component {


    constructor(props) {
        super(props);
        this.state={
              numpage:this.props.num?this.props.num:0,
            // data:[],
            lock:true,
            imgurlarr:imgurl,
            translateValue: new Animated.ValueXY({x:0, y:0}), // 二维坐标
            isshowtab:true,
            tabheight:0,
            data:[],
            margintop:0,
            hideTabBar:false
        }

    }
    _lock=()=>{
        this.setState({
            lock:false,
        })
    }
    _open=()=>{
        this.setState({
            lock:true,
        })
    }

    componentDidMount(){

        this.refreshmain= DeviceEventEmitter.addListener("refreshmain",this._getDataa);
        this.changeHeaderd= DeviceEventEmitter.addListener("changeHeaderd",this._changeHeaderd);
        this.changeHeaderu= DeviceEventEmitter.addListener("changeHeaderu",this._changeHeaderu);
         this._getDataa();
    };
    componentWillUnmount() {
        this.changeHeaderu.remove();
        this.changeHeaderd.remove();
        this.refreshmain.remove();
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

    animatedPlay=()=>{
        console.log("animatedPlay--------");
        let count = 0;
        let _th=100
        let opacity
        while(count++<50){
            requestAnimationFrame(()=> {
                _th += (0 - _th) / 10
                this.refs.header.setNativeProps({
                    style: {
                        height : _th
                    }
                });

               /* this.refs.footer.setNativeProps({
                    style: {
                        height : _th
                    }
                });*/
            })
        }
    }

    animatedReplay=()=>{
        console.log("animatedReplay--------");
        var count = 0;
        let _th=0
        while(count++<30){
            requestAnimationFrame(()=>{
                _th +=(100-_th)/10
                this.refs.header.setNativeProps({
                    style: {
                        height : _th
                    }
                });

                /*this.refs.footer.setNativeProps({
                    style: {
                        height : _th
                    }
                });*/
            })
        }
    }

    _getDataa=()=>{
        let parpam="thetype=1040&imgwidth=100&imgheight=100";
        Request('1040',parpam)
            .then((responseJson) => {
                console.log('aaaaaaaaaaaaaaaaaaaaaaaaaa',responseJson)
                for(let i=0;i<responseJson.data.length;i++){
                    imgurla.push(responseJson.data[i].showimg);
                }
                for(let i=0;i<responseJson.data.length;i++){
                    wordarr.push(responseJson.data[i].word);
                }
                for(let i=0;i<responseJson.data.length;i++){
                    keywordarr.push(responseJson.data[i].keyword);
                }
                //console.log('aaaaaaaaaa',imgurla);
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

    _changeHeaderu=()=>{
        this.toggleNavBar()
    };

    _changeHeaderd=()=>{
        this.toggleNavBara()
    };

    _onChangeTab=(index)=>{
        if(index.i==0){
            DeviceEventEmitter.emit("startvideo","播放视频")
        }else{
            DeviceEventEmitter.emit("zanting","暂停视频")
        }
    };

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
    };

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
    };

    renderTabBar=()=>{
        return(
            <TabBar ref={(tabbar)=>this.tabbar=tabbar} // tabStyle={{paddingLeft:0,paddingRight:0}}
                imgurl={this.state.imgurlarr} //网络图
                imgurla={img}       //本地图
                imageStyle={{width:25,height:25,backgroundColor:'transparent'}}
                textva={aaa}
                activeTextColor={"#f5c61e"}
                backgroundColor={"#FFFFFF"}
                textStyle={{fontSize:12,fontWeight:'normal',marginTop:7}}
                inactiveTextColor={"#313131"}
                underlineStyle={{backgroundColor:"#f5c61e",height:2}}
            />
        )
    };

    _renderTab=()=>{
        return(
            <View style={styles.tabs} >
                <View style={[styles.tab]}>
                    <Text style={{fontSize:14,color:'#f5c61e'}} >
                       最新
                    </Text>
                </View>
                <View style={[styles.tab]}>
                    <Text style={{fontSize:14,color:'#444'}} >
                        融合菜
                    </Text>
                </View>
                <View style={[styles.tab]}>
                    <Text style={{fontSize:14,color:'#444'}} >
                        最新
                    </Text>
                </View>
                <View style={[styles.tab]}>
                    <Text style={{fontSize:14,color:'#444'}} >
                        特色菜
                    </Text>
                </View>
                <View style={[styles.tab]}>
                    <Text style={{fontSize:14,color:'#444'}} >
                        最新
                    </Text>
                </View>

            </View>
        )
    };

    _onScrollEnd=(e)=>{
        let  dy=e.nativeEvent.contentOffset.y;
        if(dy>0){
            this.setState({
                tabheight:80-dy
            })
        }
    };

    _rightView=()=>{
        return(
            <View style={{width:width/5,height:width/5,backgroundColor:'#f00'}}>
            </View>
        )
    };

    onScrollback=(e)=>{
        console.log('滑动的回调...........',e)
    };

    toggleNavBar = () => {
        this.setState({ hideTabBar: true }, () =>
            Actions.refresh({ hideTabBar: true })
        );
    };
    toggleNavBara = () => {
        this.setState({ hideTabBar: false }, () =>
            Actions.refresh({ hideTabBar: false })
        );
    };

    render(){
        const content = this.state.data.length > 0 ?(<ScrollableTabView ref={(ScrollableTabView)=>this.ScrollableTabView=ScrollableTabView}
                                                                        initialPage={0}
                                                                        onScroll={(e)=>this.onScrollback(e)}
                                                                        onChangeTab={(obj) => {this._onChangeTab(obj)}}
                                                                        scrollWithoutAnimation={true}
                                                                        style={{marginTop:10}}
                                                                        renderTabBar={() =>this.renderTabBar()}>
                {this.state.data.map((item,i)=>{
                    if(i==0){
                        return(
                            <MainScene load={this.props.load}  header={"header"} key={i}  url={"thetype=1034&searchstr="+item.keyword} tabLabel={item.word}   thetype="1034" item={"video"} />
                        )
                    }else if(i==1){
                        return(
                            <Sofitel key={i}  tabLabel={item.word}  />
                        )
                    }else if(i>1&&i<this.state.data.length){
                        return(
                            <ListScene load={this.props.load} key={i}  url={"thetype=1034&classify2="+item.keyword} tabLabel={item.word}   thetype="1034" item={"video"} />
                        )
                    }
                })}
            </ScrollableTabView>) : <View/>;
        return (
            <Container>
                <StatusBar backgroundColor="transparent"
                           barStyle="light-content"
                           translucent={true}
                           hidden={false}/>
                <View style={{width:width,height:Config.STATUSBARHEIGHT,backgroundColor:Config.StatusBarColor}}>

                </View>
                <View  style={{flex:1,backgroundColor:'#fff',marginTop:this.state.margintop}} >
                    <View  //androidStatusBarColor='#f00'
                        ref="header" style={{height:80,backgroundColor:'#fff',alignItems:'center'
                       }}>
                        <ImageBackground   style={{position:'absolute',top:0,width:width,height:50,justifyContent:'center',alignItems:'center'}} source={require('../img/icon_homebg.png')}>
                            <Text style={{color:'#fff',backgroundColor:'transparent',marginBottom:width/1.28/850*130/6}}>60Sec</Text>
                        </ImageBackground>
                        <TouchableOpacity style={{position:'absolute',top:width/472*65-width/1.28/850*130/3}} activeOpacity={1}
                                          onPress={()=>Actions.TabView()}>
                            <Image  style={{width:width/1.28,height:width/1.28/850*130}} source={require('../img/newicon_seachbar.png')} />
                        </TouchableOpacity>
                    </View>
                    {/*<Button onPress={()=>{*/}
                        {/*this.toggleNavBar();*/}
                    {/*}}>*/}
                        {/*<Text>play</Text>*/}
                    {/*</Button>*/}
                    {/*<Button onPress={()=>{*/}
                        {/*this.toggleNavBara();*/}
                    {/*}}>*/}
                        {/*<Text>replay</Text>*/}
                    {/*</Button>*/}
                    {content}
                </View>
            </Container>
        );
    }
}

module.exports = HomeScene;
const styles = StyleSheet.create({
    tab: {
        height: 49,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor:'#fff'
    },
    container: {
        height: 50,
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: '#ccc',
    },
    tabs: {
        flexDirection: 'row',
        width:width,
        justifyContent: 'space-around',
        backgroundColor:'#fff'
    },
});
{/*<Tabs  tabBarUnderlineStyle={{backgroundColor:'#c5b361',height:2}}*/}
{/*initialPage={this.props.num?this.props.num:0}*/}
{/*// locked={true}*/}
{/*// refreshControl={false}*/}
{/*onChangeTab={(onChangeTab)=>this._onChangeTab(onChangeTab)}*/}
{/*//let parpam="thetype=1015&searchstr="+this.props.classify;*/}
{/*renderTabBar={()=> <ScrollableTab />}>*/}
{/*<Tab*/}
{/*activeTextStyle={{color:'#c5b361',fontSize:14,fontWeight:'normal'}}*/}
{/*textStyle={{color:'#8c8c8c',fontSize:14}}*/}
{/*activeTabStyle={{backgroundColor:'#fff'}}*/}
{/*tabStyle={{backgroundColor:'#fff'}}*/}
{/*heading={'最新'} >*/}
{/*<MainScene url={"thetype=1015&searchstr="} thetype="1015" header={"header"}  item={"video"} />*/}
{/*</Tab>*/}
{/*<Tab  activeTextStyle={{color:'#c5b361',fontSize:14,fontWeight:'normal'}}*/}
{/*textStyle={{color:'#8c8c8c',fontSize:14}}*/}
{/*tabStyle={{backgroundColor:'#fff'}}*/}
{/*activeTabStyle={{backgroundColor:'#fff'}}*/}
{/*heading="特辑">*/}
{/*<Sofitel />*/}
{/*</Tab>*/}
{/*/!*{this.state.data.map((item,i)=>*!/*/}
{/*/!*<Tab key={i} activeTextStyle={{color:'#c5b361',fontSize:14}}*!/*/}
{/*/!*textStyle={{color:'#8c8c8c',fontSize:14}}*!/*/}
{/*/!*tabStyle={{backgroundColor:'#fff'}}*!/*/}
{/*/!*activeTabStyle={{backgroundColor:'#fff'}}*!/*/}
{/*/!*heading={item.name}>*!/*/}
{/*/!*<ListScene url={"thetype=1015&classify2="+item.name} thetype="1015" item={"video"} />*!/*/}
{/*/!*</Tab>*!/*/}
{/*/!*)}*!/*/}
{/*<Tab activeTextStyle={{color:'#c5b361',fontSize:14,fontWeight:'normal'}}*/}
{/*textStyle={{color:'#8c8c8c',fontSize:14}}*/}
{/*tabStyle={{backgroundColor:'#fff'}}*/}
{/*activeTabStyle={{backgroundColor:'#fff'}}*/}
{/*heading={"融合菜"}>*/}
{/*<ListScene url={"thetype=1015&classify2=融合菜"} thetype="1015" item={"video"} />*/}
{/*</Tab>*/}
{/*<Tab activeTextStyle={{color:'#c5b361',fontSize:14,fontWeight:'normal'}}*/}
{/*textStyle={{color:'#8c8c8c',fontSize:14}}*/}
{/*tabStyle={{backgroundColor:'#fff'}}*/}
{/*activeTabStyle={{backgroundColor:'#fff'}}*/}
{/*heading={"甜品"}>*/}
{/*<ListScene url={"thetype=1015&classify2=甜品"} thetype="1015" item={"video"}/>*/}
{/*</Tab>*/}
{/*<Tab activeTextStyle={{color:'#c5b361',fontSize:14,fontWeight:'normal'}}*/}
{/*textStyle={{color:'#8c8c8c',fontSize:14}}*/}
{/*tabStyle={{backgroundColor:'#fff'}}*/}
{/*activeTabStyle={{backgroundColor:'#fff'}}*/}
{/*heading={"特色菜"}>*/}
{/*<ListScene url={"thetype=1015&classify2=特色菜"} thetype="1015" item={"video"}/>*/}
{/*</Tab>*/}
{/*<Tab activeTextStyle={{color:'#c5b361',fontSize:14,fontWeight:'normal'}}*/}
{/*textStyle={{color:'#8c8c8c',fontSize:14}}*/}
{/*tabStyle={{backgroundColor:'#fff'}}*/}
{/*activeTabStyle={{backgroundColor:'#fff'}}*/}
{/*heading={"饮品"}>*/}
{/*<ListScene url={"thetype=1015&classify2=饮品"} thetype="1015" item={"video"}/>*/}
{/*</Tab>*/}
{/*<Tab activeTextStyle={{color:'#c5b361',fontSize:14,fontWeight:'normal'}}*/}
{/*textStyle={{color:'#8c8c8c',fontSize:14}}*/}
{/*tabStyle={{backgroundColor:'#fff'}}*/}
{/*activeTabStyle={{backgroundColor:'#fff'}}*/}
{/*heading={"其他"}>*/}
{/*<ListScene url={"thetype=1015&classify2=其他"} thetype="1015" item={"video"}/>*/}
{/*</Tab>*/}
{/*<Tab activeTextStyle={{color:'#c5b361',fontSize:14,fontWeight:'normal'}}*/}
{/*textStyle={{color:'#8c8c8c',fontSize:14}}*/}
{/*tabStyle={{backgroundColor:'#fff'}}*/}
{/*activeTabStyle={{backgroundColor:'#fff'}}*/}
{/*heading={"小贴士"}>*/}
{/*<ListScene url={"thetype=1015&classify2=小贴士"} thetype="1015" item={"video"}/>*/}
{/*</Tab>*/}
{/*<Tab activeTextStyle={{color:'#c5b361',fontSize:14,fontWeight:'normal'}}*/}
{/*textStyle={{color:'#8c8c8c',fontSize:14}}*/}
{/*tabStyle={{backgroundColor:'#fff'}}*/}
{/*activeTabStyle={{backgroundColor:'#fff'}}*/}
{/*heading={"大家的食谱"}>*/}
{/*<ListScene url={"thetype=1015&classify2=小贴士"} sign={true} thetype="1015" item={"video"}/>*/}
{/*<TouchableOpacity style={{position:'absolute',right:20,bottom:20,width:width/7,height:width/7}} activeOpacity={1} onPress={()=>{this._goContribute()}}>*/}


{/*<Thumbnail square style={{width:width/7,height:width/7,}} source={require('../img/icon_message.png')} />*/}
{/*</TouchableOpacity>*/}
{/*</Tab>*/}
{/*</Tabs>*/}

// else if(i==this.state.data.length-1){
//     return(
//         <ListScene key={i} sign={true}  url={"thetype=1034&classify2="+item.keyword} tabLabel={item.word}   thetype="1034" item={"video"} />
//     )
// }