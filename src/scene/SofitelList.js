/**
 * Created by Administrator on 2017/10/20.
 */
import React, { Component } from 'react';
import {
    ListView, FlatList, View, Dimensions, Image, InteractionManager, TouchableOpacity, DeviceEventEmitter,
    StatusBar, Platform
} from 'react-native';
import {Actions} from "react-native-router-flux";
import Request from '../utils/Fetch';
import Toast from '@remobile/react-native-toast'
import { Container, Header, Content, Button, Icon, List, Thumbnail ,ListItem, Text,Left,Body,Right,Switch ,Card, CardItem,} from 'native-base';
import PLVideoView from "../widget/PLVideoView";
import VideoItem from '../components/VideoItem';
import Config from '../utils/Config';
import ListScene from "./ListScene";
import ShareUtile from '../utils/ShareUtil'

const data = [
    {"name" : "Melody", age: 21,id:1},
    {"name" : "ZZ", age: 22,id:2},
    {"name" : "ZZ", age: 22,id:3},
    {"name" : "ZZ", age: 22,id:4},
    {"name" : "ZZ", age: 22,id:5},
    {"name" : "ZZ", age: 22,id:6},
    {"name" : "ZZ", age: 22,id:7},
    {"name" : "ZZ", age: 22,id:8},
    {"name" : "ZZ", age: 22,id:9},
    {"name" : "ZZ", age: 22,id:10},

];
const {width, height} = Dimensions.get('window');

export default class SofitelList extends Component {
    constructor(props) {
        super(props);
        this.state={
            data:[],
            viewopacity:'transparent',
            navibaropacity:0,
            shareurl:''
        }
    }

    componentDidMount() {
              this._getData();
    }

    _getData=()=>{

        let parpam="thetype=1046&imgwidth=500&imgheight=500&pagesize=10&page=1&msgjihe="+this.props.id;
        Request('1046',parpam)
            .then((responseJson) => {
            console.log('3333333333333333333333333',responseJson.data)
                this.setState({
                    data:responseJson.data.list,
                     shareurl:responseJson.data.share
                })
            })
            .catch((error) => {
                Toast.show(error.toString());
            });
    };

    _onScrollEnd=(e)=>{
        if(e.nativeEvent.contentOffset.y<=width/2){
            this.viewopacity.setNativeProps({
                style: {backgroundColor:'rgba(245,198,30,'+e.nativeEvent.contentOffset.y/(width/2)+')'}
            });
        }else if(e.nativeEvent.contentOffset.y>width/2){
            this.viewopacity.setNativeProps({
                style: {backgroundColor:'rgba(245,198,30,'+e.nativeEvent.contentOffset.y/(width/2)+')'}
            });
        }

        if(e.nativeEvent.contentOffset.y<=width/2){
            this.navibar.setNativeProps({
                style: {opacity:e.nativeEvent.contentOffset.y/(width/2)}
            });
        }else if(e.nativeEvent.contentOffset.y>width/2){
            this.navibar.setNativeProps({
                style: {opacity:e.nativeEvent.contentOffset.y/(width/2)}
            });
        }

        if(e.nativeEvent.contentOffset.y<=width/2){
            this.navibara.setNativeProps({
                style: {opacity:e.nativeEvent.contentOffset.y/(width/2)}
            });
        }else if(e.nativeEvent.contentOffset.y>width/2){
            this.navibara.setNativeProps({
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

    _rendersofitelist=()=>{
        return(
            this.state.data.map((item,i)=>
            <VideoItem selected={item.coll} key={i} item={item} index={i}>

            </VideoItem>
            )
        )
    }

    _share=()=>{


        let list = [0,2,3];
        ShareUtile.shareboard(this.props.datas.content,
            this.state.data.showimg,
            this.state.shareurl,
            this.props.title,
            list,(code,message) =>{
                console.log('wwwwwwwwwwwwwwwwwwwwwwww',message,code)
                Toast.show(message);

                // this.videos.start();
            });
    };

    render() {
        return (
        <View style={{flex:1,backgroundColor:'#fff'}}>
            <Content onScroll={(e)=>this._onScrollEnd(e)} showsVerticalScrollIndicator={false}>


                <View style={{backgroundColor:'#fff'}}  >
                    <Image source={{uri:this.props.datas.showimg}} style={{height: width/16*9, width: width}}/>
                    <View  style={{padding:15}}>
                        <Text style={{fontSize:10,color:'#c79b1e'}}>{this.props.datas.create_date}</Text>
                        <Text style={{marginTop:10,fontSize:14,color:'#666'}}>{this.props.datas.name}</Text>
                        <Text  note style={{marginTop:10,fontSize:12,color:'#999'}}>{this.props.datas.content}</Text>
                    </View>

                </View>
                <View style={{width:width,flexDirection:'row',flexWrap:'wrap',backgroundColor:'#fff'}}>

                    {this._rendersofitelist()}
                </View>

            </Content>
            <View ref={(viewopacity)=>this.viewopacity=viewopacity}
                  style={{position:'absolute',top:0,width:width,height:Config.STATUSBARHEIGHT,backgroundColor:this.state.viewopacity}}>
            </View>
            <View ref={(navibar)=>this.navibar=navibar}
                  style={{position:'absolute',top:Config.STATUSBARHEIGHT,width:width,height:50,opacity:this.state.navibaropacity,justifyContent:'center',alignItems:'center',backgroundColor:'rgba(0,0,0,0.5)'}}>
            </View>
            <View ref={(navibar)=>this.navibara=navibar}
                  style={{position:'absolute',top:Config.STATUSBARHEIGHT,width:width,height:50,
                      opacity:this.state.navibaropacity,justifyContent:'center',alignItems:'center',backgroundColor:'transparent'}}>
                <Text style={{fontSize:16,color:'#fff'}}>{this.props.title}</Text>
            </View>
            {/*<TouchableOpacity style={{position:'absolute',left:20,top:StatusBar.currentHeight+15,width:20,height:20}} activeOpacity={0.9} onPress={()=>Actions.popTo('homescene')}>*/}
                {/*<Image  style={{width:20,height:20}} source={require('../img/newicon_closeback.png')} />*/}
            {/*</TouchableOpacity>*/}
            {/*<TouchableOpacity style={{position:'absolute',right:20,top:StatusBar.currentHeight+15,width:20,height:20}} activeOpacity={0.9} onPress={()=>this._share()}>*/}
                {/*<Image  style={{width:20,height:20}} source={require('../img/newicon_share.png')} />*/}
            {/*</TouchableOpacity>*/}
            <TouchableOpacity style={{position:'absolute',left:20,top:Config.STATUSBARHEIGHT+15,width:20,height:20}} activeOpacity={0.9} onPress={()=>Actions.pop()}>
                <Image  style={{width:20,height:20}} source={require('../img/newicon_closeback.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={{position:'absolute',right:20,top:Config.STATUSBARHEIGHT+15,width:20,height:20,}} activeOpacity={0.9} onPress={()=>this._share()}>
                <Image  style={{width:20,height:20}} source={require('../img/newicon_share.png')} />
            </TouchableOpacity>
        </View>
        );
    }
}

