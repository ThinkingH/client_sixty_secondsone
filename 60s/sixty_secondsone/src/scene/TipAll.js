/**
 * Created by Administrator on 2018/1/2.
 */
import React, { Component } from 'react';
import { Image,Dimensions,NetInfo,StyleSheet ,StatusBar,InteractionManager,DeviceEventEmitter} from 'react-native';
import Request from '../utils/Fetch';
import Config from '../utils/Config';
import Toast from '@remobile/react-native-toast'
import ListScene from "./ListScene";

import { Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon,Button } from 'native-base';

const {width, height} = Dimensions.get('window');


export default class TipAll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
        };
    }



    componentWillUnmount(){

    }

    componentDidMount () {




                this._getData();



    }



    _getData=()=>{
        let parpam="thetype=1036&typex=2&searchstr="+this.props.tiptype;
        Request('1036',parpam)
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


                <StatusBar backgroundColor={Config.StatusBarColor}
                           barStyle="light-content"
                           translucent={false}
                           hidden={false}/>
                <View style={{padding:10,flex:1}}>
                    <ListScene url={"thetype=1036&typex=2&searchstr="+this.props.tiptype} thetype="1036"  item={"tip"}/>
                </View>

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