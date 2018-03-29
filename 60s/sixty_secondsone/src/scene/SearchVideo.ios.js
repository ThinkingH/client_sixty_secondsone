/**
 * Created by Administrator on 2017/10/19.
 */
import React from 'react';
import { PropTypes, } from "react";
import { StyleSheet, View,Image, ViewPropTypes,StatusBar, TextInput, TouchableNativeFeedback ,Dimensions,DeviceEventEmitter,FlatList,TouchableOpacity} from "react-native";
import { Container, Header, Content, Button, Form, Item, Icon, List, Badge, Col, Input,
    Thumbnail ,ListItem, Text, Left, Body, Right, Switch ,Card, CardItem, Row, FooterTab, Footer} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Storage  from '../utils/Storage';
import Request from '../utils/Fetch';
import Toast from '@remobile/react-native-toast'
import LoadMoreFooter from './LoadMoreFooter';
import Config from '../utils/Config';
import VideoItem from '../components/VideoItem';
import ListScene from "./ListScene";
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
});
const aa=["1"];
let _pageNo = 1;
let isdisable=false;
const _pageSize = Config.pageCount;
let parpam='';
export default class SearchVideo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value:this.props.value?this.props.value:"",
            his:[],
            refreshing: false,
            isassort:this.props.isassort,
            parpam:"thetype=1034&classify3="+this.props.value?this.props.value:"",
            isshowmzy:false
        };
        //this._getHistory();

    }
    componentWillMount() {
        this._onRefresh();


    }
    componentDidMount() {
        this._getHistory()



    }
    _onRefresh=()=> {
        _pageNo=1;
        this._getData(_pageNo);
    };

    _getData=(_pageNo)=>{
        let txt=this.state.value;
        if (txt.length==0){
            Toast.show("搜索内容不能为空");
            return
        }
        if(this.state.isassort){
            console.log("ssssssssssssss",this.state.value)
            this.setState({
                parpam:"thetype=1034&classify3="+this.state.value,
                isassort:false
            },()=>{
                console.log('sssssqwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',this.state.parpam)
                DeviceEventEmitter.emit('getRefresh','搜索结果');
            });

        }else{
            this.setState({parpam:"thetype=1034&searchstr="+this.state.value},()=>{
                DeviceEventEmitter.emit('getRefresh','搜索结果');
            });
            // this.setState({parpam:"thetype=1015&searchstr="+this.state.value},()=>{})   setstate（{}）回调 也可以

        }
        console.log(this.state.parpam)
    };

    _removeArr=(data)=>{
        return Array.from(new Set(data))
    };

    _getHistory = () => {
        //获取本地搜索记录
        try {
            Storage.getValueForKey("histroy").then((value)=>{
                console.log("valueaaa",value)
                let str=value;
                if(str==null||str==[]){
                    this.setState({
                        his:[],
                    });
                    console.log("his",this.state.his.length)
                    return;
                }
                let data=str.split(',');
                data= this._removeArr(data);
                this.setState({
                    his:data,
                })
            }).catch((error)=>{
                Toast.show(error.toString());
            });
        }catch (e){
            Toast.show(e.toString());
        }
    };

    saveHistory=()=>{

        //保存搜索记录
        let txt=this.state.value;
        if (txt.length==0){
            Toast.show("搜索内容不能为空");
            return
        }

        let str='';
        if(this.state.his.length>=5000){
            this.state.his.shift();
        }

        if (this.state.his.length==0){
            str=txt;
        }else{
            str=this.state.his.join(',');
            if(str.indexOf(txt)!=-1){
                //  console.log('是否执行了搜索跳转11',str)
                //  let aa= str.substring(txt.length+1,str.indexOf(txt));
                //  str.replace(aa,'')
                // // str+=','+txt;
                //  console.log(txt.length+1,str.indexOf(txt))
                //  console.log('是否执行了搜索跳转12',str)
                str=txt+','+str;

                Storage.saveWithKeyValue("histroy",str);
                this._getHistory();
                DeviceEventEmitter.emit("getHistory","刷新历史记录");
                return;
            }
            str=txt+','+str;
        }
        //   console.log("str",str)
        Storage.saveWithKeyValue("histroy",str);
        this._getHistory();
        //需要刷新搜索首页的历史记录
        DeviceEventEmitter.emit("getHistory","刷新历史记录");

    };

    _renderHeader=()=>{
        // return(
        //     <Header style={{backgroundColor:'#fff',alignItems:'center'}}>
        //         <Item  rounded style={{height:40,width:width-60,borderColor:'#f5c61e',backgroundColor:'#fff'}}>
        //             <Input onChangeText={(value)=>this.setState({value})}
        //                    placeholderTextColor="#999"
        //                    style={{height:40,padding:0,fontSize:14,textAlignVertical:'center',marginBottom:5}}
        //                    maxLength={6}
        //                    value={this.state.value}
        //                    onSubmitEditing={()=>{this._getData(_pageNo);this.saveHistory()}}
        //                    returnKeyLabel="搜索"
        //                    placeholder='  请输入菜名'/>
        //         </Item>
        //         <TouchableOpacity activeOpacity={0.9} onPress={()=>Actions.pop()}>
        //             <Image style={{width:25,height:25,marginLeft:10}} source={require('../img/icon_tipclose.png')}/>
        //         </TouchableOpacity>
        //     </Header>
        // )

        return(
            <View   style={{backgroundColor:'#fff',alignItems:'center',justifyContent:'center',flexDirection:'row',width:width,height:60}}>
                <Item  rounded style={{height:40,width:width-60,paddingLeft:10,borderColor:'#f5c61e'}}>
                    <Input onChangeText={(value)=>this.setState({value})}
                           placeholderTextColor="#999"
                           style={{height:40,padding:0,width:width-80,fontSize:14,marginBottom:5,textAlignVertical:'center'}}
                           maxLength={50}
                           value={this.state.value}
                           onSubmitEditing={()=>{this._getData(_pageNo);this.saveHistory()}}
                           returnKeyLabel="搜索"
                           placeholder='请输入菜名'/>
                </Item>
                <TouchableOpacity activeOpacity={0.9} onPress={()=>Actions.pop()}>
                    <Image style={{width:25,height:25,marginLeft:10}} source={require('../img/icon_tipclose.png')}/>
                </TouchableOpacity>
            </View>
        )
    };


    render() {
        return (
            <Container style={{backgroundColor:'#fafafa'}} >
                <View style={{width:width,height:Config.STATUSBARHEIGHT,backgroundColor:Config.StatusBarColor}} />
                {this._renderHeader()}
                <StatusBar backgroundColor="transparent"
                           barStyle="light-content"
                           translucent={false}
                           hidden={false}/>

                <ListScene url={this.state.parpam} thetype="1034" header={'search'} item={"search"} />
            </Container>
        );
    }
}


