import React, { Component } from 'react';
import { ListView,Dimensions,StyleSheet, Image ,ScrollView,ART,TouchableNativeFeedback,TextInput,TouchableOpacity,DeviceEventEmitter,Platform,LayoutAnimation,StatusBar,UIManager} from 'react-native';
import {Actions} from "react-native-router-flux";
import { Container, Header,View, Content, Button,
    Icon,Form,Item,Label,Input, List, ListItem,
    Text,Left,Right,Body ,Thumbnail,Row} from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import Request from '../utils/Fetch';
import Toast from '@remobile/react-native-toast'
import RNFetchBlob from 'react-native-fetch-blob';
import Config from '../utils/Config';
import MD5 from "react-native-md5";
import Spinnera from '../components/Spinner';

const {width, height} = Dimensions.get('window');
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
        width:width-100,
        textAlignVertical:'top',

        padding:0,
        backgroundColor:'#fff',
        marginTop:5,
        fontSize:14,
    },
    uploadtext: {
        color:"#555",
        fontSize:14,
        marginLeft:15,
        marginTop:10
    }
});
const aa=[1,2,3,4,5];
let imagedate='';
let imgdata='';
const {Surface, Shape, Path} = ART;
const path = Path()
    .moveTo(0,1)
    .lineTo(width-40,1);
