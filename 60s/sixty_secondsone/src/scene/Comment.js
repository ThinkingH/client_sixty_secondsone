/**
 * Created by Administrator on 2017/10/11.
 */
import React, { Component } from 'react';
import {
    StyleSheet, Platform, StatusBar, TextInput,Dimensions, InteractionManager, Keyboard, View, Image, DeviceEventEmitter,
    KeyboardAvoidingView
} from "react-native";
import { Container, Header,Footer, Content, List, ListItem, Text, Left, Right, Switch, Body, Thumbnail, Item, Col, Input, Button } from 'native-base';
import {Actions} from "react-native-router-flux";
import Config from '../utils/Config';
import Request from '../utils/Fetch';
import Toast from '@remobile/react-native-toast'
import ListScene from "./ListScene";
import Spinnera from '../components/Spinner';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,backgroundColor: '#efeff4',
    },
    textcolor: {
        color:'#999'
    }
});

let _value='';
export default class Comment extends Component {
    constructor(props) {
        super(props);
        this.keyboardDidShowListener = null;
        this.keyboardDidHideListener = null;
        this.state = {
            isopen:true,
            value:"",
            disabled:true,
            aa:'#f00',
            isvisiable:false,
            placeholder:"我有话要说..",
            toItem:null,
            kbheight:0,
            KeyboardShown: false
        };
    }
    componentWillMount() {
        //监听键盘弹出事件
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow',
            this.keyboardDidShowHandler.bind(this));
        //监听键盘隐藏事件
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide',
            this.keyboardDidHideHandler.bind(this));
    }

    componentWillUnmount () {
//卸载键盘弹出事件监听
        if(this.keyboardDidShowListener != null) {
            this.keyboardDidShowListener.remove();
        }
        //卸载键盘隐藏事件监听
        if(this.keyboardDidHideListener != null) {
            this.keyboardDidHideListener.remove();
        }
    }

    //键盘弹出事件响应
    keyboardDidShowHandler(event) {
        this.setState({KeyboardShown: true,kbheight:event.endCoordinates.height});
        console.log(event.endCoordinates.height);
    }

    //键盘隐藏事件响应
    keyboardDidHideHandler(event) {
        this.setState({KeyboardShown: false,kbheight:0});
    }

    //强制隐藏键盘
    dissmissKeyboard() {
        Keyboard.dismiss();
        console.log("输入框当前焦点状态：" + this.refs.bottomInput.isFocused());
    }

    _sendMsg=()=>{
             if(_value==''||_value==null){
                 Toast.show('请填写发送内容');
                 return;
             }

        if(Config.usertype=="1"){
            this.setState({
                isvisiable:true
            });
            //let base64DataString=encodeURIComponent(this.state.value);
            let  parpama="thetype=1041&dataid="+this.props.nowid;

            if(this.state.toItem!=null){
                //对某人评论
                console.log('3333333333333333333333333');
                parpama +="&typeid=3";
                parpama +="&userdata="+this.state.toItem.userid;
                parpama +="&plid="+this.state.toItem.id;
                parpama +="&fid="+this.state.toItem.fplid;
                parpama +="&contentdata="+this.state.value;
                //this.state.value.substring(this.state.toItem.nickname.length+2)
            }else{
                console.log('111111111111111111111111');
                parpama +="&typeid=1";
                parpama +="&contentdata="+this.state.value
            }

            Request('1041',parpama)
                .then((responseJson) => {
                    Toast.show(responseJson.msg);
                   DeviceEventEmitter.emit('getRefresh','刷新评论');
                    _value='';
                    this.setState({
                        isvisiable:false,
                        value:'',
                        disabled:true
                    });
                })
                .catch((error) => {
                    this.setState({
                        isvisiable:false,
                        disabled:false
                    });
                    Toast.show(error.toString());
                });
        }else{
            Actions.login2();
        }
        
    };

    _getValue=(value)=>{
        _value=value;
        this.setState({value});
        console.log('eeeeeeeeeeeeeeeeeeeeeeeeee')
        if(_value!==""&&_value!=null){
            console.log('aaaaaaaaaaaaaaaaaaaa')
            this.setState({
                disabled:false
            })
        }else{
            console.log('wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww')
            this.setState({
                disabled:true,
                toItem:null,
            })
        }
    };

    feedBack=(item)=>{
        if(Platform.OS=='ios'){
            this.refs['bottomInput'].focus();
        }else{
            this.refs['input'].focus();
        }


        this.setState({
            value:"@"+item.nickname+":",
            toItem:item,
        })
    }

    render() {
        return (
            <Container style={{backgroundColor:'#ccc'}}>
                <StatusBar backgroundColor={Config.StatusBarColor}
                           barStyle="dark-content"
                           translucent={false}
                           hidden={false}/>

                {/*<Content showsVerticalScrollIndicator={false}>*/}
                    {/*<List>*/}
                        {/*{this.state.data.map((item,i)=>*/}
                            {/*<Item style={{paddingTop:20,paddingBottom:20}}  key={item.id} >*/}
                                {/*<Thumbnail style={{width:50,height:50,marginRight:15,marginLeft:15}}  source={{uri:item.touxiang}} />*/}
                                {/*<Col>*/}
                                {/*<Text >{item.nickname}</Text>*/}
                                {/*<Text note>{item.content}</Text>*/}
                                {/*</Col>*/}
                            {/*</Item>*/}
                        {/*)}*/}
                    {/*</List>*/}
                {/*</Content>*/}

                    <ListScene url={"thetype=1042&nowid="+this.props.nowid} thetype="1042" item={"comment"} itemCallBack={this.feedBack}/>


                {Platform.OS=='ios'?(
                    <View style={{marginBottom:this.state.kbheight}} >
                    <Footer style={{backgroundColor:'#eee',justifyContent:'center',alignItems:'center',height:50,}}>
                        <TextInput ref="bottomInput"  multiline={true}
                                style={{backgroundColor:'#fff',width:width-100,height:30,borderRadius:4,borderWidth:1,borderColor:'#666',fontSize:12,padding:0,marginLeft:15,marginRight:15,lineHeight:14}}
                                value={this.state.value}
                                placeholder={this.state.placeholder}
                                onChangeText={(value)=>this._getValue(value)}
                        />

                        <Button disabled={this.state.disabled} onPress={()=>this._sendMsg()} style={{backgroundColor:this.state.disabled?'#ccc':'#F5C61E',height:30,marginTop:10,marginRight:15}} ><Text >发送</Text></Button>
                    </Footer>
                    </View>

                ):(

                    <Footer style={{backgroundColor:'#eee',justifyContent:'center',alignItems:'center',height:50}}>
                        <TextInput ref='input'  multiline={true}
                                style={{backgroundColor:'#fff',width:width-100,height:30,borderRadius:4,borderWidth:1,borderColor:'#666',fontSize:12,paddingLeft:10,padding:0,marginLeft:15,marginRight:15,lineHeight:14}}
                                value={this.state.value}
                                placeholder={this.state.placeholder}
                                underlineColorAndroid="transparent"
                                onChangeText={(value)=>this._getValue(value)}
                        />

                            <Button disabled={this.state.disabled} onPress={()=>this._sendMsg()} style={{backgroundColor:this.state.disabled?'#ccc':'#F5C61E',height:30,marginTop:10,marginRight:15}} small={true} ><Text>发送</Text></Button>

                    </Footer>
                )}
                <Spinnera loadvalue="提交评论中..." modalVisible={this.state.isvisiable} />
            </Container>
        );

    }

}