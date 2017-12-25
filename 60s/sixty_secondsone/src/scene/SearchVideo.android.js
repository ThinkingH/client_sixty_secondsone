/**
 * Created by Administrator on 2017/10/19.
 */
import React from 'react';
import { PropTypes, } from "react";
import { StyleSheet, View, ViewPropTypes, TextInput, TouchableNativeFeedback ,Dimensions,DeviceEventEmitter,FlatList,TouchableOpacity} from "react-native";
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
export default class SearchVideo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value:this.props.value?this.props.value:"",
            his:[],

            refreshing: false,

            isassort:this.props.isassort,
            parpam:null,
        };
     //this._getHistory();
    }
    componentDidMount() {
        this._getHistory()
             this._onRefresh();


    }
    _onRefresh=()=> {
        _pageNo=1;
        this._getData(_pageNo);
    };

    _getData=async(_pageNo)=>{

        let txt=this.state.value;
        if (txt.length==0){
            Toast.show("搜索内容不能为空");
            return
        }

         if(this.state.isassort){
             await  this.setState({
                 parpam:"thetype=1015&searchstr=&classify2="+this.props.classify2+"&classify3="+this.props.classify3,
                 isassort:false
             })

         }else{

            await this.setState({parpam:"thetype=1015&searchstr="+this.state.value})
             // this.setState({parpam:"thetype=1015&searchstr="+this.state.value},()=>{})   setstate（{}）回调 也可以
             DeviceEventEmitter.emit('getRefresh','搜索结果');


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
        return(
            <Header  androidStatusBarColor={Config.StatusBarColor} style={{backgroundColor:'#fff'}}>
                <Row  style={{justifyContent:'center',alignItems:'center'}}>
                    <TouchableNativeFeedback
                        onPress={()=>{Actions.pop()}}
                        background={TouchableNativeFeedback.Ripple("#ccc", true)}>
                        <Thumbnail square  style={{width:17,height:17,marginRight:15,marginLeft:10}} source={require('../img/icon_back.png')} />
                    </TouchableNativeFeedback>

                    <Icon style={{marginRight:10,marginLeft:5,color:'#ccc'}}  name='search' />
                    <Input  style={{height:40,marginTop:5,}}
                            value={this.state.value}
                            placeholderTextColor="#ccc"
                            placeholder='输入内容进行搜索'
                            onChangeText={(value)=>this.setState({value})}
                            maxLength={18}
                    />
                    <TouchableOpacity  activeOpacity={0.9}
                        onPress={()=>{this._getData(_pageNo);this.saveHistory();}}

                       >
                        <View>
                            <Text  style={{color:'#c5b361'}}>搜索</Text>
                        </View>

                    </TouchableOpacity>

                </Row>
                <View style={{position:'absolute',bottom:10,right:50,width:width/1.4,height:1,backgroundColor:'#c5b361'}}></View>
            </Header>
        )
    };


    render() {
        return (
            <Container style={{backgroundColor:'#fafafa'}} >
                {this._renderHeader()}

                        <ListScene url={this.state.parpam} thetype="1015" header={'search'} item={"video"} />

            </Container>
        );
    }
}


