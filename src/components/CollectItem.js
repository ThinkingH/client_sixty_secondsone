/**
 * Created by Administrator on 2018/1/4.
 */
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
export default class CollectItem extends React.PureComponent  {
    constructor(props) {
        super(props);
        this.state={
            iscollect:true,
            data:this.props.data
        };
    }
    _goDetails=()=>{
        if(this.props.thetype=='1022'){
            isfromcollect=true;
           Actions.videodetails({title:this.state.data.biaoti,nowid:this.state.data.vid,isfromcollect:isfromcollect})
        }else{
            isfromcollect=false;
            Actions.videodetails({title:this.state.data.biaoti,nowid:this.state.data.vid,isfromcollect:isfromcollect})
        }
    };

    _getCollect=(isCollect)=>{
        let typeid=null;
        if(isCollect){
            typeid="1"
        }else{
            typeid="2"
        }
        let parpam="thetype=1023&nowid="+this.state.data.vid+"&typeid="+typeid;
        Request('1023',parpam)
            .then((responseJson) => {
                this.setState({
                    iscollect:isCollect,
                });
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
            Actions.login2();
        }
    };

    render() {
        return (

                    <TouchableOpacity onPress={()=>this._goDetails()}

                        activeOpacity={1}   style={{marginRight:2.5,marginLeft:2.5,marginTop:15}} >
                        <View style={{width:(width-30)/2-2.5}}

                                           >
                            <View style={{backgroundColor:'#ccc',borderRadius:10}}>
                                <Image source={{uri:this.state.data.showimg}} style={{height: (width-30)/2-2.5, width:(width-30)/2-2.5,borderRadius:10}}/>
                                <TouchableOpacity activeOpacity={0.9} onPress={()=>{this._collect()}} style={{position:'absolute',bottom:10,left:10,width:20,height:20}}>
                                    <Image style={{width:20,height:20}} source={this.state.iscollect?require('../img/newicon_listitem_collect.png'):require('../img/newicon_listitem_uncollect.png')}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{paddingLeft:15,marginTop:5}}>
                            <Text numberOfLines={1} style={{height:20, fontWeight:'100',lineHeight:20,fontSize:14,color:'#666'}} >{this.state.data.biaoti}</Text>
                            <Text numberOfLines={1} style={{height:15, letterSpacing:5,lineHeight:15,fontSize:10,color:'#aaa'}} >{this.state.data.biaoti}</Text>

                        </View>
                    </TouchableOpacity>

        )
    }
}