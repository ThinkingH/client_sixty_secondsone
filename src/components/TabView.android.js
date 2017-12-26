import React from 'react';
import { PropTypes } from "react";
import { Image,StyleSheet,Text, View, ViewPropTypes,DeviceEventEmitter, TextInput, TouchableNativeFeedback ,Dimensions,Keyboard, ART} from "react-native";
import { Container, Header, Content, Button, Form, Item, Icon, List, Badge, Col, Input,
    Thumbnail ,ListItem,  Left, Body, Right, Switch ,Card, CardItem, Row, FooterTab, Footer} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Storage  from '../utils/Storage';
import Toast from '@remobile/react-native-toast';
import TabIcon from '../components/TabIcon';
import Config from "../utils/Config";
const dismissKeyboard = require('dismissKeyboard');
dismissKeyboard();

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});
const {Surface, Shape, Path} = ART;
export default class TabView extends React.Component {
    static navigationOptions = {
        tabBarLabel: Config.navs_txt[1],
        tabBarIcon: ({focused,tintColor}) => (<Image source={focused ?Config.icons_s[1]:Config.icons[1]}/>)
    }

    constructor(props) {
        super(props);
        this.state = {
            value:'',
            his:[],
        };
        this._getHistory();
    }
    componentDidMount() {

        this.getHistory = DeviceEventEmitter.addListener("getHistory",this._getHistory);

    }
    componentWillUnmount(){
        this.getHistory.remove();
    }

    _removeArr=(data)=>{
        return Array.from(new Set(data))
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
            <Header androidStatusBarColor={Config.StatusBarColor} style={{backgroundColor:'#fff'}}>
                <Row  style={{justifyContent:'center',alignItems:'center'}}>
                <Icon style={{marginRight:10,marginLeft:5,color:'#ccc'}}  name='search' />
                <Input  style={{height:40,marginTop:5,}}
                      value={this.state.value}
                     placeholderTextColor="#ccc"

                     placeholder='菜名、食材等搜索'
                     onChangeText={(value)=>this.setState({value})}
                     maxLength={18}
                />

                    <TouchableNativeFeedback
                        onPress={()=>{this.saveHistory();Keyboard.dismiss();}}
                        background={TouchableNativeFeedback.Ripple("#ccc", true)}>
                        <View>
                            <Text  style={{color:'#c5b361'}}>搜索</Text>
                        </View>


                    </TouchableNativeFeedback>

            </Row>
          </Header>
      )
    };

    _renderHistoryList=()=>{
        return(
            this.state.his.map((item,i)=>
                <ListItem onPress={()=> Actions.searchvideo({value:item,isassort:false})} button={true} key={i} style={{backgroundColor:'#fefefe',height:60}} itemDivider>
                    <Thumbnail square  style={{width:20,height:20}} source={require('../img/icon_videodetails_time.png')} />
                    <Text numberOfLines={1} style={{marginLeft:30,color:'#000'}}>{item}</Text>
                    <View style={{flex:1}}></View>
                    <TouchableNativeFeedback
                      onPress={()=>{this._deleteHistory(i)}}
                      background={TouchableNativeFeedback.Ripple("#ccc", true)}>
                    <View >
                        <Thumbnail square  style={{width:20,height:20}} source={require('../img/icon_close.png')} />
                    </View>
                    </TouchableNativeFeedback>
                </ListItem>
            )
        )
    };

  render() {
      const path = Path()
          .moveTo(1,1)
          .lineTo(300,1);
      return (
          <Container style={{backgroundColor:'#fafafa'}} >
          {this._renderHeader()}
          <Content showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" >
              <View style={{width:width,height:10,backgroundColor:'#fafafa'}}></View>
              <Row onPress={()=>Actions.assortmentsearch({title:'全部分类'})} style={{alignItems:'center',height:60,backgroundColor:'#fefefe'}}>
                <Thumbnail square  style={{width:20,height:20,marginLeft:15}} source={require('../img/icon_search.png')} />
                <Text style={{marginLeft:30,color:'#000',fontSize:16,}}>按分类搜索食谱</Text>
              </Row>
              {this.state.his.length==0?(
                  null
                  ):(
                      <ListItem style={{paddingTop:50,backgroundColor:'#fafafa'}} itemDivider>
                          <Text style={{color:'#555',fontSize:14}}>搜索历史</Text>
                      </ListItem>
                  )}
              {this._renderHistoryList()}
              <View style={{width:width,height:100}}>
                  <View style={{borderWidth:1,borderColor:'black',borderStyle : 'dashed',borderRadius:1,width:50,height:50}}></View>
                  <Surface width={300} height={10}>
                      <Shape d={path} stroke="#C5B061" strokeWidth={5} strokeDash={[30,30]}/>
                  </Surface>


              </View>
          </Content>
          </Container>
    );
  }
}



