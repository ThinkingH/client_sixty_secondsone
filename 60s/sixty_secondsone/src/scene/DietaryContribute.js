/**
 * Created by Administrator on 2017/10/13.
 */
import React, { Component } from 'react';
import { ScrollView,StyleSheet ,FlatList,View,Text,Dimensions,InteractionManager,Image,TouchableOpacity,Slider,Alert,DeviceEventEmitter} from 'react-native';
import {Actions} from "react-native-router-flux";
import PLVideoView from "../widget/PLVideoView";
import Request from '../utils/Fetch';
import Config from '../utils/Config';
import Toast from '@remobile/react-native-toast'
import { Container, Header, Content, Button,Form,Item, Icon, List,Badge,Col,
    Thumbnail ,ListItem, Left,Body,Right,Switch ,Card, CardItem,Row,FooterTab,Footer} from 'native-base';

import NetWorkTool from "../utils/NetWorkTool";
import ShareUtile from '../utils/ShareUtil'
// const data = [
//     {"name" : "三黄鸡鸡腿", quantity: "2个",id:1},
//     {"name" : "土豆", quantity: "2个",id:2},
//     {"name" : "青椒", quantity: "3个",id:3},
//     {"name" : "生抽", quantity: "1勺",id:4},
//     {"name" : "老抽", quantity: "半勺",id:5},
//     {"name" : "蚝油", quantity: "一勺",id:6},
//     {"name" : "老姜", quantity: "两片",id:7},
//     {"name" : "八角", quantity: "三颗",id:8},
//     {"name" : "葱", quantity: "半根",id:9},
//     {"name" : "盐", quantity: "20g",id:10},
//     {"name" : "料酒", quantity: "一勺",id:11},
//     {"name" : "白糖", quantity: "20g",id:12},
// ];
// const datas = [
//     {"name" : "1、提前准备所有食材，鸡肉剁成块叨叨叨制作正宗黄焖鸡选用的是新鲜三黄鸡的鸡腿这样做出来的鸡肉才能鲜嫩透味但我更喜欢带骨的鸡块所以选用的半只三黄鸡", age: 21,id:1},
//     {"name" : "2.将土豆洗净切成滚刀块叨叨叨：黄焖鸡中的配料没有固定的标准，土豆块、金针菇、香菇都可以，按照大家喜欢的口味就可以", age: 22,id:2},
//     {"name" : "3.锅内倒水煮沸，将切好的鸡块放入沸水中焯烫然后捞出沥干水分", age: 22,id:3},
//     {"name" : "4.将老姜切片；葱切成段；青椒切成片待用", age: 22,id:4},
//     {"name" : "5.锅内倒油烧热后将鸡块倒入锅中翻炒煸炒出香味，然后加入料酒叨叨叨：加入料酒可以去除鸡块中的腥味和异味", age: 22,id:5},
//     {"name" : "6.倒入老抽、生抽、蚝油翻炒均匀", age: 22,id:6},
//     {"name" : "7.再将姜片、葱段、八角下锅", age: 22,id:7},
//     {"name" : "8.放入准备好的土豆块和适量清水，加入适量盐和白糖调味，大火烧开转为小火焖30分钟左右至汤汁收紧", age: 22,id:8},
//     {"name" : "9.待汤汁收紧时，下青椒块翻炒均匀即可关火", age: 22,id:9},
//     {"name" : "10.出锅后撒上葱花即可食用叨叨叨：其实收汁时最好食用砂锅，但是考虑到家庭制作时比较麻烦，就一次性在锅中解决了这个问题，一点也不影响成菜的口感", age: 22,id:10},
//
// ];
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,backgroundColor: '#efeff4',
    },
    texts :{
        color:'#595959',
        fontSize:14
    },
    textb :{
        color:'#555',
        fontSize:18
    },
    imagelogo:{
        width:25,height:25
    },order_num:{
        backgroundColor:"#C5B361",
        width:17,
        height:17,
        top:2,
        right:width/8-15,
        position:'absolute',
        borderRadius:17,
        justifyContent:'center',
        alignItems:'center',


    }
});




