/**
 * Created by Administrator on 2017/11/22.
 */
/**
 * Created by Administrator on 2017/10/19.
 */
import React, { Component } from 'react';
import { ListView,Dimensions, Image ,TouchableNativeFeedback,DeviceEventEmitter,Platform} from 'react-native';
import {Actions} from "react-native-router-flux";
import { Container, Header,View, Content, Button,
    Icon,Form,Item,Label,Input, List, ListItem,
    Text,Left,Right,Body ,Thumbnail,Row} from 'native-base';
const {width, height} = Dimensions.get('window');
let h=(height-150)/720;
let w=width;
let rw=w-60;
let timearr=[{time:9.00,sign:'am',timemid:9.30},
    {time:10.00,sign:'am',timemid:10.30},
    {time:11.00,sign:'am',timemid:11.30},
    {time:12.00,sign:'am',timemid:12.30},
    {time:1.00,sign:'pm',timemid:1.30},
    {time:2.00,sign:'pm',timemid:2.30},
    {time:3.00,sign:'pm',timemid:3.30},
    {time:4.00,sign:'pm',timemid:4.30},
    {time:5.00,sign:'pm',timemid:5.30},
    {time:6.00,sign:'pm',timemid:6.30},
    {time:7.00,sign:'pm',timemid:7.30},
    {time:8.00,sign:'pm',timemid:8.30},
    {time:9.00,sign:'pm',timemid:9.30},
];
let viewarr=[
    {start:540,end:600,color:'#f00',num:3,pyl:0},
    {start:550,end:620,color:'#0f0',num:3,pyl:rw/3*1},
    {start:560,end:650,color:'#00f',num:3,pyl:rw/3*2},
    {start:630,end:690,color:'#f0f',num:3/2,pyl:0},
    ];
let arr=[
    {start:30,end:670},
    {start:100,end:180},
    {start:180,end:200},
    {start:210,end:480},
    {start:220,end:490},
    {start:250,end:500},
    {start:280,end:510},
    {start:540,end:600},
    {start:550,end:620},
    {start:560,end:650},
    {start:630,end:690},
    {start:640,end:700},
];
let Arr=[
    {start:30,end:670},
    {start:100,end:180},
    {start:180,end:200},
    {start:210,end:480},
    {start:220,end:490},
    {start:250,end:500},
    {start:280,end:510},
    {start:540,end:600},
    {start:550,end:620},
    {start:560,end:650},
    {start:630,end:690},
    {start:640,end:700},
];
let two=[];
let three=[];
export default class Testa extends Component {
    constructor(props) {
        super(props);
        this.state = {
           timedata:timearr,
            varr:viewarr,
        };
    }

    componentDidMount () {

        // let z=1;
        //        for(let i=0;i<viewarr.length-1;i++){
        //            for(let j=viewarr.length-2;j>0;j--){
        //                if(viewarr[i].end-viewarr[z+1].start>0){
        //                    two.push(viewarr[i]);
        //                    z++;
        //                }else{
        //                    three.push(viewarr[i+1]);
        //                }
        //                console.log(two)
        //                console.log(three)
        //            }
        //            z=2;
        //
        //        }
    }

    render() {
        return (
                <View style={{height:height,width:width,flexDirection:'row'}}>
                    <View style={{width:60,height:height,backgroundColor:'#fff'}}>
                        {this.state.timedata.map((item,i)=>
                            <View style={{height:h*60,width:60,alignItems:'flex-end',backgroundColor:'#fff'}}>
                                <Text style={{color:'#000',lineHeight:h*60/2,backgroundColor:'#fff'}}>{item.time}:00<Text style={{fontSize:12,color:'#ccc',marginLeft:5}}>{item.sign}</Text></Text>
                                <Text style={{fontSize:12,color:'#666',lineHeight:h*60/2,backgroundColor:'#fff'}}>{item.timemid}:00</Text>
                            </View>
                        )}
                    </View>
                    <View style={{width:w-60,height:height,backgroundColor:'#ccc'}}>
                        <View style={{flex:1,flexDirection:'row'}}>
                            {this.state.varr.map((item,i)=>

                                <View style={{position:'absolute',width:(w-60)/item.num,height:(item.end-item.start)*h,
                            top:item.start*h,backgroundColor:item.color,left:item.pyl}}>

                                </View>
                            )}
                        </View>
                    </View>
                </View>

        );
    }


}


