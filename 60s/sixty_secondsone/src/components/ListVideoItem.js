/**
 * Created by Administrator on 2017/11/20.
 */
import React, { Component } from "react";
'use strict';
import {
    AppRegistry,
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import PLVideoView from "../widget/PLVideoView";
import { Actions } from 'react-native-router-flux';
const {width, height} = Dimensions.get('window');

export default class ListVideoItem extends Component{
    constructor(props){
        super(props);

    }

    _onPress = () => {
         this.video.pause();
        Actions.videodetails({title:this.props.data.biaoti,nowid:this.props.data.vid})

    };

    render() {
        return (
            <View >

                <PLVideoView
                    // ref={PLVideoView}
                    ref={(video)=>{this.video = video}}
                    style={{width:width,height:width,marginBottom:3}}
                    source={
                             {
                                 url:this.props.data.videourl, //this.props.data.videourl,
                                 looping:true,
                                 headers: {
                                     'refer': 'myRefer'
                                 },
                                 autoplay:true,
                                 coverurl:this.props.data.showimg,
                                 bufferurl:this.props.data.showimg,
                             }
                         }
                    onPrepared={(e)=>{
                             console.log("JS"+e.duration);
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
                             console.log("JS progress = "+progress);
                         }}/>
                <TouchableOpacity onPress={()=>this._onPress()} activeOpacity={1}  style={{position:'absolute',width:width,height:width}}>

                </TouchableOpacity>
            </View>


        )
    }
}
