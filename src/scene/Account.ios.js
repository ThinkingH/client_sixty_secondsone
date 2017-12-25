import React, { Component } from 'react';
import { Image,ListView,Dimensions,InteractionManager,DeviceEventEmitter,TouchableOpacity,RefreshControl,Animated } from 'react-native';
import {Actions} from "react-native-router-flux";
import Config from '../utils/Config';
import Request from '../utils/Fetch';
import Toast from '@remobile/react-native-toast'
import { Container, Header,View, Content, Button, Icon, List, Text, ListItem,Left,Right,Body ,Thumbnail,Row} from 'native-base';
import TabIcon from '../components/TabIcon';

const {width, height} = Dimensions.get('window');

export default class Account extends Component {

    static navigationOptions = {
        //tabBarLabel: Config.navs_txt[3],
        tabBarIcon: ({focused,tintColor}) => (<Image source={focused ?Config.icons_s[3]:Config.icons[3]}/>)
    };

    constructor(props) {
        super(props);
        this.state = {
            arr:[],
            imageheader:null,
            title:"mzy",
            name:'我的',
            desc:'',
            viewRef:null,
            isshow:true,
            isRefreshing:false,
            imgscale:new Animated.Value(1),//图片缩放
        };
    }

    componentDidMount(){

        if(Config.usertype==1){
            this._onFresh();
        }
        this.getInfo = DeviceEventEmitter.addListener("getinfo",this._updatelogin);
        this.onFresh = DeviceEventEmitter.addListener("onFresh",this._onFresh);
        InteractionManager.runAfterInteractions(() => {
            // this.state.imgscale.addListener((e)=>
            // { if(e.value>30){
            //                    alert('检测到了')
            //                 }    }
            //  )
        });
    };
    _onFresh=()=>{
        this._getInfo();
        this._getContributeList()
    }

    _updatelogin=()=>{
        this.setState({
            name:this.props.aaname,
        });
        if(Config.usertype==1){
            this._getInfo();
        }
    };

