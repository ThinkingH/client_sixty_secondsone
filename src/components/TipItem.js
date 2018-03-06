/**
 * Created by Administrator on 2018/1/2.
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
export default class TipItem extends React.PureComponent  {
    constructor(props) {
        super(props);
        this.state={
            data:this.props.data,
        };
    }

    render() {
        return (
            <TouchableOpacity
                onPress={()=>{Actions.tipdetails({data:this.state.data})}}
                activeOpacity={0.9}
                style={{marginRight:2.5,marginLeft:2.5,width:(width-30)/2}} >
                <View
                    style={{width:(width-30)/2}}
                   >
                    <View style={{backgroundColor:'#ccc',borderRadius:10}}>
                        <Image source={{uri:this.state.data.showimg}}
                               style={{height: (width-30)/2, width:(width-30)/2,borderRadius:10}}/>
                    </View>
                </View>
                <View style={{paddingLeft:15,marginBottom:10,marginTop:5}}>
                    <Text numberOfLines={1} style={{height:20, fontWeight:'100',lineHeight:20,fontSize:14,color:'#666'}} >
                        {this.state.data.biaoti}
                        </Text>
                    <Text numberOfLines={1} style={{height:15,lineHeight:15,fontSize:12,color:'#aaa'}} >
                        {this.state.data.jieshao}
                        </Text>
                </View>
                <View style={{height:(width-30)/2,width:(width-30)/2,position:'absolute',alignItems:'center',justifyContent:'center'}}>
                    <Thumbnail square style={{width:width/10,height:width/10}} source={require('../img/icon_tipstop.png')} />
                </View>
            </TouchableOpacity>
        )
    }
}