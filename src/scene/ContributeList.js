/**
 * Created by Administrator on 2017/10/16.
 */
import React, { Component } from 'react';
import {
    ListView, FlatList, View, Dimensions, Image, DeviceEventEmitter, InteractionManager, TouchableNativeFeedback,
    TouchableOpacity, Modal, Alert, Platform
} from 'react-native';
import {Actions} from "react-native-router-flux";
import { Container, Header, Content, Button, Icon, List, Thumbnail ,ListItem, Text,Left,Body,Right,Switch ,Card, CardItem, Col ,Item } from 'native-base';
import ListScene from "./ListScene";
import Config from '../utils/Config';

const data = [
    {"name" : "Melody", age: 21,id:1},
    {"name" : "ZZ", age: 22,id:2},
    {"name" : "ZZ", age: 22,id:3},
    {"name" : "ZZ", age: 22,id:4},
    {"name" : "MZY", age: 22,id:5},
    {"name" : "ZZ", age: 22,id:6},
    {"name" : "ZZ", age: 22,id:7},
    {"name" : "ZZ", age: 22,id:8},
    {"name" : "ZZ", age: 22,id:9},
    {"name" : "ZZ", age: 22,id:10},

];
const {width, height} = Dimensions.get('window');

export default class ContributeList extends Component {
    constructor(props) {
        super(props);
        this.state={
            data:data,
            modalVisible:false,

        }
    }

    componentDidMount() {

        this.ContributeList = DeviceEventEmitter.addListener("ContributeList",this._getInfo);

    }

    componentWillUnmount() {
        this.ContributeList.remove();
        Actions.refresh({startdetailsvideo:true});
    }



    _getInfo=()=>{
        this.setState({modalVisible: true})
    }

    _renderModal=()=>{
        return(
            <Modal animationType={'slide'}
                   transparent={true}
                   onRequestClose={() => { this.setState({modalVisible: false});}}
                   visible={this.state.modalVisible}
            >
                <TouchableOpacity  activeOpacity={1} onPress={()=> { this.setState({ modalVisible:false})}} style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'rgba(0,0,0,0.5)'}}>
                    <View  style={{width:width-20,height:100,marginBottom:10,backgroundColor:'#fff',borderRadius:5,justifyContent:'center'}}>
                        <Text onPress={()=>{DeviceEventEmitter.emit("ContributeListItem","item弹出alert提示是否确认删除");this.setState({modalVisible: false})}} style={{marginBottom:10,marginLeft:30}}>删除</Text>
                        <Text onPress={()=>this.setState({modalVisible: false})} style={{marginTop:10,marginLeft:30}}>取消</Text>
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }



    render() {
        return (
            <Container style={{backgroundColor:'#fff'}}>
                {Platform.OS=='ios'?(null):(
                    <Header style={{height:0}} androidStatusBarColor={Config.StatusBarColor}>

                    </Header>
                )}
                <ListScene url={"thetype=1019&nowid="+this.props.nowid} thetype="1019"  nowid={this.props.nowid}   item={"contribute"}/>
                {this._renderModal()}
            </Container>
        );
    }

}
