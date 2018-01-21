import React from 'react';
import { PropTypes } from "react";
import { Image,StyleSheet,Text, View,TouchableOpacity, ViewPropTypes,DeviceEventEmitter,findNodeHandle, TextInput, TouchableNativeFeedback ,Dimensions,Keyboard,StatusBar, ART} from "react-native";
import { Container, Header, Content, Button, Form, Item, Icon, List, Badge, Col, Input,
    Thumbnail ,ListItem,  Left, Body, Right, Switch ,Card, CardItem, Row, FooterTab, Footer} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Storage  from '../utils/Storage';

import TabIcon from '../components/TabIcon';
import Config from "../utils/Config";
import Request from '../utils/Fetch';
import Toast from '@remobile/react-native-toast'
import { BlurView, VibrancyView } from 'react-native-blur';
const dismissKeyboard = require('dismissKeyboard');
dismissKeyboard();

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
    absolute: {
        position: "absolute",
        top: 0, left: 0, bottom: 0, right: 0,
    },
});

const {Surface, Shape, Path} = ART;
const path = Path()
    .moveTo(0,1)
    .lineTo(width-20,1);
export default class TabView extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            value:'',
            his:[],
            data:[],
            viewRef: null
        };
        this._getHistory();
    }
    componentDidMount() {
        this._getData();
        this.getHistory = DeviceEventEmitter.addListener("getHistory",this._getHistory);

    }
    componentWillUnmount(){
        this.getHistory.remove();
    }

    _removeArr=(data)=>{
        return Array.from(new Set(data))
    };

    _getData=()=>{
        let parpam="thetype=1017&classtype=classify1&searchstr=美食";
        Request('1017',parpam)
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({
                    data:responseJson.data.list
                })
            })
            .catch((error) => {
                Toast.show(error.toString());
            });
    };

    _getHistory = () => {
        //获取本地搜索记录
        try {
            Storage.getValueForKey("histroy").then((value)=>{
                console.log("value",value)
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
                           his:data
                       })

            }).catch((error)=>{
                Toast.show(error.toString());
            });
        }catch (e){
            Toast.show(e.toString());
        }
    };

    saveHistory=()=>{
         console.log(this.state.value)
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
                 console.log('11111111111111111111111111',str)
                str=txt+','+str;

                Storage.saveWithKeyValue("histroy",str);
                this._getHistory();
                Actions.searchvideo({value:this.state.value,isassort:false,});
                return;
            }
            str=txt+','+str;
        }


        Storage.saveWithKeyValue("histroy",str);

        this._getHistory();

        //需要刷新搜索首页的历史记录
        DeviceEventEmitter.emit("getHistory","刷新历史记录");

        this.setState({
            value:''
        });
        console.log('是否执行了搜索跳转2222222222222222',str)
      Actions.searchvideo({value:this.state.value,isassort:false,})
    };

    _deleteHistory=(i)=>{
      //删除某条本地记录
        let str="";
        let newhis=[];
        this.state.his.splice(i,1);
        newhis=this.state.his;
        // console.log("newstr",newhis)
        this.setState({
         his:newhis,
       });
        str=this.state.his.join(',');
        //console.log("str",str)
        Storage.saveWithKeyValue("histroy",str);
    };

    _renderHeader=()=>{
        return(
            <View   style={{backgroundColor:'#fff',alignItems:'center',justifyContent:'center',flexDirection:'row',width:width,height:60}}>
                <Item  rounded style={{height:40,width:width-60,borderColor:'#f5c61e'}}>
                    <Input onChangeText={(value)=>this.setState({value})}
                           placeholderTextColor="#999"
                           style={{height:40,padding:0,fontSize:14,}}
                           maxLength={6}
                           value={this.state.value}
                           onSubmitEditing={()=>this.saveHistory()}
                           returnKeyLabel="搜索"
                           placeholder='  请输入菜名'/>
                </Item>
                <TouchableOpacity activeOpacity={0.9} onPress={()=>Actions.pop()}>
                    <Image style={{width:25,height:25,marginLeft:10}} source={require('../img/icon_tipclose.png')}/>
                </TouchableOpacity>
            </View>
      )
    };

    _renderHistoryList=()=>{
        return(
            this.state.his.map((item,i)=>
                <ListItem onPress={()=> Actions.searchvideo({value:item,isassort:false})} button={true} key={i} style={{backgroundColor:'#fefefe',height:40}} itemDivider>
                    <Thumbnail square  style={{width:20,height:20,marginLeft:3}} source={require('../img/icon_videodetails_time.png')} />
                    <Text numberOfLines={1} style={{marginLeft:20,color:'#000'}}>{item}</Text>
                    <View style={{flex:1}}></View>
                    <TouchableNativeFeedback
                      onPress={()=>{this._deleteHistory(i)}}
                      background={TouchableNativeFeedback.Ripple("#ccc", true)}>
                    <View >
                        <Thumbnail square  style={{width:20,height:20,marginRight:8}} source={require('../img/icon_close.png')} />
                    </View>
                    </TouchableNativeFeedback>
                </ListItem>
            )
        )
    };

    imageLoaded() {
        this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
    }

  render() {

      return (
          <Container style={{backgroundColor:'#fafafa'}} >
              <View style={{width:width,height:Config.STATUSBARHEIGHT,backgroundColor:Config.StatusBarColor}}>

              </View>
          {this._renderHeader()}
              <StatusBar backgroundColor="transparent"
                         barStyle="light-content"
                         translucent={true}
                         hidden={false}/>
          <Content  showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" >
             <View style={{paddingLeft:20,paddingRight:20,backgroundColor:'#fff'}}>
                 <Text style={{marginBottom:10,fontSize:16,color:'#f5c61e',marginTop:20}}>别人在搜</Text>
                 <Surface  width={width-40} height={1}>
                     <Shape d={path} stroke="#C5B061" strokeWidth={1} strokeDash={[3,5]}/>
                 </Surface>
                 <View style={{width:width,height:10}}>

                 </View>
                 <View style={{backgroundColor:'#fff'}}>
                     {this.state.data.map((item,i)=>
                         <TouchableOpacity key={i} button={true}
                               onPress={()=>Actions.assortmentone({title:item.name,searchstr:item.name})}
                               style={{backgroundColor:'#fefefe'}} >
                             <View style={{flexDirection:'row',alignItems:'center',marginBottom:10,marginTop:10}}>
                                 <View style={{alignItems:'flex-start',justifyContent:'center',backgroundColor:'#fefefe'}}>
                                     <Text style={{color:'#000',fontSize:14,lineHeight:20}} >{item.name}</Text>
                                 </View>
                                 <View style={{flex:1}}></View>
                                 <Text style={{color:'#ccc',fontSize:14}}>{item.count}件</Text>
                                 <Image style={{width:20,height:20,marginLeft:10}} source={require('../img/icon_close.png')} />
                             </View>
                             <Surface  width={width-40} height={1}>
                                 <Shape d={path} stroke="#ccc" strokeWidth={1} strokeDash={[3,5]}/>
                             </Surface>
                         </TouchableOpacity>
                     )}
                 </View>
             </View>

              {this.state.his.length==0?(
                  null
                  ):(
                      <ListItem style={{paddingTop:50,backgroundColor:'#fafafa'}} itemDivider>
                          <Text style={{fontSize:14,color:'#888',marginLeft:3}}>历史记录</Text>
                      </ListItem>
                  )}
              {this._renderHistoryList()}

          </Content>
          </Container>
    );
  }
}


// <View style={{width:width,height:200}}>
// <View style={{borderWidth:1,borderColor:'black',borderStyle : 'dashed',borderRadius:1,width:50,height:50}}></View>
// <Surface width={300} height={10}>
//     <Shape d={path} stroke="#C5B061" strokeWidth={5} strokeDash={[30,30]}/>
//     </Surface>
//     <View style={{width:100,height:80,borderRadius:15,elevation:10,backgroundColor:'#fff',margin:20,alignItems:'center',justifyContent:'center'}}>
//         <Text>客户端施</Text>
//     </View>
//
//     </View>
