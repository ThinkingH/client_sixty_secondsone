/**
 * Created by Administrator on 2017/12/15.
 */
import React from 'react';
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
let imgurla=['http://p05samtwb.bkt.clouddn.com/20171201105821904207488.jpg?imageView2/1/w/500/h/500&sign=d781d94624f0c53bf1dd5e2c5b3cd19c&t=5a33870d',
    'http://p05samtwb.bkt.clouddn.com/20171201105821904207488.jpg?imageView2/1/w/500/h/500&sign=d781d94624f0c53bf1dd5e2c5b3cd19c&t=5a33870d',
    'http://p05samtwb.bkt.clouddn.com/20171124115559763495607.jpg?imageView2/1/w/500/h/500&sign=b152d873d60b060a6ef8eabc9a4b0b2e&t=5a33870d',
    'http://p05samtwb.bkt.clouddn.com/20171124115559763495607.jpg?imageView2/1/w/500/h/500&sign=b152d873d60b060a6ef8eabc9a4b0b2e&t=5a33870d',
    'http://p05samtwb.bkt.clouddn.com/20171124115559763495607.jpg?imageView2/1/w/500/h/500&sign=b152d873d60b060a6ef8eabc9a4b0b2e&t=5a33870d',
    'http://p05samtwb.bkt.clouddn.com/20171124115559763495607.jpg?imageView2/1/w/500/h/500&sign=b152d873d60b060a6ef8eabc9a4b0b2e&t=5a33870d',
    'http://p05samtwb.bkt.clouddn.com/20171124181544581752854.jpg?imageView2/1/w/500/h/500&sign=a592f3d37b9085e3e5d52bc0055195b0&t=5a33870d',
    'http://p05samtwb.bkt.clouddn.com/20171201105821904207488.jpg?imageView2/1/w/500/h/500&sign=d781d94624f0c53bf1dd5e2c5b3cd19c&t=5a33870d'];
let img=[require('../../src/img/icon_message.png'),require('../../src/img/icon_qq.png'),
    require('../../src/img/icon_videodetails_collect_s.png'),require('../../src/img/icon_videodetails_comment_s.png'),
    require('../../src/img/icon_wb.png'),require('../../src/img/icon_message.png'),
    require('../../src/img/icon_message.png'),require('../../src/img/icon_wx.png'),]


class HomeScene extends BaseScene {
    static navigationOptions = {
        // tabBarLabel: Config.navs_txt[0],
        tabBarIcon: ({focused,tintColor}) => (<Image source={focused ?Config.icons_s[0]:Config.icons[0]}/>)
    };

