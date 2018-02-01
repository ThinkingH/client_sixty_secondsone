/**
 * Created by Administrator on 2017/10/27.
 */
/**
 * Created by Administrator on 2017/10/11.
 */
import React, { Component } from 'react';
import {StyleSheet, InteractionManager, TouchableOpacity, View,Dimensions, Image, Platform,StatusBar} from "react-native";
import { Container, Header,Footer, Content, List, ListItem, Text, Left, Right, Switch, Body, Thumbnail, Item, Col, Input, Button } from 'native-base';
import {Actions} from "react-native-router-flux";
import Config from '../utils/Config';
import Request from '../utils/Fetch';
import Toast from '@remobile/react-native-toast'
import ListScene from "./ListScene";
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,backgroundColor: '#efeff4',
    },
    textcolor: {
        color:'#999'
    }
});
const data = [
    {"name" : "1、提前准备所有食材，鸡肉剁成块叨叨叨制作正宗黄焖鸡选用的是新鲜三黄鸡的鸡腿这样做出来的鸡肉才能鲜嫩透味但我更喜欢带骨的鸡块所以选用的半只三黄鸡", age:"皮皮吃虾",id:1},
    {"name" : "2.将土豆洗净切成滚刀块叨叨叨：黄焖鸡中的配料没有固定的标准，土豆块、金针菇、香菇都可以，按照大家喜欢的口味就可以", age: "皮皮吃虾",id:2},
    {"name" : "3.锅内倒水煮沸，将切好的鸡块放入沸水中焯烫然后捞出沥干水分", age: "皮皮吃虾",id:3},
    {"name" : "4.将老姜切片；葱切成段；青椒切成片待用", age: "皮皮吃虾",id:4},
    {"name" : "5.锅内倒油烧热后将鸡块倒入锅中翻炒煸炒出香味，然后加入料酒叨叨叨：加入料酒可以去除鸡块中的腥味和异味", age: "皮皮吃虾",id:5},
    {"name" : "6.倒入老抽、生抽、蚝油翻炒均匀", age: "皮皮吃虾",id:6},
    {"name" : "7.再将姜片、葱段、八角下锅", age: "皮皮吃虾",id:7},
    {"name" : "8.放入准备好的土豆块和适量清水，加入适量盐和白糖调味，大火烧开转为小火焖30分钟左右至汤汁收紧", age: "皮皮吃虾",id:8},
    {"name" : "9.待汤汁收紧时，下青椒块翻炒均匀即可关火", age: "皮皮吃虾",id:9},
    {"name" : "10.出锅后撒上葱花即可食用叨叨叨：其实收汁时最好食用砂锅，但是考虑到家庭制作时比较麻烦，就一次性在锅中解决了这个问题，一点也不影响成菜的口感", age: "皮皮吃虾",id:10},

];
let _value='';
export default class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
         value:''


        };
    }
    componentDidMount() {

    }


    _goToMessage=()=>{
        if(Config.usertype=='1'){
            Actions.messagebox({title:'留言箱'})
        }else{
            let num=  Math.ceil(Math.random()*4)-1
            Actions.login2({num:num})
        }

    }

    render() {
        return (
            <Container style={{backgroundColor:'#fafafa'}}>

                <StatusBar backgroundColor={Config.StatusBarColor}
                           barStyle="dark-content"
                           translucent={false}
                           hidden={false}/>
                <TouchableOpacity activeOpacity={0.9} onPress={()=>this._goToMessage()} style={{width:width,height:80,flexDirection:'row',alignItems:'center',backgroundColor:'#fff'}}>
                    <Image  style={{width:50,height:50,marginLeft:20}} source={require('../img/icon_messagebox.png')} />
                    <Text style={{marginLeft:10}}>留言箱</Text>
                </TouchableOpacity>
                <View style={{width:width,height:5,backgroundColor:'#f8f8f8'}}>

                </View>
                <ListScene url={"thetype=1024"} thetype="1024" item={"message"} />


            </Container>
        );

    }

}