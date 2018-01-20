/**
 * Created by Administrator on 2017/11/15.
 */
/**
 * Created by Administrator on 2017/10/24.
 */
import React from 'react';
import { View,  StyleSheet,Image,Dimensions,DeviceEventEmitter,Modal } from 'react-native';
import { Container, Header, Content, Button, Icon, List, Thumbnail ,ListItem, Text,Left,Body,Right,Switch ,Card, CardItem,Spinner} from 'native-base';
import {LineDotsLoader} from 'react-native-indicator';

const {width, height} = Dimensions.get('window');

export default class Spinnera extends React.Component {





    render() {
       let isvisiable= this.props.modalVisible?this.props.modalVisible:false;
        return (
            <Modal
                   transparent={true}
                   onRequestClose={() => { this.setState({modalVisible: false});}}
                   visible={isvisiable}
            >
                <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'rgba(255,255,255,0.8)'}}>




                                <Text style={{color:'#666',fontSize:18,marginBottom:10}}>{this.props.loadvalue}</Text>
                                <LineDotsLoader color={'#F5C61E'} />




                </View>

            </Modal>
        )
    }
}