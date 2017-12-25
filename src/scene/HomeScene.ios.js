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
    TouchableNativeFeedback, Animated, StatusBar, Platform
} from "react-native";
import Config from "../utils/Config";
import Storage  from '../utils/Storage';
const {width, height} = Dimensions.get('window');
class HomeScene extends BaseScene {
    static navigationOptions = {
        // tabBarLabel: Config.navs_txt[0],
        tabBarIcon: ({focused,tintColor}) => (<Image source={focused ?Config.icons_s[0]:Config.icons[0]}/>)
    };
    constructor(props) {
        super(props);
        this.state={
            //  numpage:this.props.num?this.props.num:0
            // data:[],
            translateValue: new Animated.ValueXY({x:0, y:0}), // 二维坐标
        }

    }

    componentDidMount(){
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
    }

    render(){
        return (
            <Container>
                {Platform.OS=='ios'?(null):(
                    <Header style={{height:0}} androidStatusBarColor={Config.StatusBarColor}>

                    </Header>
                )}

                <Animated.View style={[{backgroundColor:'#fff',flex:1,transform: [
                        {translateX: this.state.translateValue.x}, // x轴移动
                        {translateY: this.state.translateValue.y}, // y轴移动
                    ]}
                ]} >
                    <Row  //androidStatusBarColor='#f00'
                        style={{height:50,backgroundColor:'#fefefe',marginTop:20
                        }}>
                        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                            <Thumbnail square={true} style={{width:33,height:33}} source={require('../img/icon_mainlogo.png')} />
                        </View>

                        <TouchableOpacity style={{flex:5,justifyContent:'center'}} activeOpacity={1}
                                          onPress={()=>Actions.TabView()}>
                            <Thumbnail square={true} style={{width:width/1.28,height:width/1.28/595*70}} source={require('../img/icon_homescence_search.png')} />
                        </TouchableOpacity>

                    </Row>
                    <Tabs  tabBarUnderlineStyle={{backgroundColor:'#c5b361',height:2}}
                           initialPage={this.props.num?this.props.num:0}
                           locked={true}
                           onChangeTab={(onChangeTab)=>this._onChangeTab(onChangeTab)}
                        //let parpam="thetype=1015&searchstr="+this.props.classify;
                           renderTabBar={()=> <ScrollableTab />}>
                        <Tab
                        activeTextStyle={{color:'#c5b361',fontSize:14,fontWeight:'normal'}}
                        textStyle={{color:'#8c8c8c',fontSize:14}}
                        activeTabStyle={{backgroundColor:'#fff'}}
                        tabStyle={{backgroundColor:'#fff'}}
                        heading={'最新'} >
                        <MainScene url={"thetype=1015&searchstr="} thetype="1015" header={"header"}  item={"video"} />
                        </Tab>
                        <Tab  activeTextStyle={{color:'#c5b361',fontSize:14,fontWeight:'normal'}}
                              textStyle={{color:'#8c8c8c',fontSize:14}}
                              tabStyle={{backgroundColor:'#fff'}}
                              activeTabStyle={{backgroundColor:'#fff'}}
                              heading="特辑">
                            <Sofitel />
                        </Tab>
                        {/*{this.state.data.map((item,i)=>*/}
                        {/*<Tab key={i} activeTextStyle={{color:'#c5b361',fontSize:14}}*/}
                        {/*textStyle={{color:'#8c8c8c',fontSize:14}}*/}
                        {/*tabStyle={{backgroundColor:'#fff'}}*/}
                        {/*activeTabStyle={{backgroundColor:'#fff'}}*/}
                        {/*heading={item.name}>*/}
                        {/*<ListScene url={"thetype=1015&classify2="+item.name} thetype="1015" item={"video"} />*/}
                        {/*</Tab>*/}
                        {/*)}*/}
                        <Tab activeTextStyle={{color:'#c5b361',fontSize:14,fontWeight:'normal'}}
                             textStyle={{color:'#8c8c8c',fontSize:14}}
                             tabStyle={{backgroundColor:'#fff'}}
                             activeTabStyle={{backgroundColor:'#fff'}}
                             heading={"融合菜"}>
                            <ListScene url={"thetype=1015&classify2=融合菜"} thetype="1015" item={"video"} />
                        </Tab>
                        <Tab activeTextStyle={{color:'#c5b361',fontSize:14,fontWeight:'normal'}}
                             textStyle={{color:'#8c8c8c',fontSize:14}}
                             tabStyle={{backgroundColor:'#fff'}}
                             activeTabStyle={{backgroundColor:'#fff'}}
                             heading={"甜品"}>
                            <ListScene url={"thetype=1015&classify2=甜品"} thetype="1015" item={"video"}/>
                        </Tab>
                        <Tab activeTextStyle={{color:'#c5b361',fontSize:14,fontWeight:'normal'}}
                             textStyle={{color:'#8c8c8c',fontSize:14}}
                             tabStyle={{backgroundColor:'#fff'}}
                             activeTabStyle={{backgroundColor:'#fff'}}
                             heading={"特色菜"}>
                            <ListScene url={"thetype=1015&classify2=特色菜"} thetype="1015" item={"video"}/>
                        </Tab>
                        <Tab activeTextStyle={{color:'#c5b361',fontSize:14,fontWeight:'normal'}}
                             textStyle={{color:'#8c8c8c',fontSize:14}}
                             tabStyle={{backgroundColor:'#fff'}}
                             activeTabStyle={{backgroundColor:'#fff'}}
                             heading={"饮品"}>
                            <ListScene url={"thetype=1015&classify2=饮品"} thetype="1015" item={"video"}/>
                        </Tab>
                        <Tab activeTextStyle={{color:'#c5b361',fontSize:14,fontWeight:'normal'}}
                             textStyle={{color:'#8c8c8c',fontSize:14}}
                             tabStyle={{backgroundColor:'#fff'}}
                             activeTabStyle={{backgroundColor:'#fff'}}
                             heading={"其他"}>
                            <ListScene url={"thetype=1015&classify2=其他"} thetype="1015" item={"video"}/>
                        </Tab>
                        <Tab activeTextStyle={{color:'#c5b361',fontSize:14,fontWeight:'normal'}}
                             textStyle={{color:'#8c8c8c',fontSize:14}}
                             tabStyle={{backgroundColor:'#fff'}}
                             activeTabStyle={{backgroundColor:'#fff'}}
                             heading={"小贴士"}>
                            <ListScene url={"thetype=1015&classify2=小贴士"} thetype="1015" item={"video"}/>
                        </Tab>
                        <Tab activeTextStyle={{color:'#c5b361',fontSize:14,fontWeight:'normal'}}
                             textStyle={{color:'#8c8c8c',fontSize:14}}
                             tabStyle={{backgroundColor:'#fff'}}
                             activeTabStyle={{backgroundColor:'#fff'}}
                             heading={"大家的食谱"}>
                            <ListScene url={"thetype=1015&classify2=小贴士"} sign={true} thetype="1015" item={"video"}/>
                            <TouchableOpacity style={{position:'absolute',right:20,bottom:20,width:width/7,height:width/7}} activeOpacity={1} onPress={()=>{this._goContribute()}}>


                                <Thumbnail square style={{width:width/7,height:width/7,}} source={require('../img/icon_message.png')} />
                            </TouchableOpacity>
                        </Tab>
                    </Tabs>
                </Animated.View>

            </Container>
        );
    }
}

module.exports = HomeScene;
