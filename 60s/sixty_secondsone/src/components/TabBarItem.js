import React, { Component } from "react";
'use strict';
import {
    AppRegistry,
    View,
    Text,
    StyleSheet,
    Image,
} from "react-native";

var styles=StyleSheet.create({
    tabbarContainer:{
        flex:1,
        backgroundColor:"#f6f6f6",
    },
    tabbarItem:{
        alignItems:"center",
        justifyContent:"center",
        textAlign:"center",
        marginLeft:-3
    }
})

export default class TabBarItem extends Component{
    constructor(props){
        super(props);
        console.log(props);
        this.data={
            index:{
                title:"首页",
                icon:"home",
            },
            type:{
                title:"分类",
                icon:"th-large",
            },
            car:{
                title:"购物车",
                icon:"shopping-cart",
            },
            me:{
                title:"我的",
                icon:"user",
            }
        }
    }
    render(){
        let param=this.data[this.props.key];
        let activeStyle=this.props.selected?{color:"#3399FF"}:{};
        return <View>
            <Image source={require('./../img/nav_home_n.png')}/>
            <Text style={[activeStyle,styles.tabbarItem]}>{this.props.title}</Text>
        </View>
    }
}
