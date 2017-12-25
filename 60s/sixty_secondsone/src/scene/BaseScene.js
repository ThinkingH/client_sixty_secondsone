import React, { Component } from 'react';
import { Image,Dimensions,NetInfo,StyleSheet ,InteractionManager,DeviceEventEmitter} from 'react-native';
import Request from '../utils/Fetch';
import Config from '../utils/Config';
import Toast from '@remobile/react-native-toast'
import ListScene from "./ListScene";

import { Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon,Button } from 'native-base';

const {width, height} = Dimensions.get('window');


export default class BaseScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collectnum:0,
        };
    }
    static navigationOptions = {
       // tabBarLabel: Config.navs_txt[2],
       // tabBarLabel: "",
       tabBarIcon: ({focused,tintColor}) => (<Image  source={focused ?Config.icons_s[2]:Config.icons[2]}/>)
    };


    componentWillUnmount(){
        this.getCollect.remove();
    }

    componentDidMount () {
        this.getCollect = DeviceEventEmitter.addListener("getCollect",this._getData);
        InteractionManager.runAfterInteractions(() => {

            if(Config.usertype=="1"){
                this._getData();
            }

        });
    }



    _getData=()=>{
        let parpam="thetype=1022";
        Request('1022',parpam)
            .then((responseJson) => {
                  this.setState({
                      collectnum:responseJson.data.length
                  })
            })
            .catch((error) => {
                Toast.show(error.toString());
            });
    }

    render() {
        return (
            <Container style={{backgroundColor:'#fff'}}>
                <Header androidStatusBarColor={Config.StatusBarColor} style={{backgroundColor:'#fefefe'}}>
                    <View style={{flex:1,justifyContent:'center'}}>
                        <Text style={{fontSize:18,marginLeft:10}}>我的收藏</Text>
                    </View>
                </Header>
                {Config.usertype=="1"?( this.state.collectnum==0?(
                            <View  style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#fafafa'}} >
                            <Thumbnail square  style={{width:width/1.7,height:width/1.7,marginRight:25}} source={require('../img/icon_collect_show.png')} />
                            <Text style={{marginTop:20}}>您还没有收藏任何菜谱哦,快去收藏吧~</Text>
                            </View>
                        ):(<ListScene url={"thetype=1022"} thetype="1022"  item={"video"}/>)
                    ):(
                        <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#f0f2f1'}}>
                        <Thumbnail square  style={{width:width/1.7,height:width/1.7,marginRight:25}} source={require('../img/icon_collect_show.png')} />
                        <Text style={{marginTop:20}}>您还没有收藏任何菜谱哦,快去收藏吧~</Text>
                        </View>
                    )}
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