export default class AccountInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arr:aa,
            name:this.props.namea?this.props.namea:'',
            address:this.props.address?this.props.address:'',
            desc:this.props.desc?this.props.desc:'',
            imageheader:this.props.image?{uri:this.props.image}:require('../img/noob.png'),
            isvisiable:false,
            isboy:this.props.sex?this.props.sex=='1'?true:false:true,
            inputcolor:'#000',
            aaaaa:0,
        };
        UIManager.setLayoutAnimationEnabledExperimental(true)
    }

    componentWillUpdate () {
        LayoutAnimation.easeInEaseOut();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.save==true) {
            this.setState({
                isvisiable:true,
            });
            this._saveInfo();
            if(imagedate!=''){
                this.setState({
                    isvisiable:true,
                });
                this.upload();
            }
        }
    }

    _saveInfo=()=>{
        let sex='';
        if(this.state.isboy){
            sex='1'
        }else{
            sex='2'
        }
        let parpam="thetype=1037"+'&nickname='+this.state.name+'&describes='+this.state.desc+'&sex='+sex+'&address='+this.state.address;
        console.log(this.state.name);
        Request('1037',parpam)
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    isvisiable:false,
                })
                Actions.pop({ refresh: { isaccountinfo: true }});
                imagedate='';
            })
            .catch((error) => {
                Toast.show(error.toString());
                this.setState({
                    isvisiable:false,
                })
            });
    };

    upload=()=>{
        let base64DataString=encodeURI(imgdata) ;

        let timestamp = Math.floor(Date.parse(new Date())/1000);
        let system=Platform.OS.toUpperCase();
        let md5 = MD5.hex_md5('100'+system+'100'+""+'1010'+timestamp + Config.md5key);
        RNFetchBlob.fetch('POST',
            "http://114.215.222.75:8005/sixty/interface/sixtyinit.php",
            { Authorization : "Bearer access-token",
                otherHeader : "foo",
                'Content-Type' : 'multipart/form-data',
            },
            [{name:"imgdata",type:'image/png',data:base64DataString},
                { name : 'version', data : '100'},
                { name : 'thetype', data : '1010'},
                { name : 'sysversion', data : '100'},
                { name : 'system', data : 'ANDROID'},
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
            Toast.show(responseJson.msg);
            this.setState({
                isvisiable:false
            })
            imagedate='';
           // Actions.pop();
        }) .catch((error) => {
            console.log("error",error)
            Toast.show(error.toString());
            this.setState({
                isvisiable:false
            });

        })
    };

    openPicker = (cropit) => {
        ImagePicker.openPicker({
            width: 400,
            height: 400,
            cropping: cropit,
            includeBase64: true,
            compressImageQuality: 0.7,
            compressImageMaxWidth: 1280,
            compressImageMaxHeight: 1920
        }).then(image => {
            imagedate={uri: `data:${image.mime};base64,` + image.data, width: 400, height: 400};
            imgdata=image.data;
            this.setState({
                img: {uri: `data:${image.mime};base64,` + image.data, width: 400, height: 400},
                imgdata: image.data,
            });

        }).catch(e => console.log(e));
    };

    _radioButton=(num)=>{
        if(num==1){
            this.setState({
                isboy:true
            })
        }else if(num==2){
            this.setState({
                isboy:false
            })
        }
    };

    getValue=(desc)=>{
        this.setState({desc});
    };

    _renderTextInput=()=>{
        return(
            <View style={{height:100}}>
                <View
                    //ref={(ScrollView)=>this.ScrollView=ScrollView}
                    style={{width:width-80,height:80,alignItems:'center',borderRadius:10,borderColor:'#ccc',borderWidth:1,backgroundColor:'#fff'}}>
                    <TextInput
                        // defaultValue={"例）制作步骤简单、非常好吃！想让我的朋友们也来尝尝！例）制作步骤简单、非常好吃！想让我的朋友们也来尝尝！"}
                        underlineColorAndroid='transparent'
                        placeholderTextColor={'#bbbbbb'}
                        style={[styles.textInputStyle,{height:Math.max(35,this.state.height)}]}
                        placeholder={"简单的介绍你自己"}
                        maxLength={80}
                        multiline={true}
                        value={this.state.desc}
                        onChangeText={(value)=>{this.getValue(value)}}
                        onContentSizeChange={(event)=>this.onContentSizeChange(event)}
                    />
                </View>



            </View>
        )
    };

    onContentSizeChange=(event)=> {
        this.setState({height: event.nativeEvent.contentSize.height});

    };

    render() {
        return (
            <Container  style={{backgroundColor:'#ccc'}}>
                <StatusBar backgroundColor={Config.StatusBarColor}
                           barStyle="light-content"
                           translucent={false}
                           hidden={false}/>
                <Content showsVerticalScrollIndicator={false}    keyboardShouldPersistTaps="handled" >
                    <View style={{marginLeft:20,width:width-40,height:height,backgroundColor:'#ccc',marginTop:10}}>
                        <View style={{flex:1,alignItems:'center',backgroundColor:'#fff',borderTopRightRadius:10,borderTopLeftRadius:10}}>
                            <View style={{width:width-80,flexDirection:"row",backgroundColor:'#f00'}}>
                                <View style={{backgroundColor:'#fff'}}>
                                    <Image  style={{width:width/5,height:width/5,borderRadius:width/10,margin:20,marginLeft:width/24}}
                                               source={imagedate==""?require('../img/icon_unloginbg.png'):imagedate} />
                                </View>
                                <View style={{flex:1,backgroundColor:'#fff',alignItems:'center',justifyContent:'center'}}>

                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                            <Text style={{fontSize:16}} >昵称</Text>
                                            <Input
                                                style={{padding:0,height:20,fontSize:14,margin:0,textAlign:'right',width:null,flex:1}}
                                                maxLength={5}
                                                placeholderTextColor={'#bbbbbb'}
                                                placeholder={"您的名字"}
                                                onChangeText={(name)=>this.setState({name})}
                                                value={this.state.name}/>
                                            <Image source={require('../img/newicon_account_edit.png')} style={{height:15, width:15}}/>
                                        </View>
                                       <View style={{height:1,width:width-50,backgroundColor:'#ccc'}}></View>
                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                            <Image source={require('../img/newicon_account_address.png')} style={{height:15, width:15}}/>
                                            <View style={{flex:1}}></View>
                                            <Input
                                                style={{padding:0,height:20,fontSize:14,margin:0,textAlign:'right',width:null,flex:1}}
                                                maxLength={8}
                                                multiline={false}
                                                placeholderTextColor={'#bbbbbb'}
                                                placeholder={"位置"}
                                                onChangeText={(address)=>this.setState({address})}
                                                value={this.state.address}/>
                                            <Image source={require('../img/newicon_account_edit.png')} style={{height:15, width:15}}/>
                                        </View>
                                   <View style={{height:1,width:width-50,backgroundColor:'#ccc'}}></View>
                                </View>
                                <TouchableOpacity activeOpacity={0.9} onPress={()=>{this.openPicker(true)}}
                                                  style={{width:width/12,height:width/12,position:'absolute',left:5,top:width/10+20-width/24}}>
                                    <Image style={{width:width/12,height:width/12}}
                                           source={require('../img/newicon_account_camera.png')} />
                                </TouchableOpacity>
                            </View>
                            <View style={{marginTop:20,marginBottom:20}}>
                                <Surface  width={width-80} height={1}>
                                    <Shape d={path} stroke="#C5B061" strokeWidth={1} strokeDash={[3,5]}/>
                                </Surface>
                            </View>
                            <View style={{flexDirection:'row',width:width-80,alignItems:'center'}}>
                                <Text>性别</Text>
                                <View style={{flex:1}}></View>
                                <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}} activeOpacity={0.9} onPress={()=>this._radioButton(2)}>
                                     <Thumbnail square style={{width:14,height:14}} source={this.state.isboy?require('../img/newicon_account_radion.png'):require('../img/newicon_account_radios.png')} />
                                     <Text style={{marginLeft:5}}>女生</Text></TouchableOpacity>
                                <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}} activeOpacity={0.9} onPress={()=>this._radioButton(1)}>
                                <Thumbnail square style={{width:14,height:14,marginLeft:10}} source={this.state.isboy?require('../img/newicon_account_radios.png'):require('../img/newicon_account_radion.png')} />
                                <Text style={{marginLeft:5}}>男生</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{height:1,width:width-80,backgroundColor:'#ccc',marginTop:5,marginBottom:20}}></View>
                            <View style={{width:width-80,marginBottom:10}}>
                                <Text style={{fontSize:16}}>介绍<Text style={{fontSize:14}}>（80字以内）</Text></Text>
                            </View>
                            {this._renderTextInput()}
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}


