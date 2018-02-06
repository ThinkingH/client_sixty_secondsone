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
const {width, height} = Dimensions.get('window');
import MD5 from "react-native-md5";
import Spinnera from '../components/Spinner';
let imagedate='';
let _value='';
let imgdata='';
export default  class Contribute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            iscamera: true,
            value:"",
            modalVisible:false,
            disabled:true,
            btncolor:'#cfcfcf',
            isvisiable:false,
        }
    }

    componentWillMount () {

    }

    componentWillUnmount () {


    }

    componentDidMount () {

    }

    _upload=()=>{
        this.setState({
            isvisiable:true
        })
        let  system=Platform.OS.toUpperCase()
        let base64DataString=encodeURI(imgdata) ;
        let timestamp = Math.floor(Date.parse(new Date())/1000);
        let md5 = MD5.hex_md5('100'+system+'100'+""+'1020'+timestamp + Config.md5key);

        RNFetchBlob.fetch('POST',
            Config.BaseURL + "sixty/interface/sixtyinit.php",
            {
                'Content-Type' : 'multipart/form-data',
            },
            [{name:"imgdata",data:base64DataString},
                { name : 'version', data : '100'},
                { name : 'typeid', data : '2'},
                { name : 'dataid', data : this.props.dataid},
                { name : 'contentdata', data : this.state.value},
                { name : 'thetype', data : '1020'},
                { name : 'sysversion', data : '100'},
                { name : 'system', data : system+""},
                { name : 'houzhui', data : 'png'},
                { name : 'nowtime', data : timestamp+""},
                { name : 'md5key', data : md5},
                { name : 'usertype', data : Config.usertype},
                { name : 'userid', data : Config.userid},
                { name : 'userkey', data : Config.userkey},
            ])
            .then((resp) => {
            console.log(resp);
                return resp.json();
            }).then((responseJson)=>{
             this.setState({
                 isvisiable:false
             });
            _value=''
            imagedate='';
            console.log(responseJson);
            Toast.show(responseJson.msg);
            Actions.pop({ refresh: { iscontribute: true }})
        }) .catch((error) => {
            Toast.show(error.toString());
            this.setState({
                isvisiable:false
            })
        })
    }

    openPicker = (cropit) => {
        this.setState({
            modalVisible: false,
        });
        ImagePicker.openPicker({
            width: 400,
            height: 400,
            cropping: cropit,
            includeBase64: true,
            compressImageQuality: 0.7,
            compressImageMaxWidth: 1280,
            compressImageMaxHeight: 1920
        }).then(image => {
            console.log('received base64 image');
            imagedate={uri: `data:${image.mime};base64,` + image.data, width: 400, height: 400};
            imgdata=image.data;
            this.setState({
                img: {uri: `data:${image.mime};base64,` + image.data, width: 400, height: 400},
                imgdata: image.data,
            });
            this._isContribute();
        }).catch(e =>console.log(e));
    };

    openCamera = (cropit) => {
        this.setState({
            modalVisible: false,
        });
        ImagePicker.openCamera({
            width: 400,
            height: 400,
            cropping: cropit,
            includeBase64: true,
            compressImageQuality: 0.7,
            compressImageMaxWidth: 1280,
            compressImageMaxHeight: 1920
        }).then(image => {
            imgdata=image.data;
            imagedate={uri: `data:${image.mime};base64,` + image.data, width: 400, height: 400};
            this.setState({
                img: {uri: `data:${image.mime};base64,` + image.data, width: 400, height: 400},
                imgdata: image.data,
            });
             this._isContribute();
        });

    };

    _showModal=()=>{
        this.setState({
            modalVisible:true
        })
    };

    _isContribute=()=>{
        if(imagedate!=""&&_value!=""){
            this.setState({
                btncolor:'#f5c61e',
                disabled:false,
            })
        }else{
            this.setState({
                btncolor:'#ddd',
                disabled:true,
            })
        }
    };

    getValue=(value)=>{
        _value=value;
        this.setState({value});
        this._isContribute();
    };

    onContentSizeChange=(event) =>{
        this.setState({height: event.nativeEvent.contentSize.height});
        //this.ScrollView.scrollTo({y: event.nativeEvent.contentSize.height});
    };

    render (){
        return(
            <Container>
                <StatusBar backgroundColor={Config.StatusBarColor}
                           barStyle="dark-content"
                           translucent={false}
                           hidden={false}/>
                <Content  keyboardShouldPersistTaps="handled" style={{backgroundColor:'#f1f1f2'}}>
                {this._renderUpLoad()}

                {this._renderTextInput()}

                {this._renderModal()}

                    <Spinnera loadvalue="投稿中..." modalVisible={this.state.isvisiable} />


                </Content>
            </Container>
        )
    }

    _renderModal=()=>{
        return(
            <Modal animationType={'slide'}
                   transparent={true}
                   onRequestClose={() => { this.setState({modalVisible: false});}}
                   visible={this.state.modalVisible}
            >
                <TouchableOpacity  activeOpacity={1} onPress={()=> { this.setState({ modalVisible:false})}} style={{flex:1,alignItems:'center',justifyContent:'flex-end',backgroundColor:'rgba(0,0,0,0.5)'}}>
                    <TouchableOpacity activeOpacity={1} style={{width:width-20,height:height/2,marginBottom:10,flexDirection:'row',backgroundColor:'#fff',borderRadius:5}}>
                        <View style={{alignItems:'center'}}>
                            <TouchableOpacity onPress={()=>this.openPicker(true)} style={{width:width/6,height:width/6/133*114,marginLeft:30,marginTop:30}}>
                                <Image  style={{width:width/6,height:width/6/133*114}} source={require("../img/icon_contribute_modalpic.png")}>
                                </Image>
                            </TouchableOpacity>
                            <Text style={{marginLeft:30,fontSize:12,marginTop:5}}>相册</Text>
                        </View>
                        <View style={{alignItems:'center'}}>
                            <TouchableOpacity onPress={()=>this.openCamera(true)} style={{width:width/6,height:width/6/133*114,marginLeft:30,marginTop:30}}>
                                <Image  style={{width:width/6,height:width/6/133*114}} source={require("../img/icon_contribute_modalcamera.png")}>
                                </Image>
                            </TouchableOpacity>
                            <Text style={{marginLeft:30,fontSize:12,marginTop:5}}>相机</Text>
                        </View>
                        <View style={{position:'absolute',bottom:41,width:width,height:1,backgroundColor:'#ddd'}}>
                        </View>
                        <TouchableOpacity  onPress={()=>this.setState({modalVisible: false})} style={{position:'absolute',bottom:0,width:width,height:40,alignItems:'center',justifyContent:'center'}}>
                            <Text>取消</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
        )
    }

    _renderButton=()=>{
        return(
            <Button   block={true} style={{borderRadius:10,width:(width-40)/2,height:40,backgroundColor:this.state.btncolor,marginLeft:(width-(width-40)/2)/2,position:'absolute',bottom:0}}
                    textStyle={{fontSize:16}}
                    color="#fff"
                    onPress={()=>{this._upload()}}
                    disabled={this.state.disabled}
            >
                <Text>立即投稿</Text>
            </Button>
        )
    }

    _renderTextInput=()=>{
        return(
            <View style={{height:120}}>
            <View
                //ref={(ScrollView)=>this.ScrollView=ScrollView}
                  style={{marginLeft:20,width:width-40,height:100,borderRadius:10,backgroundColor:'#fff'}}>
                <TextInput
                    // defaultValue={"例）制作步骤简单、非常好吃！想让我的朋友们也来尝尝！例）制作步骤简单、非常好吃！想让我的朋友们也来尝尝！"}
                    underlineColorAndroid='transparent'
                    placeholderTextColor={'#bbbbbb'}
                    style={[styles.textInputStyle,{height:Math.max(35,this.state.height)}]}
                    placeholder={"简单的介绍你所做的成品"}
                    maxLength={100}
                    value={this.state.value}
                    multiline={true}
                    onChangeText={(value)=>{this.getValue(value)}}
                    onContentSizeChange={(event)=>this.onContentSizeChange(event)}
                />
            </View>
                {this._renderButton()}
            </View>
        )
    }

    _renderUpLoad=()=>{
        return(
            <View style={{width:width,height:height/2.5,alignItems:'center',justifyContent:'center'}}>
                {imagedate==""?(
                        <View style={{backgroundColor:'#fff',width:width-40,height:(width-40)/16*9,borderRadius:10,alignItems:'center',justifyContent:'center'}}>
                            <TouchableOpacity onPress={()=>{this._showModal()}} style={{width:width/8,height:width/8}}>
                                <Image  style={{width:width/8,height:width/8/5*4}} source={require("../img/icon_contribute_camera.png")}>
                                </Image>
                            </TouchableOpacity>
                            <Text style={{fontSize:12,marginTop:10}}>点击上传成品图片</Text>
                        </View>
                    ):(
                        <TouchableOpacity onPress={()=>{this._showModal()}} style={{width:width-40,height:(width-40)/16*9,borderRadius:10,alignItems:'center',justifyContent:'center'}}>
                            <Image resizeMode={'cover'} style={{width:width-40,height:(width-40)/16*9,borderRadius:10}} source={imagedate}>
                            </Image>
                        </TouchableOpacity>
                    )}
            </View>
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
});