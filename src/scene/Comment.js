/**
 * Created by Administrator on 2017/10/11.
 */
import React, { Component } from 'react';
import { StyleSheet,Platform, InteractionManager,TouchableNativeFeedback,View,Image,DeviceEventEmitter} from "react-native";
import { Container, Header,Footer, Content, List, ListItem, Text, Left, Right, Switch, Body, Thumbnail, Item, Col, Input, Button } from 'native-base';
import {Actions} from "react-native-router-flux";
import Config from '../utils/Config';
import Request from '../utils/Fetch';
import Toast from '@remobile/react-native-toast'
import ListScene from "./ListScene";
import Spinnera from '../components/Spinner';
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
            isopen:true,
            data:data,
            value:"",
            disabled:true,
            aa:'#f00',
            isvisiable:false,
        };
    }
    componentDidMount() {

    }

    componentWillUnmount () {
        Actions.refresh({startdetailsvideo:true});
    }

    _sendMsg=()=>{
             if(_value==''||_value==null){
                 Toast.show('请填写发送内容');
                 return;
             }

        if(Config.usertype=="1"){
            this.setState({
                isvisiable:true
            });
            //let base64DataString=encodeURIComponent(this.state.value);
            let  parpama="thetype=1020&typeid=1&contentdata="+this.state.value+"&dataid="+this.props.nowid;
            Request('1020',parpama)
                .then((responseJson) => {
                    Toast.show(responseJson.msg);
                    DeviceEventEmitter.emit('getRefresh','刷新评论');
                    _value='';
                    this.setState({
                        isvisiable:false,
                        value:'',
                        disabled:true
                    });
                })
                .catch((error) => {
                    this.setState({
                        isvisiable:false,
                        disabled:false
                    });
                    Toast.show(error.toString());
                });
        }else{
            Actions.login2();
        }
    };

    _getValue=(value)=>{
        _value=value;
        this.setState({value});
        if(_value!==""&&_value!=null){
            this.setState({
                disabled:false
            })
        }else{
            this.setState({
                disabled:true
            })
        }
    }
    render() {
        return (
            <Container style={{backgroundColor:'#fafafa'}}>
                {Platform.OS=='ios'?(null):(
                    <Header style={{height:0}} androidStatusBarColor={Config.StatusBarColor}>

                    </Header>
                )}
                {/*<Content showsVerticalScrollIndicator={false}>*/}
                    {/*<List>*/}
                        {/*{this.state.data.map((item,i)=>*/}
                            {/*<Item style={{paddingTop:20,paddingBottom:20}}  key={item.id} >*/}
                                {/*<Thumbnail style={{width:50,height:50,marginRight:15,marginLeft:15}}  source={{uri:item.touxiang}} />*/}
                                {/*<Col>*/}
                                {/*<Text >{item.nickname}</Text>*/}
                                {/*<Text note>{item.content}</Text>*/}
                                {/*</Col>*/}
                            {/*</Item>*/}
                        {/*)}*/}
                    {/*</List>*/}
                {/*</Content>*/}
                <ListScene url={"thetype=1018&nowid="+this.props.nowid} thetype="1018" item={"comment"} />

                <Footer style={{backgroundColor:'#eee',justifyContent:'center',alignItems:'center',height:50,}}>
                    <Input  multiline={true}
                            style={{backgroundColor:'#fff',height:30,borderWidth:1,borderColor:'#666',fontSize:12,padding:0,marginLeft:15,marginRight:15,lineHeight:14}}
                            value={this.state.value}
                            onChangeText={(value)=>this._getValue(value)}
                    />
                    {Platform.OS=='ios'?(
                        <Button  disabled={this.state.disabled} onPress={()=>this._sendMsg()} style={{backgroundColor:this.state.disabled?'#ccc':'#C5B361',height:30,width:70,marginTop:10,marginRight:15}} ><Text >发送</Text></Button>

                    ):(
                        <Button disabled={this.state.disabled} onPress={()=>this._sendMsg()} style={{backgroundColor:this.state.disabled?'#ccc':'#C5B361',height:30,width:60,marginTop:10,marginRight:15}} small={true} ><Text>发送</Text></Button>

                    )}

                </Footer>
                <Spinnera loadvalue="提交评论中..." modalVisible={this.state.isvisiable} />
            </Container>
        );

    }

}