// <Content keyboardShouldPersistTaps="handled"  showsVerticalScrollIndicator={false}>
//     <Body style={{alignItems:'center',height:width/750*300+45}}>
//     <Thumbnail square  style={{width:width,height:width/750*300}} source={require('../img/icon_account_bg.png')} />
//     <Thumbnail large      style={{position:'absolute',top:width/750*300-40,width:80,height:80,borderWidth:2,borderColor:'#fff'}}
//                source={imagedate==""||null?this.state.imageheader:imagedate} >
//     </Thumbnail>
//
//     {Platform.OS=='ios'?(
//             <TouchableOpacity style={{position:'absolute',top:width/750*300-15,width:30,height:24}}
//                               onPress={()=>this.openPicker(true)}
//             >
//                 <Thumbnail square     style={{width:30,height:24}}
//                            source={require('../img/icon_contribute_camera.png')} />
//
//             </TouchableOpacity>
//         ):(
//             <TouchableNativeFeedback
//                 onPress={()=>this.openPicker(true)}
//                 background={TouchableNativeFeedback.Ripple("#ccc", true)}>
//                 <Thumbnail square     style={{position:'absolute',top:width/750*300-15,width:30,height:24}}
//                            source={require('../img/icon_contribute_camera.png')} />
//
//             </TouchableNativeFeedback>
//         )}
//
//
//     </Body>
//     <Form>
//     <Item floatingLabel>
//         <Label style={{fontSize:14}}>名称</Label>
//         <Input  maxLength={15} onChangeText={(name)=>this.setState({name})}  value={this.state.name}/>
//     </Item>
//     <Item style={{height:70,paddingTop:10}} floatingLabel  >
// <Label style={{fontSize:14,marginTop:10}}>自我介绍（180字以内）</Label>
// <Input  multiline={true}
// onContentSizeChange={this.onContentSizeChange.bind(this)}
// style={{height:Math.max(60,this.state.height)}}
// value={this.state.desc}
// maxLength={180}
// onChangeText={(desc)=>this.setState({desc})}
// />
//
// </Item>
// </Form>
// <Spinnera loadvalue="上传信息中..." modalVisible={this.state.isvisiable} />
// </Content>