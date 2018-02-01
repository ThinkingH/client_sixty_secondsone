import React, { Component } from 'react';
import {
    StyleSheet, DeviceEventEmitter, View, Dimensions, Modal, TouchableOpacity, Linking,
    Platform,StatusBar
} from "react-native";
import { Container, Header, Content, List, ListItem, Text, Left, Right,  Body } from 'native-base';
import {Actions,ActionConst} from "react-native-router-flux";
import Storage  from '../utils/Storage';
import Config from '../utils/Config';
import Switch from 'react-native-switch-pro'
import Toast from '@remobile/react-native-toast'
import Request from '../utils/Fetch';
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,backgroundColor: '#efeff4',
    },
    textcolor: {
        color:'#999',
        fontSize:14,
        fontWeight:'100'
    }
});

export default class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
           isopen:Config.ISJPUSH==1?true:false,
            modalVisible:false
        };
    }


    _exit=()=>{
        console.log('111111111111111111111111111')
       if(Config.usertype!=1){
           console.log('222222222222222222222')
           Actions.pop();
           Actions.login2();

       }else{
           console.log('333333333333333333333333')
           Config.usertype="0";
           Storage.saveWithKeyValue("usertype","0");
           Actions.pop();
           DeviceEventEmitter.emit("getinfo","刷新个人信息")
       }

    };

    _checkUpdate=()=>{
        let parpam="thetype=1009";
        Request('1009',parpam)
            .then((responseJson) => {
                //如果请求成功就走下面的方法
                if(Config.version==responseJson.data.version){
                   Toast.show('已经是最新版本了')

                }else if(Config.version<responseJson.data.version){
                      this.setState({
                          modalVisible:true
                      })
                }
            })
            .catch((error) => {

                Toast.show(error.toString());
            });
    };

    _update=()=>{
        Linking.canOpenURL('http://imtt.dd.qq.com/16891/03AD43D6C4EF3BC9E616997EA01C3614.apk').then(supported => {
            if (supported) {
                Linking.openURL('http://imtt.dd.qq.com/16891/03AD43D6C4EF3BC9E616997EA01C3614.apk');
            } else {
                console.log('无法打开该URI: ' + ttt);
            }
        });

    }

    _renderModal=()=>{
        return(
            <Modal animationType={'slide'}
                   transparent={true}
                   onRequestClose={() => { this.setState({modalVisible: false});}}
                   visible={this.state.modalVisible}
            >
                <TouchableOpacity  activeOpacity={1} onPress={()=> { this.setState({ modalVisible:false})}} style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'rgba(0,0,0,0.5)'}}>
                   <View style={{width:width/1.2,height:height/3.5,alignItems:'center',justifyContent:'center',borderRadius:5,backgroundColor:'#fff'}}>
                        <View style={{flex:2,alignItems:'center',justifyContent:'center',backgroundColor:'#fff'}}>
                            <Text>60S新版本提醒</Text>
                            <Text note style={{marginTop:10}}>60S新版本提醒</Text>
                            <Text note>60S新版本提醒</Text>

                        </View>
                       <View style={{width:width/1.2,height:1,backgroundColor:'#ccc'}}>

                       </View>
                       <View style={{flex:1,flexDirection:'row',backgroundColor:'#fff',borderBottomRightRadius:5,borderBottomLeftRadius:5}}>
                           <TouchableOpacity onPress={()=> { this.setState({ modalVisible:false})}}
                               style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'#fff',borderBottomLeftRadius:5}}>
                               <Text>暂不升级</Text>
                           </TouchableOpacity>
                           <TouchableOpacity onPress={()=> { this._update()}}
                               style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'#f5c61e',borderBottomRightRadius:5}}>
                               <Text>立即升级</Text>
                           </TouchableOpacity>
                       </View>


                   </View>
                </TouchableOpacity>
            </Modal>
        )
    };

    render() {
        return (
            <Container style={{backgroundColor:'#fff'}}>
                <StatusBar backgroundColor={Config.StatusBarColor}
                           barStyle="dark-content"
                           translucent={true}
                           hidden={false}/>
                <Content>
                    <List>
                        <ListItem style={{backgroundColor:'#fff'}} itemDivider>
                            <Text style={{color:'#f5c61e',fontSize:14}}>通知</Text>
                        </ListItem>
                        <ListItem >
                            <Text style={[styles.textcolor]}>通知开关</Text>
                            <Body>

                            </Body>
                            <Right>
                                <Switch
                                    value={this.state.isopen}
                                    circleColorActive={'#f5c61e'}
                                    backgroundActive={'#f1eeb4'}
                                    circleColorInactive={'#fff'}
                                    backgroundInactive={'#ccc'}
                                    onSyncPress={(isopen) => {
                                     this.setState({isopen});
                                     Storage.saveWithKeyValue("jpush",isopen);
                                 }}/>

                            </Right>
                        </ListItem>
                        <ListItem style={{backgroundColor:'#fff'}} itemDivider>
                            <Text style={{color:'#f5c61e',fontSize:14}}>关于我们</Text>
                        </ListItem>
                        <ListItem onPress={()=>this._checkUpdate()}>
                            <Text style={[styles.textcolor]}>检测版本</Text>
                           <View style={{flex:1}}></View>
                                <Text style={[styles.textcolor]}>{Config.versionName}</Text>

                        </ListItem>
                        <ListItem onPress={()=>Actions.law()}>
                            <Text style={[styles.textcolor]}>法律权益</Text>
                        </ListItem>
                        <ListItem onPress={()=>Actions.feedback()}>
                            <Text style={[styles.textcolor]}>意见反馈</Text>
                        </ListItem>
                        <ListItem style={{backgroundColor:'#fff'}} itemDivider>
                            <Text style={{color:'#f5c61e',fontSize:14}}>注销</Text>
                        </ListItem>
                        <ListItem onPress={()=>this._exit()}>
                            <Text style={[styles.textcolor]}>{Config.usertype==1?'注销':'登录'}</Text>
                        </ListItem>

                    </List>
                </Content>
                {this._renderModal()}
            </Container>
        );
    }
}