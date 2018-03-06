/**
 * Created by Administrator on 2018/1/2.
 */
import React, { Component } from 'react';
import { Image,Dimensions,NetInfo,StyleSheet,ART ,StatusBar,ScrollView,InteractionManager,TouchableOpacity,ImageBackground,DeviceEventEmitter} from 'react-native';
import Request from '../utils/Fetch';
import Config from '../utils/Config';
import Toast from '@remobile/react-native-toast'
import ListScene from "./ListScene";
import {Actions} from "react-native-router-flux";

import { Container,Content, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon,Button } from 'native-base';

const {width, height} = Dimensions.get('window');

const {Surface, Shape, Path} = ART;
const path = Path()
    .moveTo(0,1)
    .lineTo(width-20,1);
export default class TipView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],

        };
    }



    componentWillUnmount(){

    }

    componentDidMount () {
        this._getData()
        // InteractionManager.runAfterInteractions(() => {
        //          this._getData()
        // });
    }

    _getData=()=>{
        let parpam="thetype=1036&typex=1";
        Request('1036',parpam)
            .then((responseJson) => {
                this.setState({
                    data:responseJson.data.list,

                })
            })
            .catch((error) => {
                Toast.show(error.toString());
            });
    }


    render() {
        return (
            <Container style={{backgroundColor:'#fff'}}>


                <StatusBar backgroundColor="transparent"
                           barStyle="light-content"
                           translucent={true}
                           hidden={false}/>
                <View style={{width:width,height:Config.STATUSBARHEIGHT,backgroundColor:Config.StatusBarColor}}>

                </View>

                <ImageBackground    style={{width:width,height:50,flexDirection:'row'}} source={require('../img/icon_homebg.png')} >


                    <View style={{width:width,height:50,position:'absolute',alignItems:'center',justifyContent:'center',backgroundColor:'transparent'}}>
                        <Text style={{color:'#fff',fontSize:18,backgroundColor:'transparent',marginBottom:width/1.28/850*130/6}}>小窍门</Text>
                    </View>
                </ImageBackground>
                <View style={{width:width,height:width/1.28/850*130/5*4,backgroundColor:'transparent'}}>

                </View>


                <Content  showsVerticalScrollIndicator={false}>
                    <View style={{padding:20,}} >
                        <Surface  width={width-40} height={1}>
                            <Shape d={path} stroke="#C5B061" strokeWidth={1} strokeDash={[3,5]}/>
                        </Surface>
                    </View>

                    {this.state.data.map((itema,ia)=>
                        <View style={{paddingLeft:20}}  key={ia} >
                            <View style={{width:width-20,height:40,justifyContent:'center',alignItems:"center",flexDirection:'row'}}>
                                <Text style={{marginLeft:5,fontSize:18}}>{itema.classname}</Text>
                                <View style={{flex:1}}></View>
                                <TouchableOpacity activeOpacity={0.9}
                                                  onPress={()=>Actions.tipall({tiptype:itema.class,title:itema.classname})}
                                >
                                    <Text style={{marginRight:20,color:'#F5C61E'}}>查看全部</Text>
                                </TouchableOpacity>


                            </View>
                            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} >
                                {itema.listvideo.map((item,i)=>
                                    <View  style={{width:width/2.7,marginRight:15}}  key={i}>
                                        <TouchableOpacity activeOpacity={0.8}
                                                          style={{flex:1}}
                                                          onPress={()=>Actions.tipdetails({data:item})}
                                        >
                                            <View style={{width:width/2.7,height:width/2.7,borderRadius:10,backgroundColor:'#ccc'}}>
                                                <Image square style={{width:width/2.7,height:width/2.7,borderRadius:10}} source={{uri:item.showimg}} />
                                            </View>




                                                <View style={{marginLeft:10,marginTop:10,justifyContent:'center'}}>
                                                    <Text numberOfLines={1} style={{height:20, fontWeight:'100',lineHeight:20,fontSize:14,color:'#000'}}>{item.biaoti}</Text>
                                                    <Text numberOfLines={1} style={{height:15, letterSpacing:1,lineHeight:15,color:'#999',fontSize:12}}>{item.jieshao}</Text>
                                                </View>


                                        </TouchableOpacity>
                                    </View>
                                )}
                            </ScrollView>
                            <View style={{paddingRight:20,marginTop:10,marginBottom:20}} >
                                <Surface  width={width-40} height={1}>
                                    <Shape d={path} stroke="#ccc" strokeWidth={1} strokeDash={[3,5]}/>
                                </Surface>
                            </View>
                        </View>
                    )}


                </Content>

                <TouchableOpacity style={{position:'absolute',left:(width-width/1.28)/2,top:width/472*65-width/1.28/850*130/3+Config.STATUSBARHEIGHT}} activeOpacity={1}
                                  onPress={()=>Actions.TabView()}>
                    <Image  style={{width:width/1.28,height:width/1.28/850*130}} source={require('../img/newicon_seachbar.png')} />
                </TouchableOpacity>
            </Container>
        );
    }
}
//滑动的甲板
// <Container>
// <Header />
// <View>
// <DeckSwiper
//     ref={(c) => this._deckSwiper = c}
//     dataSource={cards}
//     renderEmpty={() =>
//               <View style={{ alignSelf: "center" }}>
//                 <Text>Over</Text>
//               </View>}
//     renderItem={item =>
//               <Card style={{ elevation: 3 }}>
//                 <CardItem>
//                   <Left>
//                     <Thumbnail source={item.image} />
//                     <Body>
//                       <Text>{item.text}</Text>
//                       <Text note>NativeBase</Text>
//                     </Body>
//                   </Left>
//                 </CardItem>
//                 <CardItem cardBody>
//                   <Image style={{ height: 300, flex: 1 }} source={item.image} />
//                 </CardItem>
//                 <CardItem>
//                   <Icon name="heart" style={{ color: '#ED4A6A' }} />
//                   <Text>{item.name}</Text>
//                 </CardItem>
//               </Card>
//             }
// />
// </View>
// <View style={{ flexDirection: "row", flex: 1, position: "absolute", bottom: 50, left: 0, right: 0, justifyContent: 'space-between', padding: 15 }}>
//     <Button iconLeft onPress={() => this._deckSwiper._root.swipeLeft()}>
//         <Icon name="arrow-back" />
//         <Text>Swipe Left</Text>
//     </Button>
//     <Button iconRight onPress={() => this._deckSwiper._root.swipeRight()}>
//         <Icon name="arrow-forward" />
//         <Text>Swipe Right</Text>
//     </Button>
// </View>
// </Container>