export default class DietaryContribute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            cailiaoarr:[],
            buzhouarr:[],
        }

    }



    componentWillMount () {


    }

    componentWillUnmount () {

    }

    componentDidMount () {

            // this.onCompletion = DeviceEventEmitter.addListener("onCompletion",this._onCompletion);
            InteractionManager.runAfterInteractions(() => {
                this._getData();

        });

    }
    componentWillReceiveProps(nextProps){

    }


    _getData=()=>{
        let parpam="thetype=1016&imgwidth=800&imgheight=800&nowid="+this.props.nowid+"";
        Request('1016',parpam)
            .then((responseJson) => {
                this.setState({
                    data:responseJson.data,
                    cailiaoarr:responseJson.data.cailiaoarr,
                    buzhouarr:responseJson.data.buzhouarr,
                })


            })
            .catch((error) => {

                Toast.show(error.toString());
            });
    }


    _renderContributeList=()=>{
        return(
            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} >
                {this.state.dataa.map((item,i)=>
                    <View onPress={()=>this._listItemPress(2)} style={{width:width/2,marginLeft:15}}  key={item.id}>
                        <TouchableOpacity activeOpacity={1}
                                          style={{flex:1}}
                                          onPress={()=>this._listItemPress(2)}
                        >
                            <Image square style={{width:width/2,height:width/2}} source={{uri:item.showimg}} />
                            <View style={{flexDirection:'row',marginTop:10}}>
                                <Thumbnail  style={{width:50,height:50}} source={{uri:item.touxiang}} />
                                <View style={{marginLeft:10,marginTop:10,justifyContent:'center'}}>
                                    <Text numberOfLines={1} style={{color:'#000'}}>{item.nickname}</Text>
                                    <Text style={{color:'#595959',fontSize:14}}>9:25</Text>
                                </View>
                            </View>
                            <Text numberOfLines={2} style={{marginTop:10,color:'#000',fontSize:14}}>{item.content}</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        )
    }

    _renderViderDetails=()=>{
        return(
            <View>
                <Text numberOfLines={2} style={{margin:15,fontSize:18,color:'#212121',marginTop:20}}>{this.props.title}</Text>
                <Row style={{marginLeft:15,alignItems:'center'}}>
                    <Thumbnail square style={{width:14,height:14}} source={require('../img/icon_videodetails_time.png')} />
                    <Text style={[styles.texts,{marginLeft:5}]}>制作时间：{this.state.data.maketime}</Text>
                </Row>

                <View style={{width:width,flexDirection:'row',alignItems:'center',paddingBottom:20,paddingTop:20}}>

                        <Thumbnail  style={{width:width/8,height:width/8,marginLeft:15}} source={{uri:this.state.data.showimg}} />


                    <View style={{flex:1,justifyContent:'center',marginLeft:15}}>
                        <Text>食谱的制作人</Text>
                        <Text style={{color:'#000'}}>名字</Text>
                    </View>

                </View>
                <Text style={{paddingLeft:15,paddingRight:15}}>xcgbnjdfsngjndsklgnewo 快乐十分科技时代不能关掉妇科疾病个接口啥都能暴风科技先别动那个库</Text>
                <View style={{width:width,height:1,backgroundColor:'#cdcdcd',marginTop:20}}>
                </View>
                <View style={{width:width,height:20,backgroundColor:'#fafafa'}}>
                </View>
                <View style={{width:width,height:1,backgroundColor:'#cdcdcd'}}>
                </View>
            </View>
        )
    }





    render() {
        return (
            <Container style={{backgroundColor:'#fff'}}>
                <Header androidStatusBarColor={Config.StatusBarColor} style={{height:0}}>
                </Header>
                <Content  showsVerticalScrollIndicator={false}>
                    <Image  style={{width:width,height:width}} source={{uri:this.state.data.showimg}} />
                    {this._renderViderDetails()}
                    <ListItem style={{backgroundColor:'#fff',marginTop:10}} itemDivider>
                        <Text style={[styles.textb,{color:'#000'}]}>材料<Text style={[styles.texts,{color:'#000'}]}>（两人份）</Text></Text>
                    </ListItem>
                    {this.state.cailiaoarr.map((item,i)=>
                        <Item key={item.id} style={{marginLeft:15,marginRight:15,paddingBottom:10,paddingTop:10}}>
                            <Text note style={[styles.texts,{color:'#000'}]}>{item.name}</Text>
                            <View style={{flex:1}}>
                            </View>
                            <Text   style={[styles.texts,{color:'#000'}]}>{item.yongliang}</Text>
                        </Item>
                    )}
                    <ListItem style={{backgroundColor:'#fff',marginTop:10}} itemDivider>
                        <Text style={[styles.textb,{color:'#000'}]}>步骤</Text>
                    </ListItem>
                    {this.state.buzhouarr.map((item,i)=>
                        <Item style={{marginLeft:15,marginRight:15,paddingBottom:15,paddingTop:15}} key={item.id}>
                            <View style={{flex:1,flexDirection:'row'}}>
                                <Text style={{color:'#000',fontWeight:'800',marginRight:3}}>{item.buzhouid}.</Text>


                                <View style={{flex:1}}>
                                    <Text note style={[styles.texts,{color:'#000',lineHeight:20}]}>{item.buzhoucontent}xdgr的广东人风格让他恢复好热恢复供热个人吃饭的哈特加工费火热太化股份还让他</Text>
                                </View>
                                <View style={{paddingLeft:15,paddingRight:15}}>
                                    <Thumbnail square  style={{width:width/3,height:width/3}} source={{uri:this.state.data.showimg}} />
                                </View>
                            </View>


                        </Item>
                    )}
                    <ListItem style={{backgroundColor:'#fff',marginTop:10}} itemDivider>
                        <Text style={[styles.textb,{color:'#000'}]}>提示</Text>
                    </ListItem>
                    <Item style={{backgroundColor:'#fff',marginLeft:17,marginRight:17,paddingBottom:15}} >
                        <Text note style={[styles.texts,{color:'#000'}]}>{this.state.data.tishishuoming}</Text>
                    </Item>



                </Content>



            </Container>
        );
    }
}
/**
 * Created by Administrator on 2017/12/5.
 */
