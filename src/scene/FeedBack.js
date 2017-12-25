/**
 * Created by Administrator on 2017/10/27.
 */
import React,{Component} from 'react';
import {View, Text, StyleSheet, ListView, Image, TextInput,Alert,StatusBar} from "react-native";
import {Button} from 'native-base'
import {Actions} from "react-native-router-flux";
import Request from '../utils/Fetch';
import Toast from '@remobile/react-native-toast';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#efeff4",
    },
    feedBack_title: {
        height: 54,
        paddingLeft:12,
        paddingRight:12,
        backgroundColor: "#ffffff",
        borderBottomColor: '#e7e7e7',
        borderBottomWidth: 2,
        marginTop:15,
    },
    mt12: {
        marginTop: 12,
    },
    mb12: {
        marginBottom: 12,
    },
    default: {
        height: 210,
        padding: 12,
        color:"#8f8f95",
        backgroundColor: "#ffffff",
        textAlign:"auto",
        textAlignVertical:'top'
    },btn:{
        color: "#ffffff",
        height: 45,
        textAlignVertical:"center",
        textAlign:"center",
        marginLeft:30,
        marginRight:30,
        marginTop:30,
        borderRadius:5,
        backgroundColor: '#c5b361',
    }
});

export default class FeedBack extends Component {
    constructor(props){
        super(props);
        this.state={
            address:"",
            txt:"",
        };
    }

    _getData=()=>{
        if(this.state.address==""){
            Toast.show("请留下您的联系方式");
            return
        }
        if(this.state.txt==""){
            Toast.show("请填写您的宝贵意见");
            return
        }
        let parpam="thetype=1006&yijian="+this.state.txt+"&contact="+this.state.address;
        Request('1006',parpam)
            .then((responseJson) => {
                Alert.alert(
                    '',
                    "提交成功",
                    [
                        {text: '确定', onPress: () => {Actions.pop();}},
                    ]
                );
            })
            .catch((error) => {
                Toast.show(error.toString());
            });
    };

    render(){
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#000000"
                           barStyle="light-content"
                           translucent={false}
                           hidden={false}/>
                <TextInput  style={[styles.feedBack_title,{color: '#8f8f95'}]}
                            placeholder="留下您的联系方式（QQ、微信、电话均可）"
                            underlineColorAndroid="transparent"
                            maxLength={20}
                            onChangeText={(address) => this.setState({address})}
                >
                </TextInput>
                <View>
                    <TextInput
                        maxLength={100}
                        underlineColorAndroid="transparent"
                        placeholder="请在这里输入"
                        multiline={true}
                        onChangeText={(txt) => this.setState({txt})}
                        style={[styles.default]}/>
                </View>
                <View>
                    <Button block={true} style={[styles.btn]} onPress={()=>{this._getData()}}><Text style={{color:'#fff',fontSize:16}}>提 交</Text></Button>
                </View>
            </View>
        );
    }
}
