/**
 * Created by Administrator on 2017/10/17.
 */
import React from 'react';
import { PropTypes } from "react";
import {
    StyleSheet, Text, View, ViewPropTypes, TextInput, TouchableNativeFeedback, Dimensions,
    Platform
} from "react-native";
import { Container, Header, Content, Button,Form,Item, Icon, List,Badge,Col, Input,
    Thumbnail ,ListItem, Left,Body,Right,Switch ,Card, CardItem,Row,FooterTab,Footer} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Request from '../utils/Fetch';
import Toast from '@remobile/react-native-toast'
import Config from "../utils/Config";
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
});

export default class AssortmentSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
             data:[],
        };
    }
    componentDidMount(){
            this._getData();
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

    render() {
        return (
            <Container style={{backgroundColor:'#eee'}} >
                {Platform.OS=='ios'?(null):(
                    <Header style={{height:0}} androidStatusBarColor={Config.StatusBarColor}>

                    </Header>
                )}
                <Content style={{backgroundColor:'#eee'}}>
                    <List style={{backgroundColor:'#fff'}}>
                        {this.state.data.map((item,i)=>
                            <ListItem key={i} button={true} onPress={()=>Actions.assortmentone({title:item.name,searchstr:item.name})} style={{alignItems:'center',backgroundColor:'#fefefe'}} >
                                <View style={{alignItems:'flex-start',justifyContent:'center',backgroundColor:'#fefefe'}}>
                                    <Text style={{color:'#000',fontSize:18}} >{item.name}</Text>
                                    <Text style={{fontSize:12,color:'#c8c8c8'}}>{item.childname}</Text>
                                </View>
                                <View style={{flex:1}}></View>
                                <Text style={{color:'#000',fontSize:18}}>{item.count}件</Text>
                            </ListItem>
                        )}
                    </List>
                    <View style={{width:width,height:1,backgroundColor:'#ccc'}}></View>
                </Content>
            </Container>
        );
    }
}


