/**
 * Created by Administrator on 2017/10/24.
 */
import React from 'react';
import { View,  StyleSheet,Image,Dimensions,DeviceEventEmitter,Text,TouchableOpacity } from 'react-native';
import { Container, Header, Content, Button, Icon, List, Thumbnail ,ListItem, Left,Body,Right,Switch ,Card, CardItem,} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Request from '../utils/Fetch';
import Config from '../utils/Config';
import Toast from '@remobile/react-native-toast'
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});
let isfromcollect=false;
export default class VideoItem extends React.PureComponent  {
    constructor(props) {
        super(props);
        this.state={
            iscollect:this.props.selected=='1'?true:false,
        };

    }
    _goDetails=()=>{
        if(this.props.thetype=='1022'){
            isfromcollect=true;
            Actions.videodetails({title:this.props.item.biaoti,nowid:this.props.item.vid,isfromcollect:isfromcollect})
        }else{
            isfromcollect=false;
            Actions.videodetails({title:this.props.item.biaoti,nowid:this.props.item.vid,isfromcollect:isfromcollect})
        }
    };

    // componentWillUpdate () {
    //     console.log('qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq',this.state.iscollect)
    //    this.setState({
    //        iscollect:this.props.selected=='1'?true:false
    //    })
    // }

    // shouldComponentUpdate (){
    //     console.log('qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq',this.state.iscollect)
    //     this.setState({
    //         iscollect:this.props.selected=='1'?true:false
    //     })
    // }

    componentWillReceiveProps(nextProps){
       // console.log('nextPropsnextPropsnextProps',nextProps)
       // console.log('this.state.iscollectthis.state.iscollect',this.state.iscollect)
        if(nextProps.selected=='1'){
            this.setState({
                iscollect:true
            })
        }else{
            this.setState({
                iscollect:false
            })
        }


    }

    _getCollect=(isCollect)=>{
        let typeid=null;
        if(isCollect){
            typeid="1"
        }else{
            typeid="2"
        }
        let parpam="thetype=1023&nowid="+this.props.item.vid+"&typeid="+typeid;
        Request('1023',parpam)
            .then((responseJson) => {
                this.setState({
                    iscollect:isCollect,
                });
                DeviceEventEmitter.emit('getMainRefresh','点击收藏时候刷新');
                //DeviceEventEmitter.emit('refreshmain','点击收藏时候刷新');
                DeviceEventEmitter.emit('getCollect','点击收藏时候刷新');
                DeviceEventEmitter.emit('getRefresh','点击收藏时候刷新');
                Toast.show(responseJson.msg)
            })
            .catch((error) => {
                Toast.show(error.toString());
            });
    };

    _collect=()=>{
        if(Config.usertype=="1"){
            if(this.state.iscollect){
                this._getCollect(false);
            }else {
                this._getCollect(true);
            }
        }else{
          let  num=  Math.ceil(Math.random()*4)-1
            Actions.login2({num:num});
        }
    };

    render() {
        console.log('sssssssssssssssssssssssssssss',this.props.item)
        console.log('this.props.selectedthis.props.indexthis.props.indexthis.props.index.',this.props.index)
        return (

                <TouchableOpacity  onPress={()=>{ DeviceEventEmitter.emit("zanting","让视频暂停");
                        if(this.props.sign){
                            Actions.dietarycontribute({title:this.props.item.biaoti,nowid:this.props.item.vid,isfromcollect:isfromcollect})
                        }else{
                          this._goDetails();
                        }
                        }} activeOpacity={1}   style={{marginLeft:this.props.index%2==0?15:0,marginRight:this.props.index%2==1?0:5,marginTop:10}} >
                    <TouchableOpacity style={{width:(width-30)/2-2.5}}
                        activeOpacity={0.9}
                        onPress={()=>{ DeviceEventEmitter.emit("zanting","让视频暂停");
                        if(this.props.sign){
                            Actions.dietarycontribute({title:this.props.item.biaoti,nowid:this.props.item.vid,isfromcollect:isfromcollect})
                        }else{
                          this._goDetails();
                        }
                        }}   >
                        <View style={{backgroundColor:'#ccc',borderRadius:10}}>
                            <Image source={{uri:this.props.item.showimg}} style={{height: (width-30)/2-2.5, width:(width-30)/2-2.5,borderRadius:10}}/>
                            <TouchableOpacity activeOpacity={0.9} onPress={()=>{this._collect()}} style={{position:'absolute',bottom:10,left:10,width:40,height:40,justifyContent:'flex-end'}}>
                                <Image style={{width:20,height:20}} source={this.state.iscollect?require('../img/newicon_listitem_collect.png'):require('../img/newicon_listitem_uncollect.png')}/>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                    <View style={{paddingLeft:15,marginBottom:5,marginTop:5}}>
                        <Text numberOfLines={1} style={{height:20, fontWeight:'100',fontFamily:'MSYH',lineHeight:20,fontSize:14,color:'#666'}} >{this.props.item.biaoti}</Text>
                         <Text numberOfLines={1} style={{height:15, letterSpacing:5,lineHeight:15,fontSize:10,color:'#aaa'}} >{this.props.item.biaoti}</Text>
                        <TouchableOpacity activeOpacity={1} style={{flexDirection:'row',alignItems:'center',height:15,}}>
                            <Image source={{uri:this.props.item.showimg}} style={{height:10, width:10,borderRadius:5}}/>
                            <Text numberOfLines={1} style={{ letterSpacing:5,lineHeight:15,fontSize:10,marginLeft:5,color:'#f5c61e',fontFamily:'MSYH'}} >{this.props.item.biaoti}</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>

        )
    }
}