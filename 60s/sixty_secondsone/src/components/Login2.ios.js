import React,{Component} from 'react';
import {
    StyleSheet,
    Dimensions,
    DeviceEventEmitter,
    TouchableOpacity,
    StatusBar,
    Image,
    ImageBackground
} from "react-native";
import {Actions,ActionConst} from "react-native-router-flux";
import Request from '../utils/Fetch';
import Storage  from '../utils/Storage';
import Config from '../utils/Config';
import Toast from '@remobile/react-native-toast'
import { Container, Header, Content, Item, Input,Thumbnail,Button ,Text,Left,Right,Body,Row,View} from 'native-base';
import ShareUtile from '../utils/ShareUtil'
import Spinnera from '../components/Spinner';

const {width, height} = Dimensions.get('window');
const imgarr=[require('../img/icon_login1.png'),require('../img/icon_login2.png'),require('../img/icon_login3.png'),require('../img/icon_login4.png')]
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
    },
    icon :{
        width:width/7,height:width/7,marginTop:15
    }
});
let num=0;

export default class Login2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            code: '',
            visible:false,
            timerCount:60,
            timerTitle:'获取验证码',
            isvisiable:false,
        };
        num=this.props.num?this.props.num:1
    };
    componentWillMount() {

    }

    componentDidMount(){

        // console.log("date",date);
    }

    componentWillUnmount(){

    };
    /*
     * 手机号的正则表达式
     * */
    checkPhoneNum=(phone)=>{
        let reg = /^1[3|5|7|8]\d{9}$/g;
        return reg.test(phone);
    };

    _coundDown=()=>{
        this.setState({
            btn_vcode:true,
            timerCount:60,
            timerTitle:60,
        });
        this.interval=setInterval(() =>{
            var timer=this.state.timerCount-1;
            if(timer===0){
                this.interval&&clearInterval(this.interval);
                this.setState({
                    timerCount:60,
                    timerTitle:'重新获取',
                    btn_vcode:false,
                });
            }else{
                this.setState({
                    timerCount:timer,
                    timerTitle:timer,
                })
            }
        },1000);
    };

    _getData=()=>{
        if (!this.checkPhoneNum(this.state.phone)){
            Toast.show("请输入正确的手机号!");
            return
        }


        let parpam="thetype=1001"+'&phone='+this.state.phone;
        Request('1001',parpam)
            .then((responseJson) => {
                this._coundDown();
            })
            .catch((error) => {
                Toast.show("网络请求失败");
            });
    };

    _checklogin=(platform)=>{
        //0	QQ  1	SINA  2	微信 3	朋友圈
        this.setState({
            isvisiable:true,
        });
        ShareUtile.auth(platform,(code,result,message) =>{
            this.setState({result:message});
            if (code == 200){
                this.setState({
                    isvisiable:false,
                })
                this._loginWay(platform,result);


                console.log(result);
            }else{
                this.setState({
                    isvisiable:false,
                });
                Toast.show(message);
            }
        });
    };
    _loginWay=(platform,result)=>{
        this.setState({
            isvisiable:true,
        })
        let parpam=null;
        if(platform==0){  //QQ
            parpam="thetype=1026"+'&qqid='+result.openid+'&nickname='+result.name+'&headimgurl='+result.iconurl;
        } else if(platform==1){  //微博
            parpam="thetype=1027"+'&qqid='+result.openid+'&nickname='+result.name+'&headimgurl='+result.iconurl;
        }else if(platform==2){  //微信
            parpam="thetype=1026"+'&qqid='+result.uid+'&nickname='+result.name+'&headimgurl='+result.iconurl;
        }


        Request('1026',parpam)
            .then((responseJson) => {
                let userid=responseJson.data.userid;
                let userkey=responseJson.data.userkey;
                if(responseJson.sucerr=='100'){
                    this.setState({
                        isvisiable:false,
                    })
                    Actions.pop();
                    Config.userid=userid;
                    Config.userkey=userkey;
                    Config.usertype="1";
                    Storage.saveWithKeyValue("userid",userid);
                    Storage.saveWithKeyValue("userkey",userkey);
                    Storage.saveWithKeyValue("usertype","1");
                    Config.createJiGuangId();
                    DeviceEventEmitter.emit("getinfo","刷新个人信息")
                }else{
                    Toast.show('登录失败')
                    this.setState({
                        isvisiable:false,
                    })
                }
            })
            .catch((error) => {
                this.setState({
                    isvisiable:false,
                })
                Toast.show(error.toString());
            });
    };

    _login=()=>{
        if (!this.checkPhoneNum(this.state.phone)){
            Toast.show("请输入正确的手机号!");
            return
        }

        if(this.state.code.length<6){
            Toast.show("请输入正确的验证码!");
            return
        }
        let parpam="thetype=1002"+'&phone='+this.state.phone+'&vcode='+this.state.code;
        Request('1002',parpam)
            .then((responseJson) => {
                console.log('11111',responseJson,'222',responseJson.sucerr)
                if(responseJson.sucerr =='100'){
                    let userid=responseJson.data.userid;
                    let userkey=responseJson.data.userkey;
                    if(responseJson.data.firstlogin=="no"){
                        console.log('11111111111111')
                        Config.userid=userid;
                        Config.userkey=userkey;
                        Config.usertype="1";
                        Config.createJiGuangId();
                        Storage.saveWithKeyValue("userid",userid);
                        Storage.saveWithKeyValue("userkey",userkey);
                        Storage.saveWithKeyValue("usertype","1");
                        DeviceEventEmitter.emit("getinfo","刷新个人信息")
                        Actions.pop();
                    }else {
                       // Actions.pop();

                        Actions.getinfo({type:ActionConst.RESET,userid:userid,userkey:userkey});

                    }
                }else{
                    Toast.show('验证码错误')
                }
            })
            .catch((error) => {

                 Toast.show(error.toString());
            });
    };

    _renderNewLogin=()=>{
        return(
            <Container style={{backgroundColor:'#fafafa'}}>
                <StatusBar backgroundColor="transparent"
                           barStyle="light-content"
                           translucent={true}
                           hidden={false}/>
                <Content keyboardShouldPersistTaps="handled"  >
                    <Body style={{flex:1,alignItems:'center'}}>
                    <ImageBackground  style={{width:width,height:width,justifyContent:'flex-end',alignItems:'center'}}
                                       source={imgarr[num]} >
                        <Item rounded style={{width:width-60,paddingLeft:10,backgroundColor:'#fff',elevation:1,alignItems:'center'}} >

                            <Input onChangeText={(phone)=>this.setState({phone})}
                                   placeholderTextColor="#999"
                                   style={{height:40,padding:0,fontSize:14,width:width-80}}
                                   maxLength={11}
                                   placeholder='请输入手机账号'/>
                            <Button style={{height:40}}  transparent={true}
                                    rounded
                                    onPress={()=>this._getData()}><Text style={{color:'#999'}}>{this.state.timerTitle}</Text>
                            </Button>
                        </Item>
                    </ImageBackground>
                    <Item  rounded style={{marginTop:10,width:width-60,elevation:1,paddingLeft:10,}}>
                        <Input onChangeText={(code)=>this.setState({code})}
                               placeholderTextColor="#999"
                               style={{height:40,padding:0,fontSize:14,width:width-80}}
                               maxLength={6}
                               placeholder='请输入验证码'/>

                    </Item>

                    <TouchableOpacity activeOpacity={0.9} onPress={()=>{this._login()}}>
                        <Thumbnail    style={{width:width/6,height:width/6,marginTop:15}} source={require('../img/icon_loginbtn.png')} />
                    </TouchableOpacity>
                    </Body>
                </Content>
                <TouchableOpacity activeOpacity={0.9} onPress={()=>{Actions.pop()}} style={{width:20,height:20,position:'absolute',top:Config.STATUSBARHEIGHT+10,left:20}}>
                    <Image style={{width:20,height:20}} source={require('../img/icon_close.png')} />
                </TouchableOpacity>
                {Config.isDebug === "2" ? (null) : this._renderShieldThirdParty()}
                <Spinnera loadvalue="第三方登陆中..." modalVisible={this.state.isvisiable} />
            </Container>
        )
    }
//屏蔽第三方登录
    _renderShieldThirdParty=()=>{
        return(
            <Body style={{position:'absolute',bottom:20}}>
                <Text style={{marginTop:15,color:'#8c8c8c',fontSize:12,}}>用其他方式登录60SEC</Text>
                <Row style={{padding:15,justifyContent:'center'}}>
                    <Left>
                        <TouchableOpacity onPress={()=>{this._checklogin(2)}}>
                            <View style={{marginLeft:width/6}}>
                                <Image style={{width:width/8,height:width/8}} source={require('../img/icon_wx.png')} />
                            </View>
                        </TouchableOpacity>
                    </Left>
                    <Right>
                        <TouchableOpacity onPress={()=>{this._checklogin(0)}}>
                            <View  style={{marginRight:width/6}}>
                                <Image square style={{width:width/8,height:width/8}} source={require('../img/icon_qq.png')} />
                            </View>
                        </TouchableOpacity>
                    </Right>
                </Row>
            </Body>
        );
    }


    render(){
        return(
            this._renderNewLogin()
        );
    }
}
