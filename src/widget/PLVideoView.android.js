import React, { PropTypes,Component } from 'react';
import {View,requireNativeComponent,UIManager,findNodeHandle,DeviceEventEmitter} from "react-native";


const RCT_VIDEO_REF = 'PLVideoView';

class PLVideoView extends Component{
    constructor(props){
        super(props);
    }

    _onPrepared(event){
        console.log("_onPrepared",event.nativeEvent)
        if(!this.props.onPrepared){
            return;
        }
        this.props.onPrepared(event.nativeEvent.duration);
    }

    _onError(event){
        if(!this.props.onError){
            return;
        }
        this.props.onError(event.nativeEvent);
    }


    _onBufferUpdate(event){
        if(!this.props.onBufferUpdate){
            return;
        }
        this.props.onBufferUpdate(event.nativeEvent.buffer);
    }
    _onCompletion(event){
        //console.log("onCompletion...:",event)
       // DeviceEventEmitter.emit('onCompletion','播放完成的回调');
        if(!this.props.onCompletion){
            return;
        }
        this.props.onCompletion(event.nativeEvent.completion);
    }
    _onProgress(event){
        if(!this.props.onProgress){
            return;
        }
        this.props.onProgress(event.nativeEvent.progress);
    }

    pause=()=>{
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this.refs[RCT_VIDEO_REF]),
            UIManager.PLVideoTextureView.Commands.pause,//Commands.pause与native层定义的COMMAND_PAUSE_NAME一致
            null//命令携带的参数数据
        );
    }

    start=()=>{
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this.refs[RCT_VIDEO_REF]),
            UIManager.PLVideoTextureView.Commands.start,
            null
        );
    }

    seekTo=(millSecond)=>{
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this.refs[RCT_VIDEO_REF]),
            UIManager.PLVideoTextureView.Commands.seekTo,[millSecond]);
    }

    setVideoPath=(url,imgurl)=>{
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this.refs[RCT_VIDEO_REF]),
            UIManager.PLVideoTextureView.Commands.reset,[url,imgurl]);
    }

    mute=()=>{
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this.refs[RCT_VIDEO_REF]),
            UIManager.PLVideoTextureView.Commands.mute, null
        );
    }

    unmute=()=>{
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this.refs[RCT_VIDEO_REF]),
            UIManager.PLVideoTextureView.Commands.unmute, null
        );
    }

    componentWillMount(){

    };

    componentWillUnmount() {
        console.log("PLVideoView ====>componentWillUnmount")
    }

    relese=()=>{
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this.refs[RCT_VIDEO_REF]),
            UIManager.PLVideoTextureView.Commands.stop, null
        );
    }

    render(){
        return <RCPLVideoView
            {...this.props}
            ref = {RCT_VIDEO_REF}
            onPrepared={this._onPrepared.bind(this)}
            onPLVideoViewError={this._onError.bind(this)}
            onBufferUpdate={this._onBufferUpdate.bind(this)}
            onProgress={this._onProgress.bind(this)}
            onCompletion={this._onCompletion.bind(this)}
        />;
    };
}

PLVideoView.name = "PLVideoView";
PLVideoView.propTypes = {
    onPrepared:PropTypes.func,
    onCompletion:PropTypes.func,
    onPLVideoViewError:PropTypes.func,
    onBufferUpdate:PropTypes.func,
    onProgress:PropTypes.func,

    style: View.propTypes.style,
    source:PropTypes.shape({
        url:PropTypes.string,
        headers:PropTypes.object,
        looping:PropTypes.boolean,
    }),
    ...View.propTypes,
};

var RCPLVideoView = requireNativeComponent('PLVideoTextureView',PLVideoView,{
    nativeOnly: {onChange: true}
});

module.exports = PLVideoView;