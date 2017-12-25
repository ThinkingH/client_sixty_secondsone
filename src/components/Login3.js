import React from 'react';
import {View, Text,Dimensions, StyleSheet,findNodeHandle,Image,ScrollView,PanResponder} from "react-native";

import {Actions} from "react-native-router-flux";
import ListScene from "../scene/ListScene";
import Toast from '@remobile/react-native-toast'

const {width, height} = Dimensions.get('window');
export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewRef: null,
        scroheight:200,

        };
    }

    imageLoaded() {
        this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
    }
    componentWillMount() {
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
                // setTimeout(()=>{
                //     dx=dy
                // },200);
                //
                // console.log("开始滑动",dx)

            },
            onPanResponderMove: (evt, gestureState) => {
                //console.log("最近一次的移动距离",gestureState.dy)
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
                return true;
                // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
                // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
                // 默认返回true。目前暂时只支持android。
                return false;
            }
        });
    }

    render(){

        return (
            // <View style={styles.container}>
            //     <Image
            //         ref={(img) => { this.backgroundImage = img; }}
            //         source={{uri:"http://oys7tcwkg.bkt.clouddn.com/a.jpg?imageView2/1/w/200/h/200/q/75|imageslim"}}
            //         style={styles.absolute}
            //         onLoadEnd={this.imageLoaded.bind(this)}
            //     />
            //     <BlurView
            //         style={styles.absolute}
            //         viewRef={this.state.viewRef}
            //         blurType="light"
            //         blurAmount={10}
            //     />
            //     <Text>Hi, I am some unblurred text</Text>
            // </View>
            <ScrollView >
                <View style={{width:width,height:100,backgroundColor:'#f00'}}>

                </View>

                    <ScrollView pagingEnabled={true}  horizontal={true} style={{height:200}}>
                        <View style={{width:width,height:100,backgroundColor:'#ffda2c'}}>

                        </View>
                        <View style={{width:width,height:100,backgroundColor:'#46dbff'}}>

                        </View>
                        <View style={{width:width,height:100,backgroundColor:'#60ff5b'}}>

                        </View>

                    </ScrollView>


                <ScrollView pagingEnabled={true} horizontal={true} style={{height:this.state.scroheight}}>
                    <ListScene url={"thetype=1015&classify2=网红菜"} thetype="1015" item={"video"}/>
                    <MainScene url={"thetype=1015&searchstr="} thetype="1015" header={"header"}  item={"video"} />
                    <ListScene url={"thetype=1015&classify2=网红菜"} thetype="1015" item={"video"} />
                </ScrollView>

            </ScrollView>
        );
    }

}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    absolute: {
        position: "absolute",
        top: 0, left: 0, bottom: 0, right: 0,
    },
});