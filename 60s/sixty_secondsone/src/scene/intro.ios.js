import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    StatusBar,
} from 'react-native'
import Swiper from 'react-native-swiper'
import {Button} from 'native-base'
import Storage from "../utils/Storage";
import {Actions,ActionConst} from "react-native-router-flux";
const {width, height} = Dimensions.get('window');

export default class Intro extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    };
    componentWillMount() {

    }

    componentDidMount(){

    }

    componentWillUnmount(){

    };


    _goTotabbar=()=>{
        Storage.saveWithKeyValue("isfirst",'1');
        Actions.tabbar({type: ActionConst.RESET});
    }


    render(){
        return (
            <View style={{flex:1}}>
                <StatusBar barStyle="light-content"
                           translucent={true}
                           hidden={false}/>
                <Swiper style={styles.wrapper}
                        showButtons={false} loop={false}
                        activeDot={<View style={[styles.dotStyle,{backgroundColor:'#f5c61e'}]} />}
                        dotStyle={styles.dotStyle}>

                    <View style={styles.slide}>
                        <Image resizeMode={'cover'} style={styles.imageStyle} source={require('../img/icon_intro1.png')} />
                    </View>

                    <View style={styles.slide}>
                        <Image resizeMode={'cover'} style={styles.imageStyle} source={require('../img/icon_intro2.png')} />
                    </View>

                    <View style={styles.slide}>
                        <Image resizeMode={'cover'} style={styles.imageStyle} source={require('../img/icon_intro3.png')}>
                            <Button style={styles.enterButtonStyle} onPress={()=>this._goTotabbar()}>
                                <Text style={{color:'#fff',fontSize:18}}>点  击  进  入</Text>
                            </Button>
                        </Image>
                    </View>
                </Swiper>
            </View>

        )
    };
}

const  styles = StyleSheet.create({
    wrapper: {
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    imageStyle: {
        width:width,
        height:height
    },
    dotStyle:{
        backgroundColor: '#ccc',
        width: 12,
        height: 12,
        borderRadius: 6,
        marginLeft: 12,
        marginRight: 12,
        marginTop: 7,
        marginBottom: 60,
    },
    enterButtonStyle:{
        height:40,
        marginLeft:50,
        width:width-100,
        marginTop:height - 60,
        backgroundColor:'#f5c61e',
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center',
    },
});
