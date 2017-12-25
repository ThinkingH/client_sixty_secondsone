/**
 * Created by Administrator on 2017/12/5.
 */
/**
 * Created by Administrator on 2017/12/5.
 */
/**
 * Created by Administrator on 2017/12/5.
 */
/**
 * Created by Administrator on 2017/12/5.
 */
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
    UIManager,
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
    DeviceEventEmitter,
    LayoutAnimation
} from "react-native";
import { Container, Header, Content,Button,Text,Thumbnail,Input,ListItem} from 'native-base';
import {Actions} from "react-native-router-flux";
import RNFetchBlob from 'react-native-fetch-blob';
import ImagePicker from 'react-native-image-crop-picker';
import Config from "../utils/Config";
import Toast from '@remobile/react-native-toast'

import Storage  from '../utils/Storage';
import MD5 from "react-native-md5";
import Spinnera from '../components/Spinner';
import Request from '../utils/Fetch';
const {width, height} = Dimensions.get('window');
// let _MaterValue=[{mvalue:'',cvalue:''},{mvalue:'',cvalue:''},{mvalue:'',cvalue:''}];
let b=new Array();
export default  class DeleteMater extends Component {
    constructor(props) {
        super(props);
        this.state = {
            steps:this.props.step,
        };
    }

    componentWillMount() {

    }

    componentWillUnmount() {
        //console.log('5555555555555555555',arr);
        let str= JSON.stringify(this.state.steps)
        Storage.saveWithKeyValue("steps",str);
           this.props.callbackstep({data:b});
    }

    componentDidMount() {

    }

    _delete=(i)=>{
        let parpam="thetype=1032&typec=1&sort="+i;
        Request('1032',parpam)
            .then((responseJson) => {
               Toast.show(responseJson.msg);
               this._deleteStep(i);
            })
            .catch((error) => {
                Toast.show(error.toString());
            });
    };

    _deleteStep=(i)=>{
        console.log('iiiiiiiiiiiiiiiiiii',i);
        //delete this.state.steps[i];
        //this.state.steps.slice(i,1)
        b=this.state.steps;
        b.splice(i,1);
        console.log('1111111111111111',b);
        console.log('22222222222222222222',this.state.steps);
        this.setState({
            steps:b,
        },()=>{console.log('3333333333333333333333',this.state.steps)})

    };

    _renderHistoryList=()=>{
        return(
            this.state.steps.map((item,i)=>
                <View style={{width:width}} key={i}>
                    <TouchableOpacity activeOpacity={1}
                                      style={[{backgroundColor:"#fff",width:width,height:width-width/2-40,alignItems:'center',flexDirection:'row'}]}>
                        <View style={{width:20,height:width-width/2-40,justifyContent:'center',alignItems:'center'}}>
                            <Text>{i+1}</Text>
                        </View>
                        <View style={{width:1,height:width-width/2-40,backgroundColor:'#ccc'}}></View>
                        <Input  style={{height:width-width/2-40,width:width/2-40,fontSize:14,textAlignVertical:'top',padding:0,marginTop:25}}
                                value={item.value}
                                placeholderTextColor="#ccc"
                                placeholder='nsdkl开始的规划理念的师傅来看你可能的看了愤怒的酷冷发来的念佛酷冷'
                                editable={false}
                                maxLength={80}
                                multiline={true}
                        />

                        <View
                            style={{marginRight:15,marginLeft:15,width:width-width/2-80,height:width-width/2-80,alignItems:'center',justifyContent:'center',backgroundColor:'#ccc'}}  >
                            <TouchableOpacity activeOpacity={0.9}
                                              style={{width:width-width/2-80,height:width-width/2-80,alignItems:'center',justifyContent:'center',backgroundColor:'#ccc'}}>
                                {item.imgurl==''?(
                                        <Image  style={{width:width/6,height:width/6}}
                                                source={require('../img/icon_videodetails_time.png')} />
                                    ):(
                                        <Image  style={{width:width-width/2-80,height:width-width/2-80}} source={item.imgurl} />
                                    )}
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={{width:40,height:width-width/2-40,justifyContent:'center',alignItems:'center'}} activeOpacity={0.9} onPress={()=>this._delete(i)}>
                            <Image  style={{width:25,height:25}}
                                    source={require('../img/icon_close.png')} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                    <View style={{width:width,height:1,backgroundColor:'#ccc'}}></View>
                </View>
            )
        )
    };

    render() {
        return (
            <Container>
                <Header androidStatusBarColor={Config.StatusBarColor} style={{height:0}}>
                </Header>
                <Content keyboardShouldPersistTaps="handled"  style={{backgroundColor:'#f1f1f2'}}>
                    {this._renderHistoryList()}
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
        flex:2,
        textAlignVertical:'center',
        marginLeft:15,
        marginRight:15,
        padding:0,
        backgroundColor:'#fff',


    },
    uploadtext: {
        color:"#555",
        fontSize:14,
        marginLeft:15,
        marginTop:10
    }
});
