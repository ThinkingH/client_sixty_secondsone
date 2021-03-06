/**
 * Created by Administrator on 2017/10/26.
 */
/**
 * Created by Administrator on 2017/10/25.
 */
/**
 * Created by Administrator on 2017/10/24.
 */
import React from 'react';

import { View,  StyleSheet,Dimensions,DeviceEventEmitter,TouchableOpacity,Alert,ART} from 'react-native';
import { Container, Header, Content, Button, Icon, List, Thumbnail ,ListItem, Text,Left,Body,Right,Switch ,Card, CardItem, Col ,Item} from 'native-base';
import Request from '../utils/Fetch';
import Toast from '@remobile/react-native-toast'
import { Actions } from 'react-native-router-flux';
import Config from '../utils/Config';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});
const {width, height} = Dimensions.get('window');
const {Surface, Shape, Path} = ART;
const path = Path()
    .moveTo(0,1)
    .lineTo(width-20,1);
let delid=null;
export default class ContributeItem extends React.PureComponent {


    componentDidMount() {

        this.ContributeListItem = DeviceEventEmitter.addListener("ContributeListItem",this._alertt);

    }

    componentWillUnmount() {
        this.ContributeListItem.remove();
    }

    _deletecomment=()=>{
        let parpam="thetype=1021&typeid=2&delid="+delid+"&dataid="+this.props.id;
        Request('1021',parpam)
            .then((responseJson) => {
                this.props.callBack("1");
            })
            .catch((error) => {
                Toast.show(error.toString());
            });
    }

    _alertt=()=>{
        Alert.alert(
            '',
            "确定要删除吗",
            [
                {text: '取消', onPress: () => {
                    console.log("没删除")
                }},
                {text: '确定', onPress: () => {
                   this._deletecomment();
                }},
            ],
            // { cancelable: false }
        );
    };


    render() {
        return (
            <List style={{backgroundColor:'#fff'}} >
                <View style={{backgroundColor:'#fff',flexDirection:'row',alignItems:'center'}} >
                    <Thumbnail  style={{width:50,height:50,margin:15}} source={{uri:this.props.data.touxiang}} />
                    <Col>
                        <Text style={{color:'#232323'}} numberOfLines={1} >{this.props.data.nickname}</Text>
                        <Text note>{this.props.data.create_datetime}</Text>
                    </Col>
                    {this.props.data.userid==Config.userid?(
                            <Right >
                                <TouchableOpacity activeOpacity={0.9}
                                    onPress={()=>{DeviceEventEmitter.emit("ContributeList","弹出modal");delid=this.props.data.id}}
                                   >
                                    <Thumbnail   square style={{width:20,height:20,marginRight:15}} source={require('../img/icon_contributelist_more.png')} />
                                </TouchableOpacity>
                            </Right>
                        ):(null)}
                </View>
                <Thumbnail square style={{width:width,height:width}} source={{uri:this.props.data.showimg}} />
                <View style={{padding:15}}>
                    <Text style={{marginTop:15,marginBottom:15}}>{this.props.data.content}</Text>
                </View>
                <View style={{paddingLeft:20,paddingRight:20}} >
                    <Surface  width={width-40} height={1}>
                        <Shape d={path} stroke="#C5B061" strokeWidth={1} strokeDash={[3,5]}/>
                    </Surface>
                </View>
            </List>
        )
    }
}