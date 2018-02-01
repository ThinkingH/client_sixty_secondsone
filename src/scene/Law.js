/**
 * Created by Administrator on 2017/11/30.
 */
import React, { Component } from 'react';
import {
    StyleSheet, DeviceEventEmitter, View, Dimensions, Modal, TouchableOpacity, Linking, WebView, InteractionManager,
    Platform
} from "react-native";
import { Container, Header, Content, List, ListItem, Text, Left, Right,  Body } from 'native-base';
import {Actions} from "react-native-router-flux";
import Storage  from '../utils/Storage';
import Config from '../utils/Config';
import Switch from 'react-native-switch-pro'
import Toast from '@remobile/react-native-toast'
import Request from '../utils/Fetch';
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,backgroundColor: '#efeff4',
    },
    textcolor: {
        color:'#999',
        fontSize:14,
        fontWeight:'100'
    }
});

export default class Law extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backButtonEnabled: false,
            forwardButtonEnabled: false,
            scalesPageToFit: true,
            url: Config.BaseURL + 'sixtyxieyi.html',
        };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({
                url: Config.BaseURL + 'sixtyxieyi.html',
            });
        });

    }


    render() {
        return (
            <Container style={{backgroundColor:'#fff'}}>
                {Platform.OS=='ios'?(null):(
                    <Header style={{height:0}} androidStatusBarColor={Config.StatusBarColor}>

                    </Header>
                )}

                <WebView
                    automaticallyAdjustContentInsets={false}
                    style={{height:height,width:width}}
                    source={{uri: this.state.url}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    onNavigationStateChange={this.onNavigationStateChange}
                    onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                    startInLoadingState={true}
                    scalesPageToFit={this.state.scalesPageToFit}
                />
            </Container>
        );
    }
}