/**
 * Created by Administrator on 2017/12/6.
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
import { Container, Header, Content,Button,Text,Thumbnail,Input,Left,Body,Right} from 'native-base';
import {Actions} from "react-native-router-flux";
import RNFetchBlob from 'react-native-fetch-blob';
import ImagePicker from 'react-native-image-crop-picker';
import Config from "../utils/Config";
import Toast from '@remobile/react-native-toast'
const {width, height} = Dimensions.get('window');
import MD5 from "react-native-md5";
import Storage  from '../utils/Storage';
import Spinnera from '../components/Spinner';
let imagedate='';
let imgdata='';
let _value="";
let id=1;
let stepnum=1;
export default  class InputStep extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value:this.props.step.value?this.props.step.value:"",
            modalVisible:false,
            isshowdelete:false,
            id:id,
            imgurl:imagedate,
            steps:this.props.step?this.props.step:[],
        };
    }

    componentWillMount() {

    }

    componentWillUnmount() {
        let str= JSON.stringify(this.state.steps)
        Storage.saveWithKeyValue("steps",str);
        this.props.callbackstep({data:this.state.steps});
    }

    componentDidMount() {
        if(this.props.step.length>0){
            stepnum=1;
            this.setState({
                value:this.props.step[0].value,
                imgurl:this.props.step[0].imgurl,
            })
        }
    }

    _upload=(num,updatenum)=>{
        let  system=Platform.OS.toUpperCase();
        let base64DataString=encodeURI(imgdata) ;
        let timestamp = Math.floor(Date.parse(new Date())/1000);
        let md5 = MD5.hex_md5('100'+system+'100'+""+'1031'+timestamp + Config.md5key);

        RNFetchBlob.fetch('POST',
            Config.BaseURL + "sixty/interface/sixtyinit.php",
            {
                'Content-Type' : 'multipart/form-data',
            },
            [{name:"imgdata",data:base64DataString},
                { name : 'version', data : '100'},
                { name : 'sort', data : stepnum-1+""},
                { name : 'cookid', data : '0'},
                { name : 'word', data : _value},
                { name : 'update', data : updatenum+''},
                { name : 'thetype', data : '1031'},
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
            console.log('responseJson',responseJson);
            this.setState({
                isvisiable:false
            });
            this._upLoadSuccess(num);
            Toast.show(responseJson.msg);
            // Actions.pop({ refresh: { iscontribute: true }})
        }) .catch((error) => {
            console.log('error',error);
             Toast.show(error.toString());
            this.setState({
                isvisiable:false
            },()=>{
                //在这里取值   这里是setstate完成后的回调
            })
        })
    };

    _upLoadSuccess=(num)=>{
        if(this.state.steps.length+1==stepnum){
            this.state.steps.push({id:this.state.id,value:this.state.value,imgurl:imagedate});

            // if(this.state.steps[stepnum-1].value==_value&&this.state.steps[stepnum-1].imgurl==imagedate) {
            //
            //     console.log('bbbbbbbbbb')
            // }else{
            //         console.log('aaaaaaaaa')
            //     this.state.steps[stepnum-1].value=_value;
            //     this.state.steps[stepnum-1].imgurl=imagedate;
            // }
        }else{
            if(this.state.steps[stepnum-1].value==this.state.value&&this.state.steps[stepnum-1].imgurl==this.state.imgurl) {
               // this.state.steps.push({id:this.state.id,value:this.state.value,imgurl:imagedate});
                console.log('bbbbbbbbbb')
            }else{
                console.log('aaaaaaaaa')
                if(this.state.steps[stepnum-1].value!=this.state.value){
                    this.state.steps[stepnum-1].value=_value;
                }
                if(this.state.steps[stepnum-1].imgurl!=this.state.imgurl){
                    this.state.steps[stepnum-1].imgurl=imagedate;
                }


            }
        }




        if(num==1){
            this._addView();
        } else{
            this._Minus()
        }
    };

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
                imgurl: {uri: `data:${image.mime};base64,` + image.data, width: 400, height: 400},
                img: image.data,
            });
            // this._isContribute();
        }).catch(e => console.log(e));
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
                imgurl: imagedate,
                img: image.data,
            });
            // this._isContribute();
        });

    };

    _showModal=()=>{
        this.setState({
            modalVisible:true
        })
    };

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
    };

    getValue=(value)=>{
        _value=value;
        this.setState({value});

    };

    onContentSizeChange=(event) =>{
        this.setState({height: event.nativeEvent.contentSize.height});
    };

    _renderTextInput=()=>{
        return(
            <View style={{width:width,height:width/3*2,backgroundColor:'#fff'}}>
                <TouchableOpacity activeOpacity={1}
                                  style={[{backgroundColor:"#fff",width:width,height:width/3*2,flexDirection:'row'}]}>
                    <View style={{width:20,height:width/3*2,justifyContent:'center',alignItems:'center'}}>
                        <Text>{stepnum}</Text>
                    </View>
                    <View style={{width:1,height:width/3*2,backgroundColor:'#ccc'}}></View>
                    <Input
                        placeholderTextColor="#ccc"
                        maxLength={80}
                        multiline={true}
                        onContentSizeChange={(event)=>this.onContentSizeChange(event)}
                        underlineColorAndroid='transparent'
                        style={[styles.textInputStyle,{height:Math.max(35,this.state.height)}]}
                        placeholder={"菜谱是烹调厨师利用各种烹饪原料、通过各种烹调技法创作出的某一菜肴品的烧菜方法现代餐厅中商家用于介绍自己菜品的小册子里面搭配菜图价位与简介等信息"}
                        value={this.state.value}
                        onChangeText={(value)=>{this.getValue(value)}}
                    />

                    <View
                        style={{marginRight:15,marginTop:15,marginLeft:15,width:width-width/2-80,height:width-width/2-80,alignItems:'center',justifyContent:'center',backgroundColor:'#ccc'}}  >
                        <TouchableOpacity activeOpacity={0.9} onPress={()=>{this._showModal()}}
                                          style={{width:width-width/2-80,height:width-width/2-80,alignItems:'center',justifyContent:'center',backgroundColor:'#ccc'}}>
                            {this.state.imgurl==''?(
                                    <Image  style={{width:width/6,height:width/6}} source={require('../img/icon_videodetails_time.png')} />
                                ):(
                                    <Image  style={{width:width-width/2-80,height:width-width/2-80}} source={this.state.imgurl} />
                                )}
                        </TouchableOpacity>
                    </View>
                    <View style={{width:width,height:30,position:'absolute',right:5,bottom:5,alignItems:'flex-end'}}>
                        <Text>剩余{80-this.state.value.length}个字</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    };

    _regulation=(num)=>{
        if(this.state.value==''||this.state.imgurl==''){
            if(num==1){
                Toast.show('请填写好图文')
            } else{
                if(this.state.value==''&&this.state.imgurl==''){
                    this._Minus()
                }else{


                    Toast.show('请填写好图文')
                }
            }
        }else{
            if(this.state.steps.length+1==stepnum){
                this._upload(num,1);



            }else{
                console.log('hhhhhhhhh')

                if(this.state.steps[stepnum-1].value==this.state.value&&this.state.steps[stepnum-1].imgurl==this.state.imgurl) {
                    console.log('jjjjjjjjjjjj')
                    if(num==1){
                        this._addView();
                    } else{
                        this._Minus()
                    }
                }else{
                    console.log('ggggggggg')
                    this._upload(num,2);
                }
            }


        }
    };

    _addView=()=>{
        //判断是否填写好了图文   然后 提交服务器  保存到本地数组    进入下一个步骤    第一步的时候不显示上一步   第二步开始显示
        if(stepnum==this.state.steps.length){
            console.log('3333333333333333333333333',this.state.steps)
            imgdata='';
            imagedate='';
            stepnum++;
            this.setState({
                id:this.state.steps.length+1,
                value:'',
                imgurl:imagedate,
            },()=>{
                if(this.state.id>1){
                    this.setState({
                        isshowdelete:true
                    })
                }else{
                    this.setState({
                        isshowdelete:false
                    })
                }
                //console.log('3333333333333333333333333',this.state.steps)
            });
        }else{
            let nstep=new Array();
            nstep=this.state.steps[stepnum];
            console.log(nstep)
            stepnum++;
            this.setState({
                id:nstep.id,
                value:nstep.value,
                imgurl:nstep.imgurl,
            })
        }
    };

    _Minus=()=>{
        //判断当前显示的是第几个   然后去数组里面拿上一条来显示
        if(stepnum>1){
            let pstep=new Array();
            pstep=this.state.steps[stepnum-2];
            console.log(pstep);
            stepnum--;
            this.setState({
                id:pstep.id,
                value:pstep.value,
                imgurl:pstep.imgurl,
            },()=>{
                if(this.state.id>1){
                    this.setState({
                        isshowdelete:true
                    })
                }else{
                    this.setState({
                        isshowdelete:false
                    })
                }
            })
        }
    };

    _renderHandler=()=>{
        return(
            <View style={{width:width,height:40,flexDirection:'row',alignItems:'center',marginBottom:40}}>
                {this.state.isshowdelete?(
                        <TouchableOpacity style={{width:50,height:40,marginLeft:15,justifyContent:'center'}} activeOpacity={0.9}
                                          onPress={()=>{ this._regulation(2)}}>
                            <Text style={{fontSize:14,color:'#C5B361'}}>上一步</Text>
                        </TouchableOpacity>
                    ):(null)}

                <View style={{flex:1}}>

                </View>
                <TouchableOpacity style={{width:50,height:40,marginRight:15,alignItems:'flex-end',justifyContent:'center'}} activeOpacity={0.9}
                                  onPress={()=>{this._regulation(1)}}>
                    <Text style={{fontSize:14,color:'#C5B361'}}>下一步</Text>
                </TouchableOpacity>
            </View>
        )
    };

    render() {
        return (
            <Container style={{backgroundColor:'#f8f8f8'}}>
                <Header androidStatusBarColor={Config.StatusBarColor} style={{backgroundColor:'#fefefe'}}>
                    <Left>
                        <TouchableOpacity activeOpacity={1} onPress={()=>Actions.pop()}>
                            <Thumbnail   style={{width:20,height:20}} source={require('../img/icon_back.png')} />
                        </TouchableOpacity>
                    </Left>
                    <Body>
                    <Text>步骤{stepnum}</Text>
                    </Body>
                    <Right>
                        <Button transparent  onPress={()=>Actions.setting()}>
                            <Text>保存</Text>
                        </Button>
                    </Right>
                </Header>
                <Content  keyboardShouldPersistTaps="handled"  style={{backgroundColor:'#f1f1f2'}}>
                    {this._renderTextInput()}
                    {this._renderHandler()}
                </Content>
                {this._renderModal()}
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
        width:width-width/2-40,height:width/3*2,fontSize:14,marginLeft:15,textAlignVertical:'top',padding:0,marginTop:15,
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
