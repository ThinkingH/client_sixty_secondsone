/**
 * Created by Administrator on 2017/10/17.
 */
import React from 'react';
import { PropTypes } from "react";
import {
    StyleSheet, Text, View, ViewPropTypes, TextInput, TouchableNativeFeedback, Dimensions,
    Platform,StatusBar
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

export default class AssortmentOne extends React.Component {
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
        let parpam="thetype=1017&classtype=classify3&searchstr="+this.props.searchstr;
        Request('1017',parpam)
            .then((responseJson) => {
                console.log(responseJson);
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
                <StatusBar backgroundColor={Config.StatusBarColor}
                           barStyle="light-content"
                           translucent={false}
                           hidden={false}/>
                <Content style={{backgroundColor:'#eee'}}>
                    <List style={{backgroundColor:'#fff'}}>
                        {this.state.data.map((item,i)=>
                            <ListItem key={i} button={true} onPress={()=>Actions.assortmentthree({title:item.name,searchstr:item.name})} style={{alignItems:'center',}} >
                                <View style={{alignItems:'flex-start',justifyContent:'center',}}>
                                    <Text style={{color:'#000',fontSize:18}} >{item.name}</Text>

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


