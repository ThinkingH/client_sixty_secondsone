/**
 * Created by Administrator on 2018/1/15.
 */
/**
 * Created by Administrator on 2017/10/13.
 */
import React, { Component } from 'react';
import {
    ScrollView, StyleSheet, FlatList, View, Text, Dimensions, InteractionManager, Image, TouchableOpacity, Slider,
    Alert, DeviceEventEmitter, Platform,StatusBar,ART,ImageBackground
} from 'react-native';
import {Actions,ActionConst} from "react-native-router-flux";
import PLVideoView from "../widget/PLVideoView";
import Request from '../utils/Fetch';
import Config from '../utils/Config';
import Toast from '@remobile/react-native-toast'
import { Container, Header, Content, Button,Form,Item, Icon, List,Badge,Col,
    Thumbnail ,ListItem, Left,Body,Right,Switch ,Card, CardItem,Row,FooterTab,Footer} from 'native-base';
import Storage  from '../utils/Storage';

import AppIntro from 'react-native-app-intro';
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',

    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
});
const {Surface, Shape, Path} = ART;
const path = Path()
    .moveTo(0,1)
    .lineTo(width-20,1);
let isshowbtn=false
export default class Intro extends Component {
    constructor(props) {
        super(props);
        this.state={
            isshow:false
        };


    }



    componentWillMount () {


    }

    componentWillUnmount () {

    }

    componentDidMount () {

        // this.onCompletion = DeviceEventEmitter.addListener("onCompletion",this._onCompletion);
        InteractionManager.runAfterInteractions(() => {


        });

    }

    onSkipBtnHandle = (index) => {
        Alert.alert('Skip');
        console.log(index);
    }
    doneBtnHandle = () => {
        Alert.alert('Done');
    }
    nextBtnHandle = (index) => {
        Alert.alert('Next');
        console.log(index);
    }
    onSlideChangeHandle = (index, total) => {
        console.log(index, total);
        if(index==2){

                isshowbtn=true

        }else{
            isshowbtn=false
        }
    }


    _goTotabbar=()=>{
        Storage.saveWithKeyValue("isfirst",'1');
        Actions.tabbar({type: ActionConst.RESET});
    }

    render() {
        const pageArray = [{

            img: require('../img/noob.png'),
            imgStyle: {
                height: height,
                width: width,
            },
            backgroundColor: '#fff',
            fontColor: '#fff',
            level: 10,
        }, {
            img: require('../img/noob.png'),
            imgStyle: {
                height: height,
                width: width,
            },
            backgroundColor: '#fff',
            fontColor: '#fff',
            level: 10,
        }, {
            img: require('../img/noob.png'),
            imgStyle: {
                height: height,
                width: width,
            },
            backgroundColor: '#fff',
            fontColor: '#fff',
            level: 10,
        }];
        return (
            <View style={{flex:1}}>
                <StatusBar backgroundColor="#c5b361"
                             barStyle="light-content"
                             translucent={true}
                             hidden={true}/>
                <AppIntro rightTextColor={'#f5c61e'}
                          nextBtnLabel={''}
                          doneBtnLabel={'进入'}
                          onDoneBtnClick={()=>this._goTotabbar()}
                          showDoneButton={true}
                          showSkipButton={false}
                          activeDotColor={'#f5c61e'}
                          dotColor={'#ccc'}>
                    <View style={[styles.slide,{ backgroundColor: '#fff' }]}>
                        <Image resizeMode={'cover'} style={{ width:width,height:height }} source={require('../img/icon_intro1.png')} />
                    </View>

                    <View style={[styles.slide, { backgroundColor: '#fff' }]}>
                        <Image resizeMode={'cover'} style={{ width:width,height:height }} source={require('../img/icon_intro2.png')} />
                    </View>

                    <View style={[styles.slide,{ backgroundColor: '#fff' }]}>
                        <Image resizeMode={'cover'} style={{width:width,height:height}} source={require('../img/icon_intro3.png')} />
                    </View>

                </AppIntro>

            </View>
        );
    }
}
