/**
 * Created by Administrator on 2018/1/3.
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
export default class SearchItem extends React.PureComponent  {
    constructor(props) {
        super(props);
        this.state={
            data:this.props.data,
        };
    }

    _isVideo=()=>{
      if(this.state.data.vtype=='1'){
        //跳转到视频页面
          console.log('sssssssssssssss')
          Actions.videodetails({title:this.state.data.biaoti,nowid:this.state.data.vid,isfromcollect:isfromcollect})
      }else if(this.state.data.vtype=='2'){
          //跳转到小贴士页面
        Actions.tipdetails({data:this.state.data});
      }
    };

    componentWillReceiveProps(nextProps){
        console.log('22222222222222222222222222',nextProps)
        let data=nextProps.data;
        this.setState({
            data:data
        })
    }

    render() {
        return (
                    <TouchableOpacity  onPress={()=>this._isVideo()}   activeOpacity={0.9}   style={{backgroundColor:'#fff',marginLeft:this.props.index%2==0?15:0,marginRight:this.props.index%2==1?0:5,marginTop:10}} >
                        <View style={{width:(width-30)/2-2.5}}>
                            <View style={{backgroundColor:'#ccc',borderRadius:10}}>
                                <Image source={{uri:this.state.data.showimg}} style={{height: (width-30)/2-2.5, width:(width-30)/2-2.5,borderRadius:10}}/>
                            </View>
                        </View>
                        <View style={{paddingLeft:15,marginBottom:10,marginTop:5,width:(width-30)/2-2.5}}>
                            <Text numberOfLines={1} style={{height:20, fontWeight:'100',lineHeight:20,fontSize:14,color:'#666'}} >{this.state.data.biaoti}</Text>
                            <Text numberOfLines={1} style={{height:15, letterSpacing:0,lineHeight:15,fontSize:10,color:'#aaa'}} >{this.state.data.jieshao}</Text>
                        </View>
                    </TouchableOpacity>
        )
    }
}