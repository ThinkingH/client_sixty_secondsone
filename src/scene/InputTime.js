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
const timearr=['5分以内','10分','15分','20分','30分','45分','60分','90分'];
const payarr=['10元以内','20元','25元','30元','40元','50元','50元以上'];
let _value="";
export default  class InputTime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value:this.props.valuetitle?this.props.valuetitle:"",
            data:timearr,
            datapay:payarr
        };
        _value=this.props.valuetitle?this.props.valuetitle:"";
    }

    componentWillMount() {

    }

    componentWillUnmount() {

    }

    componentDidMount() {

    }

    _goBack=(value)=>{
        if(this.props.time){
            this.props.callbacktime({valuetime:timearr[value]});
            Storage.saveWithKeyValue("timevalue",timearr[value]);
            Actions.pop();
        }else if(this.props.pay){
            Storage.saveWithKeyValue("payvalue",payarr[value]);
            this.props.callbackpay({valuepay:payarr[value]});
            Actions.pop();
        }
    };

    _renderTime=()=>{
        return(
            this.state.data.map((item,i)=>
                <View key={i} style={{backgroundColor:'#fff'}}>
                    <TouchableOpacity activeOpacity={0.9} onPress={()=>{this._goBack(i)}} style={{width:width,height:height/11,justifyContent:'center'}}>
                        <Text style={{marginLeft:10}}>{item}</Text>
                    </TouchableOpacity>
                    <View style={{width:width,height:1,backgroundColor:'#ccc'}}>
                    </View>
                </View>
            )
        )
    };

    _renderPay=()=>{
        return(
            this.state.datapay.map((item,i)=>
                <View key={i} style={{backgroundColor:'#fff'}}>
                    <TouchableOpacity activeOpacity={0.9} onPress={()=>{this._goBack(i)}} style={{width:width,height:height/11,justifyContent:'center'}}>
                        <Text style={{marginLeft:10}}>{item}</Text>
                    </TouchableOpacity>
                    <View style={{width:width,height:1,backgroundColor:'#ccc'}}>
                    </View>
                </View>
            )
        )
    };

    render() {
        return (
            <Container style={{backgroundColor:'#f8f8f8'}}>
                {Platform.OS=='ios'?(null):(
                    <Header style={{height:0}} androidStatusBarColor={Config.StatusBarColor}>

                    </Header>
                )}
                <Content style={{backgroundColor:'#f1f1f2'}}>
                    {this.props.time?this._renderTime():this._renderPay()}
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
/**
 * Created by Administrator on 2017/12/5.
 */
