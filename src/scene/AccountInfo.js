import React, { Component } from 'react';
import { ListView,Dimensions, Image ,TouchableNativeFeedback,TouchableOpacity,DeviceEventEmitter,Platform} from 'react-native';
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
const aa=[1,2,3,4,5];
const {width, height} = Dimensions.get('window');
let imagedate='';

let imgdata='';
export default class AccountInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arr:aa,
            name:this.props.namea?this.props.namea:null,
            desc:this.props.desc?this.props.desc:null,
            imageheader:this.props.image?{uri:this.props.image}:require('../img/noob.png'),
            isvisiable:false,
        };
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
        let parpam="thetype=1007"+'&nickname='+this.state.name+'&describes='+this.state.desc;
        console.log(this.state.name)
        Request('1007',parpam)
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({
                    isvisiable:false,
                })
                Actions.pop({ refresh: { isaccountinfo: true }})
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

    render() {
        return (
            <Container  style={{backgroundColor:'#fff'}}>
                {Platform.OS=='ios'?(null):(
                    <Header style={{height:0}} androidStatusBarColor={Config.StatusBarColor}>

                    </Header>
                )}

                <Content keyboardShouldPersistTaps="handled"  showsVerticalScrollIndicator={false}>
                    <Body style={{alignItems:'center',height:width/750*300+45}}>
                    <Thumbnail square  style={{width:width,height:width/750*300}} source={require('../img/icon_account_bg.png')} />
                    <Thumbnail large      style={{position:'absolute',top:width/750*300-40,width:80,height:80,borderWidth:2,borderColor:'#fff'}}
                               source={imagedate==""||null?this.state.imageheader:imagedate} >
                    </Thumbnail>

                    {Platform.OS=='ios'?(
                        <TouchableOpacity style={{position:'absolute',top:width/750*300-15,width:30,height:24}}
                            onPress={()=>this.openPicker(true)}
                            >
                            <Thumbnail square     style={{width:30,height:24}}
                                       source={require('../img/icon_contribute_camera.png')} />

                        </TouchableOpacity>
                    ):(
                        <TouchableNativeFeedback
                            onPress={()=>this.openPicker(true)}
                            background={TouchableNativeFeedback.Ripple("#ccc", true)}>
                            <Thumbnail square     style={{position:'absolute',top:width/750*300-15,width:30,height:24}}
                                       source={require('../img/icon_contribute_camera.png')} />

                        </TouchableNativeFeedback>
                    )}


                    </Body>
                    <Form>
                        <Item floatingLabel>
                            <Label style={{fontSize:14}}>名称</Label>
                            <Input onChangeText={(name)=>this.setState({name})}  value={this.state.name}/>
                        </Item>
                        <Item style={{height:70,paddingTop:10}} floatingLabel  >
                            <Label style={{fontSize:14,marginTop:10}}>自我介绍（180字以内）</Label>
                            <Input  multiline={true}
                                    onContentSizeChange={this.onContentSizeChange.bind(this)}
                                    style={{height:Math.max(60,this.state.height)}}
                                    value={this.state.desc}
                                    onChangeText={(desc)=>this.setState({desc})}
                            />

                        </Item>
                    </Form>
                    <Spinnera loadvalue="上传信息中..." modalVisible={this.state.isvisiable} />
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