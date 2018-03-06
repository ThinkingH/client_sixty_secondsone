/**
 * Created by Administrator on 2017/10/19.
 */
import React, { Component } from 'react';
import { ListView,Dimensions, Image ,TouchableNativeFeedback,DeviceEventEmitter,StatusBar,Platform,TouchableOpacity} from 'react-native';
import {Actions} from "react-native-router-flux";
import { Container, Header,View, Content, Button,
    Icon,Form,Item,Label,Input, List, ListItem,
    Text,Left,Right,Body ,Thumbnail,Row} from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import Request from '../utils/Fetch';
import Toast from '@remobile/react-native-toast'
import RNFetchBlob from 'react-native-fetch-blob';
import Config from '../utils/Config';
import Storage  from '../utils/Storage';
import MD5 from "react-native-md5";
import Spinnera from '../components/Spinner';
const aa=[1,2,3,4,5];
const {width, height} = Dimensions.get('window');
let imagedate='';

let imgdata='';
let username='';
export default class GetInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arr:aa,
            name:"",
            desc:"",
            buttonbg:'#ccc',
            disable:true,
            imageheader:require('../img/icon_unloginbg.png'),
            isvisiable:false,
        };
    }

    _saveInfo=()=>{
        let parpam="thetype=1007"+'&nickname='+this.state.name+'&describes='+this.state.desc;
        console.log(this.state.name);
        Request('1007',parpam)
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    isvisiable:false,
                })
            })
            .catch((error) => {
                Toast.show(error.toString());
                this.setState({
                    isvisiable:false,
                })
            });
    }

    upload=()=>{
        let base64DataString=encodeURI(imgdata) ;
        let timestamp = Math.floor(Date.parse(new Date())/1000);
        let system=Platform.OS.toUpperCase()
        let md5 = MD5.hex_md5('100'+system+'100'+""+'1010'+timestamp + Config.md5key);
        RNFetchBlob.fetch('POST',
            Config.BaseURL + "sixty/interface/sixtyinit.php?",
            {
                'Content-Type' : 'multipart/form-data',
            },
            [{name:"imgdata",data:base64DataString},
                { name : 'version', data : '100'},
                { name : 'thetype', data : '1010'},
                { name : 'sysversion', data : '100'},
                { name : 'system', data : system+''},
                { name : 'houzhui', data : 'png'},
                { name : 'nowtime', data : timestamp+""},
                { name : 'md5key', data : md5},
                { name : 'usertype', data : Config.usertype},
                { name : 'userid', data : Config.userid},
                { name : 'userkey', data : Config.userkey},
            ])
            .then((resp) => {
                return resp.json();
            }).then((responseJson)=>{
            this.setState({
                isvisiable:false,
            })

                 Toast.show(responseJson.msg)
        }) .catch((error) => {
            this.setState({
                isvisiable:false,
            })
            Toast.show(error.toString());
        })
    }

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
            this.iscanclick();
        }).catch(e => {}

         );


    };

    _login=()=>{
        console.log("id:",this.props.userid,"key:",this.props.userkey)
        if(imgdata==''){
            Toast.show("请选择头像");
            return
        }else if(this.state.name==""||null){
            Toast.show("请输入名称");
            return
        }

           this.setState({
               isvisiable:true,
           });
        Config.userid=this.props.userid;
        Config.userkey=this.props.userkey;
        Config.usertype="1";
        Storage.saveWithKeyValue("userid",this.props.userid);
        Storage.saveWithKeyValue("userkey",this.props.userkey);
        Storage.saveWithKeyValue("usertype","1");

        setTimeout(()=>{
            this.upload();
            this._saveInfo();
            Config.createJiGuangId();
            DeviceEventEmitter.emit("getinfo","刷新个人信息")
            Actions.pop();
        },1000);


    }

    iscanclick=()=>{
        if(imgdata!=''&&username!=""&&username!=null){
            this.setState({
                buttonbg:'#f5c61e',
                disable:false,
            })
        }else{
            this.setState({
                buttonbg:'#ccc',
                disable:true,
            })
        }
    }
    exchange=(name)=>{
        username=name;
        this.iscanclick();
        this.setState({
            name:name,
        })

    };

    render() {
        return (
            <Container  style={{backgroundColor:'#fff'}}>
                <StatusBar backgroundColor={Config.StatusBarColor}
                           barStyle="light-content"
                           translucent={false}
                           hidden={false}/>
                <Content keyboardShouldPersistTaps="handled"  showsVerticalScrollIndicator={false}>
                    <Text note style={{fontSize:14,marginLeft:17,marginTop:30,color:'#666'}}>个人头像（必填）</Text>
                    <Body style={{height:80}} >

                    <Thumbnail large  style={{position:'absolute',top:15,width:80,height:80,borderWidth:2,borderColor:'#fff'}}
                               source={imagedate==""||null?this.state.imageheader:imagedate} >
                    </Thumbnail>
                    {Platform.OS=='ios'?(
                        <TouchableOpacity
                            onPress={()=>this.openPicker(true)}
                            >
                            <Thumbnail square     style={{position:'absolute',top:40,width:30,height:24}}
                                       source={require('../img/icon_getinfo_camera.png')} />

                        </TouchableOpacity>
                    ):(
                        <TouchableNativeFeedback
                            onPress={()=>this.openPicker(true)}
                            background={TouchableNativeFeedback.Ripple("#ccc", true)}>
                            <Thumbnail square     style={{position:'absolute',top:40,width:30,height:24}}
                                       source={require('../img/icon_getinfo_camera.png')} />

                        </TouchableNativeFeedback>
                    )}

                    </Body>
                    <Form style={{marginTop:20}}>
                        <Item stackedLabel style={{padding:0,margin:0}}>
                            <Label style={{fontSize:14,color:'#666'}}>用户名称（必填）</Label>
                            <Input style={{padding:0}} onChangeText={(name)=>this.exchange(name)}  value={this.state.name}/>
                        </Item>

                    </Form>
                    <Body>
                    <Button onPress={()=>this._login()}
                            disabled={this.state.disable}
                            block
                            style={{height:40,width:width-60,backgroundColor:this.state.buttonbg,marginTop:20}} >
                        <Text style={{textAlign:'center'}}>完成注册</Text>
                    </Button>
                    </Body>
                    <Spinnera loadvalue="提交信息中..." modalVisible={this.state.isvisiable} />
                </Content>
            </Container>
        );
    }

    onContentSizeChange(event) {
        this.setState({height: event.nativeEvent.contentSize.height});

    }
    _onChangeText=()=>{

    }
}