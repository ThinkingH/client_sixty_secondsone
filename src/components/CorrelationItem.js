/**
 * Created by Administrator on 2018/1/12.
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

export default class CorrelationItem extends React.PureComponent  {
    constructor(props) {
        super(props);
        this.state={

        };
    }

    _goDetails=()=>{
        if(this.props.thetype=='1022'){

            Actions.videodeta({title:this.props.title.biaoti,nowid:this.props.title.id})
        }else{

            Actions.videodeta({title:this.props.title.biaoti,nowid:this.props.title.id})
        }
    };

    render() {
        //  console.log('this.props.selected..........................',this.state.iscollect)
        return (

            <TouchableOpacity  onPress={()=>{ DeviceEventEmitter.emit("zanting","让视频暂停");

                          this._goDetails();

                        }} activeOpacity={1}   style={{width:(width-50)/2}} >
                <TouchableOpacity style={{width:(width-50)/2}}
                                  activeOpacity={0.9}
                                  onPress={()=>{ DeviceEventEmitter.emit("zanting","让视频暂停");this._goDetails();}}
                >
                    <View style={{backgroundColor:'#ccc',borderRadius:10}}>
                        <Image source={{uri:this.props.title.showimg}} style={{height: (width-50)/2, width:(width-50)/2,borderRadius:10}}/>

                    </View>
                </TouchableOpacity>
                <View style={{paddingLeft:15,marginBottom:5,marginTop:5}}>
                    <Text numberOfLines={1} style={{height:20, fontWeight:'100',lineHeight:20,fontSize:14,color:'#666'}} >{this.props.title.biaoti}</Text>
                    <Text numberOfLines={1} style={{height:15, lineHeight:15,fontSize:10,color:'#aaa'}} >{this.props.title.jieshao}</Text>
                    {/*<TouchableOpacity activeOpacity={1} style={{flexDirection:'row',alignItems:'center',height:15,}}>*/}
                        {/*<Image source={require('../img/icon_maketime.png')} style={{height:10, width:10,borderRadius:5}}/>*/}
                        {/*<Text numberOfLines={1} style={{ letterSpacing:5,lineHeight:15,fontSize:10,marginLeft:5,color:'#f5c61e'}} >{this.props.title.maketime}</Text>*/}
                    {/*</TouchableOpacity>*/}
                </View>
            </TouchableOpacity>

        )
    }
}