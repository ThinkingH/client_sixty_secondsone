/**
 * Created by Administrator on 2017/10/13.
 */
import React, { Component } from 'react';
import {
    ScrollView, StyleSheet, FlatList, View, Text, Dimensions, TextInput, ImageBackground, InteractionManager, Modal,
    Image, TouchableOpacity, Slider, Alert, DeviceEventEmitter, Platform
} from 'react-native';
import {Actions} from "react-native-router-flux";
import Request from '../utils/Fetch';
import Config from '../utils/Config';
import Toast from '@remobile/react-native-toast'
import { Container, Header, Content, Button,Form,Item, Icon, List,Badge,Col,
    Thumbnail ,ListItem, Left,Body,Right,Switch ,Card, CardItem,Row,FooterTab,Footer,Input} from 'native-base';
import RNFetchBlob from 'react-native-fetch-blob';
import ImagePicker from 'react-native-image-crop-picker';
import MD5 from "react-native-md5";
import Spinnera from '../components/Spinner';
import Storage  from '../utils/Storage';
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,backgroundColor: '#efeff4',
    },
    texts :{
        color:'#595959',
        fontSize:14
    },
    textb :{
        color:'#555',
        fontSize:18
    },
    imagelogo:{
        width:25,height:25
    },order_num:{
        backgroundColor:"#C5B361",
        width:17,
        height:17,
        top:2,
        right:width/8-15,
        position:'absolute',
        borderRadius:17,
        justifyContent:'center',
        alignItems:'center',
    },
    textInputStyle: {
        flex:2,
        textAlignVertical:'center',
        marginLeft:15,
        marginRight:15,
        padding:0,
        color:'#000',
        backgroundColor:'#fff',
    },
});

let imagedate='';
let imgdata='';
let step=[];
let materarr=[{mvalue:'鸡蛋',cvalue:'1个',id:0,rmvalue:'',rcvalue:''},
    {mvalue:'猪肉',cvalue:'100g',id:1,rmvalue:'',rcvalue:''},
    {mvalue:'色拉油',cvalue:'少许',id:2,rmvalue:'',rcvalue:''}];