    constructor(props) {
        super(props);
        this.state={
              numpage:this.props.num?this.props.num:0,
            // data:[],
            lock:true,
            imgurlarr:imgurl,
            translateValue: new Animated.ValueXY({x:0, y:0}), // 二维坐标
            isshowtab:false,
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
        setTimeout(()=>{
            this.setState({
                imgurlarr:imgurla
            })
        },1000)
        setTimeout(()=>{
            this.setState({
                isshowtab:true
            })
        },1000)
        this.changeHeaderd= DeviceEventEmitter.addListener("changeHeaderd",this._changeHeaderd);

        this.changeHeaderu= DeviceEventEmitter.addListener("changeHeaderu",this._changeHeaderu);
        console.log(this.props.num);
        // this._getDataa();
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

        let parpam="thetype=1017&classtype=classify1&searchstr=美食";
        Request('1017',parpam)
            .then((responseJson) => {
                console.log('aaaaaaaaaaaaaaaaaaaaaaaaaa',responseJson.data.list)
                this.setState({
                    data:responseJson.data.list,
                })

            })
            .catch((error) => {
                Toast.show(error.toString());
            });
    };


    _changeHeaderu=()=>{
        if(Config.tabBarHight<60){
            this.state.translateValue.setValue({x:0, y:-Config.tabBarHight});
            // this.state.translateValue.setValue({x:0, y:-60});
        }else{
            this.state.translateValue.setValue({x:0, y:-60});
        }


    }
    _changeHeaderd=()=>{
        if(Config.tabBarHight<60){
            this.state.translateValue.setValue({x:0, y:Config.tabBarHight-60});
            // this.state.translateValue.setValue({x:0, y:0});
        }else{
            this.state.translateValue.setValue({x:0, y:60});
        }
    }

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
    };
    // require('../../src/img/icon_account_bg.png')
    renderTabBar=()=>{
        return(
            <TabBar  // tabStyle={{paddingLeft:0,paddingRight:0}}
                imgurl={this.state.imgurlarr} //网络图
                imgurla={img}       //本地图
                imageStyle={{width:25,height:25,borderRadius:8}}
                activeTextColor={"#c5b061"}
                backgroundColor={"#FFFFFF"}
                //imgurl="http://p05samtwb.bkt.clouddn.com/201711241118051750870811.jpg?imageView2/1/w/500/h/500&sign=0d16ac3603aaae8f1e8207f9090d9a7a&t=5a3282df"
                textStyle={{fontSize:12,fontWeight:'normal',marginTop:7}}

                inactiveTextColor={"#313131"}
                underlineStyle={{backgroundColor:"#c5b061",height:2}}
            />
        )

    };
    _renderTab=()=>{
        return(
            <View style={styles.tabs} >
                <View style={[styles.tab]}>
                    <Text style={{fontSize:14,color:'#c5b061'}} >
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

    render(){
        return (
            <Container>
                <StatusBar backgroundColor="#FFDA2C"
                           barStyle="light-content"
                           translucent={false}
                           hidden={false}/>
                <Header style={{height:0}} androidStatusBarColor='#c5b061'/>

                <View style={{flex:1,backgroundColor:'#fff'}} >
                    <View  //androidStatusBarColor='#f00'
                        style={{height:80,backgroundColor:'#fff',alignItems:'center'
                       }}>
                        <ImageBackground   style={{position:'absolute',top:0,width:width,height:width/472*65,flexDirection:'row'}} source={require('../img/icon_homebg.png')} >
                            <TouchableOpacity style={{position:'absolute',top:10,left:10}} activeOpacity={1}
                                              onPress={()=>Actions.TabView()}>
                                <Thumbnail square={true} style={{width:25,height:25}} source={require('../img/icon_videodetails_parse.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{position:'absolute',top:10,right:10}} activeOpacity={1}
                                              onPress={()=>Actions.TabView()}>
                                <Thumbnail square={true} style={{width:25,height:25}} source={require('../img/icon_videodetails_parse.png')} />
                            </TouchableOpacity>
                        </ImageBackground>

                        <TouchableOpacity style={{position:'absolute',top:width/472*65-width/1.28/595*70/3}} activeOpacity={1}
                                          onPress={()=>Actions.TabView()}>
                            <Thumbnail  style={{width:width/1.28,height:width/1.28/595*70}} source={require('../img/icon_homescence_search.png')} />
                        </TouchableOpacity>

                    </View>
                    {this.state.isshowtab?(<ScrollableTabView ref={(ScrollableTabView)=>this.ScrollableTabView=ScrollableTabView}
                                                              initialPage={this.state.numpage}
                                                              onChangeTab={(obj) => {this._onChangeTab(obj)}}
                                                              scrollWithoutAnimation={true}
                            //tabBarUnderLineStyle={{backgroundColor:"#f26c4f",margin:0,height:2}}
                                                              style={{flex:1,marginTop:10,paddingLeft:10,paddingRight:10}}
                                                              renderTabBar={() =>this.renderTabBar()}>
                            <MainScene  url={"thetype=1015&searchstr="} thetype="1015"  tabLabel="最新" header={"header"}  item={"video"} />

                            <Sofitel tabLabel="特辑" />

                            <ListScene url={"thetype=1015&classify2=融合菜"} tabLabel="融合菜" thetype="1015" item={"video"} />
                            <ListScene url={"thetype=1015&classify2=甜品"} tabLabel="甜品" thetype="1015" item={"video"}/>
                            <ListScene url={"thetype=1015&classify2=特色菜"} tabLabel="特色菜" thetype="1015" item={"video"}/>
                            <ListScene url={"thetype=1015&classify2=饮品"}  tabLabel="饮品" thetype="1015" item={"video"}/>

                            <ListScene url={"thetype=1015&classify2=其他"} tabLabel="其他" thetype="1015" item={"video"}/>
                            <ListScene url={"thetype=1015&classify2=小贴士"}  tabLabel="小贴士" thetype="1015" item={"video"}/>
                             {/*<ListScene url={"thetype=1015&classify2=大家的食谱"} sign={true}  tabLabel="大家的食谱" thetype="1015" item={"video"}/>*/}
                        </ScrollableTabView>):(
                        <View style={{flex:1,}}>
                            {this._renderTab()}
                            <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'rgba(0,0,0,0.2)'}}>
                                <ActivityIndicator size = 'small' />
                            </View>

                        </View>

                        )}




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