    componentWillUnmount(){
        this.getInfo.remove();
        this.onFresh.remove();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.isaccountinfo==true){
            this._getInfo();
        }
    }


    _getContributeList=()=>{
        console.log("投稿的获取")
        let parpam="thetype=1019&typeid=2";
        Request('1019',parpam)
            .then((responseJson) => {
                this.setState({
                    arr:responseJson.data.list
                })
            })
            .catch((error) => {
                Toast.show(error.toString());
            });
    };

    _getInfo=()=>{
        this.setState({
            isRefreshing:true,
        })
        let parpam="thetype=1005";
        Request('1005',parpam)
            .then((responseJson) => {
                this.setState({
                    name:responseJson.data.nickname,
                    desc:responseJson.data.describes,
                    imageheader:responseJson.data.touxiang,
                    isRefreshing:false,
                })
            })
            .catch((error) => {
                this.setState({
                    isRefreshing:false,
                })
                Toast.show(error.toString());
            });
    };

    _getInf=()=>{

        let parpam="thetype=1031";
        Request('1031',parpam)
            .then((responseJson) => {
                console.log('responseJson',responseJson)
            })
            .catch((error) => {
                Toast.show(error.toString());
            });
    };

    imageLoaded=()=> {
        this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
    }

    _renderUnLogin=()=>{
        return(
            <Container style={{backgroundColor:'#fafafa'}}>
                <Content style={{backgroundColor:'#fafafa'}}>
                    <Body style={{marginTop:30}}>
                    <Thumbnail square  style={{width:width/4,height:width/4,marginTop:50}} source={require('../img/icon_account_unlogin.png')} />
                    <Text  style={{marginBottom:20,marginTop:20,color:'#8c8c8c',fontSize:14}}>您还没有登录，请登陆后操作</Text>
                    <Button block onPress={()=>Actions.login2()}  style={{backgroundColor:'#c5b361',width:width-50,height:35}}><Text  >用户登录</Text></Button>
                    </Body>
                </Content>
            </Container>
        )
    };

    _renderLogin=()=>{
        return(
            <Container  style={{backgroundColor:'#fafafa'}}>
                <Content  style={{backgroundColor:'#fff'}} showsVerticalScrollIndicator={false}
                          onScroll={Animated.event([{nativeEvent:{contentOffset:{y:this.state.imgscale}}}])}
                          refreshControl={
                              <RefreshControl
                                  refreshing={this.state.isRefreshing}
                                  onRefresh={ this._onFresh}
                                  tintColor="#000"
                                  colors={['#000', '#000', '#000']}
                                  progressBackgroundColor="white"/>
                          } >
                    <Body style={{alignItems:'center',height:width/750*300+45,}}>

                    <Thumbnail square  style={{width:width,height:width/750*300}} source={require('../img/icon_account_bg.png')} ></Thumbnail>

                    <Animated.Image    style={[{position:'absolute',top:width/750*300-40,width:80,height:80,borderRadius:40,borderWidth:2,borderColor:'#fff'},
                        {transform:[
                                {scale: this.state.imgscale.interpolate({
                                        inputRange:[0,width/750*300],
                                        outputRange:[1,0]})
                                },
                            ]}]}
                                       source={this.state.imageheader==null?require('../img/icon_logobg.png'):{uri:this.state.imageheader}}

                    />
                    {/*{this.state.isshow?(*/}
                    {/*<Image    style={{position:'absolute',top:width/750*300-40,width:80,height:80,borderRadius:40,borderWidth:2,borderColor:'#fff'}}*/}
                    {/*source={require('../img/icon_logobg.png')}*/}

                    {/*/>*/}
                    {/*):(null)}*/}

                    </Body>
                    <Body >
                    <Text style={{marginBottom:20,paddingLeft:20,paddingRight:20}}>{this.state.name}</Text>
                    <Text style={{marginBottom:20,paddingLeft:20,paddingRight:20,fontSize:14,color:'#777'}}>{this.state.desc}</Text>
                    </Body>
                    <Body >
                    <Button transparent={true} block  style={{backgroundColor:'#fff',borderWidth:1,borderColor:'#8c8c8c',height:30,width:width/2.5}}
                            onPress={()=>Actions.accountinfo({image:this.state.imageheader,namea:this.state.name,desc:this.state.desc})}>
                        <Text style={{color:'#8b8b8b',fontSize:14}}>修改个人资料</Text>
                    </Button>
                    </Body>
                    <View style={{width:width,height:1,backgroundColor:'#eeeeee',marginTop:20,marginBottom:15}} >
                    </View>
                    <Body  >

                    <Text style={{marginBottom:15,color:'#C5B061'}}>我的成果展示</Text>
                    <View style={{width:width,height:1,backgroundColor:'#eeeeee',}} ></View>
                    </Body>
                    {this.state.arr.length==0?(
                        <Body style={{height:100,width:width,backgroundColor:'#fafafa'}}>
                        <Text note style={{marginTop:30}}>暂无投稿,快去投稿吧！</Text>
                        </Body>
                    ):(
                        <Row style={{ flexWrap: 'wrap'}}>
                            {this.state.arr.map((item, i)=>
                                <TouchableOpacity  key={i}
                                                          onPress={()=>Actions.contributedetails({id:item.id})}
                                                         >
                                    <Thumbnail square  style={{width:width/3,height:width/3,borderWidth:1,borderColor:'#fff'}} source={{uri:item.showimg}} />
                                </TouchableOpacity>
                            )}
                        </Row>
                    )}
                </Content>
            </Container>
        )
    }

    render() {
        return (
            <Container  style={{backgroundColor:'#fafafa'}}>
                <Header androidStatusBarColor={Config.StatusBarColor} style={{backgroundColor:'#fefefe'}}>
                    <Left>
                        <Text  numberOfLines={1} style={{marginLeft:10,fontSize:18,color:'#272727'}}>{this.state.name}</Text>
                    </Left>
                    <Right>
                        <Button transparent    onPress={()=> Actions.message({title:'消息'})}>
                            <Image  style={{width:17,height:17}} source={Config.IECEIVESOCKET==1?require('../img/icon_account_warn.png'):require('../img/icon_account_warn.png')} />
                            {Config.IECEIVESOCKET==1?(<View style={{position:'absolute',top:13,right:16,width:6,height:6,borderRadius:3,backgroundColor:'#f00'}}></View>):(null) }
                        </Button>
                        <Button transparent

                                onPress={()=>Actions.setting()}
                        >
                            <Image   style={{width:17,height:17}} source={require('../img/icon_account_setting.png')} />
                        </Button>
                    </Right>
                </Header>
                {Config.usertype==1?this._renderLogin():this._renderUnLogin()}

            </Container>
        );
    }

}