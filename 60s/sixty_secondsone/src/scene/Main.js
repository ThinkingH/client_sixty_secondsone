import  React, {Component} from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Image,Animated,
    PanResponder,DeviceEventEmitter,
    Dimensions,Button,
    TouchableOpacity
} from 'react-native';
import { Container, Header, Content,  Icon, List, Thumbnail ,ListItem, Text,Left,Body,Right,Switch ,Card, CardItem,} from 'native-base';
import {Actions} from "react-native-router-flux";
import Toast from '@remobile/react-native-toast'

const { height, width } = Dimensions.get('window');
var ITEM_HEIGHT = 100;

let dy=4;
let dx=0;
export default class main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            movey:0,
        };
    }
    _renderItem = (item) => {
        let item1 = item;
        var txt = '第' + item1.index + '个' + ' title=' + item1.item.title;
        var bgColor = item1.index % 2 == 0 ? 'red' : 'blue';
        return (
            <Card   style={{marginLeft:5,marginRight:5,borderRadius:6}} >
                <CardItem  onPress={()=>Actions.videodetails()} button={true}  cardBody>
                    <Image source={require('../img/noob.png')} style={[{height: 200, width: null, flex: 1,borderRadius:6}]}/>
                </CardItem>
                <CardItem >
                    <Text>Doing what you like will always keep you happy . .</Text>
                </CardItem>
            </Card>
        )
    }

    _header = () => {
        return <Text style={[styles.txt, { backgroundColor: 'black' }]}>这是头部</Text>;
    }

    _footer = () => {
        return <Text style={[styles.txt, { backgroundColor: 'black' }]}>这是尾部</Text>;
    }
    _separator = () => {
        return <View style={{ height: 2, backgroundColor: 'yellow' }}/>;
    }
    _onRefresh() {
        alert('正在刷新中.... ');
    }

    componentWillMount () {
    this._panResponder = PanResponder.create({
        // 要求成为响应者：
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

        onPanResponderGrant: (evt, gestureState) => {
            // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！

            // gestureState.{x,y} 现在会被设置为0
        },
        onPanResponderStart: (e, gestureState) => {
            setTimeout(()=>{
                dx=dy
            },100);

            console.log("开始滑动",dx)

        },
        onPanResponderMove: (evt, gestureState) => {
            console.log('一直在回调我')
            console.log("最近一次的移动距离",gestureState.dy)
            // 最近一次的移动距离为gestureState.move{X,Y}
          //  console.log("最近一次的移动距离e",evt.nativeEvent)
            // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
        },
        onPanResponderEnd: (e, gestureState) => {
           // console.log("移动结束后",gestureState)
          //  console.log("移动结束后e",e.nativeEvent.locationY)
        },
        onPanResponderTerminationRequest: (evt, gestureState) => true,
        onPanResponderRelease: (evt, gestureState) => {
            //console.log("用户放开了所有的触摸点",evt.nativeEvent.locationY)
           // console.log("用户放开了所有的触摸点",gestureState)
            // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
            // 一般来说这意味着一个手势操作已经成功完成。
        },
        onPanResponderTerminate: (evt, gestureState) => {
            // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
        },
        onShouldBlockNativeResponder: (evt, gestureState) => {
            // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
            // 默认返回true。目前暂时只支持android。
            return true;
        }
    });
}

_onScrollEnd=(e)=>{
       dy=e.nativeEvent.contentOffset.y
    if(dy-dx>30){
      //  console.log("该执行tab沉浸式了该执行tab沉浸式了")
       // DeviceEventEmitter.emit("changeTab","隐藏tab")
        //alert("该执行tab沉浸式了")
    }else if (dx-dy>30){
       //alert("该执行导航栏沉浸式了")
       // console.log("该执行导航栏沉浸式了该执行导航栏沉浸式了")
    }else{
       // console.log(e.nativeEvent.contentOffset.y)
    }
      // console.log("e.nativeEvent.contentOffset",e.nativeEvent.contentOffset)
  //  console.log("e.nativeEventt",e.nativeEvent)

}

    render() {
        var data = [];
        for (var i = 0; i < 31; i++) {
            data.push({ key: i, title: i + '' });
        }
        return (
            <View {...this._panResponder.panHandlers}  style={{ flex: 1 }}>
                <Button title='滚动到指定位置' onPress={() => {
                    //this._flatList.scrollToEnd();
                  //  this._flatList.scrollToIndex({viewPosition:0,index:8});
                    this._flatList.scrollToOffset({ animated: true, offset: 0 });
                } }/>
                <View style={{ flex: 1 }}>
                    <FlatList  scrollEventThrottle={1}
                             onScroll={(e)=>this._onScrollEnd(e)}

                        ref={(flatList) => this._flatList = flatList}
                        ListHeaderComponent={this._header}
                        ListFooterComponent={this._footer}
                        ItemSeparatorComponent={this._separator}
                        renderItem={this._renderItem}
                        numColumns ={2}
                        columnWrapperStyle={{ borderWidth: 2, borderColor: 'black' }}
                        refreshing={this.state.refreshing}
                        getItemLayout={(data, index) => (
                            { length: ITEM_HEIGHT, offset: (ITEM_HEIGHT + 2) * index, index }
                        ) }
                        onRefresh={this._onRefresh}
                        onEndReachedThreshold={0.1}
                        onEndReached={(info) => {
                            alert("滑动到底部了");
                        } }
                        onViewableItemsChanged={(info) => {
                            //    alert("可见不可见触发");
                        } }
                        data={data}>
                    </FlatList>
                </View>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    txt: {
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'white',
        fontSize: 30,
    }
});


