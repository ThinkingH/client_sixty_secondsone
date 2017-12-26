/**
 * Created by Administrator on 2017/10/20.
 */
import React, { Component } from 'react';
import { ListView ,FlatList,View,Dimensions,Image,InteractionManager,DeviceEventEmitter} from 'react-native';
import {Actions} from "react-native-router-flux";
import Request from '../utils/Fetch';
import Toast from '@remobile/react-native-toast'
import { Container, Header, Content, Button, Icon, List, Thumbnail ,ListItem, Text,Left,Body,Right,Switch ,Card, CardItem,} from 'native-base';
import PLVideoView from "../widget/PLVideoView";

import Config from '../utils/Config';
import ListScene from "./ListScene";
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
        }
    }

    componentDidMount() {

    }

    render() {
        return (
        <View style={{flex:1,backgroundColor:'#fafafa'}}>
            <Header androidStatusBarColor={Config.StatusBarColor} style={{height:0}}>
            </Header>

            <ListScene url={"thetype=1015&imgwidth=500&imgheight=500&msgjihe="+this.props.id} header="sheader" sdata={this.props.datas}  thetype="1015"   item={"video"} />
            <View style={{position:'absolute',top:0,width:width,height:50,backgroundColor:'rgba(0,0,0,0.4)',flexDirection:'row'}}>
               <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                   <Image  style={{width:20,height:20}} source={require('../img/icon_close.png')} />
               </View>
                <View style={{flex:5,alignItems:'center',justifyContent:'center'}}>
                   <Text style={{fontSize:16,color:'#fff'}}>{this.props.datas.name}</Text>
                </View>
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                    <Image  style={{width:20,height:20}} source={require('../img/icon_share.png')} />
                </View>
            </View>
        </View>
        );
    }
}

