/**
 * Created by Administrator on 2017/10/11.
 */
import React, { Component } from 'react';
import { StyleSheet,Platform,StatusBar, InteractionManager,TouchableNativeFeedback,View,Image,DeviceEventEmitter} from "react-native";
import { Container, Header,Footer, Content, List, ListItem, Text, Left, Right, Switch, Body, Thumbnail, Item, Col, Input, Button } from 'native-base';
import {Actions} from "react-native-router-flux";
import Config from '../utils/Config';
import Request from '../utils/Fetch';
import Toast from '@remobile/react-native-toast'
import ListScene from "./ListScene";
import Spinnera from '../components/Spinner';
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
        this.state = {
            isopen:true,
            value:"",
            disabled:true,
            aa:'#f00',
            isvisiable:false,
            placeholder:"我有话要说..",
            toItem:null,
        };
    }
    componentDidMount() {

    }

    componentWillUnmount () {
        Actions.refresh({startdetailsvideo:true});
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
            let  parpama="thetype=1041&typeid=1&dataid="+this.props.nowid;

            if(this.state.toItem!=null){
                //对某人评论
                console.log('3333333333333333333333333')
                parpama +="&typeid=3"
                parpama +="&userdata="+this.state.toItem.nickname
                parpama +="&plid="+this.state.toItem.id
                parpama +="&contentdata="+this.state.value
                //this.state.value.substring(this.state.toItem.nickname.length+2)
            }else{
                console.log('111111111111111111111111')
                parpama +="&typeid=1"
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
        if(_value!==""&&_value!=null){
            this.setState({
                disabled:false
            })
        }else{
            this.setState({
                disabled:true,
                toItem:null,
            })
        }
    };

    feedBack=(item)=>{
        this.setState({
            value:"@"+item.nickname+":",
            toItem:item,
        })
    }

    render() {
        return (
            <Container style={{backgroundColor:'#fafafa'}}>
                <StatusBar backgroundColor="#C5B361"
                           barStyle="light-content"
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
                <Content>
                    <ListScene url={"thetype=1042&nowid="+this.props.nowid} thetype="1042" item={"comment"} itemCallBack={this.feedBack}/>
                </Content>
                <Footer style={{backgroundColor:'#eee',justifyContent:'center',alignItems:'center',height:50,}}>
                    <Input  multiline={true}
                            style={{backgroundColor:'#fff',height:30,borderRadius:4,borderWidth:1,borderColor:'#666',fontSize:12,padding:0,marginLeft:15,marginRight:15,lineHeight:14}}
                            value={this.state.value}
                            placeholder={this.state.placeholder}
                            onChangeText={(value)=>this._getValue(value)}
                    />
                    {Platform.OS=='ios'?(
                        <Button disabled={this.state.disabled} onPress={()=>this._sendMsg()} style={{backgroundColor:this.state.disabled?'#ccc':'#C5B361',height:30,marginTop:10,marginRight:15}} ><Text >发送</Text></Button>
                    ):(
                        <Button disabled={this.state.disabled} onPress={()=>this._sendMsg()} style={{backgroundColor:this.state.disabled?'#ccc':'#C5B361',height:30,marginTop:10,marginRight:15}} small={true} ><Text>发送</Text></Button>
                    )}
                </Footer>
                <Spinnera loadvalue="提交评论中..." modalVisible={this.state.isvisiable} />
            </Container>
        );

    }

}