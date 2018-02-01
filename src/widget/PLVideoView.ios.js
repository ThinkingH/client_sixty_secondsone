  import React, { Component } from 'react';
import {View,requireNativeComponent} from "react-native";
import PropTypes from 'prop-types';
const RCT_VIDEO_REF = 'PLVideoView';

class PLVideoView extends Component{
    constructor(props, context) {
        super(props, context);
        //console.log(props)
        this._onReady=this._onReady.bind(this);
        this._onLoading = this._onLoading.bind(this);
        this._onPaused = this._onPaused.bind(this);
        this._onStop = this._onStop.bind(this);
        this._onError = this._onError.bind(this);
        this._onPlaying = this._onPlaying.bind(this);
        this._onAutoReconnecting=this._onAutoReconnecting.bind(this);
        this._onProg=this._onProg.bind(this);
        this._onCompleted=this._onCompleted.bind(this);

        this.state={
            paused:false
        }
    }
    setNativeProps(nativeProps) {
        this._root.setNativeProps(nativeProps);
    }
    seek=(time)=>{
        this.setNativeProps({ seek: time })
    }
    setVolume=(volume)=>{
        this.setNativeProps({volume:volume})
    }
    _onReady(event){
        this.props.onPrepared&&this.props.onPrepared(event.nativeEvent.duration*1000);
    }
    _onAutoReconnecting(event){
        //this.props.onAutoReconnecting&&this.props.onAutoReconnecting(event.nativeEvent)
    }
    _onCompleted(event){
        console.log("播放完成")
        this.props.onCompletion&&this.props.onCompletion(event.nativeEvent)
    }
    _onLoading(event) {
        //this.props.onLoading && this.props.onLoading(event.nativeEvent);
    }

    _onPaused(event) {
        //this.props.onPaused && this.props.onPaused(event.nativeEvent);
    }

    _onStop(event) {
        //this.props._onStop && this.props._onStop(event.nativeEvent);
    }


    _onError(event) {
        //this.props.onError && this.props.onError(event.nativeEvent);
    }

    _onPlaying(event) {
        //this.props.onPlaying && this.props.onPlaying(event.nativeEvent);
    }

    _onProg(event){
        console.log(event.nativeEvent)
        this.props.onProgress&&this.props.onProgress(event.nativeEvent.currentTime*1000);
    }


    //----------------------------------------------------------
    relese=()=>{
        //释放资源
        this.setNativeProps({"relese":true})
    }


    pause=()=>{
        this.setState({
            pasuse:true
        })
        //this.setNativeProps({ pasuse: true })
    };

    start=()=>{
        this.setState({
            pasuse:false
        })
    };

    seekTo=(millSecond)=>{
         this.seek(millSecond*1000);
    };

    setVideoPath=(url,imgurl)=>{
        this.setNativeProps({ "url":url,"imageurl":imgurl })
    };

    mute=()=>{
        this.setNativeProps({ muted: true })
    };

    unmute=()=>{
        this.setNativeProps({ muted: false })
    };


    //----------------------------------------------------------

    render(){
        const nativeProps = Object.assign({}, this.props);
        Object.assign(nativeProps, {
            onLoading: this._onLoading,
            onPaused: this._onPaused,
            onStop: this._onStop,
            onError: this._onError,
            onPlaying: this._onPlaying,
            onReady:this._onReady,
            onAutoReconnecting:this._onAutoReconnecting,
            onCompleted:this._onCompleted,
            onProg:this._onProg
        });

        return <RCPLVideoView
            ref={component => this._root = component}
            {...nativeProps}
            paused={this.state.pasuse}
        />;
    };
}

PLVideoView.name = "PLVideoView";
PLVideoView.propTypes = {
    source: PropTypes.shape({                          // 是否符合指定格式的物件
        url: PropTypes.string.isRequired,
    }).isRequired,
    videoPath:PropTypes.shape({
        url: PropTypes.string.isRequired,
        iamgeurl: PropTypes.string
    }),
    seek:PropTypes.number,
    paused:PropTypes.bool,
    muted:PropTypes.bool, //iOS only
    loop:PropTypes.bool,
    volume:PropTypes.number,
    relese:PropTypes.bool,
    //autoPlay:PropTypes.bool,
    aspectRatio: PropTypes.oneOf([0, 1, 2, 3, 4]),
    onLoading: PropTypes.func,
    onPaused: PropTypes.func,
    onStop: PropTypes.func,
    onError: PropTypes.func,
    onPlaying: PropTypes.func,
    onReady:PropTypes.func,
    onAutoReconnecting:PropTypes.func,
    onCompleted:PropTypes.func,
    onProg:PropTypes.func,
    ...View.propTypes,
}


var RCPLVideoView = requireNativeComponent('PLVideoView',PLVideoView);
module.exports = PLVideoView;