export default class ContributeByUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible:false,
            valuetitle:'',
            valuedesc:'',
            valuetime:'',
            valuepay:'',
            valuepoint:'',
            several:'',
            pointheight:0,
            materdata:materarr,
            steps:[{id:1,value:'',imgurl:''}],
            disabled:false
        };
        this._init()
    }

    componentWillMount () {

    }

    _init=()=>{

        Storage.getValueForKey("titlevalue").then((value) => {
            //console.log("titlevalue :",  JSON.parse(value));
            if(value!=''&&value!=undefined&&value!=null){
                this.setState({
                    valuetitle:value
                })
            }
        });
        Storage.getValueForKey("timevalue").then((value) => {
          //  console.log("listViewData :",  JSON.parse(value));
            if(value!=''&&value!=undefined){
                this.setState({
                    valuetime:value
                })
            }
        });
        Storage.getValueForKey("payvalue").then((value) => {
          //  console.log("listViewData :",  JSON.parse(value));
            if(value!=''&&value!=undefined){
                this.setState({
                    valuepay:value
                })
            }
        });
        Storage.getValueForKey("valuepoint").then((value) => {
            //console.log("listViewData :",  JSON.parse(value));
            if(value!=''&&value!=undefined){
                this.setState({
                    valuepoint:value
                })
            }
        });
        Storage.getValueForKey("valuedesc").then((value) => {
            //console.log("listViewData :",  value);
            if(value!=''&&value!=undefined){
                this.setState({
                    valuedesc:value
                })
            }
        });
        Storage.getValueForKey("steps").then((value) => {

            //let valuea=JSON.parse(value);
            if(value!=''&&value!=undefined){
                console.log("stepsstepsstepsstepssteps :",  JSON.parse(value));
                this.setState({
                    steps: JSON.parse(value)
                });
                step=JSON.parse(value);
            }
        });
        Storage.getValueForKey("matervalue").then((value) => {

            //let value=JSON.parse(value);
            if(value!=''&&value!=undefined){
                console.log('matervaluematervaluematervalueaaaaaaaaaaaaa:',JSON.parse(value))
                this.setState({
                    materdata:JSON.parse(value)
                })
            }else{
                //console.log('matervaluematervaluematervaluebbbbbbbbbbb:',JSON.parse(value))
                // console.log("listViewDatalistViewDatalistViewDatalistViewData 2222:",  value);
                // let mater=new Array();
                // mater=materarrb;
                // console.log("listViewDatalistViewDatalistViewDatalistViewData 3333:",  mater);
                this.setState({
                    materdata:[{mvalue:'鸡蛋',cvalue:'1个',id:0,rmvalue:'',rcvalue:''},
                        {mvalue:'猪肉',cvalue:'100g',id:1,rmvalue:'',rcvalue:''},
                        {mvalue:'色拉油',cvalue:'少许',id:2,rmvalue:'',rcvalue:''}]
                },()=>{
                    console.log("listViewDatalistViewDatalistViewDatalistViewData 3333:",  this.state.materdata);
                })
            }
           // console.log("listViewDatalistViewDatalistViewDatalistViewData1111 :",  JSON.parse(value));
            console.log("listViewDatalistViewDatalistViewDatalistViewData 2222:",  value);

        });
        Storage.getValueForKey("several").then((value) => {
         //   console.log("listViewData :",  JSON.parse(value));
            if(value!=''&&value!=undefined){
                this.setState({
                    several: value
                })
            }
        });


        //
        // Storage.saveWithKeyValue("uptime",timestamp1);

    };

    componentWillUnmount () {

    }

    componentDidMount () {
        InteractionManager.runAfterInteractions(() => {

        });
        console.log('999898989898982555555555555555',this.state.materdata)
         console.log('6666666666666666666666666666666666',this.state.steps[0].value,this.state.steps)
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.save==true) {
                Actions.dietarycontribute();
        }

    }

    _upload=()=>{

        let  system=Platform.OS.toUpperCase();
        let base64DataString=encodeURI(imgdata) ;
        let timestamp = Math.floor(Date.parse(new Date())/1000);
        let md5 = MD5.hex_md5('100'+system+'100'+""+'1020'+timestamp + Config.md5key);

        RNFetchBlob.fetch('POST',
            "http://114.215.222.75:8005/sixty/interface/sixtyinit.php",
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

    // _getData=()=>{
    //     let parpam="thetype=1016&imgwidth=800&imgheight=800&nowid="+this.props.nowid+"";
    //     Request('1016',parpam)
    //         .then((responseJson) => {
    //             this.setState({
    //                 data:responseJson.data,
    //                 cailiaoarr:responseJson.data.cailiaoarr,
    //                 buzhouarr:responseJson.data.buzhouarr,
    //             })
    //
    //
    //         })
    //         .catch((error) => {
    //
    //             Toast.show(error.toString());
    //         });
    // }

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
        }).catch(e => alert(e));
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

    _renderContributeImage=()=>{
        return(
            <View style={{width:width,height:width}}>
                <ImageBackground
                    style={{width:width,height:width,alignItems:'center',justifyContent:'center',backgroundColor:'rgba(0,0,0,0.5)'}} source={require('../img/icon_videodetails_time.png')} >
                   <TouchableOpacity activeOpacity={0.9} onPress={()=>{this._showModal()}}
                       style={{width:width,height:width,alignItems:'center',justifyContent:'center',backgroundColor:'rgba(0,0,0,0.5)'}}>
                       {imagedate==''?(
                               <Image  style={{width:width/3,height:width/3}} source={require('../img/icon_videodetails_time.png')} />
                           ):(
                               <Image  style={{width:width,height:width}} source={imagedate} />
                           )}
                   </TouchableOpacity>


                </ImageBackground>

            </View>
        )
    };

    _renderTitle=()=>{
        return(
            <View style={{width:width,backgroundColor:'#fafafa'}}>
                <View style={{width:width,height:70,justifyContent:'center'}}>
                    <Text style={{marginTop:20,marginLeft:15}}>菜谱名字（必填）</Text>
                </View>
                <View style={{width:width,height:1,backgroundColor:'#f0f0f0'}}></View>
                <TouchableOpacity activeOpacity={1} onPress={()=>Actions.inputtitle({callbacktitle:this._getTitle,valuetitle:this.state.valuetitle})} style={{backgroundColor:"#fff",width:width,height:40,justifyContent:'center'}}>
                    <Input  style={{height:40,width:width,marginLeft:15,fontSize:14,textAlignVertical:'center',padding:0}}
                            value={this.state.valuetitle}
                            placeholderTextColor="#ccc"
                            placeholder='红烧狮子头'
                            editable={false}
                            maxLength={18}
                    />

                </TouchableOpacity>
            <View style={{width:width,height:1,backgroundColor:'#ccc'}}></View>
            </View>
        )
    };

    _getTitle=(obj)=>{
        valuetitle=obj.titlevalue;
         this.setState({
            valuetitle:obj.titlevalue,
        })
    };

    onContentSizeChange=(event) =>{
        this.setState({height: event.nativeEvent.contentSize.height});
    };

    _getDesc=(obj)=>{

        this.setState({
            valuedesc:obj.valuedesc,
        })
    };

    _renderDesc=()=>{
        return(
            <View style={{width:width,backgroundColor:'#fafafa'}}>
                <View style={{width:width,height:70,justifyContent:'center'}}>
                    <Text style={{marginTop:20,marginLeft:15}}>菜谱介绍（必填）</Text>
                </View>
                <View style={{width:width,height:1,backgroundColor:'#f0f0f0'}}></View>
                <TouchableOpacity activeOpacity={1} onPress={()=>Actions.inputdesc({callbackdesc:this._getDesc,valuedesc:this.state.valuedesc})}
                                  style={[{backgroundColor:"#fff",width:width,height:100,justifyContent:'center'},{height:Math.max(100,this.state.height)}]}>
                    <Input  style={[{height:70,width:width,marginTop:15,marginBottom:15,marginLeft:15,fontSize:14,textAlignVertical:'top',padding:0},{height:Math.max(35,this.state.height)}]}
                            value={this.state.valuedesc}
                            placeholderTextColor="#ccc"
                            placeholder='菜谱是烹调厨师利用各种烹饪原料、通过各种烹调技法创作出的某一菜肴品的烧菜方法。 现代餐厅中商家用于介绍自己菜品的小册子里面搭配菜图价位与简介等信息'
                            editable={false}
                            maxLength={300}
                            multiline={true}
                            onContentSizeChange={(event)=>this.onContentSizeChange(event)}
                    />

                </TouchableOpacity>
                <View style={{width:width,height:1,backgroundColor:'#ccc'}}></View>
            </View>
        )
    }

    _getTime=(obj)=>{
        this.setState({
            valuetime:obj.valuetime,
        })
    }

    _renderTime=()=>{
        return(
            <View style={{width:width,backgroundColor:'#fafafa'}}>
                <View style={{width:width,height:70,justifyContent:'center'}}>
                    <Text style={{marginTop:20,marginLeft:15}}>调理时间（必填）</Text>
                </View>
                <View style={{width:width,height:1,backgroundColor:'#f0f0f0'}}></View>
                <TouchableOpacity activeOpacity={1} onPress={()=>Actions.inputtime({callbacktime:this._getTime,time:true})}
                                  style={[{backgroundColor:"#fff",width:width,height:40,justifyContent:'center'}]}>
                    <Input  style={{height:40,width:width,marginLeft:15,fontSize:14,textAlignVertical:'center',padding:0}}
                            value={this.state.valuetime}
                            placeholderTextColor="#ccc"
                            placeholder='选择时间'
                            editable={false}
                            maxLength={10}
                            onContentSizeChange={(event)=>this.onContentSizeChange(event)}
                    />

                </TouchableOpacity>
                <View style={{width:width,height:1,backgroundColor:'#ccc'}}></View>
            </View>
        )
    }

    _getPay=(obj)=>{
        this.setState({
            valuepay:obj.valuepay,
        })
    }

    _renderPay=()=>{
        return(
            <View style={{width:width,backgroundColor:'#fafafa'}}>
                <View style={{width:width,height:70,justifyContent:'center'}}>
                    <Text style={{marginTop:20,marginLeft:15}}>费用</Text>
                </View>
                <View style={{width:width,height:1,backgroundColor:'#f0f0f0'}}></View>
                <TouchableOpacity activeOpacity={1} onPress={()=>Actions.inputtime({callbackpay:this._getPay,pay:true})}
                                  style={[{backgroundColor:"#fff",width:width,height:40,justifyContent:'center'}]}>
                    <Input  style={{height:40,width:width,marginLeft:15,fontSize:14,textAlignVertical:'center',padding:0}}
                            value={this.state.valuepay}
                            placeholderTextColor="#ccc"
                            placeholder='选择花费金额'
                            editable={false}
                            maxLength={10}
                            onContentSizeChange={(event)=>this.onContentSizeChange(event)}
                    />
                </TouchableOpacity>
                <View style={{width:width,height:1,backgroundColor:'#ccc'}}></View>
            </View>
        )
    }

    onPointContentSizeChange=(event) =>{
        this.setState({pointheight: event.nativeEvent.contentSize.height});
    };

    _getPoint=(obj)=>{
        this.setState({
            valuepoint:obj.valuepoint,
        })
    }


    _renderPoint=()=>{
        return(
            <View style={{width:width,backgroundColor:'#fafafa'}}>
                <View style={{width:width,height:70,justifyContent:'center'}}>
                    <Text style={{marginTop:20,marginLeft:15}}>关键点</Text>
                </View>
                <View style={{width:width,height:1,backgroundColor:'#f0f0f0'}}></View>
                <TouchableOpacity activeOpacity={1} onPress={()=>Actions.inputpoint({callbackpoint:this._getPoint,valuepoint:this.state.valuepoint})}
                                  style={[{backgroundColor:"#fff",width:width,height:100,justifyContent:'center'},{height:Math.max(100,this.state.pointheight)}]}>
                    <Input  style={[{height:70,width:width,marginTop:15,marginBottom:15,marginLeft:15,fontSize:14,textAlignVertical:'top',padding:0},{height:Math.max(35,this.state.pointheight)}]}
                            value={this.state.valuepoint}
                            placeholderTextColor="#ccc"
                            placeholder='菜谱是烹调厨师利用各种烹饪原料、通过各种烹调技法创作出的某一菜肴品的烧菜方法。 现代餐厅中商家用于介绍自己菜品的小册子里面搭配菜图价位与简介等信息'
                            editable={false}
                            maxLength={300}
                            multiline={true}
                            onContentSizeChange={(event)=>this.onPointContentSizeChange(event)}
                    />

                </TouchableOpacity>
                <View style={{width:width,height:1,backgroundColor:'#ccc'}}></View>
            </View>
        )
    }

    _getMater=(obj)=>{
         this.setState({
             materdata:obj.materdata,
             several:obj.several
         })
        console.log('materdatamaterdatamaterdatamaterdata',this.state.materdata)
    }

    _renderMaterials=()=>{
        return(
            <View style={{width:width,backgroundColor:'#fafafa'}}>
                <View style={{width:width,height:70,justifyContent:'center'}}>
                    <Text style={{marginTop:20,marginLeft:15}}>材料（必填）</Text>
                </View>
                <View style={{width:width,height:1,backgroundColor:'#f0f0f0'}}></View>
                <TouchableOpacity activeOpacity={1} onPress={()=>Actions.inputmaterials({callbackmater:this._getMater,materdata:this.state.materdata})}
                                  style={[{backgroundColor:"#fff",width:width,height:40,justifyContent:'center'}]}>
                    <Input  style={{height:40,width:width,marginLeft:15,fontSize:14,textAlignVertical:'center',padding:0}}
                            value={this.state.several}
                            placeholderTextColor="#ccc"
                            placeholder='2人份'
                            editable={false}
                            maxLength={10}
                            onContentSizeChange={(event)=>this.onContentSizeChange(event)}
                    />

                </TouchableOpacity>
                <View style={{width:width,height:1,backgroundColor:'#ccc'}}></View>
                <View style={{width:width,height:10,backgroundColor:'#f8f8f8'}}></View>
                <View style={{width:width,height:1,backgroundColor:'#ccc'}}></View>
                {this.state.materdata.map((item,i)=>
                    <View key={item.id} style={{width:width,height:41}} >
                        <TouchableOpacity activeOpacity={1}
                                          onPress={()=>Actions.inputmaterials({callbackmater:this._getMater,materdata:this.state.materdata})}
                                          style={{width:width,height:40,backgroundColor:'#fff',flexDirection:'row'}}>

                            <TextInput
                                underlineColorAndroid='transparent'
                                placeholderTextColor={'#bbbbbb'}
                                style={[styles.textInputStyle]}
                                placeholder={item.mvalue?item.mvalue:'食材'}
                                maxLength={10}
                                value={item.rmvalue}
                                editable={false}
                            />
                            <TextInput
                                underlineColorAndroid='transparent'
                                placeholderTextColor={'#bbbbbb'}
                                style={[styles.textInputStyle,{flex:1}]}
                                placeholder={item.cvalue?item.cvalue:'分量'}
                                maxLength={10}
                                value={item.rcvalue}
                                editable={false}
                            />


                        </TouchableOpacity>
                        <View style={{width:width,height:1,backgroundColor:'#ccc'}}></View>
                    </View>
                )}
            </View>
        )
    };


    _getStep=(obj)=>{
        step=obj.data;
        if (step.length==0){

            this.setState({
                steps:[{id:1,value:'',imgurl:''}],
            });
        }else{
            this.setState({
                steps:step,
            });
        }

        console.log(this.state.steps)
    };

    _renderStep=()=>{
        return(

                <View  style={{width:width,backgroundColor:'#fafafa'}}>
                    <View style={{width:width,height:70,alignItems:'center',flexDirection:'row'}}>
                        <Text style={{marginTop:20,marginLeft:15}}>步骤（必填）</Text>
                        <View style={{flex:1}}></View>
                        {step.length==0?(
                                null
                            ):(
                                <TouchableOpacity activeOpacity={0.9} onPress={()=>Actions.deletemater({callbackstep:this._getStep,step:step})}>
                                    <Text style={{marginRight:15,marginTop:20,color:'#f5c61e',fontSize:14}}>步骤删除</Text>
                                </TouchableOpacity>

                            )}

                    </View>
                    <View style={{width:width,height:1,backgroundColor:'#f0f0f0'}}></View>
                    {this.state.steps.map((item,i)=>
                    <View style={{width:width}} key={i}>
                    <TouchableOpacity activeOpacity={1} onPress={()=>Actions.inputstep({callbackstep:this._getStep,step:step})}
                                      style={[{backgroundColor:"#fff",width:width,height:width-width/2-40,alignItems:'center',flexDirection:'row'}]}>
                        <View style={{width:20,height:width-width/2-40,justifyContent:'center',alignItems:'center'}}>
                            <Text>{i+1}</Text>
                        </View>
                        <View style={{width:1,height:width-width/2-40,backgroundColor:'#ccc'}}></View>
                        <Input  style={{height:width-width/2-40,width:width/2,fontSize:14,textAlignVertical:'top',padding:0,marginTop:25}}
                                value={item.value}
                                placeholderTextColor="#ccc"
                                placeholder='nsdkl开始的规划理念的师傅来看你可能的看了愤怒的酷冷发来的念佛酷冷'
                                editable={false}
                                maxLength={80}
                                multiline={true}
                                onContentSizeChange={(event)=>this.onContentSizeChange(event)}
                        />

                        <View
                            style={{marginRight:15,marginLeft:15,width:width-width/2-80,height:width-width/2-80,alignItems:'center',justifyContent:'center',backgroundColor:'#ccc'}}  >
                            <TouchableOpacity activeOpacity={0.9} onPress={()=>{Actions.inputstep({callbackstep:this._getStep,step:step})}}
                                              style={{width:width-width/2-80,height:width-width/2-80,alignItems:'center',justifyContent:'center',backgroundColor:'#ccc'}}>
                                {item.imgurl==''?(
                                        <Image  style={{width:width/6,height:width/6}} source={require('../img/icon_videodetails_time.png')} />
                                    ):(
                                        <Image  style={{width:width-width/2-80,height:width-width/2-80}} source={item.imgurl} />
                                    )}
                            </TouchableOpacity>


                        </View>
                    </TouchableOpacity>
                    <View style={{width:width,height:1,backgroundColor:'#ccc'}}></View>
                    </View>

       )}
                </View>
        )
    }

    _renderSubBtn=()=>{
        return(
            <View style={{width:width}}>
                <View style={{padding:15,}}>
                    <Text>写完以后才能投稿</Text>
                </View>
                <Button block={true} style={{width:width/1.1,height:40,backgroundColor:'#f5c61e',marginLeft:(width-width/1.1)/2,marginTop:20}}
                        textStyle={{fontSize:16}}
                        color="#fff"
                        onPress={()=>{this._isUpload()}}
                        disabled={this.state.disabled}
                >
                    <Text>投稿</Text>
                </Button>
            </View>
        )
    }

    _isUpload=()=>{
        this.setState({
            disabled:true
        });
        if(this.state.valuetitle==''){
            Toast.show('请填写标题');
            this.setState({
                disabled:false
            });
            return;
        }
        if(this.state.valuedesc==''){
            Toast.show('请填写介绍');
            this.setState({
                disabled:false
            });
            return;
        }
        if(this.state.valuetime==''){
            Toast.show('请选择烹饪时间');
            this.setState({
                disabled:false
            });
            return;
        }
        if(this.state.several==''){
            Toast.show('请填写几人份');
            this.setState({
                disabled:false
            });
            return;
        }
        for(let i=0;i<this.state.materdata.length;i++){

            if(this.state.materdata[i].rmvalue==''||this.state.materdata[i].rcvalue==''){
                let a=i+1;
                Toast.show('请补全第'+a+'条材料');
                this.setState({
                    disabled:false
                });
                return;
            }
        }
        for(let j=0;j<this.state.steps.length;j++){
            if(this.state.steps[j].value==''||this.state.steps[j].img==''){
                let b=j+1;
                Toast.show('请补全第'+b+'步骤的图文');
                this.setState({
                    disabled:false
                });
                return;
            }
        }

        if(this.state.valuepoint==''){
            Toast.show('请填写关键点');
            this.setState({
               disabled:false
            });
            return;
        }

         this._upload();
    };

    render() {
        return (
            <Container style={{backgroundColor:'#fafafa'}}>
                {Platform.OS=='ios'?(null):(
                    <Header style={{height:0}} androidStatusBarColor={Config.StatusBarColor}>

                    </Header>
                )}
               <Content>
                   {this._renderContributeImage()}
                   {this._renderTitle()}
                   {this._renderDesc()}
                   {this._renderTime()}
                   {this._renderPay()}
                   {this._renderMaterials()}
                   {this._renderStep()}
                   {this._renderPoint()}
                   {this._renderSubBtn()}
               </Content>

            </Container>
        );
    }
}

// <View style={{ width:0,
//     height:0,
//     borderWidth:10,
//     borderColor:'transparent',
//     borderBottomColor:'#fff',
//     position: 'absolute',
//     top: 45,
//     right: 25,
//     zIndex:2,
// }}>
//

// </View>

//三角形
// <View style={{width:width,height:20,backgroundColor:'#ccc',flexDirection:'row'}}>
// <View style={{width:60,height:20}}>
//     <Text style={{fontSize:14,backgroundColor:'#ffda2c'}}>兔子吃萝卜</Text>
// </View>
// <View style={{ width:0, height:0, borderWidth:10, borderColor:'transparent',borderLeftColor:'#ffda2c',backgroundColor:'#fff',
// }}>
// </View>
// <View style={{width:60,height:20}}>
//     <Text style={{fontSize:14,backgroundColor:'#fff'}}>兔子吃白菜</Text>
// </View>
// <View style={{ width:0, height:0, borderWidth:10, borderColor:'transparent',borderLeftColor:'#fff',backgroundColor:'#fff',
// }}>
// </View>
//
// </View>