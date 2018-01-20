/**
 * Created by Administrator on 2017/12/5.
 */
/**
 * Created by Administrator on 2017/12/5.
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
import Storage  from '../utils/Storage';
let _value="";
export default  class InputDesc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value:this.props.valuedesc?this.props.valuedesc:"",
        };
        _value=this.props.valuedesc?this.props.valuedesc:"";
    }

    componentWillMount() {

    }

    componentWillUnmount() {
        Storage.saveWithKeyValue("valuedesc",_value);
        this.props.callbackdesc({valuedesc:_value});
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
                    placeholder={"菜谱是烹调厨师利用各种烹饪原料、通过各种烹调技法创作出的某一菜肴品的烧菜方法现代餐厅中商家用于介绍自己菜品的小册子里面搭配菜图价位与简介等信息"}
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
            <Container style={{backgroundColor:'#f8f8f8'}}>
                {Platform.OS=='ios'?(null):(
                    <Header style={{height:0}} androidStatusBarColor={Config.StatusBarColor}>

                    </Header>
                )}
                <Content style={{backgroundColor:'#f1f1f2',}}>
                    {this._renderTextInput()}
                </Content>
                <View style={{width:width,height:30,position:'absolute',right:5,bottom:5,alignItems:'flex-end'}}>
                    <Text>剩余{300-this.state.value.length}个字</Text>
                </View>
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
});

