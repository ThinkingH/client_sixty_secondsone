/**
 * Created by Administrator on 2017/11/7.
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
    KeyboardAvoidingView,
    StatusBar,
    TouchableOpacity,
    WebView,
    TextInput,
    Dimensions,
    Animated,
    Modal,
    TouchableNativeFeedback,
    InteractionManager,
    DeviceEventEmitter
} from "react-native";
import Request from '../utils/Fetch';

import { Container, Header, Content, Button, Icon, List, Thumbnail , Row, ListItem, Text,Left,Body,Right,Switch ,Card, CardItem, Col ,Item} from 'native-base';

import {Actions} from "react-native-router-flux";
import RNFetchBlob from 'react-native-fetch-blob';
import ImagePicker from 'react-native-image-crop-picker';
import Config from "../utils/Config";
import Toast from '@remobile/react-native-toast'
const {width, height} = Dimensions.get('window');


export default  class ContributeDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
           data:[],
            modalVisible:false
        }
    }

    componentWillMount () {

    }

    componentWillUnmount () {

    }

    componentDidMount () {
        this._getInfo();
    }
    _delcontribute=()=>{
        let parpam="thetype=1021&typeid=2&delid="+this.props.id+"&dataid="+this.state.data.vid;
        Request('1021',parpam)
            .then((responseJson) => {
               Toast.show("删除成功");
                DeviceEventEmitter.emit("onFresh","刷新个人中心");
                Actions.pop();
            })
            .catch((error) => {
                Toast.show(error.toString());
            });
    }

    _getInfo=()=>{
        let parpam="thetype=1029&nowid="+this.props.id;
        Request('1029',parpam)
            .then((responseJson) => {
                this.setState({
                    data:responseJson.data,
                })
            })
            .catch((error) => {
                Toast.show(error.toString());
            });
    };
    _renderModal=()=>{
        return(
            <Modal animationType={'slide'}
                   transparent={true}
                   onRequestClose={() => { this.setState({modalVisible: false});}}
                   visible={this.state.modalVisible}
            >
                <TouchableOpacity  activeOpacity={1} onPress={()=> { this.setState({ modalVisible:false})}} style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'rgba(0,0,0,0.5)'}}>
                    <View  style={{width:width-20,height:100,marginBottom:10,backgroundColor:'#fff',borderRadius:5,justifyContent:'center'}}>
                        <Text onPress={()=>{this._delcontribute();this.setState({modalVisible: false})}} style={{marginBottom:10,marginLeft:30}}>删除</Text>
                        <Text onPress={()=>this.setState({modalVisible: false})} style={{marginTop:10,marginLeft:30}}>取消</Text>
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }

    render (){
        return(
            <Container>
                <StatusBar backgroundColor={Config.StatusBarColor}
                           barStyle="light-content"
                           translucent={false}
                           hidden={false}/>
                <Content showsVerticalScrollIndicator={false} style={{backgroundColor:'#f1f1f2'}}>
                    <TouchableNativeFeedback   onPress={()=>Actions.videodetails({title:this.state.data.biaoti,nowid:this.state.data.vid})}
                                               background={TouchableNativeFeedback.Ripple("#ccc", true)}>
                        <Row   style={{alignItems:'center',width:width,height:60}}>
                            <Thumbnail   square style={{width:30,height:30,marginLeft:15}} source={{uri:this.state.data.videoimg}} />
                            <Text style={{marginLeft:15}}>点击查看原菜品</Text>
                        </Row>




                    </TouchableNativeFeedback>
                    <List >
                        <Item style={{backgroundColor:'#fff',padding:0}} itemDivider>
                            <Thumbnail  style={{width:50,height:50,margin:15}} source={{uri:this.state.data.touxiang}} />
                            <Col>
                                <Text style={{marginBottom:5}} numberOfLines={1} >{this.state.data.nickname}</Text>
                                <Text note>{this.state.data.create_date}</Text>
                            </Col>

                                    <Right>
                                        <TouchableNativeFeedback
                                            onPress={()=>this.setState({ modalVisible:true})}
                                            background={TouchableNativeFeedback.Ripple("#ccc", true)}>
                                            <View >
                                                <Thumbnail   square style={{width:20,height:20,marginRight:15}} source={require('../img/icon_contributelist_more.png')} />
                                            </View>
                                        </TouchableNativeFeedback>
                                    </Right>

                        </Item>
                        <Thumbnail square style={{width:width,height:width}} source={{uri:this.state.data.pinglunimg}} />
                        <Text style={{margin:15}}>{this.state.data.content}</Text>
                        <View style={{width:width,height:1,backgroundColor:'#ccc'}}>
                        </View>
                    </List>
                    {this._renderModal()}
                </Content>
            </Container>
        )
    }


}
