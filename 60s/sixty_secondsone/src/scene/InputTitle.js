/**
 * Created by Administrator on 2017/10/10.
 */
/**
 * Created by mzy on 2017/9/26.
 * 本页面为投稿页面  实现拍照 文字上传
 */

import React, {Component} from 'react';
import {
    View,
    Platform,
    StyleSheet,
    TouchableHighlight,
    Image,
    Alert,
    KeyboardAvoidingView,
    StatusBar,
    TouchableOpacity,
    WebView,
    TextInput,
    Dimensions,
    Animated,
    Modal,
    ScrollView,
    InteractionManager,
    DeviceEventEmitter
} from "react-native";
import { Container, Header, Content,Button,Text,Thumbnail,Input} from 'native-base';
import {Actions} from "react-native-router-flux";
import RNFetchBlob from 'react-native-fetch-blob';
import ImagePicker from 'react-native-image-crop-picker';
import Config from "../utils/Config";
import Toast from '@remobile/react-native-toast'

import MD5 from "react-native-md5";
import Spinnera from '../components/Spinner';
import Storage  from '../utils/Storage';

const {width, height} = Dimensions.get('window');
let _value="";
export default  class InputTitle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value:this.props.valuetitle?this.props.valuetitle:"",
        };
        _value=this.props.valuetitle?this.props.valuetitle:"";
    }

    componentWillMount() {

    }

    componentWillUnmount() {
        Storage.saveWithKeyValue("titlevalue",_value);
       this.props.callbacktitle({titlevalue:_value});
    }

    componentDidMount() {

    }

    getValue=(value)=>{
        _value=value;
        this.setState({value});

    };

    onContentSizeChange=(event) =>{
        this.setState({height: event.nativeEvent.contentSize.height});
    };

    _renderTextInput=()=>{
        return(
            <View style={{width:width,height:100,backgroundColor:'#fff'}}>
                <TextInput
                    // defaultValue={"例）制作步骤简单、非常好吃！想让我的朋友们也来尝尝！例）制作步骤简单、非常好吃！想让我的朋友们也来尝尝！"}
                    underlineColorAndroid='transparent'
                    placeholderTextColor={'#bbbbbb'}
                    style={[styles.textInputStyle,{height:Math.max(35,this.state.height)}]}
                    placeholder={"红烧狮子头"}
                    maxLength={300}
                    value={this.state.value}
                    multiline={true}
                    onChangeText={(value)=>{this.getValue(value)}}
                    onContentSizeChange={(event)=>this.onContentSizeChange(event)}
                />
            </View>
        )
    };

    render() {
        return (
            <Container>
                {Platform.OS=='ios'?(null):(
                    <Header style={{height:0}} androidStatusBarColor={Config.StatusBarColor}>

                    </Header>
                )}
                <Content style={{backgroundColor:'#f1f1f2'}}>
                    {this._renderTextInput()}
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: '#f1f1f2',
    },
    backgroundVideo: {
        width:width,
        height:height/2.5,
        marginBottom:100,
    },
    textInputStyle: {
        flex:1,
        textAlignVertical:'top',
        marginLeft:15,
        marginRight:15,
        padding:0,
        backgroundColor:'#fff',

        marginTop:5
    },
    uploadtext: {
        color:"#555",
        fontSize:14,
        marginLeft:15,
        marginTop:10
    }
});/**
 * Created by Administrator on 2017/12/5.
 */
