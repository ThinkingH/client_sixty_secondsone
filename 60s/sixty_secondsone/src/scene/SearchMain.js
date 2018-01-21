/**
 * Created by Administrator on 2018/1/3.
 */
/**
 * Created by Administrator on 2017/12/15.
 */
import React,{ Component }  from 'react';
import {Actions} from "react-native-router-flux";
import BaseScene from "./BaseScene";
import ListScene from "./ListScene";
import Sofitel from './Sofitel';
import MainScene from './MainScene'
import Request from '../utils/Fetch';
import Toast from '@remobile/react-native-toast'
import { Container, Header, Title, List,Content,Thumbnail,TabHeading, Footer, FooterTab, Button, Left, Right, Body, Icon, Text ,Item, Input,Row  } from 'native-base';
import {
    StyleSheet, Image, Dimensions, View, Alert, ScrollView, DeviceEventEmitter, TouchableOpacity,ART,
    TouchableNativeFeedback, Animated, StatusBar, Platform,ActivityIndicator,ImageBackground,InteractionManager
} from "react-native";
import Config from "../utils/Config";
import ScrollableTabView, {DefaultTabBar,ScrollableTabBar} from 'react-native-scrollable-tab-view';
import Storage  from '../utils/Storage';
import TabBar from '../components/TabBar';

const {width, height} = Dimensions.get('window');

const {Surface, Shape, Path} = ART;
const path = Path()
    .moveTo(0,1)
    .lineTo(width-20,1);
class SearchMain extends Component {
    constructor(props) {
        super(props);
        this.state={
            data:[],
        }
    }

    componentDidMount(){
        this._getData();
        // InteractionManager.runAfterInteractions(() => {
        //
        // });
    };
    componentWillUnmount() {

    }

    _getData=()=>{
        let parpam="thetype=1043";
        Request('1043',parpam)
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

    render(){
        return (
            <Container>
                <StatusBar backgroundColor="transparent"
                           barStyle="light-content"
                           translucent={true}
                           hidden={false}/>
                <View style={{width:width,height:Config.STATUSBARHEIGHT,backgroundColor:Config.StatusBarColor}}>
                </View>
                    <ImageBackground    style={{width:width,height:50,flexDirection:'row'}} source={require('../img/icon_homebg.png')} >
                        <View style={{width:width,height:50,position:'absolute',alignItems:'center',justifyContent:'center',backgroundColor:'transparent'}}>
                            <Text style={{color:'#fff',backgroundColor:'transparent'}}>查找</Text>
                        </View>
                    </ImageBackground>
                <View style={{width:width,height:width/1.28/850*130/5*4,backgroundColor:'transparent'}}>
                </View>
                    <Content showsVerticalScrollIndicator={false} >
                    <View style={{padding:20}}>
                        <Text style={{marginBottom:10,fontSize:14,color:'#f5c61e'}}>人气分类</Text>
                        <Surface  width={width-40} height={1}>
                            <Shape d={path} stroke="#C5B061" strokeWidth={1} strokeDash={[3,5]}/>
                        </Surface>
                            {this.state.data.map((item,i)=>
                                <TouchableOpacity key={i}
                                                  onPress={()=> Actions.searchvideo({value:item.name,isassort:true})}
                                                  activeOpacity={0.9}
                                                  style={{width:width-40,height:width/4,marginTop:15}}>
                                    <View style={{flex:1,flexDirection:'row'}}>
                                        <View style={{width:width/4.5,height:width/4.5,borderRadius:10,backgroundColor:'#ccc'}}>
                                            <Image style={{width:width/4.5,height:width/4.5,borderRadius:10}}
                                                       source={{uri:item.showimg}} />
                                        </View>
                                        <View style={{flex:1,justifyContent:'center',marginLeft:10}}>
                                            <Text>{item.name}</Text>
                                            <Text style={{fontSize:14,color:'#ccc'}} numberOfLines={2}>{item.content}</Text>
                                        </View>
                                    </View>
                                    <Surface  width={width-40} height={1}>
                                        <Shape d={path} stroke="#ccc" strokeWidth={1} strokeDash={[3,5]}/>
                                    </Surface>
                                </TouchableOpacity>
                            )}
                    </View>
                    </Content>
                <TouchableOpacity style={{position:'absolute',left:(width-width/1.28)/2,top:width/472*65-width/1.28/850*130/3+Config.STATUSBARHEIGHT}} activeOpacity={1}
                                  onPress={()=>Actions.TabView()}>
                    <Image  style={{width:width/1.28,height:width/1.28/850*130}} source={require('../img/newicon_seachbar.png')} />
                </TouchableOpacity>
            </Container>
        );
    }
}

module.exports = SearchMain;
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

